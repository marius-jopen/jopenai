<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import type { NewsArticleDocument } from '../../../prismicio-types';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.NewsSlice;

	// Control whether the first item should be double width when there's an odd number
	const enableFirstItemDoubleWidth = true;

	let newsArticles: NewsArticleDocument[] = [];
	let loading = true;
	let selectedTag: string | null = null;
	let availableTags: string[] = [];

	// Get custom order from slice.primary.items
	function getCustomOrder(): string[] {
		const order: string[] = [];
		if (slice.primary.items && Array.isArray(slice.primary.items)) {
			slice.primary.items.forEach((item: any) => {
				if (item?.item?.uid) {
					order.push(item.item.uid);
				}
			});
		}
		return order;
	}

	// Sort news articles according to custom order
	function sortNewsByCustomOrder(newsToSort: NewsArticleDocument[]): NewsArticleDocument[] {
		const customOrder = getCustomOrder();
		if (customOrder.length === 0) {
			return newsToSort; // No custom order, return as-is
		}

		// Create a map for quick lookup
		const newsMap = new Map<string, NewsArticleDocument>();
		newsToSort.forEach(article => {
			if (article.uid) {
				newsMap.set(article.uid, article);
			}
		});

		// Sort according to custom order
		const sorted: NewsArticleDocument[] = [];
		const added = new Set<string>();

		// First, add articles in the custom order
		customOrder.forEach(uid => {
			const article = newsMap.get(uid);
			if (article) {
				sorted.push(article);
				added.add(uid);
			}
		});

		// Then, add any remaining articles that weren't in the custom order
		newsToSort.forEach(article => {
			if (article.uid && !added.has(article.uid)) {
				sorted.push(article);
			}
		});

		return sorted;
	}

	// Extract unique tags from all news articles using Prismic document-level tags
	function extractTags(newsArticles: NewsArticleDocument[]): string[] {
		const tagSet = new Set<string>();
		newsArticles.forEach(article => {
			// Prismic document tags are stored at article.tags (array of strings)
			if (article.tags && Array.isArray(article.tags)) {
				article.tags.forEach(tag => {
					if (tag) tagSet.add(tag);
				});
			}
		});
		return Array.from(tagSet).sort();
	}

	// Filter news articles by selected tag, then sort by custom order
	$: filteredNews = (() => {
		const filtered = selectedTag
			? newsArticles.filter(article => {
				// Check if article has the selected tag in its Prismic document tags
				return article.tags && selectedTag && article.tags.includes(selectedTag);
			})
			: newsArticles;
		
		// Always apply custom sorting
		return sortNewsByCustomOrder(filtered);
	})();

	function selectTag(tag: string | null) {
		selectedTag = selectedTag === tag ? null : tag;
	}

	// Format date for display
	const formatDate = (dateString: string | null | undefined): string => {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			});
		} catch {
			return dateString;
		}
	};

	onMount(async () => {
		if (!browser) {
			loading = false;
			return;
		}
		
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch all news articles
			const allNews = await client.getAllByType('news_article', {
				lang
			});

			newsArticles = allNews;
			availableTags = extractTags(newsArticles);
		} catch (error) {
			console.error('Error fetching news articles:', error);
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

		{#if filteredNews.length > 0}
			{@const isOddCount = filteredNews.length % 2 !== 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
				{#each filteredNews as article, index}
					{@const title = article.data.title}
					{@const subtitle = article.data.subtitle}
					{@const date = article.data.date}
					{@const image = article.data.image}
					{@const video = article.data.video}
					{@const hasImage = isFilled.image(image)}
					{@const aspectRatio = 'aspect-[6/3]'}
					{@const paddingClass = 'px-6 pt-6 pb-10'}
					{@const headingClass = 'mb-1 pb-2'}
					{@const linkUrl = article.uid ? `/news/${article.uid}` : '#'}
					{@const isFirstAndOdd = enableFirstItemDoubleWidth && isOddCount && index === 0}

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
							{#if date}
								<div class="text-sm text-[var(--text-secondary-color)] mb-3" data-aos="fade" data-aos-delay={index * 200}>
									{formatDate(date)}
								</div>
							{/if}
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
				No news articles found{selectedTag ? ` with tag "${selectedTag}"` : ''}.
			</div>
		{/if}
	</section>
{/if}
