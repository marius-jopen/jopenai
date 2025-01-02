<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.LogosSlice;
</script>

<section class="box pb-28" data-id={slice.primary.hash}>
	<div class="text-center pb-4" data-aos="fade-up">
		<h2>
			{slice.primary.headline}
		</h2>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-6 gap-3" data-aos="fade-up">
		{#each slice.primary.items as item, index}
			<div data-aos="fade-zoom-in" data-aos-delay={200 + index * 500}>
				<div class="bg-white rounded-lg px-2 py-2">
					<PrismicImage field={item.image} />
				</div>
			</div>
		{/each}
	</div>
</section>
