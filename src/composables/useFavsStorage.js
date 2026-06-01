/*
Radio Garden previously used ImmortalDB (IDB + LS) but now uses only localStorage

key versioning - RG changed its storage key at some point:
- current: 'favorites-list'
- legacy: '_immortal|favorites-list' (older RG / older extension versions)

reads probe both keys. writes always use the curr key → old users auto-migrate on next save */

const STORAGE_KEY = 'favorites-list'
const STORAGE_KEY_LEGACY = '_immortal|favorites-list'

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
	- reads from localStorage, falls back to legacy key
	- returns a clean string[] - always safe to spread/merge directly */
	const read = async () => {
		const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY_LEGACY)
		return _parseList(raw)
	}

	/*
	- writes to localStorage. always uses the curr key - migrates legacy users automatically */
	const write = async (favList) => {
		const serialized = JSON.stringify(favList)

		localStorage.setItem(STORAGE_KEY, serialized)
	}

	return { read, write }
}
