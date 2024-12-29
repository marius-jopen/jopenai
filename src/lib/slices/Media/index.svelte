<script lang="ts">
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.MediaSlice;
</script>

<section class="pb-28 box" data-id={slice.primary.hash}>
	<div class="md:px-8" data-aos="fade-up">
		<PrismicImage class="w-full rounded-lg" field={slice.primary.image} />	

		<div class="mx-auto text-neutral-500 pt-3 text-sm text-center mx-auto md:w-8/12">
			<PrismicText field={slice.primary.text} />
		</div>
	</div>
</section>

