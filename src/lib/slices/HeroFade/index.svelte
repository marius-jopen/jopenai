<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	export let slice: Content.HeroFadeSlice;

	const items = slice.primary.items;

	let splide; // Reference to the Splide instance
	let innerWidth; // This will be bound to the window's inner width
	let isMobile = false;

	let splideOptions = {
		type: 'fade',
		heightRatio: 1 / 2, // Default value, will be updated
		rewind: true,
		pagination: false,
		autoplay: true,
		interval: 3000,
		arrows: false // Disable default arrows
	};

	$: {
		isMobile = innerWidth < 1024; // Determine if the view is mobile based on innerWidth
		splideOptions.heightRatio = isMobile ? 4 / 3 : 1 / 2;
	}

	function goToNext() {
		if (splide) {
			splide.go('+1'); // Go to the next slide
		}
	}
</script>

<svelte:window bind:innerWidth />

<section data-aos="fade-up" class="pb-28 pt-0" data-id={slice.primary.hash}>
	<Splide 
		bind:this={splide} 
		options={splideOptions}
		aria-label="Hero Fade Carousel"
	>
		{#each items as item, index}
			<SplideSlide>
				<div on:click={goToNext} class="px-3 md:px-8 w-full relative cursor-pointer h-full">
					{#if item.video}
						<video src={item.video} poster={item.image.url} class="bg-[var(--secondary-color)] rounded-lg overflow-hidden object-cover w-full aspect-auto h-full lg:aspect-[16/8]" playsinline autoplay muted loop />
					{:else}
						<PrismicImage class="bg-[var(--secondary-color)] rounded-lg overflow-hidden  object-cover w-full aspect-auto h-full lg:aspect-[16/8]" field={item.image} />
					{/if}

					<h1 data-aos="fade" class="text-[var(--text-tertiary-color)] px-10 md:px-20 pb-7 text-center absolute top-0 left-0 w-full h-full flex items-center mt-8">
						{item.text}
					</h1>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
</section>

<style lang="postcss">
	.ss-carousel__controls {
		display: grid;
		grid-auto-flow: column;
		grid-gap: 24px;
	}

	.ss-carousel__arrow {
		padding: 0;
		background: transparent;
		box-shadow: none;
		border: 0;
		position: relative;
		z-index: 10;
		transform: scale(0.8);
	}

	.ss-carousel__arrow:before {
		content: '';
		background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTUgOSI+Cgk8cGF0aCBmaWxsPSIjMzMzMzMzIiBkPSJNNy44NjcgOC41NzRsLTcuMjItNy4yMi43MDctLjcwOEw3Ljg2NyA3LjE2IDE0LjA1Ljk4bC43MDYuNzA3Ii8+Cjwvc3ZnPgo=');
		background-size: contain;
		filter: brightness(1);
		display: block;
		width: 38px;
		height: 23px;
		cursor: pointer;
		transition: filter 0.5s ease-in-out;
	}

	.ss-carousel__arrow.arrow-prev:before {
		transform: rotate(90deg);
	}

	.ss-carousel__arrow.arrow-next:before {
		transform: rotate(-90deg);
	}

	.ss-carousel__arrow.disabled::before {
		filter: brightness(4);
	}
</style>