<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	export let slice: Content.HeroFadeSlice;

	const items = slice.primary.items;
	let splide; // Reference to the Splide instance

	function goToPrev() {
		if (splide) {
			splide.go('-1'); // Go to the previous slide
		}
	}

	function goToNext() {
		if (splide) {
			splide.go('+1'); // Go to the next slide
		}
	}
</script>

<section class="pb-28" data-id={slice.primary.hash}>
	<Splide 
		bind:this={splide} 
		options={{ 
			type: 'fade', 
			heightRatio: 0.5,
			rewind: true,
			pagination: false,
			autoplay: true,
			interval: 3000,
			arrows: false // Disable default arrows
		}} 
		aria-label="Hero Fade Carousel"
	>
		{#each items as item, index}
			<SplideSlide>
				<div on:click={goToNext} class="w-full relative cursor-pointer">
					<div>
						{#if item.video}
							<video src={item.video} poster={item.image.url} class="object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop />
						{:else}
							<PrismicImage class="object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={item.image} />
						{/if}

						<h1 data-aos="fade" class="text-white px-6 pb-7 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
							{item.text}
						</h1>
					</div>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
</section>