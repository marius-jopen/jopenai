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
</script>

<svelte:head>
	<title>
		{$page.data.meta_title}
	</title>
	
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}

	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}

	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<main>
	<div class="bg-[var(--primary-color)] text-[var(--text-primary-color)]">
		<slot />
	</div>
</main>

<PrismicPreview {repositoryName} />
