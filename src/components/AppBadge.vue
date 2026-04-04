<script setup>
import { computed } from 'vue'

const props = defineProps({
	color: { type: String, default: 'var(--c-accent)' },
	variant: { type: String, default: 'soft' }, // 'soft' (default) or 'filled'
	size: { type: String, default: 'md' }, // sm, md, lg
	label: { type: String, default: '' },
	icon: { type: [Object, Function], default: null },
	dot: { type: Boolean, default: false }, // New prop
})

const hasIcon = computed(() => !!props.icon)
const hasLabel = computed(() => !!props.label)
</script>

<template>
	<span
		class="gp-badge"
		:class="[`is-${size}`, `is-${variant}`, { 'is-icon-only': hasIcon && !hasLabel }]"
		:style="{ '--c-badge': color }"
	>
		<span v-if="dot" class="gp-badge__dot" aria-hidden="true"></span>

		<component v-if="hasIcon" :is="icon" class="gp-badge__icon" />

		<span v-if="hasLabel" class="gp-badge__label">
			{{ label }}
		</span>
	</span>
</template>

<style lang="scss">
.gp-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	gap: 0.4em;
	padding: 0.45em 0.85em;
	border-radius: 50vw;

	line-height: 1;
	font-weight: 700;
	letter-spacing: 0.01em;
	white-space: nowrap;

	/* Colors */
	color: var(--c-badge);
	background-color: cmod(var(--c-badge), $a: 0.11);
	border: 0.08em solid cmod(var(--c-badge), $a: 0.15);
	transition:
		background-color var(--ease-smooth),
		color var(--ease-smooth),
		border-color var(--ease-smooth);

	&__icon {
		width: var(--icon-sz);
		height: var(--icon-sz);
		flex-shrink: 0;
	}

	&__dot {
		$dot-size: 0.525em;
		width: $dot-size;
		height: $dot-size;
		border-radius: 50vw;
		background-color: currentColor;
		box-shadow: 0 0 6px cmod(currentColor, $a: 0.7);
		animation: pulse 2.4s ease-in-out infinite;
	}

	&--linked {
		transition: translate var(--ease-smooth);

		&:hover {
			translate: 0 3px;
		}
	}
}

.is-soft {
	color: var(--c-badge);
	background-color: cmod(var(--c-badge), $a: 0.11);
	border: 1px solid cmod(var(--c-badge), $a: 0.15);

	&:hover {
		background-color: cmod(var(--c-badge), $a: 0.18);
	}
}

.is-filled {
	color: cmod(var(--c-badge), $l: '25%');
	background-color: var(--c-badge);
	border: 1px solid var(--c-badge);

	&:hover {
		color: var(--c-badge);
		@extend .is-soft;
	}
}

.is-sm {
	font-size: 0.6rem;
}
.is-md {
	font-size: 0.72rem;
}
.is-lg {
	font-size: 0.9rem;
}

.is-icon-only {
	padding: 0.4em;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.35;
	}
}
</style>
