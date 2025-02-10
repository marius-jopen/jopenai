<script lang="ts">
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.GallerySlice;

	const columns = slice.primary.columns || 2;
	$: gridClass = `grid-cold-1 md:grid-cols-${columns}`;
</script>

<section class="pb-28">
	<div class="{slice.primary.size ? 'px-3 md:px-8' : 'box'} grid gap-6 {gridClass}">
		{#each slice.primary.items as item}
			<div data-aos="fade-up">
				<div class="rounded-lg overflow-hidden h-auto">
					{#if item.video}
						<video 
							src={item.video} 
							poster={item.image.url} 
							class="w-full h-auto bg-[var(--secondary-color)]" 
							playsinline 
							loop
							autoplay={!item.controlled}
							controls={item.controlled}
							muted={!item.controlled}
						/>
					{:else}
						<PrismicImage class="w-full h-auto bg-[var(--secondary-color)]" field={item.image} />
					{/if}
				</div>
	
				{#if item.text.length > 0}
					<div class="mx-auto text-neutral-500 pt-3 text-sm text-center mx-auto md:w-8/12 pb-2">
						<PrismicText field={item.text} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

