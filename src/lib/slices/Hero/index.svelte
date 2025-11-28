<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { isFilled } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.HeroSlice;

	const items = slice.primary.items;
	const style = slice.primary.style || 'normal';
	const isFullscreen = style === 'fullscreen';
	const hasMultipleItems = items.length > 1;

	let padding = 13;

	const calculateStyles = (index: number, itemsLength: number): string => {
		if (isFullscreen) {
			return '';
		}
		const marginLeft = index === 0 ? padding + 'px' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'px' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight};`;
	};

	function getLinkUrl(item: any): string {
		if (isFilled.link(item.link)) {
			return (item.link as any).url || '#';
		}
		return '#';
	}
</script>

{#if !slice.primary.deactivated}
	<section class="pb-28 {isFullscreen ? 'hero-fullscreen' : ''}" data-id={slice.primary.hash}>
		{#if hasMultipleItems}
			<Slider>
				{#each items as item, index}
					<a href={getLinkUrl(item)} class="{isFullscreen ? 'w-screen' : 'w-[80vw] md:w-[85vw]'} relative {isFullscreen ? '' : 'rounded-lg'} overflow-hidden flex-shrink-0" style={calculateStyles(index, items.length)}>
						<div>
							{#if item.video}
								<video src={item.video} poster={item.image.url} class="{isFullscreen ? '' : 'rounded-lg'} object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
							{:else}
								<PrismicImage class="{isFullscreen ? '' : 'rounded-lg'} object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={item.image} />
							{/if}

							<h2 data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
								{item.text}
							</h2>
						</div>
					</a>
				{/each}
			</Slider>
		{:else}
			{#each items as item}
				<a href={getLinkUrl(item)} class="w-full relative {isFullscreen ? '' : 'rounded-lg'} overflow-hidden block">
					<div>
						{#if item.video}
							<video src={item.video} poster={item.image.url} class="{isFullscreen ? '' : 'rounded-lg'} object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
						{:else}
							<PrismicImage class="{isFullscreen ? '' : 'rounded-lg'} object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={item.image} />
						{/if}

						<h2 data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
							{item.text}
						</h2>
					</div>
				</a>
			{/each}
		{/if}
	</section>
{/if}

<style>
	:global(.hero-fullscreen .ss-carousel__content) {
		grid-gap: 0 !important;
	}
</style>