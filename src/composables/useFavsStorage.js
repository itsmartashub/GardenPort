const STORAGE_KEY = '_immortal|favorites-list'

export function useFavsStorage() {
	const exportRaw = () => localStorage.getItem(STORAGE_KEY) ?? '[]'

	const write = (favList) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favList))
	}

	return {
		exportRaw,
		write,
	}
}
