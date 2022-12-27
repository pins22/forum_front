import type { RequestHandler } from './$types';
import { PUBLIC_API_URL as API_URL } from '$env/static/public';

import type { TokenSession } from '$lib/auth.types';

export const GET = (async ({ url, setHeaders, fetch }) => {
	console.log(`${API_URL}${url.pathname}`)
	const data = await fetch(`${API_URL}${url.pathname}`);
	console.log(data.body)
	return data;
}) satisfies RequestHandler;

export const POST = (async ({ request, locals, url, fetch }) => {
	const session: TokenSession = <TokenSession>await locals.getSession();
	const data = await fetch(`${API_URL}${url.pathname}/`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${session.accessToken}`, 'Content-Type': 'application/json' },
		body: JSON.stringify(await request.json())
	});
	return data;
}) satisfies RequestHandler;
