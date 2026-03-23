<script setup></script>

<template>
	<div id="rgx-panel">
		<h2 class="rgx-header">STATIONS</h2>
	</div>
</template>

<style lang="scss" scoped>
#rgx-panel {
	position: fixed;
	top: 2rem;
	right: 2rem;
	background: oklch(62.793% 0.25768 29.223 / 0.547);
	backdrop-filter: blur(28px) saturate(200%);
	padding: 2rem;
	border-radius: 1rem;
	border: 1px solid red;
	box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
	z-index: 999999;
	font-family: 'Inter', system-ui, sans-serif;
	width: 10rem;
	color: #fff;
	display: flex;
	flex-direction: column;
}
</style>
