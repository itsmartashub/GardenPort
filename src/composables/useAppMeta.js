import { APP_NAME, GITHUB_REPO_URL } from '@/config/const'

export function useAppMeta() {
	const manifest =
		typeof browser !== 'undefined' && browser.runtime ? browser.runtime.getManifest() : { version: '1.0.0' }
	const version = manifest.version

	const releaseUrl = `${GITHUB_REPO_URL}/releases/tag/v${version}`

	return {
		version,
		releaseUrl,
	}
}
