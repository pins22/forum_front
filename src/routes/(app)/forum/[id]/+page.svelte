<script lang="ts">
	import type { PageData } from '../$types';
	import RenderedPost from '$lib/RenderedPost.svelte';
	import TriangleButton from '$lib/TriangleButton.svelte';
	import type { Post } from 'src/routes/api/v1/posts/posts';
	import { invalidate } from '$app/navigation';
	// import snarkdown from 'snarkdown'
	export let data: PageData;
</script>

<div
	class="flex flex-col mx-auto min-w-[300px] mt-5 block p-2.5 w-7/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center"
>
	<div class="flex flex-row w-full justify-start items-start text-left">
		<div class="flex flex-col items-center">
			<TriangleButton
				onClick={async (e) => {
					await fetch(`/api/v1/posts/${data.post.id}/vote?type=up`, { method: 'PATCH' });
					invalidate(`api:posts/id`);
				}}
				type="up"
				isPressed={data.post.has_user_upvoted}
			/>
			<strong>{data.post.points}</strong>
			<TriangleButton
				onClick={async (e) => {
					await fetch(`/api/v1/posts/${data.post.id}/vote?type=down`, { method: 'PATCH' });
					invalidate(`api:posts/id`);
				}}
				type="down"
				isPressed={data.post.has_user_downvoted}
			/>
		</div>
		<h3 class="text-3xl text-gray-500">{data.post.title}</h3>
	</div>
	<hr class="my-2 w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
	<RenderedPost markdown={data.post.body} />
</div>
