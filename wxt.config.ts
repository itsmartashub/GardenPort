import { defineConfig } from 'wxt'
// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
	srcDir: 'src',

	// Override default chrome browser to Brave
	webExt: {
		disabled: true,
		// Manually point to my Brave exe
		binaries: {
			chrome: 'C:/Program Files/BraveSoftware/Brave-Browser-Beta/Application/brave.exe', // Change path for Mac/Linux
		},
		// This flag enables the Prompt API
		chromiumArgs: ['--disable-features=DisableLoadExtensionCommandLineSwitch'],
	},

	autoIcons: {
		enabled: true,
		baseIconPath: 'assets/img/fav/icon.png',
		sizes: [128, 48, 32, 16],
		// developmentIndicator: false,
	},
	vite: () => ({
		// server: {
		// 	hmr: {
		// 		overlay: false,
		// 	},
		// 	watch: { // <-- UNCOMMENT THIS
		// 		usePolling: true,
		// 		ignored: ['!**/assets/styles/**'],
		// 	},
		// },
		css: {
			// postcss: {
			// 	plugins: [autoprefixer()],
			// },
			devSourcemap: true, // ← Enable source maps in dev
			preprocessorOptions: {
				scss: {
					quietDeps: true,
					api: 'modern-compiler',
					additionalData: `@use "@/assets/styles/utils/_index.scss" as *;`,
				},
			},
		},
	}),

	manifest: {
		name: 'GardenPort - Radio Garden Favorites Backup & Restore',
		permissions: [],
		host_permissions: ['https://radio.garden/*'],
	},
})
