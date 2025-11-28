<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.ExplanationSlice;
</script>

{#if !slice.primary.deactivated}
	<section class="pb-8" data-aos="fade-up" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		<div data-aos="fade-up" class="box-big">
			<div data-aos="fade-zoom-in" class="flex flex-col rounded-lg overflow-hidden h-full bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition">
				<div class="rounded-lg px-6 md:px-10 pt-6 md:pt-10 pb-8 md:pb-12 w-full flex-1 flex flex-col">
					{#if slice.primary.label}
						<h4 class="mb-0 pb-3" data-aos="fade">
							{slice.primary.label}
						</h4>
					{/if}
				
					{#if slice.primary.text}
						<div class="text-base-mobile md:text-base text-box text-[var(--text-secondary-color)] flex-1" data-aos="fade" data-aos-delay={150}>
							<PrismicRichText field={slice.primary.text} />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/if}
