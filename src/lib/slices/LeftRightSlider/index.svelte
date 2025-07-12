<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage, PrismicRichText, PrismicLink } from '@prismicio/svelte';

	export let slice: Content.LeftRightSliderSlice;

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
		{#if slice.primary.headline}
			<div class="box text-center pb-0 lg:pb-4" data-aos="fade-up">
				<h2>
					{slice.primary.headline}
				</h2>
			</div>
		{/if}
		
		<div class="{slice.primary.mobile_simple ? 'hidden lg:block' : ''}">
			<div data-aos="fade-up">
				<Slider>
					{#each items as item, index}
						<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={200 + index * 250} style={calculateStyles(index, items.length)} class="item flex bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg overflow-hidden group">
							<div class="flex flex-col-reverse md:flex-row flex-row-reverse w-full justify-between">
								<div class="w-full md:w-1/2 px-6 md:px-10 flex flex-col justify-start py-10 md:py-12 h-full">
									<div data-aos="fade" data-aos-delay={100}>
										<PrismicRichText field={item.headline} />
									</div>
						
									<div class="text-[var(--text-secondary-color)] text-box" data-aos="fade" data-aos-delay={150}>
										<PrismicRichText field={item.text} />
									</div>

									<div class="text-[var(--text-secondary-color)] text-box mt-6" data-aos="fade" data-aos-delay={150}>
										<PrismicRichText field={item.text_2} />
									</div>
								</div>
						
								<div class="w-full md:w-1/2 overflow-hidden relative">
									{#if item.video}
										<video src={item.video} poster={item.image.url} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" playsinline autoplay muted loop />
									{:else}
										<PrismicImage class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" field={item.image} />
									{/if}
								</div>
							</div>
						</a>
					{/each}
				</Slider>
			</div>
		</div>

		<div class="{slice.primary.mobile_simple ? 'block lg:hidden box' : 'hidden'}">
			{#each items as item, index}
				<a href="{item.link && item.link.url}" data-aos="fade-zoom-in" data-aos-delay={200 + index * 250}  class="mb-4 item-simple flex bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg overflow-hidden group ">
					<div class="flex flex-col-reverse md:flex-row flex-row-reverse w-full justify-between">
						<div class="w-full md:w-1/2 px-6 md:px-10 flex flex-col justify-start py-10 md:py-12 h-full">
							<div data-aos="fade" data-aos-delay={100}>
								<PrismicRichText field={item.headline} />
							</div>
				
							<div class="text-[var(--text-secondary-color)] text-box" data-aos="fade" data-aos-delay={150}>
								<PrismicRichText field={item.text} />
							</div>

							<div class="text-[var(--text-secondary-color)] text-box mt-6" data-aos="fade" data-aos-delay={150}>
								<PrismicRichText field={item.text_2} />
							</div>
						</div>
				
						<div class="w-full md:w-1/2 overflow-hidden relative">
							{#if item.video}
								<video src={item.video} poster={item.image.url} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" playsinline autoplay muted loop />
							{:else}
								<PrismicImage class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" field={item.image} />
							{/if}
						</div>
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

	.mobile-image-container {
		height: 250px;
	}

	.mobile-text-container {
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 640px) {
		.mobile-image-container {
			height: 200px;
		}

		.mobile-text-container {
			min-height: 100px;
		}
	}

	.item-simple :global(img),
	.item-simple video,
	.item :global(img),
	.item video {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.item-simple .w-full.md\:w-1\/2.overflow-hidden,
	.item .w-full.md\:w-1\/2.overflow-hidden {
		min-height: 300px;
	}
</style>