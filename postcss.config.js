export default {
	plugins: {
		// handle standard CSS nesting)
		'postcss-nesting': {},

		// convert modern CSS to browser-compatible CSS
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': false, // set to false because we're using the dedicated plugin above,
				'relative-color-syntax': true, // explicitly enable the polyfill
				'custom-properties': true, // this handles translating scale/rotate/translate back to transform: ...
			},
		},

		// combine rules that have the same selector
		'postcss-combine-duplicated-selectors': {
			removeDuplicatedProperties: true,
		},

		// goup and sort all @media queries at the bottom of the file
		'postcss-sort-media-queries': {
			sort: 'mobile-first', // or 'desktop-first'
		},

		// add vendor prefixes last
		autoprefixer: {},
	},
}
