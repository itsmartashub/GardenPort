import { ref, inject } from 'vue'

export const PANEL_STATE = {
	IDLE: 'idle',
	EXPORT: 'export',
	IMPORT: 'import',
	PASTE: 'paste',
	DECISION: 'decision',
}

export function useFavsManager() {
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

	return {
		state,
		toggleExport,
		toggleImport,
		togglePaste,
	}
}
