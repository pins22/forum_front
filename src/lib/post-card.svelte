<script lang="ts">
	import type { Post } from '$lib/api/posts.types';
	import Label from './label.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);
	export let post: Post;
</script>

<a href="/forum/{post.id}" class="w-1/2 h-full">
	<div class="rounded border-2 w-full h-[112px] flex flex-col">
		<div class="flex flex-row items-center basis-11/12">
			<div class="ml-1">
				<Label value={post.points} variant={post.points >= 0 ? 'success' : 'danger'} />
			</div>
			<div class="ml-2">
				<h1>
					{post.title}
				</h1>
			</div>
		</div>
		<div class="basis-1/12 self-end">
			Asked by: <a href="/users/{post.author.username}">{post.author.username}</a>
			{dayjs(post.created_at).fromNow()}
		</div>
	</div>
</a>
