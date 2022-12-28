import type { RequestHandler } from './$types';
import type { TokenSession } from '$lib/auth.types';
import { PUBLIC_API_URL as API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { Post } from '../../posts';

export const PATCH = (async ({ request, locals, url, fetch, params }) => {
	const session: TokenSession = <TokenSession>await locals.getSession();
	const response = await fetch(`${API_URL}${url.pathname}?${url.searchParams}`, {
		method: 'PATCH',
		headers: { Authorization: `Bearer ${session.accessToken}`, 'Content-Type': 'application/json' }
	});
	if (!response.ok) {
		throw error(response.status, response.statusText);
	}
	return response;
}) satisfies RequestHandler;
