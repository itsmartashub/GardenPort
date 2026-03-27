<script setup>
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

const triggerFileInput = () => {
	console.log('triggerFileInput')
	fileInputRef.value?.click()
}
const onFileChange = (e) => {
	console.log('onFileChange')
	const file = e.target.files[0]
	if (file) handleFileInput(file)

	e.target.value = ''
}

const onTogglePaste = async () => {
	console.log('onTogglePaste')
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
				<span class="gp-btn__icon">⬆</span> Export
			</button>
			<button
				class="gp-btn gp-btn--import"
				:class="{ active: isImport || isPaste || isDecision }"
				@click="toggleImport"
			>
				<span class="gp-btn__icon">⬇</span> Import
			</button>
		</div>

		<!-- EXPORT ACTIVE SUBMENU UI -->
		<Transition name="sub" mode="out-in">
			<section v-if="isExport" class="gp-submenu">
				<button class="gp-btn" @click="exportFile" :disabled="isExporting">
					{{ isExporting ? 'Saving...' : '📂 Save as file' }}
				</button>
				<button class="gp-btn" @click="exportCopy" :disabled="isCopying">
					{{ isCopying ? 'Copying...' : '📋 Copy to clipboard' }}
				</button>
			</section>

			<!-- IMPORT ACTIVE SUBMENU UI -->
			<section v-else-if="isImport" key="import" class="gp-submenu">
				<button class="gp-btn" @click="triggerFileInput">📁 Upload file</button>
				<button class="gp-btn" :class="{ 'gp-btn--active': isPaste }" @click="onTogglePaste">
					📋 Paste from clipboard
				</button>
			</section>

			<!-- IMPORT ACTIVE - PASTE SUBMENU UI -->
			<section v-else-if="isPaste" key="paste" class="gp-submenu">
				<div class="gp-textarea-container">
					<textarea
						ref="textareaRef"
						class="gp-textarea"
						placeholder='Paste JSON array like: ["id1","id2"]'
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
					<!-- <span class="gp-btn__icon" aria-hidden="true">➕</span> Add to my stations -->
					➕ Add to my stations
				</button>
				<button
					class="gp-btn gp-btn--warn"
					@click="applyOverride"
					title="Remove all existing stations and use imported ones"
				>
					<!-- <span class="gp-btn__icon" aria-hidden="true">🔄</span> -->
					🔄 Replace all
				</button>
				<button class="gp-btn gp-btn--err" @click="cancelImport" title="Cancel import operation">
					<!-- <span class="gp-btn__icon" aria-hidden="true">✖</span> Cancel -->
					✖ Cancel
				</button>
			</section>
		</Transition>

		<!-- Hidden file input -->
		<input ref="fileInputRef" type="file" accept=".json" class="gp-panel__file-input" @change="onFileChange" />
	</div>
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
		padding: var(--sp-sm);
		font-size: var(--fsz-xxs);
		color: var(--c-txt);
		background-color: cmod(var(--c-import), $a: 0.05);
		border: 1px solid cmod(var(--c-import), $a: 0.1);
		border-radius: var(--br);

		outline: none;
		resize: none;

		&::placeholder {
			color: cmod(var(--c-import), $a: 0.8);
		}

		&:focus {
			border-color: cmod(var(--c-import), $a: 0.1);
			background-color: cmod(var(--c-import), $a: 0.12);
		}
	}
}
</style>
