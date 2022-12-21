<script lang="ts">
	import Searchbar from '$lib/searchbar.svelte';
	import PostCard from '$lib/post-card.svelte';
	import type { PageData } from './$types';
	import type { Result } from 'src/routes/api/posts/posts';
	import { page } from '$app/stores';
	import type { TokenSession } from '$lib/auth.types';
	export let data: PageData;
	const result = <Result>data.item;
	const session: TokenSession = data.session;
</script>

<div>
	<div class=" min-w-[460px] flex flex-row flex-wrap justify-center">
		<h1 class="">Casual Physics For Vehicles Forum</h1>
	</div>
	<div class=" min-w-[460px] flex flex-row flex-wrap justify-center">
		<Searchbar />
		<button
			on:click={() =>
				fetch('http://localhost:3000/api/v1/posts/', {
					method: 'POST',
					body: JSON.stringify({
						title: 'How to create new post? Posted from Svelte xoxo',
						body: 'This is a post aka a question which was successfully created from Svelte.'
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + session.accessToken
					}
				})}>New</button
		>
	</div>
	{#each result.results as post}
		<div class=" min-w-[460px] flex flex-row flex-wrap justify-center mt-[16px]">
			<PostCard {post} />
		</div>
	{/each}
</div>
