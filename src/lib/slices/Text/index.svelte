<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';
	export let slice: Content.TextSlice;
</script>

<section class="pb-28 box" data-id={slice.primary.hash}>
	<div class="px-8" data-aos="fade-up">
		<div class="mx-auto max-w-2xl leading-relaxed">
			<PrismicText field={slice.primary.text} />
		</div>
	</div>
</section>

