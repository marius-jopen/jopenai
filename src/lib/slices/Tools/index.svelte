<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import ToolCard from './ToolCard.svelte';

	export let slice: Content.ToolsSlice;

	type Tool = {
		id: string;
		name: string;
		category: string;
		description: string;
		pricing: string;
		url: string;
		imageUrl?: string;
		checked?: boolean;
		weight?: number;
	};

	let tools: Tool[] = [];
	let filtered: Tool[] = [];
	let categories: string[] = [];
	let selectedCategory = 'Most Popular';
	let search = '';
	let sort = 'Newest to Oldest';

	const DEFAULT_CATEGORIES: string[] = [
		'Most Popular',
		'All',
		'Agents',
		'Coding',
		'Marketing',
		'Content Creator',
		'Educators',
		'Business Operations',
		'Sales',
		'Finance',
		'Design',
		'Healthcare',
		'Consulting',
		'Government',
		'Data Analysis',
		'Project Management',
		'Legal',
		'Recruiting / HR',
		'Students'
	];

	function rankComparator(a: Tool, b: Tool): number {
		const wa = a.weight || 0;
		const wb = b.weight || 0;
		if (wa !== wb) return wb - wa; // higher first
		return a.name.localeCompare(b.name);
	}

	function applyFilters() {
		const q = search.trim().toLowerCase();
		filtered = tools
			.filter((t) =>
				(selectedCategory === 'Most Popular' || selectedCategory === 'All' || t.category?.toLowerCase() === selectedCategory.toLowerCase()) &&
				(!q || t.name?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
			)
			.sort(rankComparator);
	}

	async function loadTools() {
		try {
			const res = await fetch('/api/tools');
			const json = await res.json();
			tools = (json.items || []).map((t: Tool) => ({
				...t,
				pricing: t.pricing || 'Freemium'
			}));
			categories = DEFAULT_CATEGORIES;
			applyFilters();
		} catch (e) {
			console.error('Failed to load tools', e);
		}
	}

	onMount(loadTools);

	$: applyFilters();
</script>

<section class="box py-16 md:pt-28 md:pb-24">
	<div class="text-center max-w-3xl mx-auto mb-12">
		<h2 class="text-4xl md:text-6xl">Discover the AI tools powering tomorrow</h2>
		<p class="text-neutral-500 mt-4 px-12">Explore the most useful AI services—curated, categorized, and ready for you.</p>
	</div>

	<div class="flex flex-wrap gap-2 justify-center mb-16 w-10/12 mx-auto">
		{#each categories as cat}
			<button
				class="px-4 py-2 rounded-full text-black text-sm {selectedCategory === cat ? 'bg-white' : 'bg-[var(--secondary-color)] '}"
				on:click={() => (selectedCategory = cat)}
			>{cat}</button>
		{/each}
	</div>

	<div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
		<div class="relative w-full md:w-80">
			<input
				class="w-full rounded-full px-4 py-2 outline-none text-sm placeholder:text-black"
				placeholder="Search tools"
				bind:value={search}
			/>
		</div>
		<div class="text-sm text-black">Sort by: {sort}</div>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filtered as t}
			<ToolCard tool={t} />
		{/each}
	</div>
</section>
