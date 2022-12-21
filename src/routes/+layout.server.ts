import type { LayoutServerLoad } from './$types';
import type { TokenSession } from '$lib/auth.types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: <TokenSession>await event.locals.getSession()
	};
};
