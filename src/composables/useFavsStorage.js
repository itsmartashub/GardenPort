const STORAGE_KEY = '_immortal|favorites-list'

/*
radio garden uses ImmortalDB which reads IDB as primary source on firefox !! so must keep both stores in sync on every write */

const IDB_NAME = 'ImmortalDB'
const IDB_STORE = 'key-value-pairs'

// cache the DB connection promise - opened once, reused forever
let _dbPromise = null

/* 
- no version arg - opens at whatever version radio garden already set, avoids 'upgradeneeded'
- on a fresh install the DB doesn't exist yet - upgradeneeded fires but we never create stores (Radio Garden itself will do that on first visit), so we must check objectStoreNames first */
const _openDB = () => {
	if (!_dbPromise) {
		_dbPromise = new Promise((resolve, reject) => {
			const req = indexedDB.open(IDB_NAME)
			// upgradeneeded fires when DB is brand-new (fresh browser, never visited RG). we intentionally do nothing here - RG owns the schema
			req.onupgradeneeded = () => {}
			req.onsuccess = (e) => resolve(e.target.result)
			req.onerror = (e) => reject(e.target.error)
		})
	}
	return _dbPromise
}

// returns true only when the store actually exists in the opened DB
const _storeExists = (db) => db.objectStoreNames.contains(IDB_STORE)

const _idbGet = async () => {
	try {
		const db = await _openDB()

		// fresh install: DB exists but RG hasnt created the store yet
		if (!_storeExists(db)) return null

		return new Promise((resolve) => {
			const tx = db.transaction(IDB_STORE, 'readonly')
			const req = tx.objectStore(IDB_STORE).get(STORAGE_KEY)

			req.onsuccess = (e) => resolve(e.target.result ?? null)
			req.onerror = () => resolve(null)
		})
	} catch {
		return null
	}
}

const _idbPut = async (value) => {
	try {
		const db = await _openDB()

		// fresh install: skip IDB write - localStorage is the fallback until RG initialises
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
	// console.log(raw)

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
	IDB is the truth source on firefox, falls back to localStorage
	returns a clean string[] - always safe to spread/merge directly */
	const read = async () => {
		const raw = (await _idbGet()) ?? localStorage.getItem(STORAGE_KEY)
		return _parseList(raw)
	}

	// writes localStorage first (sync/instant), then IDB
	const write = async (favList) => {
		const serialized = JSON.stringify(favList)

		localStorage.setItem(STORAGE_KEY, serialized)
		await _idbPut(serialized)
	}

	return { read, write }
}
