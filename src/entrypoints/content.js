// import '@/assets/styles/main.scss'
import '@/assets/styles/globals/vars.scss'
import '@/assets/styles/globals/typo.scss'
import '@/assets/styles/globals/transitions.scss'
import '@/assets/styles/globals/base.scss'
import '@/assets/styles/components/btn.scss'

import { createApp } from 'vue'
import App from '../App.vue'

/* export default defineContentScript({
	matches: ['*://radio.garden/*'],
	cssInjectionMode: 'ui',

	async main(ctx) {
		const ui = await createShadowRootUi(ctx, {
			name: 'garden-port',
			position: 'inline',
			anchor: 'body',
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
}) */

export default defineContentScript({
	matches: ['*://radio.garden/*'],
	cssInjectionMode: 'manifest',

	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			name: 'garden-port',
			position: 'inline',
			anchor: 'body',
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
