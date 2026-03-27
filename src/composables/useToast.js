import { reactive, readonly } from 'vue'

const toasts = reactive([])
let uid = 0

const DURATION = {
	info: 4000,
	success: 4000,
	warning: 5000,
	error: 6000,
}

export function useToast() {
	function add({ message, type = 'info', duration }) {
		const ms = duration ?? DURATION[type]

		// deduplicate - skip if same message+type already visible
		// const exists = toasts.some((t) => t.message === message && t.type === type)
		// if (exists) return

		const id = uid++
		toasts.push({ id, message, type })

		if (ms > 0) {
			setTimeout(() => remove(id), ms)
		}

		return id
	}

	function remove(id) {
		const index = toasts.findIndex((t) => t.id === id)
		if (index !== -1) toasts.splice(index, 1)
	}

	const toast = {
		info: (message, opts = {}) => add({ message, type: 'info', ...opts }),
		success: (message, opts = {}) => add({ message, type: 'success', ...opts }),
		warning: (message, opts = {}) => add({ message, type: 'warning', ...opts }),
		error: (message, opts = {}) => add({ message, type: 'error', ...opts }),
		add,
		remove,
	}

	return {
		toasts: readonly(toasts),
		toast,
	}
}
