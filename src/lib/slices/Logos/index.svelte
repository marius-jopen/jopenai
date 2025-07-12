<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.LogosSlice;
</script>

{#if !slice.primary.deactivated}
	<section class="box pb-28" data-id={slice.primary.hash}>
		<!-- {#if slice.primary.headline}
			<h3 class="text-center pb-8 text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={300 + slice.primary.items.length * 150}>
				{slice.primary.headline}
			</h3>
		{/if} -->

		<div class="grid grid-cols-2 md:grid-cols-6 gap-3" data-aos="fade-up">
			{#each slice.primary.items as item, index}
				<div data-aos="fade-zoom-in " data-aos-delay={100 + index * 150}>
					<div class="px-8 pt-1 pb-1 mb-2 md:mb-4">
						<PrismicImage field={item.image} />
					</div>
				</div>
			{/each}
		</div>

		{#if slice.primary.headline}
			<div class="text-center pt-8 text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={300 + slice.primary.items.length * 150}>
				{slice.primary.headline}
			</div>
		{/if}
	</section>
{/if}