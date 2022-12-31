<script lang="ts">
	import Searchbar from '$lib/searchbar.svelte';
	import PostCard from '$lib/post-card.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	<div class=" min-w-[460px] flex flex-row flex-wrap justify-center">
		<h1 class="">Casual Physics For Vehicles Forum</h1>
	</div>
	<div class="flex w-1/2 mx-auto">
		<Searchbar _class="w-full my-12" />
	</div>
	<div class="flex w-1/2 mx-auto justify-end">
		<a href="/forum/new">
			<button
				type="button"
				class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				>Ask a question</button
			></a
		>
	</div>
	{#if data.results}
		{#each data.results as post}
			<div class=" min-w-[460px] flex flex-row flex-wrap justify-center mt-[16px] text-zinc-200">
				<PostCard {post} />
			</div>
		{/each}
	{/if}
</div>
