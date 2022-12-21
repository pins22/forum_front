import SvelteKitAuth from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import type { SignInParams, JwtParams, SessionParams } from '$lib/auth.types';

import {
	GITHUB_OAUTH_CLIENT_ID,
	GITHUB_OAUTH_SECRET,
	GOOGLE_OAUTH_CLIENT_ID,
	GOOGLE_OAUTH_SECRET,
	API_LOGIN_URL
} from '$env/static/private';

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
			}
			return token;
		},
		async session(sessionParams: SessionParams) {
			const { session, user, token } = sessionParams;
			session.accessToken = token.accessToken;
			return session;
		}
	}
});
