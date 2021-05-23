<template>
	<div :class="{ 'preview-container': true, empty: !url }">
		<img :src="url" v-if="url" />
	</div>
</template>

<script>
export default {
	props: {
		url: String,
	},
};
</script>

<style scoped>
.preview-container {
	margin: 16px;
	flex: 0 0 auto;
}
.disc-l {
	width: 3rem;
	height: 3rem;
}
.disc-m {
	width: 1.5rem;
	height: 1.5rem;
}
.disc-react {
	width: 1rem;
	height: 1rem;
}
.twitch {
	width: 28px;
	height: 28px;
}
.empty {
	outline: dashed var(--gray5) 1px;
}
img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	/* desktop only */
	image-rendering: -webkit-optimize-contrast;
}
</style>
