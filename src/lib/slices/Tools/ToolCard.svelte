<script lang="ts">
	export type Tool = {
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

	export let tool: Tool;
</script>

<a class="rounded-xl overflow-hidden transition-colors bg-[var(--secondary-color)]" href={tool.url} target="_blank" rel="noopener noreferrer">
	{#if tool.imageUrl}
		<img src={tool.imageUrl} alt={tool.name} class="w-full aspect-video object-cover" loading="lazy" />
	{/if}
	<div class="px-4 pt-4 pb-2">
		<div class="text-xs uppercase text-black pb-2">{tool.category || 'Other'} · {tool.pricing || 'Freemium'}</div>
		<div class="mt-1 font-semibold pb-4">{tool.name}</div>

		{#if tool.description}
			<div class="mt-1 text-sm text-black line-clamp-2 pb-4">{tool.description}</div>
		{/if}
	</div>
</a>


