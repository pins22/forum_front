// import type { ServerLoad } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { GET as getPost } from '$lib/api/posts';
import type { Post } from '$lib/api/posts.types';
import type { Result as ReplyResult } from '$lib/api/replies.types';
import { getReplies } from '$lib/api/replies';
import type { Actions } from '@sveltejs/kit';
import { createReply } from '$lib/api/replies';

export const load = (async ({ params, depends, parent }) => {
	depends('api:posts/id');
	const postId = params.id;
	const { session } = await parent();
	const response = await getPost({ id: postId, session: session });
	const post: Post = await response.json();
	const replyResponse = await getReplies(postId, { session: session });
	const replies: ReplyResult = await replyResponse.json();
	return { post: post, replies: replies };
}) satisfies PageLoad;
