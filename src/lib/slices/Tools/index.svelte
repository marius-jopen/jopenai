<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import ToolsOverview from '$lib/components/ToolsOverview.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	export let slice: Content.ToolsSlice;

	type Tool = {
		id: string;
		name: string;
		category: string;
		tags?: string[];
		description: string;
		pricing: string;
		url: string;
		imageUrl?: string;
		checked?: boolean;
		weight?: number;
	};

	let tools: Tool[] = [];
	let loading = false;

	async function loadTools() {
		if (loading) return;
		loading = true;
		try {
			const res = await fetch('/api/tools', { cache: 'no-store' });
			const json = await res.json();
			tools = (json.items || []).map((t: Tool) => ({
				...t,
				pricing: t.pricing || 'Freemium'
			}));
		} catch (e) {
			console.error('Failed to load tools', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadTools();

		if (!browser) return;

		// Refetch when navigating back to this route via client-side routing
		const unsub = afterNavigate(({ to }) => {
			try {
				if (to?.url?.pathname?.includes('/tools') && tools.length === 0) {
					loadTools();
				}
			} catch {}
		});

		// Handle bfcache "instant back" (pageshow with persisted)
		const onPageShow = (ev: PageTransitionEvent) => {
			try {
				// @ts-expect-error persisted exists on PageTransitionEvent in browsers
				if (ev.persisted && tools.length === 0) loadTools();
			} catch {}
		};
		window.addEventListener('pageshow', onPageShow);

		return () => {
			unsub();
			window.removeEventListener('pageshow', onPageShow);
		};
	});

	// Fallback: if navigating within SPA and tools became empty for any reason
	$: if (browser && !loading && tools.length === 0) {
		$page.url; // depend on URL changes
		// ensure not spamming network
		queueMicrotask(() => {
			if (!loading && tools.length === 0) loadTools();
		});
	}
</script>

<ToolsOverview initialTools={tools} />
