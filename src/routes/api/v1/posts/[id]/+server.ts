import type { RequestHandler } from './$types';
import { PUBLIC_API_URL as API_URL } from '$env/static/public';
import jwt_decode from 'jwt-decode';
import type { TokenSession } from '$lib/auth.types';

interface DecodedToken {
	exp: number;
}

export const GET = (async ({ url, setHeaders, fetch, locals }) => {
	const session: TokenSession = <TokenSession>await locals.getSession();
	const headers: any = { 'Content-Type': 'application/json' };
	if (session?.accessToken) {
		const decoded: DecodedToken = jwt_decode(session.accessToken!);
		if (decoded.exp) {
			const now = new Date();
			const expiration = new Date(decoded.exp * 1000);
			if (expiration >= now) {
				headers.Authorization = `Bearer ${session.accessToken}`;
			}
		}
	}
	const data = await fetch(`${API_URL}${url.pathname}`, {
		headers: headers
	});
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
