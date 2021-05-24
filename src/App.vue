<template>
	<div
		class="container"
		@dragover.prevent="dragOver"
		@dragend="dragEnd"
		@dragleave="dragEnd"
		@drop.prevent="drop"
	>
		<div class="drag-overlay" v-show="dragging">
			<div class="drag-overlay-inner">
				<font-awesome-icon :icon="['fas', 'paperclip']" size="6x" />
				<div>Drop image file</div>
			</div>
		</div>
		<div class="side">
			<div class="title side-section">
				<h1>Emote preview</h1>
				<h2>Preview an image at standard Discord/Twitch dimensions.</h2>
			</div>
			<div class="side-section">
				<p>
					I got tired of revising and reuploading WIP custom emojis to
					a private server.
				</p>
				<p>
					Drop an image file onto the page, or
					<button
						id="browse-fake"
						aria-label="browse"
						@click="clickBrowse"
					>
						Browse
					</button>
					<input
						type="file"
						id="browse"
						accept="image/*"
						@change="browse"
					/>
				</p>
			</div>
			<!-- <p class="filename">{{ file?.name || '' }}</p> -->
			<div class="side-section">
				<p class="">
					Previews aim to match the appearance of respective web
					browser clients. Image quality can differ slightly on
					desktop and mobile clients, but the browser clients seem to
					be the lowest common denominator anyhow.
				</p>
			</div>
			<div class="spacer" />
			<div class="links side-section">
				<a
					target="_blank"
					href="https://github.com/kcgidw/emote-preview"
					>Github</a
				>
				-
				<a target="_blank" href="https://ko-fi.com/krackocloud">Kofi</a>
			</div>
		</div>
		<div class="main">
			<div class="row preview-group disc">
				<div class="set-icon-wrapper disc-dark">
					<font-awesome-icon
						:icon="['fab', 'discord']"
						size="2x"
						fixed-width
					/>
				</div>
				<div class="preview-set disc-dark">
					<Preview :url="url" class="disc-l" />
					<Preview :url="url" class="disc-m" />
					<Preview :url="url" class="disc-react" />
				</div>
				<div class="preview-set disc-light">
					<Preview :url="url" class="disc-l" />
					<Preview :url="url" class="disc-m" />
					<Preview :url="url" class="disc-react" />
				</div>
			</div>
			<div class="row preview-group twitch">
				<div class="set-icon-wrapper twitch-light">
					<font-awesome-icon
						:icon="['fab', 'twitch']"
						size="2x"
						fixed-width
					/>
				</div>
				<div class="preview-set twitch-light">
					<Preview :url="url" class="twitch" />
				</div>
				<div class="preview-set twitch-theater">
					<Preview :url="url" class="twitch" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Preview from './components/Preview.vue';
export default {
	components: { Preview },
	props: {},
	data() {
		return {
			file: undefined,
			url: undefined,
			dragging: false,
			err: false,
		};
	},
	methods: {
		browse(e) {
			this.file = document.getElementById('browse').files[0];
		},
		clickBrowse(e) {
			document.getElementById('browse').click();
		},
		dragOver(e) {
			this.dragging = e.dataTransfer;
		},
		dragEnd(e) {
			this.dragging = false;
		},
		drop(e) {
			this.dragging = false;
			try {
				const files = e.dataTransfer.items;
				const f = files[0]?.getAsFile();
				if (f && f.type.startsWith('image/')) {
					this.file = f;
					this.err = false;
				} else {
					this.err = true;
				}
			} catch (err) {
				this.err = true;
			}
		},
	},
	watch: {
		file(val, prev) {
			this.url = URL.createObjectURL(val);
		},
	},
};
</script>

<style lang="scss">
.container {
	height: 100%;
	display: flex;
}
.side {
	overflow: hidden;
	border-right: solid 2px var(--gray7);
	flex: 0 1 400px;
	display: flex;
	flex-direction: column;

	.spacer {
		flex-grow: 1;
	}
	.title {
		border-bottom: solid 2px var(--gray7);
	}
	.side-section {
		padding: 16px;
	}

	h1 {
		margin: 16px 0 16px;
		font-size: 32px;
	}
	h2 {
		margin: 16px 0;
		font-size: 20px;
		font-weight: normal;
	}
	p {
		margin: 8px 0;
	}
}
#browse {
	display: none;
}
button#browse-fake {
	padding: 4px 16px;
	background: var(--gray7);
	border: solid 1px var(--gray5);
	border-radius: 4px;
	box-shadow: 0 4px 6px -2px var(--gray6);
	cursor: pointer;
	color: var(--gray2);
	&:hover {
		background: var(--gray6);
	}
}

.drag-overlay {
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.95);
	padding: 64px;

	&-inner {
		height: 100%;
		border-radius: 64px;
		outline: dashed var(--gray4) 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 32px;
		font-weight: bold;

		svg {
			margin: 32px;
			color: var(--gray5);
		}
	}
}

.main {
	margin: auto;
	padding: 32px;
}
.filename {
	max-width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-style: italic;
}
.preview-group {
	display: flex;
	border-radius: 4px;
	overflow: hidden;
	box-shadow: 0 4px 16px -8px var(--gray6);
	margin-bottom: 48px;
}
.set-icon-wrapper {
	position: absolute;
	margin: 16px 0 0 16px;
	svg {
		position: relative;
	}
	svg[data-icon='discord'] {
		color: rgba(255, 255, 255, 0.3);
	}
	svg[data-icon='twitch'] {
		color: rgba(0, 0, 0, 0.2);
	}
}
.preview-set {
	flex: 1 0 auto;
	padding: 64px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.disc-dark {
	background: #36393f;
}
.disc-light {
	background: #fff;
}
.twitch-light {
	background: #fff;
}
.twitch-theater {
	background: #18181b;
}
</style>
