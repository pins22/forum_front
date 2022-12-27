<script lang="ts">
	import type { PageData } from '../$types';
	import SvelteMarkdown from 'svelte-markdown';
	// import snarkdown from 'snarkdown'
	export let data: PageData;
	const post = data.post;
</script>

<!-- <h1>
  {JSON.stringify(data)}
</h1> -->
<!-- <div
	id="post-content-md"
	rows="4"
	class="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	placeholder="Content of your post [Markdown]"
	oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
>{@html post.body}</div> -->

<!-- <p>{JSON.stringify(post)}</p> -->
<div
	class="flex flex-col mx-auto min-w-[300px] mt-5 block p-2.5 w-7/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center"
>
	<div class="flex flex-row w-full justify-start items-start text-left">
		<h3 class="text-3xl text-gray-500">{post.title}</h3>
	</div>
	<hr class="my-2 w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
	<SvelteMarkdown source={post.body} />
</div>

<style>
	h1 {
		@apply text-4xl;
	}
	h2 {
		@apply text-3xl;
	}
	h3 {
		@apply text-2xl;
	}
	h4 {
		@apply text-xl;
	}
</style>
