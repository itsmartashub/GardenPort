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
	display: grid;
	place-items: center;
	justify-content: center;
	cursor: pointer;
	transition:
		scale var(--ease-bounce),
		rotate var(--ease-bounce);

	&:hover {
		scale: 1.2;
		rotate: 45deg;

		img {
			box-shadow:
				0 0 0 0 cmod(var(--c-orange), $a: 0.3),
				0 0 0 0 cmod(var(--c-orange), $a: 0.2);
		}
	}

	img {
		aspect-ratio: 1/1;
		width: var(--logo-sz);
		height: var(--logo-sz);
		border-radius: 50vw;
		transition: box-shadow var(--ease-bounce);

		box-shadow:
			0 0 0 3px cmod(var(--c-orange), $a: 0.3),
			0 0 0 10px cmod(var(--c-orange), $a: 0.2),
			0 0 0 16px cmod(var(--c-orange), $a: 0);
	}
}
</style>
