<template>
	<div class="gp-logo">
		<img :src="logoSrc" />
	</div>
</template>

<script setup>
import logoSrc from '@/assets/img/logo-cc-green.png'
</script>

<style lang="scss" scoped>
.gp-logo {
	cursor: pointer;
	transition:
		scale var(--ease-base),
		rotate var(--ease-base);

	&:hover {
		// scale: 0.9;
		scale: 1.2;
		rotate: 45deg;

		img {
			box-shadow:
				0 0 0 0 oklch(from var(--c-orange) l c h / 0.3),
				0 0 0 0 oklch(from var(--c-orange) l c h / 0.2);
		}
	}

	img {
		aspect-ratio: 1/1;
		width: var(--logo-sz);
		height: var(--logo-sz);
		border-radius: 50vw;
		transition: box-shadow var(--ease-base);

		box-shadow:
			0 0 0 3px oklch(from var(--c-orange) l c h / 0.3),
			0 0 0 10px oklch(from var(--c-orange) l c h / 0.2),
			0 0 0 16px oklch(from var(--c-orange) l c h / 0);
	}
}
</style>
