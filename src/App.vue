<template>
	<div class="container" @dragover.prevent="dragOver" @drop.prevent="drop">
		<div class="top">
			<h1>Emote preview</h1>
		</div>
		<div class="main previews">
			<div class="preview-group disc-dark">
				<Preview :url="url" class="disc-l" />
				<Preview :url="url" class="disc-m" />
				<Preview :url="url" class="disc-react" />
			</div>
			<div class="preview-group disc-light">
				<Preview :url="url" class="disc-l" />
				<Preview :url="url" class="disc-m" />
				<Preview :url="url" class="disc-react" />
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
}

.top {
	overflow: hidden;
	display: flex;
	align-items: center;
	padding: 8px 16px;

	h1 {
		margin: 0;
		font-size: 32px;
	}
}

.main {
	margin: auto;
	width: 320px;
}
.previews {
	display: flex;
	justify-content: center;
}
.preview-group {
	flex: 0 0 auto;
	margin: 64px;
	padding: 32px;
	border-radius: 8px;
	box-shadow: 0 4px 16px -4px var(--gray4);
	&.disc-dark {
		background: #36393f;
	}
	&.disc-light {
		background: #fff;
	}
	&.twitch-light {
		background: #fff;
	}
	&.twitch-theater {
		background: #18181b;
	}
}
</style>
