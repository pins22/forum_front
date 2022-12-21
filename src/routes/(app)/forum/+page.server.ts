import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const res = await fetch(`/api/posts`);
	if (res.status != 200) {
    console.log("ERROR");
		console.log(res.status)
  }
	const item = await res.json();
	return { item };
}) satisfies ServerLoad;
