<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';

	export let slice: Content.SlidingCardsSlice;

	const items = slice.primary.items;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2) / 3 * 2; 
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};
</script>

<section class="pb-28" data-id={slice.primary.hash}>
	<div class="box text-center pb-4" data-aos="fade-up">
		<h2>
			{slice.primary.headline}
		</h2>
	</div>

	<div data-aos="fade-up">
		<Slider>
			{#each items as item, index}
				<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="item lg:flex flex-col lg:flex-row rounded-lg   overflow-hidden" style={calculateStyles(index, items.length)}>
					<div class="w-full lg:w-1/2" >
						{#if item.video}
							<video src={item.video} poster={item.image.url} class="rounded-t-lg lg:rounded-t-none lg:!rounded-l-lg md:h-full object-cover aspect-[4/3] md:aspect-[6/3] lg:aspect-[4/3]" autoplay muted loop playsinline />
						{:else}
							<PrismicImage class="rounded-t-lg lg:rounded-t-none lg:!rounded-l-lg md:h-full object-cover aspect-[4/3] md:aspect-[6/3] lg:aspect-[4/3]" field={item.image} />
						{/if}
					</div>
				
					<div class="rounded-b-lg lg:rounded-b-none lg:!rounded-r-lg bg-[var(--secondary-color)] px-8 pt-10 pb-12 w-full lg:w-1/2 flex flex-col lg:justify-center lg:aspect-[4/3] h-full lg:h-auto">
						<h3 data-aos="fade" data-aos-delay={100 + index * 150}>
							{item.headline}
						</h3>
				
						<div class="text-base-mobile md:text-sm text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={150 + index * 150}>
							<PrismicText field={item.text} />
						</div>
					</div>
				</a>
			{/each}
		</Slider>
	</div>
</section>


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