<script lang="ts">
	let title = '';
	let content = '';
</script>

<div>
	<div class="px-20 py-10">
		<h3 class="text-3xl text-gray-300">Create a post</h3>

		<hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

		<textarea
			bind:value={title}
			rows="1"
			class="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Title"
			style="resize: none;"
		/>
		<div
			bind:innerHTML={content}
			contenteditable
			id="post-content-md"
			rows="4"
			class="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Content of your post [Markdown]"
			oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
		/>

		<button
			class="px-4 py-2 mt-3 float-right text-sm font-medium bg-blue-600 text-white rounded-full border-2 border-blue-600 transition-color duration-150 hover:bg-blue-900 hover:border-blue-900"
			on:click={() =>
				fetch('/api/posts', {
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
				})}
		>
			Create post
		</button>
	</div>
</div>

<style>
	[contenteditable] {
		min-height: 20vh;
		max-height: 50vh;
		overflow-y: auto;
	}
	[contenteditable][placeholder]:empty:before {
		content: attr(placeholder);
		position: absolute;
		color: #9ca3af;
		background-color: transparent;
	}
</style>
