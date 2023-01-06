<script lang="ts">
	import { page } from '$app/stores';
	import RenderedPost from '$lib/RenderedPost.svelte';
	import { POST as createPost } from '$lib/api/posts';
	import TextEditor from '$lib/TextEditor.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	let createPostFields = {
		title: '',
		body: ''
	};
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
					).then((res) => {
						if (res?.status === 201) {
							toast.push('Post created', {
								theme: {
									'--toastColor': 'mintcream',
									'--toastBackground': 'rgba(72,187,120,0.9)',
									'--toastBarBackground': '#2F855A'
								},
								duration: 2000
							});
							goto('/forum');
						} else {
							toast.push("Couldn't create post", {
								theme: {
									'--toastColor': 'mintcream',
									'--toastBackground': 'rgba(237, 28, 36, 0.9)',
									'--toastBarBackground': '#D90429'
								},
								duration: 2000
							});
						}
					})}
				submitButtonText="Create post"
			/>
		</div>
	</div>
</div>
