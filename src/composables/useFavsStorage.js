const STORAGE_KEY = '_immortal|favorites-list'

export function useFavsStorage() {
	const exportRaw = () => localStorage.getItem(STORAGE_KEY) ?? '[]'

	return {
		exportRaw,
	}
}
