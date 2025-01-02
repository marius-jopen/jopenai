<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.CardsSlice;
</script>

<section class="box pb-28" data-id={slice.primary.hash}>
	<div class="text-center pb-4" data-aos="fade-up">
		<h2>
			{slice.primary.headline}
		</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-3" data-aos="fade-up">
		{#each slice.primary.items as item, index}
			<div data-aos="fade-zoom-in" data-aos-delay={200 + index * 250} class="card bg-white rounded-lg px-8 pt-12 pb-14">
				<h3 data-aos="fade" data-aos-delay={100 + index * 250}>
					{item.headline}
				</h3>

				<div class="text-sm text-neutral-600" data-aos="fade" data-aos-delay={500 + index * 250}>
					<PrismicText field={item.text} />
				</div>
			</div>
		{/each}
	</div>
</section>
