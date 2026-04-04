import { defineConfig } from 'wxt'

import Icons from 'unplugin-icons/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
	srcDir: 'src',

	//override default chrome browser to Brave
	webExt: {
		disabled: true,
		// manually point to my Brave exe
		binaries: {
			chrome: 'C:/Program Files/BraveSoftware/Brave-Browser-Beta/Application/brave.exe', // change path for Mac/Linux
		},
		// this flag enables the Prompt API
		chromiumArgs: ['--disable-features=DisableLoadExtensionCommandLineSwitch'],
	},

	autoIcons: {
		enabled: true,
		baseIconPath: 'assets/img/fav/icon.png',
		sizes: [128, 48, 32, 16],
		// developmentIndicator: false,
	},
	vite: () => ({
		plugins: [
			Icons({
				compiler: 'vue3',
				autoInstall: true,
			}),
		],
		css: {
			devSourcemap: true, // WXT/Vite should automatically pick up postcss.config.js
			postcss: {},
			preprocessorOptions: {
				scss: {
					quietDeps: true,
					api: 'modern-compiler',
					additionalData: `@use "@/assets/styles/utils" as *;`,
				},
			},
		},
	}),

	manifest: ({ browser }) => ({
		permissions: [],
		host_permissions: ['*://radio.garden/*'],
		author: 'itsmarta',
		homepage_url: 'https://github.com/itsmartashub/GardenPort',

		// CHROME
		...(browser === 'chrome' && {
			name: 'GardenPort - Radio Garden Favorites Backup & Restore',
			minimum_chrome_version: '119',
		}),

		// FIREFOX
		...(browser === 'firefox' && {
			name: 'GardenPort - Radio Garden Backup & Restore', // must be under 45 chars
			browser_specific_settings: {
				gecko: {
					id: 'gardenport@itsmartashub',
					strict_min_version: '128.0', // matches OKLCH support
					data_collection_permissions: {
						required: ['none'],
						optional: [],
					},
				},
			},
		}),
	}),
})
