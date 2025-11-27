<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: Content.FeaturedProjectsSlice;

	const items = slice.primary.items;

	let padding = 13;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const marginLeft = index === 0 ? padding + 'px' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'px' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight};`;
	};

	function getProjectData(item: any): any {
		return (item as any)?.project?.data;
	}
</script>

<section class="pb-28" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Slider>
		{#each items as item, index}
			{#if isFilled.contentRelationship(item.project)}
				{@const projectData = getProjectData(item)}
				{@const projectUid = (item as any)?.project?.uid}
				{@const linkUrl = projectUid ? `/projects/${projectUid}` : '#'}
				{@const image = projectData?.image}
				{@const video = projectData?.video}
				{@const title = projectData?.title}
				<a href={linkUrl} class="w-[80vw] md:w-[85vw] relative rounded-lg overflow-hidden flex-shrink-0" style={calculateStyles(index, items.length)}>
					<div>
						{#if video}
							<video src={video} poster={image?.url} class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
						{:else if image}
							<PrismicImage class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={image} />
						{/if}

						{#if title}
							<h2 data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex items-end">
								{title}
							</h2>
						{/if}
					</div>
				</a>
			{/if}
		{/each}
	</Slider>
</section>
