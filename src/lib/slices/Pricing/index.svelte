<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Button from '$lib/components/Button.svelte';
	import Slider from '$lib/components/slider.svelte';

	export let slice: Content.PricingSlice;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2) ; 
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};
</script>

{#if !slice.primary.deactivated}
	<section class=" pb-28">
		<div class="box-big hidden md:grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
			{#each slice.primary.items as item, index}
				<div data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class=" card   rounded-lg px-6 md:px-10 pt-10 pb-14 transition-colors duration-200 color-transition  bg-[var(--secondary-color)] md:hover:bg-[var(--tertiary-color)] ">
					<div class="flex flex-col justify-between h-full ">
						<div>
							<h3 class="text-center border-b mb-6 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
								{item.headline}
							</h3>
			
							{#if item.price}
								<h4 class="text-center border-b mb-4 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
									{item.price}
								</h4>
							{/if}

							{#if item.subheadline.length > 0}
								<div class="text-box text-center text-base-mobile md:text-base pb-0 border-b mb-6 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
									<PrismicRichText field={item.subheadline} />
								</div>
							{/if}

							{#if item.text.length > 0}
								<div class="text-box text-center text-base-mobile md:text-base border-b pb-4 mb-6 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
									<PrismicRichText field={item.text} />
								</div>
							{/if}

							{#if item.info.length > 0}
								<div class="text-box text-center text-base-mobile md:text-base pb-4" data-aos="fade" data-aos-delay={index * 250}>
									<PrismicRichText field={item.info} />
								</div>
							{/if}
						</div>
		
						{#if item.button.url}
							<div class="flex justify-center mt-8 md:mt-12" data-aos="fade" data-aos-delay={400 + index * 150} >
								<Button onwhite big data={item.button} />
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<div class="block md:hidden" data-aos="fade-up">
			<Slider>
				{#each slice.primary.items as item, index}
					<div data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="item rounded-lg px-6 md:px-10 pt-10 pb-14 color-transition transition-colors duration-200  bg-[var(--secondary-color)] md:hover:bg-[var(--tertiary-color)] " style={calculateStyles(index, slice.primary.items.length)}>
						<div class="flex flex-col justify-between h-full ">
							<div>
								<h3 class="text-center border-b mb-6 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
									{item.headline}
								</h3>
				
								{#if item.price}
									<h4 class="text-center border-b mb-4 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
										{item.price}
									</h4>
								{/if}
		
								{#if item.subheadline.length > 0}
									<div class="text-box text-center text-center text-base-mobile md:text-base pb-2 border-b mb-6 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
										<PrismicRichText field={item.subheadline} />
									</div>
								{/if}
				
								{#if item.text.length > 0}
									<div class="text-box text-center text-base-mobile md:text-base border-b mb-6 pb-4 border-[var(--text-quaternary-color)]" data-aos="fade" data-aos-delay={index * 250}>
										<PrismicRichText field={item.text} />
									</div>
								{/if}
		
								{#if item.info.length > 0}
									<div class="text-box text-center text-base-mobile md:text-base pb-4" data-aos="fade" data-aos-delay={index * 250}>
										<PrismicRichText field={item.info} />
									</div>
								{/if}
							</div>
			
							{#if item.button.url}
								<div class="flex justify-center mt-8 md:mt-12" data-aos="fade" data-aos-delay={400 + index * 150} >
									<Button onwhite big data={item.button} />
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</Slider>
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