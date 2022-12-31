import { PUBLIC_API_URL as API_URL } from '$env/static/public';
import type { TokenSession } from '$lib/auth.types';
import type { Session } from '@auth/core';
import { buildAuthHeaders } from './headers';

interface GetParams {
	id?: string | undefined;
	session: TokenSession | Session | null;
}

export const GET = async ({ id, session }: GetParams) => {
	let authHeaders = {};
	if (session !== null) {
		authHeaders = await buildAuthHeaders(<TokenSession>session);
	}
	const data = await fetch(`${API_URL}/api/v1/posts${id ? `/${id}` : ''}`, {
		method: 'GET',
		headers: Object.assign(authHeaders, {
			'Content-Type': 'application/json'
		})
	});
	return data;
};

export const POST = async (body: object | string, session: TokenSession | Session | null) => {
	if (session === null) {
		// show toast on errors
		return;
	}
	const tokenSession: TokenSession = <TokenSession>session;
	const data = await fetch(`${API_URL}/api/v1/posts/`, {
		method: 'POST',
		headers: Object.assign(await buildAuthHeaders(tokenSession), {
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(body)
	});
	return data;
};

export const vote = async (
	id: string,
	query: string,
	session: TokenSession | Session | null = null
) => {
	if (session === null) {
		// show toast on errors
		return;
	}

	const tokenSession: TokenSession = <TokenSession>session;
	const response = await fetch(`${API_URL}/api/v1/posts/${id}/vote?${query}`, {
		method: 'PATCH',
		headers: Object.assign(await buildAuthHeaders(tokenSession), {
			'Content-Type': 'application/json'
		})
	});
	if (!response.ok) {
		// throw error(response.status, response.statusText);
	}
	return response;
};
