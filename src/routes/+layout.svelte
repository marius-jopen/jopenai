<script>
	import './app.css';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		AOS.init({
			duration: 900,
			once: false,
			offset: 50
		});
		console.log('Layout mounted, AOS initialized');
	});

	// Reactive hash scrolling - much cleaner Svelte approach!
	$: {
		try {
			if (browser && $page.url.hash) {
				const hash = $page.url.hash.substring(1);
				console.log('Layout detected hash:', hash, 'on page:', $page.url.pathname);
				// Small delay to ensure DOM is ready after navigation
				setTimeout(() => {
					try {
						const element = document.querySelector(`[data-id="${hash}"]`);
						console.log('Looking for element with data-id:', hash, 'found:', element);
						if (element) {
							const elementPosition = element.getBoundingClientRect().top;
							const offsetPosition = elementPosition + window.pageYOffset - 50;
							console.log('Scrolling to:', offsetPosition);
							window.scrollTo({
								top: offsetPosition,
								behavior: 'smooth'
							});
						}
					} catch (error) {
						console.log('Error in hash scrolling timeout:', error);
					}
				}, 100);
			}
		} catch (error) {
			console.log('Error in reactive hash scrolling:', error);
		}
	}

	// Reactive page title
	$: pageTitle = $page.data.meta_title || $page.data.title || 'Page';
	$: fullTitle = `THE ROBOTS | ${pageTitle}`;
</script>

<svelte:head>
	<title>
		{fullTitle}
	</title>
	
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}

	{#if $page.data.meta_title || $page.data.title}
		<meta property="og:title" content="THE ROBOTS | {$page.data.meta_title || $page.data.title}" />
	{/if}

	{#if $page.data.meta_image}
		<meta property="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<main>
	<div class="bg-[var(--primary-color)] text-[var(--text-primary-color)]">
		<slot />
	</div>
</main>

<PrismicPreview {repositoryName} />
