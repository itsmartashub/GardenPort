import { createApp } from 'vue'
import App from '../App.vue'

export default defineContentScript({
	matches: ['*://radio.garden/*'],
	runAt: 'document_idle',

	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			name: 'rgx',
			position: 'inline',
			anchor: 'body',
			append: 'last',
			onMount(container) {
				const app = createApp(App)
				app.mount(container)
				return app
			},
			onRemove(app) {
				app?.unmount()
			},
		})

		ui.mount()
	},
})
