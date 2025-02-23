<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Button from '$lib/components/Button.svelte';

	export let slice: Content.HeadlineSlice;
</script>

<section class="pb-12 px-8 md:px-0" data-id={slice.primary.hash}>
	<div class="box">
		<div class="mx-auto max-w-3xl text-center" data-aos="fade" data-aos-delay={250}>
			<PrismicRichText field={slice.primary.headline} />
		</div>

		<div class="mx-auto max-w-2xl text-center {slice.primary.big ? 'text-base' : 'text-base'} text-[var(--text-primary-color)]" data-aos="fade" data-aos-delay={500}>
			<PrismicRichText field={slice.primary.text} />
		</div>

		{#if slice.primary.button.url}
			<div class="flex justify-center mt-8 md:mt-12" data-aos="fade" data-aos-delay={750} >
				<Button big data={slice.primary.button} />
			</div>
		{/if}
	</div>
</section>

