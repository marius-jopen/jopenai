<script lang="ts">
  import { onMount } from 'svelte';
  import ToolCard from '$lib/components/ToolCard.svelte';

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

  export let current: Tool;
  export let count: number = 3;

  let tools: Tool[] = [];
  let similar: Tool[] = [];

  function computeSimilarityScore(a: Tool, b: Tool): number {
    let score = 0;
    const tagsA = new Set((a.tags || []).map((t) => t.toLowerCase()));
    const tagsB = new Set((b.tags || []).map((t) => t.toLowerCase()));
    for (const t of tagsA) if (tagsB.has(t)) score += 3; // shared tag weight
    if (a.category && b.category && a.category.toLowerCase() === b.category.toLowerCase()) score += 2;
    score += (b.weight || 0) * 0.01;
    return score;
  }

  function pickSimilar() {
    similar = tools
      .filter((t) => t.id !== current.id)
      .map((t) => ({ tool: t, score: computeSimilarityScore(current, t) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((x) => x.tool);

    // Fallback: if no similar found, just take top N by weight/name
    if (similar.length === 0) {
      similar = tools
        .filter((t) => t.id !== current.id)
        .sort((a, b) => (b.weight || 0) - (a.weight || 0) || a.name.localeCompare(b.name))
        .slice(0, count);
    }
  }

  async function loadAll() {
    try {
      const res = await fetch('/api/tools');
      const json = await res.json();
      tools = (json.items || []).map((t: Tool) => ({ ...t, pricing: t.pricing || 'Freemium' }));
      pickSimilar();
    } catch (e) {
      console.error('Failed to load tools for similar section', e);
    }
  }

  onMount(loadAll);

	// Recompute when the current tool changes (client-side nav between tools)
	$: if (current && tools.length) {
		pickSimilar();
	}
</script>

<section class="py-12 md:py-16">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-xl md:text-2xl">Similar Tools</h3>
    <a href="/tools" class="text-sm">View all</a>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each similar as t}
      <ToolCard tool={t} />
    {/each}
  </div>
</section>


