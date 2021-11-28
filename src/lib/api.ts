import type { LoadInput } from '@sveltejs/kit';

const perPage = 10;

export type PostStats = {
	maxPages: number;
	perPage: number;
};
export type Post = {
	title: string;
	body: string;
};

type Fetch = LoadInput['fetch'];
// A fake api that returns a constant value.
// In a real app, this can be implemented by listing static files
// or querying a database to find the maximum number of posts.
export async function getPostStats(fetch: Fetch): Promise<PostStats> {
	const posts: Array<Post> = await fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
		r.json()
	);
	const maxPages = Math.ceil(posts.length / perPage);
	return {
		maxPages,
		perPage
	};
}

export async function getPage(page: number, fetch: Fetch): Promise<Array<Post>> {
	const all: Array<Post> = await fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
		r.json()
	);
	const start = (page - 1) * perPage + 1;
	return all.slice(start, Math.min(start + perPage, all.length));
}
