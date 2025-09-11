<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: Content.GridSlice;

	function getRelatedData(item: any): any {
		return (item as any)?.related?.data;
	}
</script>

<section class="box pb-28" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#if slice.primary.headline}
		<div class="text-center pb-4" data-aos="fade-up">
			<h2>
				{slice.primary.headline}
			</h2>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
		{#each slice.primary.items as item, index}
			{#if isFilled.contentRelationship(item.related)}
				{@const data = getRelatedData(item)}
				{@const title = data?.title}
				{@const subtitle = data?.subtitle}
				{@const image = data?.image}
				{@const video = data?.video}
				{@const hasImage = isFilled.image(image)}
				{@const aspectRatio = 'aspect-[6/3]'}
				{@const paddingClass = 'px-6 pt-6 pb-10'}
				{@const headingClass = 'mb-1 pb-2'}

				<PrismicLink field={item.related} data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="rounded-lg overflow-hidden h-full block">
					{#if hasImage}
						<div class="w-full {aspectRatio}">
							{#if video}
								<video src={video} poster={image?.url} class="w-full object-cover h-full {aspectRatio}" autoplay muted loop playsinline></video>
							{:else}
								<PrismicImage class="w-full object-cover h-full {aspectRatio}" field={image} />
							{/if}
						</div>
					{/if}

					<div class="bg-[var(--secondary-color)] {paddingClass}">
						{#if title}
							<h3 class="{headingClass}" data-aos="fade" data-aos-delay={index * 250}>{title}</h3>
						{/if}
						{#if subtitle}
							<div class="text-base-mobile md:text-base text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={400 + index * 150}>
								{subtitle}
							</div>
						{/if}
					</div>
				</PrismicLink>
			{/if}
		{/each}
	</div>
</section>
