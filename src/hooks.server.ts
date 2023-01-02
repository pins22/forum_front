import SvelteKitAuth, { getSession } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import type { SignInParams, JwtParams, SessionParams, TokenSession } from '$lib/auth.types';

import {
	GITHUB_OAUTH_CLIENT_ID,
	GITHUB_OAUTH_SECRET,
	GOOGLE_OAUTH_CLIENT_ID,
	GOOGLE_OAUTH_SECRET,
	API_LOGIN_URL
} from '$env/static/private';
import jwtDecode from 'jwt-decode';

export const handle = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_OAUTH_CLIENT_ID, clientSecret: GITHUB_OAUTH_SECRET }),
		Google({ clientId: GOOGLE_OAUTH_CLIENT_ID, clientSecret: GOOGLE_OAUTH_SECRET })
	],
	callbacks: {
		async signIn(signinParams: SignInParams) {
			const { user, account, profile } = signinParams;
			if (account) {
				const { access_token, id_token } = account;
				const fetchResult = await fetch(`${API_LOGIN_URL}${account.provider}/`, {
					method: 'POST',
					body: JSON.stringify({
						access_token: access_token,
						id_token: id_token
					}),
					headers: { 'Content-Type': 'application/json' }
				});

				const responseBody = await fetchResult.json();
				user.accessToken = responseBody['access_token'];
				user.refreshToken = responseBody['refresh_token'];
				if (fetchResult.status == 200) {
					return true;
				}
			}

			return false;
		},
		async jwt(jwtParams: JwtParams) {
			const { token, user } = jwtParams;
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
			}
			return token;
		},
		async session(sessionParams: SessionParams) {
			const { session, user, token } = sessionParams;
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			if (token.accessToken) {
				const decoded: { user_id: number; exp: number; iat: number; jti: number } = jwtDecode(
					token.accessToken!
				);
				session.userId = decoded.user_id;
			}
			return session;
		}
	}
});

// export const handleError: HandleServerError = (({ error, event }) => {
// 	return {
// 		status: 418,
// 		message: 'NO message MI AMOR'
// 	};
// }) satisfies HandleServerError;
