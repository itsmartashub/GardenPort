const STORAGE_KEY = '_immortal|favorites-list'

/*
radio garden uses ImmortalDB which reads IDB as primary source on firefox !!
so must keep both stores in sync on every write */

const IDB_NAME = 'ImmortalDB'
const IDB_STORE = 'key-value-pairs'

// no version arg - opens at whatever version radio gadenn already set, avoids "upgradeneeded'
const _openDB = () =>
	new Promise((resolve, reject) => {
		const req = indexedDB.open(IDB_NAME)

		req.onsuccess = (e) => resolve(e.target.result)
		req.onerror = (e) => reject(e.target.error)
	})

const _idbGet = async () => {
	try {
		const db = await _openDB()

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
	console.log(raw)

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
