<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';

	export let slice: Content.HeroSlice;

	const items = slice.primary.items;

	let padding = 13;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const marginLeft = index === 0 ? padding + 'px' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'px' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight};`;
	};
</script>

<section class="pb-28" data-id={slice.primary.hash}>
	<Slider>
		{#each items as item, index}
			<div class="w-[90vw] md:w-[95vw] relative rounded-lg overflow-hidden" style={calculateStyles(index, items.length)}>
				<div>
					{#if item.video}
						<video src={item.video} poster={item.image.url} class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop />
					{:else}
						<PrismicImage class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={item.image} />
					{/if}

					<h1 data-aos="fade" class="text-white px-6 py-3 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
						{item.text}
					</h1>
				</div>
			</div>
		{/each}
	</Slider>
</section>