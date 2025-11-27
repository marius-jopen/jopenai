<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import type { NewsArticleDocument } from '../../../prismicio-types';
	import Slider from '$lib/components/slider.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.LatestNewsSlice;

	let newsArticles: NewsArticleDocument[] = [];
	let loading = true;

	let padding = 15;

	const calculateStyles = (index: number, itemsLength: number): string => {
		const width = (100 - padding * 2);
		const marginLeft = index === 0 ? padding + 'vw' : '0';
		const marginRight = index === itemsLength - 1 ? padding + 'vw' : '0';
		return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width}vw;`;
	};

	// Convert title to RichText format
	const titleToRichText = (title: string | null | undefined) => {
		if (!title) return null;
		return [
			{
				type: 'heading2',
				content: {
					text: title
				}
			}
		] as any;
	};

	// Convert subtitle to RichText format
	const subtitleToRichText = (subtitle: string | null | undefined) => {
		if (!subtitle) return null;
		return [
			{
				type: 'paragraph',
				content: {
					text: subtitle
				}
			}
		] as any;
	};

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
			// Create client - will use browser's native fetch
			const client = createClient();
			
			// Fetch latest 3 news articles sorted by date (descending)
			const articles = await client.getAllByType('news_article', {
				lang,
				orderings: [
					{ field: 'my.news_article.date', direction: 'desc' }
				],
				pageSize: 3
			});

			newsArticles = articles;
		} catch (error) {
			console.error('Error fetching news articles:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if !loading && newsArticles.length > 0}
	<section class="pb-24" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		<div data-aos="fade-up">
			<Slider>
				{#each newsArticles as article, index}
					{@const headline = titleToRichText(article.data.title)}
					{@const text = subtitleToRichText(article.data.subtitle)}
					{@const linkUrl = `/news/${article.uid}`}
					<a href={linkUrl} data-aos="fade-zoom-in" data-aos-delay={200 + index * 250} style={calculateStyles(index, newsArticles.length)} class="item flex bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg overflow-hidden group">
						<div class="flex flex-col-reverse md:flex-row flex-row-reverse w-full justify-between">
							<div class="w-full md:w-1/2 px-6 md:px-10 flex flex-col justify-start py-10 md:py-12 h-full">
								{#if article.data.date}
									<div class="text-sm text-[var(--text-secondary-color)] mb-3" data-aos="fade" data-aos-delay={50}>
										{formatDate(article.data.date)}
									</div>
								{/if}
								{#if headline}
									<div data-aos="fade" data-aos-delay={100}>
										<h3>{article.data.title}</h3>
									</div>
								{/if}
					
								{#if text}
									<div class="text-[var(--text-secondary-color)] text-box" data-aos="fade" data-aos-delay={150}>
										<p>{article.data.subtitle}</p>
									</div>
								{/if}
							</div>
						
							<div class="w-full md:w-1/2 overflow-hidden relative">
								{#if article.data.video}
									<video src={article.data.video} poster={article.data.image?.url} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" playsinline autoplay muted loop></video>
								{:else if article.data.image}
									<PrismicImage class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" field={article.data.image} />
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</Slider>
		</div>
	</section>
{/if}

<style>
	.item:first-child {
		@media (max-width: 1024px) {	
			margin-left: 13px !important;
		}
	}

	.item:last-child {
		@media (max-width: 1024px) {	
			margin-right: 13px !important;
		}
	}

	.item {
		@media (max-width: 1024px) {	
			width: 80vw !important;
		}
	}

	.item :global(img),
	.item video {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.item .w-full.md\:w-1\/2.overflow-hidden {
		min-height: 300px;
	}
</style>
