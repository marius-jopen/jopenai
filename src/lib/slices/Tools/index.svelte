<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import ToolsOverview from '$lib/components/ToolsOverview.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

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
			const res = await fetch('/api/tools');
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

	onMount(loadTools);

	// Fallback: if navigating back via SPA or bfcache restores an empty state, refetch
	$: if (browser && !loading && tools.length === 0) {
		loadTools();
	}
	$: if (browser) {
		$page.url; // depend on url updates
		if (!loading && tools.length === 0) loadTools();
	}
</script>

<ToolsOverview initialTools={tools} />
