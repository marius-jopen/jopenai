<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.HeadlineSlice;
</script>

<section class="pb-28">
	<div class="box">
		<h1 class="mx-auto max-w-2xl text-center" data-aos="fade-up">
			<PrismicText field={slice.primary.headline} />
		</h1>

		<div class="mx-auto max-w-2xl text-center text-sm text-neutral-600" data-aos="fade" data-aos-delay={1000}>
			<PrismicText field={slice.primary.text} />
		</div>
	</div>
</section>

