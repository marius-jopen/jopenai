<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let slice: Content.HeroFadeSlice;

	const items = slice.primary.items;
	let splide; // Reference to the Splide instance
	let isMobile = false;

	onMount(() => {
		const updateMedia = () => {
			isMobile = window.innerWidth < 1024; // Adjust the breakpoint as needed
			console.log('Window resized. Is mobile:', isMobile); // Added log for resize
		};

		updateMedia();
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	});

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
			heightRatio: isMobile ? 4 / 3 : 0.5,
			rewind: true,
			pagination: false,
			// autoplay: true,
			interval: 3000,
			arrows: false // Disable default arrows
		}} 
		aria-label="Hero Fade Carousel"
	>
		{#each items as item, index}
			<SplideSlide>
				<div on:click={goToNext} class="w-full relative cursor-pointer h-full">
					{#if item.video}
						<video src={item.video} poster={item.image.url} class="object-cover w-full aspect-auto h-full lg:aspect-[16/8]" playsinline autoplay muted loop />
					{:else}
						<PrismicImage class="object-cover w-full aspect-auto h-full lg:aspect-[16/8]" field={item.image} />
					{/if}

					<h1 data-aos="fade" class="text-white px-6 pb-7 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
						{item.text}
					</h1>
				</div>
			</SplideSlide>
		{/each}
	</Splide>

	<div class="flex justify-center mt-4 ss-carousel__controls pt-2" data-aos="fade-up" data-aos-delay={500}>
		<button on:click={goToPrev} class="ss-carousel__arrow disabled arrow-prev" aria-label="Previous"></button>
		<button on:click={goToNext} class="ss-carousel__arrow arrow-next" aria-label="Next"></button>
	</div>
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