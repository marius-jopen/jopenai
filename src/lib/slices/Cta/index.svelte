<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import Button from '$lib/components/Button.svelte';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.CtaSlice;

	let globalCtaHeader: string | null = null;
	let globalCtaText: string | null = null;
	let globalCtaLink: any = null;
	let globalCtaImage: any = null;
	let loading = false;

	// If link is filled, use only slice fields. Otherwise, use global fields as fallback
	$: hasManualLink = isFilled.link(slice.primary.button);
	$: headline = hasManualLink ? (slice.primary.headline || null) : (slice.primary.headline || globalCtaHeader || null);
	$: text = hasManualLink 
		? (isFilled.richText(slice.primary.text) ? slice.primary.text : null)
		: (isFilled.richText(slice.primary.text) ? slice.primary.text : (globalCtaText ? [{ type: 'paragraph', content: { text: globalCtaText } }] : null));
	$: button = hasManualLink ? slice.primary.button : (slice.primary.button || globalCtaLink);
	$: image = hasManualLink ? (isFilled.image(slice.primary.image) ? slice.primary.image : null) : (isFilled.image(slice.primary.image) ? slice.primary.image : globalCtaImage);
	$: hasImage = isFilled.image(image);
	// Only show if we have content and either: we have manual link (show immediately) OR we're done loading global content
	$: hasSliceContent = hasManualLink;
	$: hasContent = (headline || text || button || hasImage) && (hasSliceContent || (!loading && (globalCtaHeader || globalCtaText || globalCtaLink || globalCtaImage)));

	onMount(async () => {
		if (!browser) {
			return;
		}

		// If link is filled manually, don't fetch global data - use only slice fields
		if (isFilled.link(slice.primary.button)) {
			return;
		}

		// If no link, fetch all fields from global
		loading = true;
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch general page
			const generalPages = await client.getAllByType('general', { lang });
			
			if (generalPages.length > 0) {
				const generalData = generalPages[0].data;
				if (generalData.cta_header) {
					globalCtaHeader = generalData.cta_header;
				}
				if (generalData.cta_text) {
					globalCtaText = generalData.cta_text;
				}
				if (generalData.cta_link) {
					globalCtaLink = generalData.cta_link;
				}
				if (generalData.cta_image) {
					globalCtaImage = generalData.cta_image;
				}
			}
		} catch (error) {
			console.error('Error fetching global CTA data:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if !slice.primary.deactivated && hasContent}
	{#if hasImage}
		<!-- Box layout with image and white text -->
		<section class="box-big pb-28" data-id={slice.primary.hash}>
			<div class="relative w-full rounded-lg overflow-hidden">
				<PrismicImage 
					field={image} 
					class="absolute inset-0 w-full h-full object-cover rounded-2xl"
				/>
				
				<div class="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-10 py-12 md:py-20 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
					<div class="mx-auto md:w-9/12 text-center">
						{#if headline}
							<h2 data-aos="fade" class="text-white pb-5">
								{headline}
							</h2>
						{/if}
				
						{#if text}
							<div class="text-white pb-8 text-base-mobile md:text-base" data-aos="fade">
								{#if isFilled.richText(slice.primary.text)}
									<PrismicText field={slice.primary.text} />
								{:else}
									<p>{globalCtaText}</p>
								{/if}
							</div>
						{/if}

						{#if button}
							<div class="flex justify-center" data-aos="fade">
								<Button whiteBg={true} big={true} medium={false} data={button} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<!-- Box layout with black text -->
		<section class="box pb-28" data-id={slice.primary.hash}>
			<div class="bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg px-6 md:px-10 pt-16 pb-16 text-center">
				<div class="mx-auto md:w-9/12">
					{#if headline}
						<h2 data-aos="fade">
							{headline}
						</h2>
					{/if}
			
					{#if text}
						<div class="text-[var(--text-secondary-color)] pb-8 text-base-mobile md:text-base" data-aos="fade">
							{#if isFilled.richText(slice.primary.text)}
								<PrismicText field={slice.primary.text} />
							{:else}
								<p>{globalCtaText}</p>
							{/if}
						</div>
					{/if}

					{#if button}
						<div class="flex justify-center" data-aos="fade">
							<Button onwhite big={true} medium={false} data={button} />
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}
{/if}
