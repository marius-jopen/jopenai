<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: Content.FeaturedProjectsSlice;

	const items = slice.primary.items;

	let padding = 7.5;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight};`;
	};

	function getProjectData(item: any): any {
		return (item as any)?.project?.data;
	}

	function getProjectUid(item: any): string | null {
		return (item as any)?.project?.uid || null;
	}
</script>

<section class="pb-28" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Slider>
		{#each items as item, index}
			{#if isFilled.contentRelationship(item.project)}
				{@const projectData = getProjectData(item)}
				{@const projectUid = getProjectUid(item)}
				{@const linkUrl = projectUid ? `/projects/${projectUid}` : '#'}
				{@const image = projectData?.image}
				{@const video = projectData?.video}
				{@const title = projectData?.title}
				{@const subtitle = projectData?.subtitle}
				<a href={linkUrl} class="w-[80vw] md:w-[85vw] relative rounded-lg overflow-hidden flex-shrink-0" style={calculateStyles(index, items.length)}>
					<div>
						{#if video}
							<video src={video} poster={image?.url} class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" playsinline autoplay muted loop></video>
						{:else if image}
							<PrismicImage class="rounded-lg object-cover w-full aspect-[3/4] lg:aspect-[16/8]" field={image} />
						{/if}

						{#if title || subtitle}
							<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
								{#if title}
									<h2 class="pb-0">{title}</h2>
								{/if}
								{#if subtitle}
									<p class="text-sm mt-2 pl-1 mb-3.5">{subtitle}</p>
								{/if}
							</div>
						{/if}
					</div>
				</a>
			{/if}
		{/each}
	</Slider>
</section>
