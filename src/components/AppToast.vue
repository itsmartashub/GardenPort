<template>
	<Teleport to="body">
		<div class="toast-container" aria-live="polite" aria-atomic="false">
			<TransitionGroup name="toast" tag="ul" class="toast-list">
				<li
					v-for="t in toasts"
					:key="t.id"
					:class="['toast', `toast--${t.type}`]"
					role="alert"
					@click="toast.remove(t.id)"
				>
					<span class="toast__icon gp-btn__icon" aria-hidden="true">{{ icons[t.type] }}</span>
					<span class="toast__message">{{ t.message }}</span>
					<button class="toast__close gp-btn__icon" @click.stop="toast.remove(t.id)" aria-label="Dismiss">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<path
								d="M2 2l8 8M10 2l-8 8"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
							/>
						</svg>
					</button>
				</li>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, toast } = useToast()

const icons = {
	info: 'ℹ',
	success: '✓',
	warning: '⚠',
	error: '✕',
}
</script>

<style lang="scss" scoped>
.toast-container {
	position: fixed;
	top: 2.5rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: calc(var(--panel-z) + 1);
	pointer-events: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sp-md);
}

.toast-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sp-md);
	list-style: none;
	margin: 0;
	padding: 0;
}

.toast {
	display: flex;
	align-items: center;
	gap: var(--sp-sm);
	padding: var(--sp-md);
	border-radius: var(--br-toast);
	backdrop-filter: var(--filter-glass);
	pointer-events: all;
	cursor: pointer;
	font-size: var(--fsz-base);
	font-weight: 600;
	white-space: nowrap;
	transition:
		opacity var(--ease-base),
		transform var(--ease-base);

	color: var(--c-txt);
	background-color: cmod(currentColor, $l: '25%', $a: 0.45);

	&--success {
		color: var(--c-succ);
	}

	&--warning {
		color: var(--c-warn);
	}

	&--error {
		color: var(--c-err);
	}

	&--info {
		color: var(--c-txt);
		background-color: var(--c-bg);
	}

	&__message {
		flex: 1;
	}

	&__close {
		opacity: 0.45;

		&:hover {
			opacity: 1;
		}
	}
}

.toast-enter-active {
	transition: all 0.25s ease;
}
.toast-leave-active {
	transition: all 0.2s ease;
}

.toast-enter-from {
	opacity: 0;
	transform: translateY(-1rem);
}

.toast-leave-to {
	opacity: 0;
	transform: translateY(-1rem);
}
</style>
