<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let slice: Content.FeaturedProjectsSlice;

	const items = slice.primary.items;
	const style = slice.primary.style || 'normal';
	const isFullscreen = style === 'fullscreen';

	let padding = 7.5;
	let splide: any; // Reference to the Splide instance
	let currentIndex = 0;
	let totalSlides = 0;

	$: {
		totalSlides = items.filter(item => isFilled.contentRelationship(item.project)).length;
	}

	$: isPrevDisabled = currentIndex === 0;
	$: isNextDisabled = currentIndex === totalSlides - 1;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight};`;
	};

	function getProjectData(item: any): any {
		return (item as any)?.project?.data;
	}

	function getProjectUid(item: any): string | null {
		return (item as any)?.project?.uid || null;
	}

	const splideOptions = {
		type: 'fade',
		rewind: false, // No looping
		pagination: false,
		arrows: false, // We'll use custom arrows
		heightRatio: 0.5
	};

	function goToNext() {
		if (splide && currentIndex < totalSlides - 1) {
			const newIndex = currentIndex + 1;
			splide.go('+1');
			currentIndex = newIndex; // Update immediately
		}
	}

	function goToPrev() {
		if (splide && currentIndex > 0) {
			const newIndex = currentIndex - 1;
			splide.go('-1');
			currentIndex = newIndex; // Update immediately
		}
	}

	function handleSplideMoved(event: any) {
		// Update currentIndex from the event as backup
		if (event && event.detail) {
			const newIndex = event.detail.index ?? event.detail.splide?.index;
			if (newIndex !== undefined && newIndex !== currentIndex) {
				currentIndex = newIndex;
			}
		}
	}

	function handleSplideReady(event: any) {
		// Initialize index when Splide is ready
		if (event && event.detail) {
			currentIndex = event.detail.splide?.index ?? event.detail.index ?? 0;
		} else if (splide) {
			currentIndex = splide.index ?? 0;
		}
	}
</script>

<section class="{isFullscreen ? 'pb-10' : 'pb-16'} {isFullscreen ? 'featured-projects-fullscreen' : ''}" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#if isFullscreen}
		<!-- Fullscreen with fade transitions -->
		<section class="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
			<Splide 
				bind:this={splide} 
				options={splideOptions}
				aria-label="Featured Projects Fade Carousel"
				on:splide:moved={handleSplideMoved}
				on:splide:ready={handleSplideReady}
			>
				{#each items as item, index}
					{#if isFilled.contentRelationship(item.project)}
						{@const projectData = getProjectData(item)}
						{@const projectUid = getProjectUid(item)}
						{@const linkUrl = projectUid ? `/projects/${projectUid}` : '#'}
						{@const image = projectData?.image}
						{@const video = projectData?.video}
						{@const title = projectData?.title}
						{@const subtitle = projectData?.subtitle}
						<SplideSlide>
							<a href={linkUrl} class="relative w-full block">
								<div>
									{#if video}
										<video src={video} poster={image?.url} class="object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
									{:else if image}
										<PrismicImage class="object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={image} />
									{/if}

									{#if title || subtitle}
										<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
											{#if title}
												<h2 class="pb-0">{title}</h2>
											{/if}
											{#if subtitle}
												<p class="text-base-mobile md:text-base mt-2 pl-1 mb-3.5">{subtitle}</p>
											{/if}
										</div>
									{/if}
								</div>
							</a>
						</SplideSlide>
					{/if}
				{/each}
			</Splide>
			
			<!-- Custom arrows matching normal slider design -->
			<div class="flex justify-center w-full pt-12" data-aos="fade-up" data-aos-delay={500}>
				<div class="ss-carousel__header">
					<div class="ss-carousel__controls">
						<button 
							class="ss-carousel__arrow arrow-prev {isPrevDisabled ? 'disabled' : ''}" 
							aria-label="Previous" 
							on:click={goToPrev}
							disabled={isPrevDisabled}
						></button>
						<button 
							class="ss-carousel__arrow arrow-next {isNextDisabled ? 'disabled' : ''}" 
							aria-label="Next" 
							on:click={goToNext}
							disabled={isNextDisabled}
						></button>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<!-- Normal slider mode -->
		<Slider>
			{#each items as item, index}
				{#if isFilled.contentRelationship(item.project)}
					{@const projectData = getProjectData(item)}
					{@const projectUid = getProjectUid(item)}
					{@const linkUrl = projectUid ? `/projects/${projectUid}` : '#'}
					{@const image = projectData?.image}
					{@const video = projectData?.video}
					{@const title = projectData?.title}
					{@const subtitle = projectData?.subtitle}
					<a href={linkUrl} class="w-[80vw] md:w-[85vw] relative rounded-lg overflow-hidden flex-shrink-0" style={calculateStyles(index, items.length)}>
						<div>
							{#if video}
								<video src={video} poster={image?.url} class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
							{:else if image}
								<PrismicImage class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={image} />
							{/if}

							{#if title || subtitle}
								<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
									{#if title}
										<h2 class="pb-0">{title}</h2>
									{/if}
									{#if subtitle}
										<p class="text-sm mt-2 pl-1 mb-3.5">{subtitle}</p>
									{/if}
								</div>
							{/if}
						</div>
					</a>
				{/if}
			{/each}
		</Slider>
	{/if}
</section>

<style>
	:global(.featured-projects-fullscreen .ss-carousel__header) {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	:global(.featured-projects-fullscreen .ss-carousel__controls) {
		display: grid;
		grid-auto-flow: column;
		grid-gap: 24px;
	}

	:global(.featured-projects-fullscreen .ss-carousel__arrow) {
		padding: 0;
		background: transparent;
		box-shadow: none;
		border: 0;
		position: relative;
		z-index: 10;
		transform: scale(0.8);
	}

	:global(.featured-projects-fullscreen .ss-carousel__arrow:before) {
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

	:global(.featured-projects-fullscreen .ss-carousel__arrow.arrow-prev:before) {
		transform: rotate(90deg);
	}

	:global(.featured-projects-fullscreen .ss-carousel__arrow.arrow-next:before) {
		transform: rotate(-90deg);
	}

	:global(.featured-projects-fullscreen .ss-carousel__arrow.disabled::before) {
		filter: brightness(4);
	}
</style>
