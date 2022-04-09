<script context="module" lang="ts">
  import { getPostStats } from '$lib/api';
  import type { Load } from '@sveltejs/kit';

  export const prerender = true;
  export const router = false;
  export const hydrate = false;

  export const load: Load = async ({ fetch }) => {
    const { maxPages } = await getPostStats(fetch);
    return {
      props: {
        maxPages
      }
    };
  };
</script>

<script lang="ts">
  export let maxPages: number;

  const pages = [...Array(maxPages).keys()].map((p) => p + 1);
</script>

<h1>Welcome to SvelteKit</h1>

<p>
  This is an example application that demenstrate how to have a SvelteKit application with
  prerendered pages with pagaination support.
</p>

<ul>
  {#each pages as page}
    <li><a href={`/post/${page}`}>Page {page}</a></li>
  {/each}
</ul>
