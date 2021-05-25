<template>
	<div
		class="container"
		@dragover.prevent="dragOver"
		@dragend="dragEnd"
		@dragleave="dragLeave"
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
					I got tired of constantly revising and reuploading custom
					emoji WIPs to a private server to see how they look.
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
			<div class="side-section">
				<p class="">
					Previews aim to match the appearance of respective web
					browser clients. Image quality can differ slightly on
					desktop and mobile clients, but the browser clients seem to
					be the lowest common denominator anyhow.
				</p>
			</div>
			<div class="spacer" />
			<div class="links side-section small">
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
			<div class="notif">
				<div class="error" v-if="err">Error loading file.</div>
				<div class="" v-if="!err">{{ file?.name || '' }}</div>
			</div>
			<div class="previews">
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
						<Preview :url="url" class="twitch-1" />
						<Preview :url="url" class="twitch-badge" />
					</div>
					<div class="preview-set twitch-theater">
						<Preview :url="url" class="twitch-1" />
						<Preview :url="url" class="twitch-badge" />
					</div>
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
			const f = document.getElementById('browse').files[0];
			if (f) {
				this.load(f);
			}
		},
		clickBrowse(e) {
			document.getElementById('browse').click();
		},
		dragOver(e) {
			this.dragging = e.dataTransfer?.types.includes('Files');
		},
		dragEnd(e) {
			this.dragging = false;
		},
		dragLeave(e) {
			this.dragging = !!e.relatedTarget;
		},
		drop(e) {
			this.dragging = false;
			if (e.dataTransfer.files.length) {
				const files = e.dataTransfer.files;
				const f = files[0];
				this.load(f);
			}
		},
		load(f) {
			if (f && f.type.startsWith('image/')) {
				this.file = f;
				this.err = false;
			} else {
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
	background: rgba(255, 255, 255, 0.9);
	padding: 64px;

	&-inner {
		height: 100%;
		border-radius: 64px;
		border: dashed 12px var(--gray5);
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
	flex-grow: 1;
	display: flex;
}
.previews {
	margin: auto;
	padding: 32px;
	display: inline-block;
}
.notif {
	position: absolute;
	max-width: 500px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-style: italic;
	padding: 8px;
}
.error {
	color: red;
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
	height: 208px;
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
