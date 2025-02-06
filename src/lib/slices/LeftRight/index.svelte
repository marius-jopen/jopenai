<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.LeftRightSlice;
</script>

<section class="pb-28" data-id={slice.primary.hash}>
	<div class="box" data-aos="fade-up">
		<a href="{slice.primary.link && slice.primary.link.url}" class="rounded-lg border border-neutral-200 overflow-hidden flex flex-col-reverse {slice.primary.switched ? 'md:flex-row-reverse' : 'md:flex-row'} w-full">
			<div class="w-full md:w-1/2 bg-white px-10 flex flex-col justify-center py-10 md:py-12">
				<h2 data-aos="fade" data-aos-delay={100}>
					{slice.primary.headline}
				</h2>
	
				<div class="text-neutral-600 text-box" data-aos="fade" data-aos-delay={250}>
					<PrismicRichText field={slice.primary.text} />
				</div>
			</div>
	
			<div class="flex flex-col md:flex-row w-full md:w-1/2  {slice.primary.switched ? 'border-r' : 'border-l'} border-neutral-200">
				{#if slice.primary.video}
					<video src={slice.primary.video} poster={slice.primary.image.url} class="w-full aspect-[16/12] md:aspect-[12/9] object-cover" playsinline autoplay muted loop />
				{:else}
					<PrismicImage class="w-full aspect-[16/12] md:aspect-[12/9] object-cover" field={slice.primary.image} />
				{/if}
			</div>
		</a>
	</div>
</section>
