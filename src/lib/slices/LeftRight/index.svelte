<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Button from '../../../lib/components/Button.svelte';
	export let slice: Content.LeftRightSlice;
</script>

<section class="pb-28" data-id={slice.primary.hash}>
	<div class="box" data-aos="fade-up">
		<div class="rounded-lg overflow-hidden flex flex-col-reverse {slice.primary.switched ? 'md:flex-row-reverse' : 'md:flex-row'} w-full">
			<div class="w-full md:w-1/2 bg-[var(--secondary-color)] px-6 md:px-10 flex flex-col justify-center py-10 md:py-12">
				<div data-aos="fade" data-aos-delay={100} >
					<PrismicRichText field={slice.primary.headline} />
				</div>
	
				<div class="text-[var(--text-secondary-color)] text-box" data-aos="fade" data-aos-delay={150}>
					<PrismicRichText field={slice.primary.text} />
				</div>

				{#if slice.primary.link.url}
					<div class="mt-6" data-aos="fade" data-aos-delay={200}>
						<Button data={slice.primary.link} big={false} onwhite={true} />
					</div>
				{/if}
			</div>
	
			<div class="flex flex-col md:flex-row w-full md:w-1/2">
				{#if slice.primary.video}
					<video src={slice.primary.video} poster={slice.primary.image.url} class="w-full aspect-[16/12] md:aspect-[12/9] object-cover" playsinline autoplay muted loop />
				{:else}
					<PrismicImage class="w-full aspect-[16/12] md:aspect-[12/9] object-cover" field={slice.primary.image} />
				{/if}
			</div>
		</div>
	</div>
</section>
