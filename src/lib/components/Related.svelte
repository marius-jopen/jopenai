<script lang="ts">
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let projects: any[] = [];
	export let currentUid: string | null = null;
	export let type = 'project'; // 'project' or 'news_article'

	// Filter out current project and get 4 random projects
	$: relatedProjects = (() => {
		if (!projects || projects.length === 0) return [];
		
		// Filter out current project
		const filtered = currentUid 
			? projects.filter(p => p.uid !== currentUid)
			: projects;
		
		// Shuffle and take 4
		const shuffled = [...filtered].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 4);
	})();

	function getLinkUrl(project: any) {
		if (type === 'project') {
			return project.uid ? `/projects/${project.uid}` : '#';
		} else {
			return project.uid ? `/news/${project.uid}` : '#';
		}
	}
</script>

{#if relatedProjects.length > 0}
	<section class="box-big pb-28" data-aos="fade-up">
		<h2 class="pb-8 text-center">Related Projects</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
			{#each relatedProjects as project, index}
				{@const title = project.data.title}
				{@const subtitle = project.data.subtitle}
				{@const image = project.data.image}
				{@const video = project.data.video}
				{@const hasImage = isFilled.image(image)}
				{@const aspectRatio = 'aspect-[6/3]'}
				{@const paddingClass = 'px-6 pt-6 pb-10'}
				{@const headingClass = 'mb-1 pb-2'}
				{@const linkUrl = getLinkUrl(project)}

				<a 
					href={linkUrl}
					data-aos="fade-zoom-in" 
					data-aos-delay={100 + index * 150} 
					class="rounded-lg overflow-hidden h-full flex flex-col bg-[var(--secondary-color)]"
				>
					{#if hasImage}
						<div class="w-full {aspectRatio} rounded-t-lg overflow-hidden flex-shrink-0">
							{#if video}
								<video src={video} poster={image?.url} class="w-full object-cover h-full {aspectRatio}" autoplay muted loop playsinline></video>
							{:else}
								<PrismicImage class="w-full object-cover h-full {aspectRatio}" field={image} />
							{/if}
						</div>
					{/if}

					<div class="bg-[var(--secondary-color)] {paddingClass} flex-1 flex flex-col {hasImage ? 'rounded-b-lg' : 'rounded-lg'}">
						{#if title}
							<h3 class="{headingClass}" data-aos="fade" data-aos-delay={index * 250}>{title}</h3>
						{/if}
						{#if subtitle}
							<div class="text-base-mobile md:text-base text-[var(--text-secondary-color)] flex-1" data-aos="fade" data-aos-delay={400 + index * 150}>
								{subtitle}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>
{/if}

