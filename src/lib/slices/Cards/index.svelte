<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.CardsSlice;
</script>

{#if !slice.primary.deactivated}
	<section class="box pb-28" data-id={slice.primary.hash}>
		<div class="text-center pb-4" data-aos="fade-up">
			<h2>
				{slice.primary.headline}
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
			{#each slice.primary.items as item, index}
				<div data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="card bg-[var(--secondary-color)] rounded-lg px-8 pt-10 pb-14">
					<div data-aos="fade" data-aos-delay={index * 250}>
						<PrismicRichText field={item.headline} />
					</div>

					<div class="text-base-mobile md:text-base text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={400 + index * 150}>
						<PrismicRichText field={item.text} />
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}