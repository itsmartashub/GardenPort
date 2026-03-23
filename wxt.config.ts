import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ['@wxt-dev/module-vue'],
	srcDir: 'src',

	// Override default chrome browser to Brave
	webExt: {
		disabled: false,
		// Manually point to my Brave exe
		binaries: {
			chrome: 'C:/Program Files/BraveSoftware/Brave-Browser-Beta/Application/brave.exe', // Change path for Mac/Linux
		},
	},

	manifest: {
		name: 'Radio Garden – Favorites Manager',
		version: '1.0.0',
		description: 'Export, import, and manage your Radio Garden favorite stations.',
		permissions: [],
		host_permissions: ['https://radio.garden/*'],
	},
	// Vite config for SCSS + PostCSS autoprefixer
	vite: () => ({
		css: {
			preprocessorOptions: {
				scss: {
					// global SCSS vars/mixins auto-imported
					additionalData: `@use "@/styles/_vars" as *;`,
				},
			},
			// postcss: {
			// 	plugins: [(await import('autoprefixer')).default()],
			// },
		},
	}),
})
