import type { User } from '@auth/core/src/lib/types';
import type { Account, Profile, Session } from '@auth/core';
import type { JWT } from '@auth/core/jwt/types';
export interface AuthenticatedUser extends User {
	accessToken?: string;
	refreshToken?: string;
}

export interface SignInParams {
	user: AuthenticatedUser;
	account: Account | null;
	/**
	 * If OAuth provider is used, it contains the full
	 * OAuth profile returned by your provider.
	 */
	profile?: Profile;
	/**
	 * If Email provider is used, on the first call, it contains a
	 * `verificationRequest: true` property to indicate it is being triggered in the verification request flow.
	 * When the callback is invoked after a user has clicked on a sign in link,
	 * this property will not be present. You can check for the `verificationRequest` property
	 * to avoid sending emails to addresses or domains on a blocklist or to only explicitly generate them
	 * for email address in an allow list.
	 */
	email?: {
		verificationRequest?: boolean;
	};
}

export interface AccessTokenJWT extends JWT {
	accessToken?: string;
}

export interface JwtParams {
	token: AccessTokenJWT;
	user?: AuthenticatedUser;
	account?: Account | null;
	profile?: Profile;
	isNewUser?: boolean;
}

export interface TokenSession extends Session {
	accessToken?: string;
}
export interface SessionParams {
	session: TokenSession;
	user: User;
	token: AccessTokenJWT;
}
