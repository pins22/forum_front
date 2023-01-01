<script lang="ts">
	import { page } from '$app/stores';
	import RenderedPost from '$lib/RenderedPost.svelte';
	import { POST as createPost } from '$lib/api/posts';
	import { error } from '@sveltejs/kit';
	import { marked } from 'marked';
	export let onSubmit: () => void;
	export let submitButtonText: string;
	export let data: { title: string; body: string };

	function pasteHandler(e: ClipboardEvent) {
		e.preventDefault();
		if (e.clipboardData?.files.length) data.body += e.clipboardData?.getData('text/html');
		else data.body += e.clipboardData?.getData('text/plain');
	}
	const textAndBorderClasses = [
		'border-transparent',
		'hover:text-gray-600',
		'hover:border-gray-300',
		'dark:hover:text-gray-300'
	];
	function toggleVisibility(id: string) {
		const tabs = document.getElementById('tabs');
		for (const tab of tabs?.children ?? []) {
			if (tab.role !== 'tab') continue;
			if (tab.id === id) {
				tab.classList.remove('hidden');
				for (const textAndBorderClass of textAndBorderClasses) {
					if (tab.classList.contains(textAndBorderClass)) {
						tab.classList.remove(textAndBorderClass);
					}
				}
			} else {
				if (!tab.classList.contains('hidden')) {
					tab.classList.add('hidden');
				}
			}
		}
		const tabButtons = document.getElementById('tab-buttons');
		for (const li of tabButtons?.children ?? []) {
			const btn = li.getElementsByTagName('button')[0];
			for (const textAndBorderClass of textAndBorderClasses) {
				if (btn.id === `${id}-tab`) {
					if (btn.classList.contains(textAndBorderClass)) {
						btn.classList.remove(textAndBorderClass);
					}
					continue;
				} else if (!btn.classList.contains(textAndBorderClass)) {
					btn.classList.add(textAndBorderClass);
				}
			}
		}
	}
</script>

<div>
	<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
		<ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="tab-buttons">
			<li class="mr-2" role="presentation">
				<button
					class="inline-block p-4 rounded-t-lg border-b-2"
					id="edit-tab"
					type="button"
					on:click={() => toggleVisibility('edit')}>Edit</button
				>
			</li>
			<li class="mr-2" role="presentation">
				<button
					class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
					id="preview-tab"
					on:click={() => toggleVisibility('preview')}
					type="button">Preview</button
				>
			</li>
		</ul>
	</div>
	<div id="tabs">
		<div class="p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="edit" role="tab">
			<form id="post-form">
				<textarea
					bind:value={data.title}
					rows="1"
					name="title"
					form="post-form"
					class="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Title"
					style="resize: none;"
				/>
				<textarea
					bind:value={data.body}
					on:paste={(e) => pasteHandler(e)}
					name="body"
					form="post-form"
					id="post-content-md"
					rows="4"
					class="mt-5 min-h-[300px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Content of your post [Markdown]"
				/>
			</form>
		</div>
		<div class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="preview" role="tab">
			<RenderedPost markdown={data.body} />
		</div>
		<div class="flex justify-end">
			<button
				on:click={() => {
					onSubmit();
				}}
				class="max-w-fit px-4 py-2 mt-3 float-right text-sm font-medium bg-blue-600 text-white rounded-full border-2 border-blue-600 transition-color duration-150 hover:bg-blue-900 hover:border-blue-900"
				>{submitButtonText}</button
			>
		</div>
	</div>
</div>
