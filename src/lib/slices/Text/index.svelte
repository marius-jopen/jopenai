<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.TextSlice;
</script>

{#if !slice.primary.deactivated}
	<section class="pb-12 box" data-id={slice.primary.hash}>
		{#if slice.primary.headline}
			<div class="text-center pb-4" data-aos="fade-up">
				<h2>
					{slice.primary.headline}
				</h2>
			</div>
		{/if}

		<div class="px-8" data-aos="fade-up">
			<div class="mx-auto max-w-2xl leading-relaxed text-box {slice.primary.centered ? 'text-center' : ''}">
				<PrismicRichText field={slice.primary.text} />
			</div>
		</div>
	</section>
{/if}

