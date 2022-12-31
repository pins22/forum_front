import { error } from '@sveltejs/kit';
// import type { ServerLoad } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { GET as getPost } from '$lib/api/posts';
import type { Post, Result } from '$lib/api/posts.types';
import type { Result as ReplyResult } from '$lib/api/replies.types';
import { getReplies } from '$lib/api/replies';

export const load = (async ({ params, fetch, depends, parent }) => {
	depends('api:posts/id');
	const postId = params.id;
	const { session } = await parent();
	const response = await getPost({ id: postId, session: session });
	if (!response.ok) {
		throw error(response.status, response.statusText);
	}
	const post: Post = await response.json();
	const replyResponse = await getReplies(postId, { session: session });
	const replies: ReplyResult = await replyResponse.json();
	return { post, replies };
}) satisfies PageLoad;
