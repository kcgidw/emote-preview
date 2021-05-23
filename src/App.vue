<template>
	<div class="container" @dragover.prevent="dragOver" @drop.prevent="drop">
		<div class="top">
			<h1>Emote preview</h1>
		</div>
		<Preview :url="url" v-if="file" />
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
</style>
