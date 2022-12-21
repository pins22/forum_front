import type { RequestHandler } from './$types';
import { API_URL } from '../+server';

export const GET = (async ({ url, setHeaders }) => {
	const data = await fetch(`${API_URL}posts`);
	return data;
}) satisfies RequestHandler;
