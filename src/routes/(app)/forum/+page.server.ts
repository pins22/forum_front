import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const res = await fetch(`/api/v1/posts`);
	if (res.status != 200) {
    console.log("ERROR");
		console.log(res.status)
		throw error(res.status, res.statusText);
  }
	const item = await res.json();
	return { item };
}) satisfies ServerLoad;
