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

<section class="pb-28">
	<div class="box text-center pb-4" data-aos="fade-up">
		<h1>
			{slice.primary.headline}
		</h1>
	</div>

	<div data-aos="fade-up">
		<Slider>
			{#each items as item, index}
				<div data-aos="fade-zoom-in" data-aos-delay={500 + index * 500} class="item flex flex-col lg:flex-row" style={calculateStyles(index, items.length)}>
					<div class="w-full lg:w-1/2" >
						<PrismicImage class="rounded-t-lg lg:rounded-t-none lg:!rounded-l-lg h-full object-cover aspect-[4/3] md:aspect-[6/3] lg:aspect-[4/3]" field={item.image} />
					</div>
				
					<div class="rounded-b-lg lg:rounded-b-none lg:!rounded-r-lg bg-white px-8 pt-10 pb-12 w-full lg:w-1/2 flex flex-col lg:justify-center lg:aspect-[4/3] h-full lg:h-auto">
						<h2 data-aos="fade" data-aos-delay={100 + index * 500}>
							{item.headline}
						</h2>
				
						<div class="text-sm text-neutral-600" data-aos="fade" data-aos-delay={500 + index * 500}>
							<PrismicText field={item.text} />
						</div>
					</div>
				</div>
			{/each}
		</Slider>
	</div>
</section>


<style>
	.flex.flex-col.lg\:flex-row:first-child {
		@media (max-width: 1024px) {	
			margin-left: 13px !important;
		}
	}

	.flex.flex-col.lg\:flex-row:last-child {
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