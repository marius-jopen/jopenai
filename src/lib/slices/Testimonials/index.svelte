<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.TestimonialsSlice;

	const items = slice.primary.items;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2);
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};
</script>

<section class="pb-28" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Slider>
		{#each items as item, index}
			<div class="item relative rounded-lg overflow-hidden flex-shrink-0 bg-[var(--secondary-color)] aspect-[3/4] lg:aspect-[16/7]" style={calculateStyles(index, items.length)}>
				<div class="w-full h-full flex flex-col items-center justify-center px-6 py-8 text-center">
					{#if item.company}
						<div data-aos="fade" class="text-[var(--text-secondary-color)] mb-4">
							<p class="">{item.company}</p>
						</div>
					{/if}

					{#if item.quote}
						<div data-aos="fade" data-aos-delay={50} class="mx-auto max-w-3xl text-[var(--text-primary-color)] mb-4">
							<h3>"{item.quote}"</h3>
						</div>
					{/if}

					{#if item.portrait}
						<div class="mb-4" data-aos="fade" data-aos-delay={100}>
							<PrismicImage field={item.portrait} class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mx-auto" />
						</div>
					{/if}

					{#if item.name || item.position}
						<div data-aos="fade" data-aos-delay={150} class="text-[var(--text-secondary-color)]">
							<p class="text-sm">
								{#if item.name}<span class="font-semibold">{item.name}</span>{/if}
								{#if item.name && item.position} - {/if}
								{#if item.position}{item.position}{/if}
							</p>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</Slider>
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
