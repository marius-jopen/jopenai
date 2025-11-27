<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { onMount, onDestroy } from 'svelte';

	export let slice: Content.LogosAnimatedSlice;

	// Configurable timing variables
	// How long each logo stays visible before starting to fade out (in milliseconds)
	const LOGO_DISPLAY_TIME = 3000; // 3 seconds
	
	// Delay between when each logo starts its fade-out animation (in milliseconds)
	const STAGGER_DELAY = 500; // 1 second - next logo starts fading 1 second after the previous one

	const items = slice.primary.items || [];
	const totalLogos = items.length;
	const visibleCount = 4; // Always show 4 logos

	// Track the starting index for each visible logo position
	let offsets = [0, 1, 2, 3];
	let intervalId: ReturnType<typeof setInterval>;
	let timeoutIds: ReturnType<typeof setTimeout>[] = [];
	let rotationKey = 0; // Key to force re-render for transitions
	let isRotating = false;
	let fadingOut = [false, false, false, false]; // Track which logos are fading out

	function rotateSingleLogo(position: number) {
		if (totalLogos === 0 || position < 0 || position >= visibleCount) return;
		
		// First fade out the current logo
		fadingOut[position] = true;
		fadingOut = [...fadingOut];
		
		// After fade out completes, change logo and fade in
		setTimeout(() => {
			// Increment this specific logo's offset, wrapping around to ensure continuous loop
			const newOffset = (offsets[position] + visibleCount) % totalLogos;
			offsets[position] = newOffset;
			rotationKey++; // Increment key to trigger re-render
			offsets = [...offsets]; // Create new array reference to trigger reactivity
			
			// Fade in the new logo
			fadingOut[position] = false;
			fadingOut = [...fadingOut];
		}, 250); // Half of fade duration for smooth transition
	}

	function rotateLogosStaggered() {
		if (totalLogos === 0 || isRotating) return;
		
		isRotating = true;
		
		// Clear any existing timeouts
		timeoutIds.forEach(id => clearTimeout(id));
		timeoutIds = [];
		
		// Rotate each logo with a staggered delay
		for (let i = 0; i < visibleCount; i++) {
			const timeoutId = setTimeout(() => {
				rotateSingleLogo(i);
				// After the last logo rotates, mark rotation as complete
				if (i === visibleCount - 1) {
					setTimeout(() => {
						isRotating = false;
					}, 500);
				}
			}, i * STAGGER_DELAY);
			timeoutIds.push(timeoutId);
		}
	}

	onMount(() => {
		// Start rotation if we have logos
		if (totalLogos >= visibleCount) {
			// Calculate total time for one complete rotation cycle
			// This is the display time plus the stagger delays for all logos
			const totalCycleTime = LOGO_DISPLAY_TIME + (visibleCount * STAGGER_DELAY);
			intervalId = setInterval(rotateLogosStaggered, totalCycleTime);
		}
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		timeoutIds.forEach(id => clearTimeout(id));
	});

	// Reactive function to get logo for position
	$: getLogoForPosition = (position: number) => {
		const index = offsets[position];
		return items[index];
	};
</script>

{#if totalLogos > 0}
	<section class="box pb-12" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3" data-aos="fade-up">
			{#each Array(visibleCount) as _, position}
				{@const logoIndex = offsets[position] ?? position}
				{@const logo = items[logoIndex]}
				<div data-aos="fade-zoom-in" data-aos-delay={100 + position * 150} class="logo-container {fadingOut[position] ? 'fade-out' : 'fade-in'}">
					<div class="px-8 pt-1 pb-1 mb-2 md:mb-4">
						{#if logo?.image}
							<PrismicImage field={logo.image} />
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if slice.primary.headline}
			<div class="text-center pt-4 text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={100 + visibleCount * 150}>
				{slice.primary.headline}
			</div>
		{/if}
	</section>
{/if}

<style>
	.logo-container.fade-in {
		animation: fadeIn 0.5s ease-in-out;
		opacity: 1;
	}

	.logo-container.fade-out {
		animation: fadeOut 0.5s ease-in-out;
		opacity: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
