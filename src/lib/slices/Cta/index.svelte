<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import Button from '$lib/components/Button.svelte';
	export let slice: Content.CtaSlice;

	const hasImage = isFilled.image(slice.primary.image);
</script>

{#if !slice.primary.deactivated}
	{#if hasImage}
		<!-- Full-screen with image and white text -->
		<section class="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-28" data-id={slice.primary.hash}>
			<div class="relative w-full pb-8 overflow-hidden">
				<PrismicImage 
					field={slice.primary.image} 
					class="absolute inset-0 w-full h-full object-cover"
				/>
				
				<div class="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-10 py-12 md:py-20">
					<div class="mx-auto md:w-9/12 text-center">
						{#if slice.primary.headline}
							<h2 data-aos="fade" class="text-white pb-5">
								{slice.primary.headline}
							</h2>
						{/if}
				
						{#if slice.primary.text}
							<div class="text-white pb-8 text-base-mobile md:text-base" data-aos="fade">
								<PrismicText field={slice.primary.text} />
							</div>
						{/if}

						{#if isFilled.link(slice.primary.button)}
							<div class="flex justify-center" data-aos="fade">
								<Button whiteBg={true} big={true} medium={false} data={slice.primary.button} />
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
					{#if slice.primary.headline}
						<h2 data-aos="fade">
							{slice.primary.headline}
						</h2>
					{/if}
			
					{#if slice.primary.text}
						<div class="text-[var(--text-secondary-color)] pb-8 text-base-mobile md:text-base" data-aos="fade">
							<PrismicText field={slice.primary.text} />
						</div>
					{/if}

					{#if isFilled.link(slice.primary.button)}
						<div class="flex justify-center" data-aos="fade">
							<Button onwhite big={true} medium={false} data={slice.primary.button} />
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}
{/if}
