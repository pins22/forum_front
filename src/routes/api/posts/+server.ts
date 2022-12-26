import type { RequestHandler } from './$types';
import { PUBLIC_API_URL as API_URL } from '$env/static/public';

import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { TokenSession } from '$lib/auth.types';

export const GET = (async ({ url, setHeaders }) => {
	const data = await fetch(`${API_URL}posts`);
	return data;
}) satisfies RequestHandler;

export const POST = (async ({ request, locals }) => {
	const session: TokenSession = <TokenSession>await locals.getSession();
	const data = await fetch(`${API_URL}posts/`, {
		method: 'POST',
		headers: { "Authorization": `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
		body: JSON.stringify(await request.json())
	});
	return data;
}) satisfies RequestHandler;
