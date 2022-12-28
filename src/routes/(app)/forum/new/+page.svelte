<script lang="ts">
	import RenderedPost from '$lib/RenderedPost.svelte';
	import { marked } from 'marked';
	let title = '';
	let content = '';

	function pasteHandler(e: ClipboardEvent) {
		e.preventDefault();
		if (e.clipboardData?.files.length)
			content += e.clipboardData?.getData('text/html')
		else
			content += e.clipboardData?.getData('text/plain')
	}
</script>

<div>
	<div class=" mt-10 flex w-3/4 mx-auto justify-center">
		<div class="flex flex-col w-full justify-end">
			<h3 class="text-3xl text-gray-300">Create a post</h3>
			<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
				<ul
					class="flex flex-wrap -mb-px text-sm font-medium text-center"
					id="myTab"
					data-tabs-toggle="#myTabContent"
					role="tablist"
				>
					<li class="mr-2" role="presentation">
						<button
							class="inline-block p-4 rounded-t-lg border-b-2"
							id="edit-tab"
							data-tabs-target="#edit"
							type="button"
							role="tab"
							aria-controls="edit"
							aria-selected="false">Edit</button
						>
					</li>
					<li class="mr-2" role="presentation">
						<button
							class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
							id="preview-tab"
							data-tabs-target="#preview"
							type="button"
							role="tab"
							aria-controls="preview"
							aria-selected="false">Preview</button
						>
					</li>
				</ul>
			</div>
			<div id="myTabContent">
				<div
					class="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
					id="edit"
					role="tabpanel"
					aria-labelledby="edit-tab"
				>
					<textarea
						bind:value={title}
						rows="1"
						class="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Title"
						style="resize: none;"
					/>
					<textarea
						bind:value={content}
						on:paste={(e) => pasteHandler(e)}
						id="post-content-md"
						rows="4"
						class="mt-5 min-h-[300px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Content of your post [Markdown]"
					/>
				</div>
				<div
					class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
					id="preview"
					role="tabpanel"
					aria-labelledby="preview-tab"
				>
					<RenderedPost markdown={content} />
				</div>
				<div class="flex justify-end">
					<button
						class="max-w-fit px-4 py-2 mt-3 float-right text-sm font-medium bg-blue-600 text-white rounded-full border-2 border-blue-600 transition-color duration-150 hover:bg-blue-900 hover:border-blue-900"
						on:click={() => {
							fetch('/api/v1/posts', {
								method: 'POST',
								body: JSON.stringify({
									title: title,
									body: content
								}),
								headers: {
									'Content-Type': 'application/json'
								}
							}).then(() => {
								location.href = '/forum';
							});
						}}
					>
						Create post
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
