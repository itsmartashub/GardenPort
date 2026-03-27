import { ref } from 'vue'
import { useFavsStorage } from '@/composables/useFavsStorage'

// Panel UI states
export const PANEL_STATE = {
	IDLE: 'idle',
	EXPORT: 'export',
	IMPORT: 'import',
	PASTE: 'paste',
	DECISION: 'decision',
}

export function useFavsManager() {
	const storage = useFavsStorage()

	const state = ref(PANEL_STATE.IDLE)

	const toggleExport = () => {
		state.value = state.value === PANEL_STATE.EXPORT ? PANEL_STATE.IDLE : PANEL_STATE.EXPORT
	}
	const toggleImport = () => {
		state.value = state.value === PANEL_STATE.IMPORT ? PANEL_STATE.IDLE : PANEL_STATE.IMPORT
	}
	const togglePaste = () => {
		state.value = state.value === PANEL_STATE.PASTE ? PANEL_STATE.IDLE : PANEL_STATE.PASTE
	}

	const exportFile = () => {
		console.log('exportFile')
		const raw = storage.exportRaw()
		console.log(raw)

		// TODO: add Toast here
		if (!raw === '[]') return console.log('No favourites found, nothing to export')

		const favList = JSON.parse(raw)
		const favCounts = String(favList.length).padStart(3, '0') // start with 000 if only one digit, eg 001, 002, ...
		const date = new Date().toISOString().split('T')[0]
		const fileName = `radiogarden_backup_${date}_${favCounts}.json`
		const anchor = Object.assign(document.createElement('a'), {
			href: URL.createObjectURL(new Blob([raw], { type: 'application/json' })),
			download: fileName,
		})

		anchor.click()
		URL.revokeObjectURL(anchor.href)
	}
	const exportCopy = (e) => {
		console.log('exportCopy', e)
	}

	return {
		state,
		toggleExport,
		toggleImport,
		togglePaste,
		exportFile,
		exportCopy,
	}
}
