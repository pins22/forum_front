<script lang="ts">
	import type { PageData } from '../$types';
	import RenderedPost from '$lib/RenderedPost.svelte';
	import TriangleButton from '$lib/TriangleButton.svelte';
	import { invalidate } from '$app/navigation';
	import { vote } from '$lib/api/posts';
	import { page } from '$app/stores';
	import type { Post } from '$lib/api/posts.types';
	import type { Result as ReplyResult } from '$lib/api/replies.types';
	import TextEditor from '$lib/TextEditor.svelte';
	import { createReply, vote as replyVote } from '$lib/api/replies';
	export let data: { post: Post; replies: ReplyResult };

	function toggleTextEditor() {
		const dropdown = document.getElementById('text-editor-dropdown');
		if (dropdown?.classList.contains('hide')) dropdown.classList.remove('hide');
		else dropdown?.classList.add('hide');
	}

	let createReplyFields: { title: string; body: string } = { title: '', body: '' };
</script>

<div
	class="flex flex-col mx-auto min-w-[300px] mt-5 block p-2.5 w-7/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center"
>
	<div class="flex flex-row w-full justify-start items-start text-left">
		<div class="flex flex-col items-center">
			<TriangleButton
				onClick={async (e) => {
					await vote(data.post.id, 'type=up', $page.data.session);
					invalidate(`api:posts/id`);
				}}
				type="up"
				isPressed={data.post.has_user_upvoted}
			/>
			<strong>{data.post.points}</strong>
			<TriangleButton
				onClick={async (e) => {
					await vote(data.post.id, 'type=down', $page.data.session);
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
<div
	class="flex flex-col mx-auto min-w-[300px] mt-5 block p-2.5 w-7/12 text-sm text-gray-900 items-left"
>
	<div class="flex flex-row justify-between items-end">
		<h1 class="text-xl mb-2">{data.replies.count} Replies</h1>
		<button
			type="button"
			on:click={() => toggleTextEditor()}
			class="mb-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
			>Add an answer</button
		>
	</div>
	<hr />
	<div id="text-editor-dropdown" class="hide">
		<TextEditor
			bind:data={createReplyFields}
			onSubmit={async () => {
				await createReply(
					data.post.id,
					createReplyFields.title,
					createReplyFields.body,
					$page.data.session
				);
				createReplyFields.title = '';
				createReplyFields.body = '';
				toggleTextEditor();
				invalidate(`api:posts/id`);
			}}
			submitButtonText="Post answer"
		/>
	</div>
</div>
{#each data.replies.results as reply}
	<div
		class="flex flex-col mx-auto min-w-[300px] mt-5 block p-2.5 w-7/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center"
	>
		<div class="flex flex-row w-full justify-start items-start text-left">
			<div class="flex flex-col items-center">
				<TriangleButton
					onClick={async (e) => {
						await replyVote(reply.id, 'type=up', $page.data.session);
						invalidate(`api:posts/id`);
					}}
					type="up"
					isPressed={reply.has_user_upvoted}
				/>
				<strong>{reply.points}</strong>
				<TriangleButton
					onClick={async (e) => {
						await replyVote(reply.id, 'type=down', $page.data.session);
						invalidate(`api:posts/id`);
					}}
					type="down"
					isPressed={reply.has_user_downvoted}
				/>
			</div>
			<h3 class="text-3xl text-gray-500">{reply.title}</h3>
		</div>
		<hr class="my-2 w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
		<RenderedPost markdown={reply.body} />
	</div>
{/each}

<style>
	#text-editor-dropdown {
		height: auto;
		opacity: 1;
		transition: opacity 0.2s ease-out;
	}
	#text-editor-dropdown.hide {
		height: 0;
		opacity: 0;
	}
</style>
