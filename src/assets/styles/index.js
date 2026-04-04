/* centralized styles for both the content script and the popup
using explicit JS imports here instead of a central SCSS file with `@use` to ensure robust hot module replacement (HMR) in WXT/Vite */
import './globals/reset.scss'
import './globals/vars.scss'
import './globals/typo.scss'
import './globals/transitions.scss'
import './globals/base.scss'
import './components/btn.scss'
