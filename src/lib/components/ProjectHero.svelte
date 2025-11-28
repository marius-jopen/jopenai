<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let image;
	export let video;
	export let title;
	export let subtitle;
	export let layout = "1";

	let isMobile = false;

	// Use layout 1 on mobile, otherwise use the provided layout
	$: effectiveLayout = isMobile ? "1" : layout;

	onMount(() => {
		if (browser) {
			isMobile = window.innerWidth < 768; // md breakpoint
			const handleResize = () => {
				isMobile = window.innerWidth < 768;
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
</script>

<section class="pb-4 pt-0" data-aos="fade-up">
	<div class="px-3 md:px-8 w-full">
		{#if image?.url}
			<div class="w-full aspect-[6/3] overflow-hidden rounded-lg mb-6  relative">
				{#if video}
					<video src={video} poster={image.url} class="rounded-lg w-full h-full object-cover aspect-[6/3]" autoplay muted loop playsinline></video>
				{:else}
					<img src={image.url} alt={title} class="rounded-lg w-full h-full object-cover aspect-[6/3]" />
				{/if}

				{#if effectiveLayout === "2" && (title || subtitle)}
					<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
						{#if title}
							<h2 class="pb-0">{title}</h2>
						{/if}
						{#if subtitle}
							<p class="text-base-mobile md:text-base mt-2 pl-1 mb-3.5">{subtitle}</p>
						{/if}
					</div>
				{/if}
				{#if effectiveLayout === "3" && (title || subtitle)}
					<div data-aos="fade" class="mx-auto w-1/3 text-[var(--text-tertiary-color)] absolute inset-0 h-full flex flex-col items-center justify-center text-center">
						{#if title}
							<h2 class="pb-0">{title}</h2>
						{/if}
						{#if subtitle}
							<p class="text-base-mobile md:text-base mt-2 mb-3.5">{subtitle}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if effectiveLayout === "1"}
		<!-- Layout 1: Title and subtitle below image -->
		<div class="box pt-4 text-center md:text-left">
			{#if title}
				<h2 class="mb-2 pb-4">{title}</h2>
			{/if}
			{#if subtitle}
				<p class="mx-auto md:mx-0 w-3/4 text-base-mobile md:text-base text-[var(--text-secondary-color)]">{subtitle}</p>
			{/if}

			<div class="h-6"></div>
		</div>
	{/if}
</section>

