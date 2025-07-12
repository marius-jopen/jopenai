<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage, PrismicRichText, PrismicLink } from '@prismicio/svelte';

	export let slice: Content.HighlightsSlice;

	const items = slice.primary.items;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2) ; 
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};
</script>

{#if !slice.primary.deactivated}
	<section class="pb-24" data-id={slice.primary.hash}>
		<div class="box text-center pb-0 lg:pb-4" data-aos="fade-up">
			<h2>
				{slice.primary.headline}
			</h2>
		</div>
		
		<div class="{slice.primary.mobile_simple ? 'hidden lg:block' : ''}">
			<div data-aos="fade-up">
				<Slider>
					{#each items as item, index}
						<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={200 + index * 250} style={calculateStyles(index, items.length)} class="item">
							<div class="w-full rounded-lg overflow-hidden   aspect-[4/3] md:aspect-[6/3] lg:aspect-[5/3]" >
								{#if item.video}
									<video src={item.video} poster={item.image.url} class="w-full object-cover h-full scale-105" autoplay muted loop playsinline />
								{:else}
									<PrismicImage class="w-full object-cover h-full scale-105" field={item.image} />
								{/if}
							</div>
		
							<div class="text-center text-[var(--text-secondary-color)] pt-3 pb-4">
								<PrismicRichText field={item.text} />
							</div>
						</a>
					{/each}
				</Slider>
			</div>
		</div>

		<div class="{slice.primary.mobile_simple ? 'block lg:hidden box' : 'hidden'}">
			{#each items as item, index}
				<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={200 + index * 250} style={calculateStyles(index, items.length)} class="item">
					<div class="w-full rounded-lg overflow-hidden aspect-[4/3] md:aspect-[6/3] lg:aspect-[5/3]" >
						{#if item.video}
							<video src={item.video} poster={item.image.url} class="w-full object-cover h-full scale-105" autoplay muted loop playsinline />
						{:else}
							<PrismicImage class="w-full object-cover h-full scale-105" field={item.image} />
						{/if}
					</div>

					<div class="text-center text-[var(--text-secondary-color)] pt-3 pb-8 px-8">
						<PrismicRichText field={item.text} />
					</div>
				</a>
			{/each}
		</div>
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
