<script lang="ts">
	import { page } from '$app/stores';
	import RenderedPost from '$lib/RenderedPost.svelte';
	import { POST as createPost } from '$lib/api/posts';
	import TextEditor from '$lib/TextEditor.svelte';
	let title = '';
	let content = '';

	let createPostFields = {
		title: '',
		body: ''
	};

	function pasteHandler(e: ClipboardEvent) {
		e.preventDefault();
		if (e.clipboardData?.files.length) content += e.clipboardData?.getData('text/html');
		else content += e.clipboardData?.getData('text/plain');
	}
</script>

<div>
	<div class=" mt-10 flex w-3/4 mx-auto justify-center">
		<div class="flex flex-col w-full justify-end">
			<h3 class="text-3xl text-gray-300">Create a post</h3>
			<TextEditor
				bind:data={createPostFields}
				onSubmit={async () =>
					await createPost(
						{
							title: createPostFields.title,
							body: createPostFields.body
						},
						$page.data.session
					)}
				submitButtonText="Create post"
			/>
		</div>
	</div>
</div>
