const STORAGE_KEY = '_immortal|favorites-list'

export function useFavsStorage() {
	const exportRaw = () => localStorage.getItem(STORAGE_KEY) ?? '[]'

	const write = (favList) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favList))
	}

	const merge = (incoming) => {
		const curr = read()
		const combined = [...curr, ...incoming]

		// console.log(curr)
		// console.log(combined)

		return [...new Set(combined)]
	}

	const read = () => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) return []
			const parsed = JSON.parse(raw)
			return Array.isArray(parsed) ? parsed : []
		} catch {
			return []
		}
	}

	return {
		exportRaw,
		write,
		merge,
	}
}
