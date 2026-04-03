import { ref } from 'vue'
import { useFavsStorage } from '@/composables/useFavsStorage'
import { useToast } from '@/composables/useToast'

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
	const { toast } = useToast()

	const state = ref(PANEL_STATE.IDLE)
	const pendingData = ref(null)

	// Loading states
	const isExporting = ref(false)
	const isCopying = ref(false)

	const toggleExport = () => {
		state.value = state.value === PANEL_STATE.EXPORT ? PANEL_STATE.IDLE : PANEL_STATE.EXPORT
	}
	const toggleImport = () => {
		state.value = state.value === PANEL_STATE.IMPORT ? PANEL_STATE.IDLE : PANEL_STATE.IMPORT
	}
	const togglePaste = () => {
		state.value = state.value === PANEL_STATE.PASTE ? PANEL_STATE.IDLE : PANEL_STATE.PASTE
	}

	const _delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

	// EXPORTING ===================================================
	const exportFile = async () => {
		// console.log('exportFile')

		// Prevent multiple exports
		if (isExporting.value) return

		isExporting.value = true

		try {
			const favList = await storage.read()

			if (!favList.length) {
				toast.warning('No favourites found, nothing to export')
				return
			}

			const raw = JSON.stringify(favList)
			const favCounts = String(favList.length).padStart(3, '0')
			const date = new Date().toISOString().split('T')[0]
			const fileName = `radiogarden_backup_${date}_stations_${favCounts}.json`

			const anchor = Object.assign(document.createElement('a'), {
				href: URL.createObjectURL(new Blob([raw], { type: 'application/json' })),
				download: fileName,
			})

			anchor.click()
			URL.revokeObjectURL(anchor.href)

			await _delay()
			toast.success('Export successful')
		} catch (error) {
			console.error('Export failed:', error)
			toast.error('Export failed')
		} finally {
			isExporting.value = false
		}
	}
	const exportCopy = async () => {
		// console.log('exportCopy')

		// Prevent multiple copies
		if (isCopying.value) return

		isCopying.value = true

		try {
			const favList = await storage.read()

			if (!favList.length) {
				toast.warning('No favorites to copy')
				return
			}

			await navigator.clipboard.writeText(JSON.stringify(favList))

			await _delay()
			toast.success('Copied to clipboard')
		} catch (error) {
			console.error('Copy failed:', error)
			toast.error('Copy failed')
		} finally {
			isCopying.value = false
		}
	}

	// IMPORTING ===================================================
	const handleFileInput = (file) => {
		// console.log('handleFileInput')

		if (!file) return

		const reader = new FileReader()
		reader.onload = (e) => {
			// console.log('reader.onload', e.target.result)
			validateAndStage(e.target.result)
		}
		reader.onerror = () => {
			console.error('File read error')
			toast.error('File read error')
		}
		reader.readAsText(file)
	}

	const validateAndStage = (raw) => {
		try {
			const trimmed = raw.trim()

			// size limit (eg 2MB)
			if (trimmed.length > 2 * 1024 * 1024) {
				// console.log('File too large')
				toast.warning('File too large')
				return
			}

			const parsed = JSON.parse(trimmed)

			// type check
			if (!Array.isArray(parsed)) {
				// console.log('Must be array')
				toast.warning('Must be array')
				return
			}

			// limit array size
			if (parsed.length > 10000) {
				// console.log('Too many items')
				toast.warning('Too many items')
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
				// console.log('Invalid items detected')
				toast.error('Invalid items detected')
				return
			}

			pendingData.value = parsed
			state.value = PANEL_STATE.DECISION
		} catch (error) {
			// console.log('Invalid JSON')
			toast.error('Invalid JSON')
		}
	}

	const applyOverride = async () => {
		await storage.write(pendingData.value)

		toast.success(`Overridden - ${pendingData.value.length} stations saved`)
		// console.log(`Overridden - ${pendingData.value.length} stations saved`)
		_finalize()
	}

	const applyMerge = async () => {
		const curr = await storage.read()
		const finalData = [...new Set([...curr, ...pendingData.value])]

		await storage.write(finalData)

		toast.success(`Merged - ${finalData.length} stations saved`)
		// console.log(`Merged - ${finalData.length} stations saved`)
		_finalize()
	}

	const cancelImport = () => {
		pendingData.value = null
		state.value = PANEL_STATE.IDLE

		toast.info('Operation cancelled')
		// console.log('Operation cancelled')
	}

	const handlePasteInput = (value) => {
		// console.log(value)
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
		isExporting,
		isCopying,
	}
}
