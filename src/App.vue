<template>
	<div class="container" @dragover.prevent="dragOver" @drop.prevent="drop">
		<div class="top">
			<h1>Emote preview</h1>
			<p>Preview an image at standard Discord/Twitch dimensions.</p>
			<p>
				Drop an image file onto the page, or
				<button class="browse" aria-label="browse">Browse</button>
			</p>
		</div>
		<div class="main">
			<div class="preview-group disc">
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
			<div class="preview-group twitch">
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
		};
	},
	methods: {
		dragOver(e) {},
		drop(e) {
			let files = e.dataTransfer.items;
			let f = files[0]?.getAsFile();
			if (f && f.type.startsWith('image/')) {
				this.file = f;
				console.log(f);
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
	flex-direction: column;
	padding: 8px;
}

.top {
	overflow: hidden;
	padding: 0 16px;

	h1 {
		margin: 16px 0;
		font-size: 32px;
	}
	p {
		margin: 0;
		line-height: 32px;
	}
}
button.browse {
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

.main {
	margin: auto;
}
.previews {
	display: flex;
	justify-content: center;
}
.preview-group {
	display: flex;
	border-radius: 4px;
	overflow: hidden;
	box-shadow: 0 4px 16px -8px var(--gray6);
	margin-bottom: 32px;
}
.set-icon-wrapper {
	flex: 0 0 auto;
	padding: 16px 0 0 16px;
	svg {
		/* margin-right: 16px; */
		position: relative;
	}
	svg[data-icon='discord'] {
		color: rgba(255, 255, 255, 0.3);
	}
	svg[data-icon='twitch'] {
		color: rgba(0, 0, 0, 0.3);
	}
}

.preview-set {
	flex: 1 0 auto;
	padding: 32px;
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
