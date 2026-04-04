<script setup>
import IconImport from '~icons/tabler/database-import'
import IconExport from '~icons/tabler/database-export'
import IconCopy from '~icons/tabler/copy'
import IconFileExport from '~icons/tabler/file-export'
import IconLoader from '~icons/tabler/loader'
import IconFileImport from '~icons/tabler/file-import'
import IconClipboard from '~icons/tabler/clipboard'
import IconAdd from '~icons/tabler/playlist-add'
import IconReplace from '~icons/tabler/list'
import IconCancel from '~icons/tabler/x'
import IconCoffee from '~icons/tabler/coffee'
import AppBadge from '@/components/AppBadge.vue'

import { KOFI_URL } from '@/config/const'

import { ref, computed, nextTick } from 'vue'
import { useFavsManager, PANEL_STATE } from '@/composables/useFavsManager.js'

// COMPOSABLES
const {
	state,
	toggleExport,
	toggleImport,
	togglePaste,
	exportFile,
	exportCopy,
	handleFileInput,
	applyOverride,
	applyMerge,
	cancelImport,
	handlePasteInput,
	isExporting,
	isCopying,
} = useFavsManager()

// ELEMENTS
const textareaRef = ref(null)
const fileInputRef = ref(null)

// STATES
const isExport = computed(() => state.value === PANEL_STATE.EXPORT)
const isImport = computed(() => state.value === PANEL_STATE.IMPORT)
const isPaste = computed(() => state.value === PANEL_STATE.PASTE)
const isDecision = computed(() => state.value === PANEL_STATE.DECISION)

const triggerFileInput = () => {
	// console.log('triggerFileInput')
	fileInputRef.value?.click()
}
const onFileChange = (e) => {
	// console.log('onFileChange')
	const file = e.target.files[0]
	if (file) handleFileInput(file)

	e.target.value = ''
}

const onTogglePaste = async () => {
	// console.log('onTogglePaste')
	togglePaste()
	await nextTick()
	textareaRef.value?.focus()
}
const onInputPaste = (e) => {
	handlePasteInput(e.target.value)
}
</script>

<template>
	<div id="gp-panel" class="gp-panel" aria-label="Favorites manager">
		<h2 class="gp-title">STATIONS</h2>

		<div class="gp-panel__actions">
			<button class="gp-btn gp-btn--export" :class="{ active: isExport }" @click="toggleExport">
				<IconExport /> Export
			</button>
			<button
				class="gp-btn gp-btn--import"
				:class="{ active: isImport || isPaste || isDecision }"
				@click="toggleImport"
			>
				<IconImport /> Import
			</button>
		</div>

		<!-- EXPORT ACTIVE SUBMENU UI -->
		<Transition name="sub" mode="out-in">
			<section v-if="isExport" class="gp-submenu">
				<button class="gp-btn" @click="exportFile" :disabled="isExporting">
					<IconLoader v-if="isExporting" class="icon-spin" />
					<IconFileExport v-else />
					{{ isExporting ? 'Saving...' : 'Save as file' }}
				</button>

				<button class="gp-btn" @click="exportCopy" :disabled="isCopying">
					<IconLoader v-if="isCopying" class="icon-spin" />
					<IconCopy v-else />
					{{ isCopying ? 'Copying...' : 'Copy to clipboard' }}
				</button>
			</section>

			<!-- IMPORT ACTIVE SUBMENU UI -->
			<section v-else-if="isImport" key="import" class="gp-submenu">
				<button class="gp-btn" @click="triggerFileInput"><IconFileImport /> Upload file</button>
				<button class="gp-btn" :class="{ 'gp-btn--active': isPaste }" @click="onTogglePaste">
					<IconClipboard /> Paste from clipboard
				</button>
			</section>

			<!-- IMPORT ACTIVE - PASTE SUBMENU UI -->
			<section v-else-if="isPaste" key="paste" class="gp-submenu">
				<div class="gp-textarea-container">
					<textarea
						ref="textareaRef"
						class="gp-textarea"
						placeholder="Paste your stations here..."
						@input="onInputPaste"
					/>
				</div>
			</section>

			<!-- IMPORT ACTIVE - DECISION SUBMENU UI -->
			<section v-else-if="isDecision" class="gp-submenu gp-decision">
				<h3 class="gp-subtitle">How would you like to import?</h3>

				<button
					class="gp-btn gp-btn--succ"
					@click="applyMerge"
					title="Keep your existing stations and add new ones"
				>
					<IconAdd /> Add to my stations
				</button>
				<button
					class="gp-btn gp-btn--warn"
					@click="applyOverride"
					title="Remove all existing stations and use imported ones"
				>
					<IconReplace /> Replace all
				</button>
				<button class="gp-btn gp-btn--err" @click="cancelImport" title="Cancel import operation">
					<IconCancel /> Cancel
				</button>
			</section>
		</Transition>

		<!-- Hidden file input -->
		<input ref="fileInputRef" type="file" accept=".json" class="gp-panel__file-input" @change="onFileChange" />

		<hr />

		<a class="gp-panel__link gp-badge--linked" :href="KOFI_URL" target="_blank" rel="noopener">
			<AppBadge color="var(--c-err)" label="Support on Ko-fi" :icon="IconCoffee" />
		</a>
	</div>
</template>

<style lang="scss" scoped>
.gp-panel {
	position: fixed;
	top: var(--panel-gap);
	right: var(--panel-gap);
	display: grid;
	align-items: center;
	gap: var(--sp-sm);
	width: var(--panel-w);
	padding: var(--sp-lg);
	padding-top: 2em;
	z-index: var(--panel-z);
	background: var(--c-bg);
	color: var(--c-txt);
	border: 1px solid var(--c-border);
	border-radius: var(--br-panel);
	box-shadow: 0 2rem 6rem oklch(0% 0 0 / 0.45);
	backdrop-filter: var(--filter-glass);

	&__actions {
		display: grid;
		align-content: center;
		gap: var(--sp-sm);
	}

	&__file-input {
		display: none;
	}

	&__link {
		margin: 0 auto;
	}
}

.gp-submenu {
	display: grid;
	align-content: center;
	gap: var(--sp-sm);
	margin-top: var(--sp-2xl);
}

.gp-textarea-container {
	width: 100%;
	overflow: hidden;
	margin-top: var(--sp-sm);

	textarea {
		width: 100%;
		height: 5rem;
		padding: var(--sp-lg);
		font-size: var(--fsz-xxs);
		color: var(--c-txt);
		background-color: cmod(var(--c-accent), $a: 0.05);
		border: 1px solid cmod(var(--c-accent), $a: 0.1);
		border-radius: var(--br);

		outline: none;
		resize: none;

		&::placeholder {
			color: cmod(var(--c-accent), $a: 0.8);
			line-height: 1.6;
		}

		&:focus {
			border-color: cmod(var(--c-accent), $a: 0.1);
			background-color: cmod(var(--c-accent), $a: 0.12);
		}
	}
}
</style>
