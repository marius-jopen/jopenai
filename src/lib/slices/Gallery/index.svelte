<script lang="ts">
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.GallerySlice;

	// Convert to number in case it comes as a string from Prismic
	const columns = Number(slice.primary.columns) || 2;
	$: gridClass = (() => {
		switch (columns) {
			case 1:
				return 'grid-cols-1';
			case 2:
				return 'grid-cols-1 md:grid-cols-2';
			case 3:
				return 'grid-cols-1 md:grid-cols-3';
			case 4:
				return 'grid-cols-1 md:grid-cols-4';
			default:
				return 'grid-cols-1 md:grid-cols-2';
		}
	})();
</script>

{#if !slice.primary.deactivated}
	<section class="pb-4 md:pb-8">
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
{/if}
