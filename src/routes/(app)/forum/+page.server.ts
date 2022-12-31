import { error, type ServerLoad } from '@sveltejs/kit';
import { GET as getPosts } from '$lib/api/posts';
import type { Result } from '$lib/api/posts.types';

export const load = (async ({ fetch, params, locals }) => {
	const resPosts = await getPosts({ session: await locals.getSession() });
	if (resPosts.status != 200) {
		console.log('ERROR');
		console.log(resPosts.status);
		throw error(resPosts.status, resPosts.statusText);
	}
	const result: Result = await resPosts.json();
	return result;
}) satisfies ServerLoad;
