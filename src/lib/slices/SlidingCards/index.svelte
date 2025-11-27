<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: Content.SlidingCardsSlice;

	const items = slice.primary.items;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2) / 3 * 2; 
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};

	// Determine number of columns on md+ using the "Items per row" field (only used when slider is false)
	const requestedCols = Number(slice.primary.items_per_row) || 3;
	const clampedCols = Math.max(1, Math.min(requestedCols, 12));
	// Enumerate possible classes so Tailwind JIT includes them
	const mdGridColsClassMap: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		7: 'md:grid-cols-7',
		8: 'md:grid-cols-8',
		9: 'md:grid-cols-9',
		10: 'md:grid-cols-10',
		11: 'md:grid-cols-11',
		12: 'md:grid-cols-12'
	};
	const mdGridColsClass = mdGridColsClassMap[clampedCols] || 'md:grid-cols-3';
</script>

{#if !slice.primary.deactivated}
	<section class="pb-28" data-id={slice.primary.hash}>

		{#if slice.primary.slider == false}
			<div data-aos="fade-up" class={`grid grid-cols-1 ${mdGridColsClass} gap-6 box-big`}>
				{#each items as item, index}
					<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="flex flex-col rounded-lg overflow-hidden h-full bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition group">
						{#if item.video || isFilled.image(item.image)}
							<div class="w-full h-[250px] overflow-hidden">
								{#if item.video}
									<video src={item.video} poster={item.image.url} class="rounded-t-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" autoplay muted loop playsinline />
								{:else}
									<PrismicImage class="rounded-t-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" field={item.image} />
								{/if}
							</div>
						{/if}
					
						<div class="{item.video || isFilled.image(item.image) ? 'rounded-b-lg' : 'rounded-lg'} px-6 md:px-10 pt-6 md:pt-10 pb-8 md:pb-12 w-full flex-1 flex flex-col">
							<div data-aos-delay={100 + index * 150}>
								<PrismicRichText field={item.headline} />
							</div>
					
							<div class="text-base-mobile md:text-base text-box text-[var(--text-secondary-color)] flex-1" data-aos="fade" data-aos-delay={150 + index * 150}>
								<PrismicRichText field={item.text} />
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div data-aos="fade-up">
				<Slider>
					{#each items as item, index}
						<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="item lg:flex flex-col lg:flex-row rounded-lg overflow-hidden group" style={calculateStyles(index, items.length)}>
							<div class="w-full lg:w-1/2 overflow-hidden">
								{#if item.video}
									<video src={item.video} poster={item.image.url} class="rounded-t-lg lg:rounded-t-none lg:!rounded-l-lg md:h-full object-cover aspect-[4/3] md:aspect-[6/3] lg:aspect-[4/3] transition-transform duration-300 group-hover:scale-105" autoplay muted loop playsinline />
								{:else}
									<PrismicImage class="rounded-t-lg lg:rounded-t-none lg:!rounded-l-lg md:h-full object-cover aspect-[4/3] md:aspect-[6/3] lg:aspect-[4/3] transition-transform duration-300 group-hover:scale-105" field={item.image} />
								{/if}
							</div>
						
							<div class="rounded-b-lg lg:rounded-b-none lg:!rounded-r-lg bg-[var(--secondary-color)] px-6 md:px-10 pt-10 pb-12 w-full lg:w-1/2 flex flex-col lg:justify-center lg:aspect-[4/3] h-full lg:h-auto">
								<div data-aos-delay={100 + index * 150}>
									<PrismicRichText field={item.headline} />
								</div>
						
								<div class="text-base-mobile md:text-base text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={150 + index * 150}>
									<PrismicRichText field={item.text} />
								</div>
							</div>
						</a>
					{/each}
				</Slider>
			</div>
		{/if}
	</section>
{/if}

<style>
	.item:first-child {
		@media (max-width: 1024px) {	
			margin-left: 13px !important;
		}
	}

	.item:last-child {
		@media (max-width: 1024px) {	
			margin-right: 13px !important;
		}
	}

	.item {
		@media (max-width: 1024px) {	
			width: 80vw !important;
		}
	}
</style>