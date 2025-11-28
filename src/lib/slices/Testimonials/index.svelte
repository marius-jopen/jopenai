<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import type { GeneralDocument } from '../../../prismicio-types';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.TestimonialsSlice;

	let globalTestimonials: any[] = [];
	let globalHeadline: string | null = null;
	let globalSubheadline: string | null = null;
	let loading = false;
	
	// Determine which items to use: slice items if they exist, otherwise global testimonials
	$: sliceItems = slice.primary.items || [];
	$: hasSliceItems = sliceItems.length > 0;
	$: items = hasSliceItems ? sliceItems : globalTestimonials;
	// Only show if we have items AND either: we have slice items (show immediately) OR we're done loading global testimonials
	// On mobile, ensure we show even during initial load if we have slice items
	$: shouldShow = items.length > 0 && (hasSliceItems || (!loading && globalTestimonials.length > 0));
	// Only show headline/subheadline when using global testimonials (when slice has no items)
	$: showGlobalHeadlines = !hasSliceItems && (globalHeadline || globalSubheadline);

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2);
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};

	// Map global testimonial to slice format (image -> portrait)
	function mapGlobalTestimonial(globalItem: any) {
		return {
			...globalItem,
			portrait: globalItem.image || null
		};
	}

	onMount(async () => {
		// Only fetch if slice doesn't have items
		const sliceItems = slice.primary.items || [];
		if (sliceItems.length > 0) {
			return;
		}

		if (!browser) {
			return;
		}

		loading = true;
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch general page (it's not repeatable, so get first one)
			const generalPages = await client.getAllByType('general', { lang });
			
			if (generalPages.length > 0) {
				const generalData = generalPages[0].data;
				if (generalData.testimonial) {
					// Map global testimonials to match slice format
					globalTestimonials = generalData.testimonial.map(mapGlobalTestimonial);
				}
				// Store headline and subheadline
				globalHeadline = generalData.testimonial_headline || null;
				globalSubheadline = generalData.testimonial_subheadline || null;
			}
		} catch (error) {
			console.error('Error fetching global testimonials:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if shouldShow}
	<section class="pb-14" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		{#if showGlobalHeadlines}
			<div class="box pb-6">
				{#if globalHeadline}
					<div class="mx-auto max-w-3xl text-center px-4 md:px-0" data-aos="fade" data-aos-delay={250}>
						<h2>{globalHeadline}</h2>
					</div>
				{/if}

				{#if globalSubheadline}
					<div class="mx-auto max-w-2xl text-center px-4 md:px-0 pb-6 -mt-2 text-base text-[var(--text-primary-color)]" data-aos="fade" data-aos-delay={500}>
						<p>{globalSubheadline}</p>
					</div>
				{/if}
			</div>
		{/if}
		<Slider>
			{#each items as item, index}
				<div class="item relative rounded-lg overflow-hidden flex-shrink-0 bg-[var(--secondary-color)] aspect-[3/4] lg:aspect-[16/7]" style={calculateStyles(index, items.length)}>
					<div class="w-full h-full flex flex-col items-center justify-center px-6 py-8 text-center">
						{#if item.company}
							<div data-aos="fade" class="text-[var(--text-secondary-color)] mb-4">
								<p class="">{item.company}</p>
							</div>
						{/if}

						{#if item.quote}
							<div data-aos="fade" data-aos-delay={50} class="mx-auto max-w-3xl text-[var(--text-primary-color)] mb-4">
								<h3>"{item.quote}"</h3>
							</div>
						{/if}

						{#if item.portrait}
							<div class="mb-4" data-aos="fade" data-aos-delay={100}>
								<PrismicImage field={item.portrait} class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mx-auto" />
							</div>
						{/if}

						{#if item.name || item.position}
							<div data-aos="fade" data-aos-delay={150} class="text-[var(--text-secondary-color)]">
								<p class="text-sm">
									{#if item.name}<span class="font-semibold">{item.name}</span>{/if}
									{#if item.name && item.position} - {/if}
									{#if item.position}{item.position}{/if}
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</Slider>
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
