export interface Post {
	pk: number;
	title: string;
	body: string;
	created_at: string;
	last_changed: string;
	author: Author;
	points: number;
}

export interface Reply {
	pk: number;
	post: Post;
	body: string;
	created_at: string;
	last_changed: string;
	points: number;
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
