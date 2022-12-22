import type { RequestHandler } from './$types';
import { PUBLIC_API_URL as API_URL } from '$env/static/public';

import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { TokenSession } from '$lib/auth.types';

export const GET = (async ({ url, setHeaders }) => {
	const data = await fetch(`${API_URL}posts`);
	return data;
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const $page = await get(page);
	console.log('TOKEN: ', (<TokenSession>$page.data.session).accessToken);
	const data = await fetch(`${API_URL}posts/`, {
		method: 'POST',
		headers: Object.assign(
			{ Authorization: `Bearer ${(<TokenSession>$page.data.session).accessToken}` },
			request.headers
		),
		body: request.body
	});
	return data;
}) satisfies RequestHandler;
