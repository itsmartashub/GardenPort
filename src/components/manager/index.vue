<script setup>
import { ref, defineAsyncComponent } from 'vue'
import logoSrc from '@/assets/img/logo-cc-green.png'

// lazy-load the heavy panel component
const ManagerPanel = defineAsyncComponent(() => import('@/components/manager/Panel.vue'))

const isPanelOpen = ref(false)

const togglePanel = () => (isPanelOpen.value = !isPanelOpen.value)
</script>

<template>
	<button class="gp-fab gp-logo" @click="togglePanel" :class="{ 'gp-fab--rotated': isPanelOpen }">
		<img :src="logoSrc" width="50" height="50" alt="GardenPort-logo" class="gp-logo__img" />
	</button>

	<Transition name="fab-menu">
		<ManagerPanel v-if="isPanelOpen" />
	</Transition>
</template>

<style lang="scss" scoped>
.gp-fab {
	position: fixed;
	top: var(--fab-gap);
	right: var(--fab-gap);
	z-index: calc(var(--panel-z) + 1);
	cursor: pointer;
	transition:
		transform var(--ease-bounce),
		scale var(--ease-bounce);

	img {
		transition: box-shadow var(--ease-bounce);
		border-radius: 50vw;
		box-shadow:
			0 0 0 3px cmod(var(--c-orange), $a: 0.35),
			0 0 0 10px cmod(var(--c-orange), $a: 0.2),
			0 0 0 18px cmod(var(--c-orange), $a: 0);
	}

	&--rotated {
		transform: rotate(45deg);
	}

	&:active {
		opacity: 0.7;
	}

	&:hover {
		scale: 0.9;

		img {
			box-shadow:
				0 0 0 4px cmod(var(--c-orange), $a: 0.3),
				0 0 0 12px cmod(var(--c-orange), $a: 0.2),
				0 0 0 18px cmod(var(--c-orange), $a: 0.2);
		}
	}
}

.gp-logo {
	aspect-ratio: 1/1;
	width: 3em;
	height: 3em;
}
</style>
