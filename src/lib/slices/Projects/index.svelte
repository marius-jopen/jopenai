<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import type { ProjectDocument } from '../../../prismicio-types';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.ProjectsSlice;

	let projects: ProjectDocument[] = [];
	let loading = true;
	let selectedTag: string | null = null;
	let availableTags: string[] = [];

	// Extract unique tags from all projects using Prismic document-level tags
	function extractTags(projects: ProjectDocument[]): string[] {
		const tagSet = new Set<string>();
		projects.forEach(project => {
			// Prismic document tags are stored at project.tags (array of strings)
			if (project.tags && Array.isArray(project.tags)) {
				project.tags.forEach(tag => {
					if (tag) tagSet.add(tag);
				});
			}
		});
		return Array.from(tagSet).sort();
	}

	// Filter projects by selected tag
	$: filteredProjects = selectedTag
		? projects.filter(project => {
			// Check if project has the selected tag in its Prismic document tags
			return project.tags && selectedTag && project.tags.includes(selectedTag);
		})
		: projects;

	function selectTag(tag: string | null) {
		selectedTag = selectedTag === tag ? null : tag;
	}

	onMount(async () => {
		if (!browser) {
			loading = false;
			return;
		}
		
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch all projects
			const allProjects = await client.getAllByType('project', {
				lang
			});

			projects = allProjects;
			availableTags = extractTags(projects);
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if !loading}
	<section class="box-big pb-28" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		{#if availableTags.length > 0}
			<!-- Tag filter buttons -->
			<div class="flex flex-wrap gap-3 justify-center pb-8" data-aos="fade-up">
				<button
					on:click={() => selectTag(null)}
					class="px-4 pb-2 pt-1.5 rounded-full text-sm transition-colors duration-300 {selectedTag === null ? 'bg-[var(--quaternary-color)] text-[var(--text-tertiary-color)]' : 'bg-[var(--secondary-color)] text-[var(--text-primary-color)] hover:bg-[var(--tertiary-color)]'}"
				>
					All
				</button>
				{#each availableTags as tag}
					<button
						on:click={() => selectTag(tag)}
						class="px-4 pb-2 pt-1.5 rounded-full text-sm transition-colors duration-300 {selectedTag === tag ? 'bg-[var(--quaternary-color)] text-[var(--text-tertiary-color)]' : 'bg-[var(--secondary-color)] text-[var(--text-primary-color)] hover:bg-[var(--tertiary-color)]'}"
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}

		{#if filteredProjects.length > 0}
			{@const isOddCount = filteredProjects.length % 2 !== 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
				{#each filteredProjects as project, index}
					{@const title = project.data.title}
					{@const subtitle = project.data.subtitle}
					{@const image = project.data.image}
					{@const video = project.data.video}
					{@const hasImage = isFilled.image(image)}
					{@const aspectRatio = 'aspect-[6/3]'}
					{@const paddingClass = 'px-6 pt-6 pb-10'}
					{@const headingClass = 'mb-1 pb-2'}
					{@const linkUrl = project.uid ? `/projects/${project.uid}` : '#'}
					{@const isFirstAndOdd = isOddCount && index === 0}

					<a 
						href={linkUrl}
						data-aos="fade-zoom-in" 
						data-aos-delay={100 + index * 150} 
						class="rounded-lg overflow-hidden h-full flex flex-col bg-[var(--secondary-color)] {isFirstAndOdd ? 'md:col-span-2' : ''}"
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
		{:else if !loading}
			<div class="text-center py-12 text-[var(--text-secondary-color)]">
				No projects found{selectedTag ? ` with tag "${selectedTag}"` : ''}.
			</div>
		{/if}
	</section>
{/if}
