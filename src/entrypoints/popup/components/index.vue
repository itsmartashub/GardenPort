<script setup>
import Logo from '@/components/Logo.vue'
import logoSrcDS from '@/assets/img/logo-ds.webp'
import logoSrcGPT from '@/assets/img/logo-gpt.webp'
import IconCoffee from '~icons/tabler/coffee'
import IconGithub from '~icons/tabler/brand-github'

const manifest = browser.runtime.getManifest()
const version = manifest.version
// const extName = manifest.name
const extName = 'GardenPort'

const repoSlug = extName.toLowerCase().replace(/\s+/g, '-') // "gardenport"
const githubUrl = `https://github.com/itsmartashub/${repoSlug}`
const releaseUrl = `${githubUrl}/releases/tag/v${version}`
const kofiUrl = 'https://ko-fi.com/http417'
</script>

<template>
	<div class="popup">
		<!-- ─────────────────────────── HEADER ─────────────────────────── -->
		<header class="popup__header">
			<div class="popup__brand">
				<Logo />
				<div class="popup__title-wrap">
					<h1 class="popup__title">Garden<span>Port</span></h1>
					<p class="popup__subtitle">Radio Garden backup &amp; restore</p>
				</div>
			</div>
			<span class="popup__badge">
				<span class="popup__badge-dot" aria-hidden="true"></span>
				100% local
			</span>
		</header>

		<hr />

		<!-- ─────────────────────────── TAGLINE ────────────────────────── -->
		<p class="popup__tagline">
			Backup &amp; restore your
			<a class="popup__link" href="https://radio.garden" target="_blank" rel="noopener">Radio Garden</a>
			favorites. Export to JSON or clipboard — import in seconds.
		</p>

		<hr />

		<!-- ─────────────────────────── UPSELLS ─────────────────────────── -->
		<section class="popup__also" aria-labelledby="also-label">
			<span id="also-label" class="popup__section-label">Also by creator</span>
			<div class="popup__cards">
				<a
					class="popup__card popup__card--gp"
					href="https://chromewebstore.google.com/detail/gpthemes"
					target="_blank"
					rel="noopener"
				>
					<span class="popup__card__icon" aria-hidden="true">
						<img :src="logoSrcGPT" alt="GPThemes logo" width="50" height="50" />
					</span>
					<span class="popup__card__text">
						<strong class="popup__card__name">GPThemes</strong>
						<span class="popup__card__desc">ChatGPT UI tool</span>
					</span>
				</a>

				<a
					class="popup__card popup__card--dt"
					href="https://chromewebstore.google.com/detail/deepstyled"
					target="_blank"
					rel="noopener"
				>
					<span class="popup__card__icon" aria-hidden="true">
						<img :src="logoSrcDS" alt="DeepStyled logo" width="50" height="50" />
					</span>
					<span class="popup__card__text">
						<strong class="popup__card__name">DeepStyled</strong>
						<span class="popup__card__desc">DeepSeek UI tool</span>
					</span>
				</a>
			</div>
		</section>

		<hr />

		<!-- ─────────────────────────── FOOTER ──────────────────────────── -->
		<footer class="popup__footer">
			<a class="popup__footer__link" :href="kofiUrl" target="_blank" rel="noopener">
				<span class="badge">
					<IconCoffee />
					Support on Ko-fi
				</span>
			</a>

			<a class="popup__footer__link" :href="releaseUrl" target="_blank" rel="noopener">
				<span class="badge"> <IconGithub /> v{{ version }}</span>
			</a>
		</footer>
	</div>
</template>

<style lang="scss">
.popup {
	display: flex;
	flex-direction: column;
	gap: var(--sp-lg);
	padding: var(--sp-lg);

	// ── Header ──────────────────────────────────────────────────────────────
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
	}

	&__brand {
		display: flex;
		align-items: center;
		gap: 1.25em;
	}

	&__title-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--sp-xs);
	}

	&__title {
		font-size: 1.5em;
		font-weight: 400;
		line-height: 1.2;
		color: var(--c-import);

		span {
			font-weight: bold;
		}
	}

	&__subtitle {
		font-size: 0.9em;
		line-height: 1.3;
	}

	&__badge {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.25rem 0.5rem;
		color: var(--c-import);
		border: 1px solid oklch(from currentColor l c h / 0.15);
		background-color: var(--c-green-dim);
		border-radius: 50vw;
		font-size: 0.7rem;
		font-weight: 600;
		white-space: nowrap;
		letter-spacing: 0.01em;
	}

	&__badge-dot {
		$dot-size: 0.4rem;
		width: $dot-size;
		height: $dot-size;
		border-radius: 50%;
		background-color: var(--c-import);
		box-shadow: 0 0 6px oklch(from currentColor l c h / 0.7);
		animation: pulse 2.4s ease-in-out infinite;
	}

	// ── Tagline ─────────────────────────────────────────────────────────────
	// &__tagline {
	// }

	&__link {
		color: var(--c-import);
		font-weight: 600;
		text-decoration: none;
		transition: opacity 0.15s;

		&:hover {
			opacity: 0.8;
		}
	}

	// ── Sections ────────────────────────────────────────────────────────────
	&__section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	&__section-label {
		font-size: 0.65em;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		margin-bottom: var(--sp-sm);
	}

	&__row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-md);
	}

	// ── Also-by-us upsell cards ──────────────────────────────────────────────
	&__also {
		display: flex;
		flex-direction: column;
		gap: var(--sp-md);
	}

	&__cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-md);
	}

	&__card {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		// background-color: oklch(from currentColor l c h / 0.2);
		// box-shadow: inset 0 0 18px 9px oklch(from currentColor l c h / 0.08);
		background-color: oklch(from currentColor 18% calc(c * 0.23) h / 1);
		border-radius: calc(var(--br) * 1.3);
		border: 1px solid oklch(from currentColor l c h / 0.1);
		text-decoration: none;
		transition:
			background-color 0.18s,
			transform 0.12s;

		&:hover {
			background-color: oklch(from currentColor 22% calc(c * 0.3) h / 1);
		}

		&:active {
			transform: scale(0.97);
		}

		&--gp {
			color: var(--c-purple);
		}

		&--dt {
			color: var(--c-blue);
		}

		&__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			position: relative;
			border-radius: calc(var(--br) * 0.8);

			img {
				$img-sz: 2rem;
				width: $img-sz;
				height: $img-sz;
				border-radius: inherit;
			}
		}

		&__text {
			display: flex;
			flex-direction: column;
			gap: 1px;
			min-width: 0;
		}

		&__name {
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__desc {
			font-size: 0.75em;
			opacity: 0.8;
			white-space: nowrap;
		}
	}

	// ── Footer ───────────────────────────────────────────────────────────────
	&__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&__link {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 12px;
			font-weight: 500;
			color: var(--c-orange);
			transition: opacity 0.15s;
			opacity: 0.8;

			svg {
				flex-shrink: 0;
			}

			&:hover {
				opacity: 1;
			}
		}
	}
}

.badge {
	display: flex;
	align-items: center;
	gap: var(--sp-xs);
	display: flex;
	align-items: center;
	padding: 0.25rem 0.5rem;
	color: var(--c-orange);
	background-color: oklch(from currentColor l c h / 0.1);
	border: 1px solid oklch(from currentColor l c h / 0.2);
	border-radius: 50vw;
	font-size: 0.7rem;
	font-weight: 600;
	white-space: nowrap;
	letter-spacing: 0.01em;
}
</style>
