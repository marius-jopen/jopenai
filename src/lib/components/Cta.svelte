<script lang="ts">
	import { onMount } from 'svelte';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import Button from '$lib/components/Button.svelte';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	// Optional props - if not provided, will fetch from global
	export let headline: string | null = null;
	export let text: any = null; // RichText or plain text
	export let button: any = null; // Link field
	export let image: any = null; // Image field

	let globalCtaHeader: string | null = null;
	let globalCtaText: string | null = null;
	let globalCtaLink: any = null;
	let globalCtaImage: any = null;
	let loading = false;

	// Use provided values or global values
	$: displayHeadline = headline || globalCtaHeader || null;
	$: displayText = text || (globalCtaText ? [{ type: 'paragraph', content: { text: globalCtaText } }] : null);
	$: displayButton = button || globalCtaLink;
	$: displayImage = image || globalCtaImage;
	$: hasImage = isFilled.image(displayImage);
	$: hasProvidedContent = headline || text || button || image;
	$: hasContent = (displayHeadline || displayText || displayButton || hasImage) && (hasProvidedContent || (!loading && (globalCtaHeader || globalCtaText || globalCtaLink || globalCtaImage)));

	onMount(async () => {
		// Only fetch if props not provided
		if (headline && (text || button || image)) {
			return;
		}

		if (!browser) {
			return;
		}

		loading = true;
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch general page
			const generalPages = await client.getAllByType('general', { lang });
			
			if (generalPages.length > 0) {
				const generalData = generalPages[0].data;
				if (!headline && generalData.cta_header) {
					globalCtaHeader = generalData.cta_header;
				}
				if (!text && generalData.cta_text) {
					globalCtaText = generalData.cta_text;
				}
				if (!button && generalData.cta_link) {
					globalCtaLink = generalData.cta_link;
				}
				if (!image && generalData.cta_image) {
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

{#if hasContent}
	{#if hasImage}
		<!-- Box layout with image and white text -->
		<section class="box-big pb-28">
			<div class="relative w-full rounded-lg overflow-hidden">
				<PrismicImage 
					field={displayImage} 
					class="absolute inset-0 w-full h-full object-cover rounded-2xl"
				/>
				
				<div class="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-10 py-12 md:py-20 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
					<div class="mx-auto md:w-9/12 text-center">
						{#if displayHeadline}
							<h2 data-aos="fade" class="text-white pb-5">
								{displayHeadline}
							</h2>
						{/if}
				
						{#if displayText}
							<div class="text-white pb-8 text-base-mobile md:text-base" data-aos="fade">
								{#if isFilled.richText(text)}
									<PrismicText field={text} />
								{:else}
									<p>{globalCtaText}</p>
								{/if}
							</div>
						{/if}

						{#if displayButton}
							<div class="flex justify-center" data-aos="fade">
								<Button whiteBg={true} big={true} medium={false} data={displayButton} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<!-- Box layout with black text -->
		<section class="box pb-28">
			<div class="bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg px-6 md:px-10 pt-16 pb-16 text-center">
				<div class="mx-auto md:w-9/12">
					{#if displayHeadline}
						<h2 data-aos="fade">
							{displayHeadline}
						</h2>
					{/if}
			
					{#if displayText}
						<div class="text-[var(--text-secondary-color)] pb-8 text-base-mobile md:text-base" data-aos="fade">
							{#if isFilled.richText(text)}
								<PrismicText field={text} />
							{:else}
								<p>{globalCtaText}</p>
							{/if}
						</div>
					{/if}

					{#if displayButton}
						<div class="flex justify-center" data-aos="fade">
							<Button onwhite big={true} medium={false} data={displayButton} />
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}
{/if}

