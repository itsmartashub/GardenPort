/*
radio garden uses ImmortalDB which reads IDB as primary source on firefox !! so must keep both stores in sync on every write.

key versioning. RG changed its storage key at some point:
- current: 'favorites-list' (used in both LS and IDB now)
- legacy: '_immortal|favorites-list' (older RG / older extension versions)

reads probe both keys. writes always use the curr key → old users auto-migrate on next save */

const STORAGE_KEY = 'favorites-list'
const STORAGE_KEY_LEGACY = '_immortal|favorites-list'

const IDB_NAME = 'ImmortalDB'
const IDB_STORE = 'key-value-pairs'

// cache the DB connection promise - opened once, reused forever
let _dbPromise = null

/*
- no version arg - opens at whatever version radio garden already set, avoids unintended 'upgradeneeded'
- on a fresh install the DB doesn't exist yet: we bootstrap the store using ImmortalDB's schema (plain out-of-line key store, no keyPath). RG finds the store already there on first visit, no conflict, no version bump */
const _openDB = () => {
	if (!_dbPromise) {
		_dbPromise = new Promise((resolve, reject) => {
			const req = indexedDB.open(IDB_NAME)

			req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE)
			req.onsuccess = (e) => resolve(e.target.result)
			req.onerror = (e) => reject(e.target.error)
		})
	}
	return _dbPromise
}

// guard in case the store is somehow absent. returns true only when the store actually exists in the opened DB
const _storeExists = (db) => db.objectStoreNames.contains(IDB_STORE)

// single-key IDB get. own transaction so we can call it sequentially
const _idbGetKey = (db, key) =>
	new Promise((resolve) => {
		const tx = db.transaction(IDB_STORE, 'readonly')
		const req = tx.objectStore(IDB_STORE).get(key)
		req.onsuccess = (e) => resolve(e.target.result ?? null)
		req.onerror = () => resolve(null)
	})

const _idbGet = async () => {
	try {
		const db = await _openDB()
		if (!_storeExists(db)) return null

		// probe curr key first, fall back to legacy (old users)
		return (await _idbGetKey(db, STORAGE_KEY)) ?? (await _idbGetKey(db, STORAGE_KEY_LEGACY))
	} catch {
		return null
	}
}

const _idbPut = async (value) => {
	try {
		const db = await _openDB()

		if (!_storeExists(db)) return

		return new Promise((resolve, reject) => {
			const tx = db.transaction(IDB_STORE, 'readwrite')

			tx.objectStore(IDB_STORE).put(value, STORAGE_KEY)
			tx.oncomplete = () => resolve()
			tx.onerror = (e) => reject(e.target.error)
		})
	} catch (e) {
		console.error('[useFavsStorage] IDB write failed:', e)
	}
}

// filters out empty strings so [""] is treated as empty
const _parseList = (raw) => {
	try {
		const parsed = JSON.parse(raw)

		if (!Array.isArray(parsed)) return []
		return parsed.filter((item) => typeof item === 'string' && item !== '')
	} catch {
		return []
	}
}

export function useFavsStorage() {
	/*
	- IDB is the truth source on firefox, falls back to localStorage
	- returns a clean string[] - always safe to spread/merge directly */
	const read = async () => {
		// probe current LS key first, then legacy - IDB already handles both internally
		const raw = (await _idbGet()) ?? localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY_LEGACY)
		return _parseList(raw)
	}

	/*
	- writes localStorage first (sync/instant), then IDB
	- always uses the curr key - migrates legacy users automatically */
	const write = async (favList) => {
		const serialized = JSON.stringify(favList)

		localStorage.setItem(STORAGE_KEY, serialized)
		await _idbPut(serialized)
	}

	return { read, write }
}
