import { PUBLIC_BROWSER_API_URL as BROWSER_API_URL, PUBLIC_SERVER_API_URL as SERVER_API_URL } from '$env/static/public';
import type { TokenSession } from '$lib/auth.types';
import type { Session } from '@auth/core';
import { buildAuthHeaders } from './headers';
import { browser } from '$app/environment';
import type { Reply } from './replies.types';

interface GetParams {
	id?: string | undefined;
	session: TokenSession | Session | null;
}

export const getReplies = async (post_id: string | number, { id, session }: GetParams) => {
	let authHeaders = {};
	if (session !== null) {
		authHeaders = await buildAuthHeaders(<TokenSession>session);
	}
	const data = await fetch(`${browser ? BROWSER_API_URL : SERVER_API_URL}/api/v1/posts/${post_id}/reply${id ? `/${id}` : ''}`, {
		method: 'GET',
		headers: Object.assign(authHeaders, {
			'Content-Type': 'application/json'
		})
	});
	return data;
};

export const createReply = async (
	postId: string | number,
	title: string,
	body: string,
	session: TokenSession | Session | null
) => {
	if (session === null) {
		// show toast on errors
		return;
	}
	const tokenSession: TokenSession = <TokenSession>session;
	const data = await fetch(`${browser ? BROWSER_API_URL : SERVER_API_URL}/api/v1/posts/${postId}/reply/`, {
		method: 'POST',
		headers: Object.assign(await buildAuthHeaders(tokenSession), {
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ title: title, body: body })
	});
	return data;
};

export const vote = async (
	id: string | number,
	query: string,
	session: TokenSession | Session | null = null
) => {
	if (session === null) {
		// show toast on errors
		return;
	}

	const tokenSession: TokenSession = <TokenSession>session;
	const response = await fetch(`${browser ? BROWSER_API_URL : SERVER_API_URL}/api/v1/posts/reply/${id}/vote?${query}`, {
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

export const PATCH = async (
	id: string | number,
	data: Reply,
	session: TokenSession | Session | null
) => {
	if (session === null) {
		// show toast on errors
		return;
	}
	const tokenSession: TokenSession = <TokenSession>session;
	const response = await fetch(`${browser ? BROWSER_API_URL : SERVER_API_URL}/api/v1/posts/reply/${id}`, {
		method: 'PATCH',
		headers: Object.assign(await buildAuthHeaders(tokenSession), {
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		// throw error(response.status, response.statusText);
	}
	return response;
};
