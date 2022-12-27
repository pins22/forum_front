import { redirect } from '@sveltejs/kit';
// import type { ServerLoad } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	throw redirect(302, '/forum');
}) satisfies PageLoad;
