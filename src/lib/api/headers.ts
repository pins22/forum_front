import type { TokenSession } from '$lib/auth.types';
import jwtDecode from 'jwt-decode';
import { PUBLIC_API_REFRESH_URL as API_REFRESH_URL } from '$env/static/public';
import { signOut } from '@auth/sveltekit/client';
import { goto } from '$app/navigation';

interface DecodedToken {
	exp: number;
}

export async function buildAuthHeaders(
	session: TokenSession
): Promise<{ Authorization: string } | object> {
	if (!session?.accessToken) {
		return {};
	}
	const decoded: DecodedToken = jwtDecode(session.accessToken);
	if (decoded.exp) {
		const now = new Date();
		const expiration = new Date(decoded.exp * 1000);
		if (expiration >= now) {
			return { Authorization: `Bearer ${session.accessToken}` };
		} else if (session.refreshToken) {
			const result = await fetch(API_REFRESH_URL, {
				method: 'POST',
				body: JSON.stringify({
					refresh: session.refreshToken
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (result.ok) {
				const { access } = await result.json();
				session.accessToken = access;
				return {
					Authorization: `Bearer ${access}`
				};
			}
		}
	}
	try {
		await signOut({ callbackUrl: '/login' });
	} catch (error) {
		goto('/login');
	}
	return {};
}
