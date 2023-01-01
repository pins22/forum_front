<script lang="ts">
	import { marked } from 'marked';

	export let markdown: string;
</script>

<div class="markdown-body">{@html marked.parse(markdown)}</div>

<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		width: 100%;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
