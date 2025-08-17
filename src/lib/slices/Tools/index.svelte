<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount, onDestroy } from 'svelte';
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

	// Register navigation listener during component init (required by Svelte)
	const offNav = afterNavigate(({ to }) => {
		try {
			if (to?.url?.pathname?.includes('/tools') && tools.length === 0 && !loading) {
				loadTools();
			}
		} catch {}
	});

	onMount(() => {
		loadTools();

		if (!browser) return;
		// Handle bfcache restores
		const onPageShow = (ev: PageTransitionEvent) => {
			try {
				// @ts-expect-error persisted exists in browsers
				if (ev.persisted && tools.length === 0) loadTools();
			} catch {}
		};
		window.addEventListener('pageshow', onPageShow);
		return () => {
			window.removeEventListener('pageshow', onPageShow);
		};
	});

	onDestroy(() => {
		try { offNav(); } catch {}
	});

	// Fallback: if navigating within SPA and tools became empty for any reason
	$: if (browser && !loading && tools.length === 0) {
		$page.url; // depend on URL changes
		queueMicrotask(() => {
			if (!loading && tools.length === 0) loadTools();
		});
	}
</script>

<ToolsOverview initialTools={tools} />
