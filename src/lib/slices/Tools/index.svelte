<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import ToolsOverview from '$lib/components/ToolsOverview.svelte';

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

	async function loadTools() {
		try {
			const res = await fetch('/api/tools');
			const json = await res.json();
			tools = (json.items || []).map((t: Tool) => ({
				...t,
				pricing: t.pricing || 'Freemium'
			}));
		} catch (e) {
			console.error('Failed to load tools', e);
		}
	}

	onMount(loadTools);

	// Set meta for listing page
	$: if (tools && tools.length) {
		// provide minimal meta; layout reads $page.data
		// We can't set $page.data here, but we can emit events if needed.
	}
</script>

<ToolsOverview initialTools={tools} />
