<script context="module" lang="ts">
	import { getPage, getPostStats, Post } from '$lib/api';
	import type { LoadInput } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export async function load({ page, fetch }: LoadInput) {
		const pageNumber = parseInt(page.params.page);
		const posts = await getPage(pageNumber, fetch);
		const { maxPages } = await getPostStats(fetch);
		return {
			props: {
				page: pageNumber,
				maxPages,
				posts
			}
		};
	}
</script>

<script lang="ts">
	export let maxPages: number;
	export let page: number;
	export let posts: Array<Post>;

	$: hasPrev = page > 1;
	$: hasNext = page < maxPages;
</script>

<h1>Page {page}</h1>
<ul class="nav-links">
	<li>
		<a href="/">Home</a>
	</li>
	{#if hasPrev}
		<li>
			<a href={`/post/${page - 1}`}>Previous Page</a>
		</li>
	{/if}
	{#if hasNext}
		<li><a href={`/post/${page + 1}`}>Next Page</a></li>
	{/if}
</ul>
<ul>
	{#each posts as post}
		<li>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<hr />
		</li>
	{/each}
</ul>

<style>
	li {
		list-style: none;
	}

	.nav-links {
		display: flex;
	}

	.nav-links li {
		margin-right: 1rem;
	}
</style>
