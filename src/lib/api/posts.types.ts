export interface Post {
	id: number;
	title: string;
	body: string;
	created_at: string;
	last_changed: string;
	author: Author;
	points: number;
	has_user_upvoted: boolean;
	has_user_downvoted: boolean;
	has_accepted_answer: boolean;
}

export interface Author {
	id: number;
	date_joined: string;
	first_name: string;
	last_name: string;
	username: string;
}

export interface Result {
	count: number;
	next: number | null;
	previous: number | null;
	results: [Post];
}
