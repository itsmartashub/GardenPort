<script setup>
import { ref, computed } from 'vue'
import { useFavsManager, PANEL_STATE } from '@/composables/useFavsManager.js'

// Composables
const { state, toggleExport, toggleImport, togglePaste, exportFile, exportCopy } = useFavsManager()

// Elements
const textareaRef = ref(null)
const fileInputRef = ref(null)

// States
const isExport = computed(() => state.value === PANEL_STATE.EXPORT)
const isImport = computed(() => state.value === PANEL_STATE.IMPORT)
const isPaste = computed(() => state.value === PANEL_STATE.PASTE)
const isDecision = computed(() => state.value === PANEL_STATE.DECISION)

const triggerFileInput = (e) => {
	console.log('triggerFileInput', e)
	fileInputRef.value?.click()
}
const onFileChange = (e) => {
	console.log('onFileChange', e)
}

const onTogglePaste = (e) => {
	console.log('onTogglePaste', e)
}

const applyMerge = () => {
	console.log('applyMerge', e)
}
const applyOverride = (e) => {
	console.log('applyOverride', e)
}
const cancelImport = (e) => {
	console.log('cancelImport', e)
}
</script>

<template>
	<div id="gp-panel" class="gp-panel" aria-label="Favorites manager">
		<h2 class="gp-title">STATIONS</h2>

		<div class="gp-panel__actions">
			<button class="gp-btn gp-btn--export" :class="{ active: isExport }" @click="toggleExport">
				<span class="rg-btn__icon">⬆</span> Export
			</button>
			<button class="gp-btn gp-btn--import" :class="{ active: isImport }" @click="toggleImport">
				<span class="gp-btn__icon">⬇</span> Import
			</button>
		</div>

		<!-- EXPORT ACTIVE SUBMENU UI -->
		<Transition name="sub">
			<div v-if="isExport" class="gp-submenu">
				<h3 class="gp-subtitle">export methods</h3>

				<button class="gp-btn" @click="exportFile">Save as .json</button>
				<button class="gp-btn" @click="exportCopy">Copy to Clipboard</button>
			</div>
		</Transition>

		<!-- IMPORT ACTIVE SUBMENU UI -->
		<Transition name="sub">
			<div v-if="isImport || isPaste" class="gp-submenu">
				<h3 class="gp-subtitle">import methods</h3>

				<button class="gp-btn" @click="triggerFileInput">Select JSON File</button>
				<button class="gp-btn" :class="{ 'gp-btn--active': isPaste }" @click="onTogglePaste">
					Paste Raw String
				</button>

				<Transition name="sub">
					<div class="gp-textarea-container">
						<textarea
							v-if="isPaste"
							ref="textareaRef"
							class="gp-textarea"
							placeholder="Paste JSON array here..."
							@input="(e) => handlePasteInput(e.target.value)"
						/>
					</div>
				</Transition>
			</div>
		</Transition>

		<!-- IMPORT/EXPORT DECISION ACTIVE BLOCK UI -->
		<Transition name="sub">
			<div v-if="isDecision" class="gp-submenu gp-decision">
				<h3 class="gp-subtitle">import ready</h3>

				<button class="gp-btn gp-btn--succ" @click="applyMerge">Merge (keep old)</button>
				<button class="gp-btn gp-btn--warn" @click="applyOverride">Override all</button>
				<button class="gp-btn gp-btn--err" @click="cancelImport">Discard</button>
			</div>
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
	// flex-direction: column;
	align-content: center;
	gap: var(--sp-sm);
	width: var(--panel-w);
	padding: var(--sp-lg);
	z-index: var(--panel-z);
	background: var(--c-bg);
	color: var(--c-txt);
	border: 1px solid var(--c-border);
	border-radius: var(--br);
	box-shadow: 0 2rem 6rem oklch(0% 0 0 / 0.45);
	backdrop-filter: var(--filter-glass);

	&__actions {
		display: grid;
		gap: var(--sp-sm);
		margin-bottom: var(--sp-2xl);
	}

	&__file-input {
		display: none;
	}
}

.gp-title,
.gp-subtitle {
	text-align: center;
	font-weight: bold;
}
.gp-title {
	font-size: var(--fsz-md);
	letter-spacing: 0.12em;
	text-align: center;
	color: cmod(var(--c-txt), 0.65);
	margin-bottom: var(--sp-lg);
}
.gp-subtitle {
	margin-bottom: var(--sp-lg);
	font-size: var(--fsz-base);
}

.gp-submenu {
	display: flex;
	flex-direction: column;
	gap: var(--sp-sm);
}

.gp-textarea-container {
	width: 100%;
	overflow: hidden;
}
.gp-textarea {
	width: 100%;
	height: 5rem;
	padding: var(--sp-sm);
	font-size: var(--fsz-xxs);
	color: var(--c-txt);
	background-color: cmod(var(--c-import), $a: 0.05);
	border: 1px solid cmod(var(--c-import), $a: 0.1);
	border-radius: var(--br-sub);

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
</style>
