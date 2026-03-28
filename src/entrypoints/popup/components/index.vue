<template>
	<div class="popup">
		<header>
			<div class="gp-logo">
				<h1>Garden<strong>Port</strong></h1>
			</div>
			<p>Backup, restore, and migrate your favorite <strong>Radio Garden</strong> stations</p>
		</header>

		<footer>
			<a href="https://github.com/itsmartashub" target="_blank" rel="noopener noreferrer">
				by <strong>@itsmartashub</strong>
			</a>
		</footer>

		<a
			class="donate"
			href="https://ko-fi.com/http417"
			target="_blank"
			rel="noopener noreferrer"
			title="Support with a cup of matcha"
		>
			<div class="donate__icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-coffee"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1"
					></path>
					<path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
					<path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
					<path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z"></path>
					<path d="M16.746 16.726a3 3 0 1 0 .252 -5.555"></path>
				</svg>
			</div>
		</a>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.popup {
	width: 100%;
	height: 100%;
	display: grid;
	justify-content: center;

	header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	h1 {
		font-weight: 300;
		line-height: 1.2;
	}

	strong {
		font-weight: 700;
	}

	footer {
		margin-top: 2rem;
		a {
			display: block;
			width: max-content;
			padding: 0.4em 1.2em;
			margin: 0 auto;
			font-size: 0.75em;
			text-align: center;
			background-color: oklch(from currentColor l c h / 0.1);
			border: 1px solid oklch(from currentColor l c h / 0.12);
			border-radius: 50vw;
			transition:
				background-color var(--ease-base),
				scale var(--ease-base);

			&:hover {
				background-color: oklch(from currentColor l c h / 0.2);
				scale: 0.98;
			}
		}
	}

	.donate {
		position: fixed;
		bottom: 0%;
		right: 0%;
		// border-radius: 50vw;
		aspect-ratio: 1/1;
		line-height: 1;
		font-size: 1.25em;
		font-weight: bold;
		padding: 0.6em 0.2em 0.2em 0.6em;
		background-color: oklch(from currentColor l c h / 0.12);
		border: 1px solid oklch(from currentColor l c h / 0.15);
		border-top-left-radius: 70%;

		&__icon {
			transition:
				transform var(--ease-base),
				scale var(--ease-base);
		}

		&:hover {
			.donate__icon {
				display: block;
				transform: rotate3d(0, 1, 0, 45deg);
				scale: 1.2;
				// transform: rotateY(180deg);
			}
		}
		// border-bottom-left-radius: 2rem;
	}
}
</style>
