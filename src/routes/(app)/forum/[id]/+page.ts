import { error } from '@sveltejs/kit';
// import type { ServerLoad } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, depends }) => {
	depends("api:posts/id")
	const postId = params.id;
	const response = await fetch(`/api/v1/posts/${postId}`, { method: 'GET' });
	if (!response.ok) {
		throw error(response.status, response.statusText);
	}
	const post = await response.json();
	return { post: post };
}) satisfies PageLoad;
