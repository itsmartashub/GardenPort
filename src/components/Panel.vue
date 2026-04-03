<script setup>
import logoSrc from '@/assets/img/logo-cc-green.png'

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

import { ref, computed, nextTick } from 'vue'
import { useFavsManager, PANEL_STATE } from '@/composables/useFavsManager.js'

// Composables
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

// Elements
const textareaRef = ref(null)
const fileInputRef = ref(null)

// States
const isExport = computed(() => state.value === PANEL_STATE.EXPORT)
const isImport = computed(() => state.value === PANEL_STATE.IMPORT)
const isPaste = computed(() => state.value === PANEL_STATE.PASTE)
const isDecision = computed(() => state.value === PANEL_STATE.DECISION)

const isPanelOpen = ref(false)

const togglePanel = () => (isPanelOpen.value = !isPanelOpen.value)

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
	<button class="gp-fab gp-logo" @click="togglePanel" :class="{ 'gp-fab--rotated': isPanelOpen }">
		<img :src="logoSrc" width="50" height="50" alt="GardenPort-logo" class="gp-logo__img" />
	</button>

	<Transition name="fab-menu">
		<div v-if="isPanelOpen" id="gp-panel" class="gp-panel" aria-label="Favorites manager">
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
		</div>
	</Transition>
</template>

<style lang="scss">
.gp-panel {
	position: fixed;
	top: var(--panel-gap);
	right: var(--panel-gap);
	display: grid;
	align-content: center;
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
		background-color: cmod(var(--c-import), $a: 0.05);
		border: 1px solid cmod(var(--c-import), $a: 0.1);
		border-radius: var(--br);

		outline: none;
		resize: none;

		&::placeholder {
			color: cmod(var(--c-import), $a: 0.8);
			line-height: 1.6;
		}

		&:focus {
			border-color: cmod(var(--c-import), $a: 0.1);
			background-color: cmod(var(--c-import), $a: 0.12);
		}
	}
}

.gp-fab {
	position: fixed;
	top: var(--fab-gap);
	right: var(--fab-gap);
	z-index: calc(var(--panel-z) + 1);
	cursor: pointer;
	transition:
		transform var(--ease-base),
		scale var(--ease-base);

	img {
		transition: box-shadow var(--ease-base);
		border-radius: 50vw;
		box-shadow:
			0 0 0 3px cmod(var(--c-export), $a: 0.35),
			0 0 0 10px cmod(var(--c-export), $a: 0.2),
			0 0 0 18px cmod(var(--c-export), $a: 0);
	}

	&--rotated {
		transform: rotate(45deg);
	}

	&:active {
		opacity: 0.7;
	}

	&:hover {
		scale: 0.92;

		img {
			box-shadow:
				0 0 0 4px cmod(var(--c-export), $a: 0.3),
				0 0 0 12px cmod(var(--c-export), $a: 0.2),
				0 0 0 18px cmod(var(--c-export), $a: 0.2);
		}
	}
}

.gp-logo {
	aspect-ratio: 1/1;
	width: 3em;
	height: 3em;
}
</style>
