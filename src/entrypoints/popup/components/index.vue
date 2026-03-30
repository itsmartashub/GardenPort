<script setup>
import Logo from '@/components/Logo.vue'
import AppBadge from '@/components/AppBadge.vue'
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

const cards = [
	{
		id: 'gpthemes',
		name: 'GPThemes',
		description: 'ChatGPT UI tool',
		url: 'https://github.com/itsmartashub/GPThemes',
		logo: logoSrcGPT,
		colorClass: 'popup__card--gpt',
	},
	{
		id: 'deepstyled',
		name: 'DeepStyled',
		description: 'DeepSeek UI tool',
		url: 'https://github.com/itsmartashub/DeepStyled',
		logo: logoSrcDS,
		colorClass: 'popup__card--ds',
	},
]
</script>

<template>
	<div class="popup">
		<!-- ─────────────────────────── HEADER ─────────────────────────── -->
		<header class="popup__header">
			<a class="popup__brand" :href="githubUrl" target="_blank" rel="noopener">
				<Logo />
				<div class="popup__title-wrap">
					<h1 class="popup__title">Garden<span>Port</span></h1>
					<p class="popup__subtitle">Radio Garden backup &amp; restore</p>
				</div>
			</a>

			<AppBadge label="100% local" dot />
		</header>

		<hr />

		<!-- ─────────────────────────── TAGLINE ────────────────────────── -->
		<p class="popup__tagline">
			Backup &amp; restore your
			<a class="popup__link" href="https://radio.garden" target="_blank" rel="noopener">Radio Garden</a>
			favorites. Export to JSON or clipboard — import in seconds.
		</p>

		<hr />

		<!-- ─────────────────────────── CARDS ─────────────────────────── -->
		<section class="popup__also" aria-labelledby="also-label">
			<span id="also-label" class="popup__section-label">Also by creator</span>
			<div class="popup__cards">
				<a
					class="popup__card"
					v-for="card in cards"
					:key="card.id"
					:class="card.colorClass"
					:href="card.url"
					target="_blank"
					rel="noopener"
				>
					<span class="popup__card__icon" aria-hidden="true">
						<img :src="card.logo" alt="Project logo" width="50" height="50" />
					</span>
					<span class="popup__card__text">
						<strong class="popup__card__name">{{ card.name }}</strong>
						<span class="popup__card__desc">{{ card.description }}</span>
					</span>
				</a>
			</div>
		</section>

		<hr />

		<!-- ─────────────────────────── FOOTER ──────────────────────────── -->
		<footer class="popup__footer">
			<a class="popup__footer__link" :href="kofiUrl" target="_blank" rel="noopener">
				<AppBadge color="var(--c-orange)" label="Support on Ko-fi" :icon="IconCoffee" />
			</a>

			<a class="popup__footer__link" :href="releaseUrl" target="_blank" rel="noopener">
				<AppBadge color="var(--c-orange)" :label="`v${version}`" :icon="IconGithub" />
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
		flex-wrap: wrap;
		gap: 1.5em;
		color: var(--c-accent);

		&:hover {
			color: var(--c-orange) !important;
			.gp-logo {
				scale: 1.2;
				rotate: 45deg;

				img {
					box-shadow:
						0 0 0 0 oklch(from var(--c-orange) l c h / 0.3),
						0 0 0 0 oklch(from var(--c-orange) l c h / 0.2) !important;
				}
			}

			& .popup__title-wrap {
				translate: -5px 0;
			}
		}
	}

	&__brand {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.45em;
	}

	&__title-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--sp-xs);

		transition: translate var(--ease-base);
	}

	&__title,
	&__subtitle {
		transition: color var(--ease-base);
	}

	&__title {
		font-size: 1.5em;
		font-weight: 400;
		line-height: 1.2;
		color: currentColor;

		span {
			font-weight: bold;
		}
	}

	&__subtitle {
		font-size: 0.9em;
		line-height: 1.3;
		color: oklch(from currentColor 60% calc(c * 0.3) h / 1);
	}

	// ── Tagline ─────────────────────────────────────────────────────────────
	// &__tagline {
	// }

	&__link {
		color: var(--c-accent);
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
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-xl);
	}

	&__card {
		flex-grow: 1;
		flex-basis: content;
		display: flex;
		align-items: center;
		gap: var(--sp-lg);
		padding: var(--sp-md) var(--sp-lg);
		background-color: oklch(from currentColor 18% calc(c * 0.23) h / 0.5);
		background-image: linear-gradient(
			to bottom right,
			oklch(from currentColor 55% calc(c * 1) h / 0.6) 0%,
			oklch(from currentColor 20% calc(c * 0.23) h / 0.8) 35%,
			oklch(from currentColor 18% calc(c * 0.23) h / 0.5) 80%
		);
		border-radius: calc(var(--br) * 1.3);
		border: 1px solid oklch(from currentColor l c h / 0.1);
		text-decoration: none;
		transition:
			background-color 0.18s,
			translate 0.12s,
			scale 0.12s;

		&:hover {
			background-color: oklch(from currentColor 20% calc(c * 0.25) h / 1);
			scale: 0.975;
		}

		&:active {
			translate: 0 2px;
		}

		&--gpt {
			color: var(--c-purple);
		}

		&--ds {
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
		flex-wrap: wrap;
		gap: var(--sp-md);
	}
}
</style>
