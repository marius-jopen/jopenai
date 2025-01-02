<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.HeadlineSlice;
</script>

<section class="pb-28 px-8 md:px-0" data-id={slice.primary.hash}>
	<div class="box">
		{#if slice.primary.big}
			<h1 class="mx-auto text-center" data-aos="fade-up">
				<PrismicText field={slice.primary.headline} />
			</h1>
		{:else}
			<h2 class="mx-auto max-w-2xl text-center" data-aos="fade-up">
				<PrismicText field={slice.primary.headline} />
			</h2>
		{/if}

		<div class="mx-auto max-w-2xl text-center {slice.primary.big ? 'text-base' : 'text-sm'} text-neutral-500" data-aos="fade" data-aos-delay={1000}>
			<PrismicText field={slice.primary.text} />
		</div>
	</div>
</section>

