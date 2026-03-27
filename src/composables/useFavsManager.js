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
	const pendingData = ref(null)

	const toggleExport = () => {
		state.value = state.value === PANEL_STATE.EXPORT ? PANEL_STATE.IDLE : PANEL_STATE.EXPORT
	}
	const toggleImport = () => {
		state.value = state.value === PANEL_STATE.IMPORT ? PANEL_STATE.IDLE : PANEL_STATE.IMPORT
	}
	const togglePaste = () => {
		state.value = state.value === PANEL_STATE.PASTE ? PANEL_STATE.IDLE : PANEL_STATE.PASTE
	}

	// IMPORTING
	const exportFile = () => {
		console.log('exportFile')
		const raw = storage.exportRaw()
		console.log(raw)

		// TOOD: add Toast here instead of console.lgo
		if (raw === '[]') return console.log('No favourites found, nothing to export')

		const favList = JSON.parse(raw)
		const favCounts = String(favList.length).padStart(3, '0') // start with 000 if only one digit, eg 001, 002, ...
		const date = new Date().toISOString().split('T')[0]
		const fileName = `radiogarden_backup_${date}_stations_${favCounts}.json`
		const anchor = Object.assign(document.createElement('a'), {
			href: URL.createObjectURL(new Blob([raw], { type: 'application/json' })),
			download: fileName,
		})

		anchor.click()
		URL.revokeObjectURL(anchor.href)
	}
	const exportCopy = () => {
		console.log('exportCopy')

		// TOOD: add Toast here instead of console.lgo
		const raw = storage.exportRaw()
		if (raw === '[]') return console.log('No favorites to copy')

		// TOOD: add Toast here instead of console.lgo
		navigator.clipboard.writeText(storage.exportRaw()).then(() => console.log('Copied to clipboard'))
	}

	// IMPORTING
	const handleFileInput = (file) => {
		console.log('handleFileInput')

		if (!file) return

		const reader = new FileReader()
		reader.onload = (e) => {
			// console.log('reader.onload', e.target.result)
			validateAndStage(e.target.result)
		}
		reader.readAsText(file)
	}

	const validateAndStage = (raw) => {
		try {
			const trimmed = raw.trim()

			// size limit (eg 5MB)
			if (trimmed.length > 5 * 1024 * 1024) {
				// TOOD: add Toast here instead of console.lgo
				console.log('File too large')
				return
			}

			const parsed = JSON.parse(trimmed)

			// type check
			if (!Array.isArray(parsed)) {
				// TOOD: add Toast here instead of console.lgo
				console.log('Must be array')
				return
			}

			// limit array size
			if (parsed.length > 10000) {
				// TOOD: add Toast here instead of console.lgo
				console.log('Too many items')
				return
			}

			// validate each item
			const isValid = parsed.every((item) => {
				// must be string
				if (typeof item !== 'string') return false

				// lenght limit per item
				if (item.length > 100) return false

				// check for dangerous patterns
				if (item === '__proto__' || item === 'constructor' || item === 'prototype') return false

				// control character check
				if (/[\x00-\x1F\x7F]/.test(item)) return false

				return true
			})

			if (!isValid) {
				console.log('Invalid items detected')
				return
			}

			pendingData.value = parsed
			state.value = PANEL_STATE.DECISION
		} catch (error) {
			console.log('Invalid JSON')
		}
	}

	const applyOverride = () => {
		storage.write(pendingData.value)
		// TOOD: add Toast here instead of console.lgo
		console.log(`Overridden - ${pendingData.value.length} stations saved`)
		_finalize()
	}

	const applyMerge = () => {
		const finalData = storage.merge(pendingData.value)
		storage.write(finalData)
		// TOOD: add Toast here instead of console.lgo
		console.log(`Merged - ${finalData.length} stations saved`)
		_finalize()
	}

	const cancelImport = () => {
		pendingData.value = null
		state.value = PANEL_STATE.IDLE
		// TOOD: add Toast here instead of console.lgo
		console.log('Operation cancelled')
	}

	const handlePasteInput = (value) => {
		console.log(value)
		const v = value.trim()
		if (v.startsWith('[') && v.endsWith(']')) validateAndStage(v)
	}

	const _finalize = () => {
		pendingData.value = null
		state.value = PANEL_STATE.IDLE
		setTimeout(() => location.reload(), 800)
	}

	return {
		state,
		toggleExport,
		toggleImport,
		togglePaste,
		exportFile,
		exportCopy,
		handleFileInput,
		applyOverride,
		applyMerge,
		cancelImport,
		handlePasteInput,
	}
}
