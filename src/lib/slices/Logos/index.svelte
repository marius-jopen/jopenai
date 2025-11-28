<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { createClient } from '$lib/prismicio';
	import { currentLang } from '$lib/stores/lang';
	import { browser } from '$app/environment';

	export let slice: Content.LogosSlice;

	let globalLogos: any[] = [];
	let loading = false;

	// Use slice items if they exist, otherwise use global logos
	$: sliceItems = slice.primary.items || [];
	$: hasSliceItems = sliceItems.length > 0;
	$: items = hasSliceItems ? sliceItems : globalLogos;
	$: hasSliceContent = sliceItems.length > 0;
	$: shouldShow = items.length > 0 && (hasSliceContent || (!loading && globalLogos.length > 0));

	// Determine number of columns on md+ using the new "Logos in a row" field
	const requestedCols = Number(slice.primary.logos_in_a_row) || 6;
	const clampedCols = Math.max(1, Math.min(requestedCols, 12));
	// Enumerate possible classes so Tailwind JIT includes them
	const mdGridColsClassMap: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		7: 'md:grid-cols-7',
		8: 'md:grid-cols-8',
		9: 'md:grid-cols-9',
		10: 'md:grid-cols-10',
		11: 'md:grid-cols-11',
		12: 'md:grid-cols-12'
	};
	const mdGridColsClass = mdGridColsClassMap[clampedCols] || 'md:grid-cols-6';

	onMount(async () => {
		// Only fetch if slice doesn't have items
		const sliceItems = slice.primary.items || [];
		if (sliceItems.length > 0) {
			return;
		}

		if (!browser) {
			return;
		}

		loading = true;
		try {
			const lang = $currentLang || 'en-us';
			const client = createClient();
			
			// Fetch general page
			const generalPages = await client.getAllByType('general', { lang });
			
			if (generalPages.length > 0) {
				const generalData = generalPages[0].data;
				if (generalData.logos) {
					globalLogos = generalData.logos;
				}
			}
		} catch (error) {
			console.error('Error fetching global logos:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if !slice.primary.deactivated && shouldShow}
	<section class="box pb-12" data-id={slice.primary.hash}>
		<div class={`grid grid-cols-2 ${mdGridColsClass} gap-3`} data-aos="fade-up">
			{#each items as item, index}
				<div data-aos="fade-zoom-in " data-aos-delay={100 + index * 150}>
					<div class="px-8 pt-1 pb-1 mb-2 md:mb-4">
						<PrismicImage field={item.image} />
					</div>
				</div>
			{/each}
		</div>

		{#if slice.primary.headline}
		<div class="text-center pt-4 text-[var(--text-secondary-color)]" data-aos="fade" data-aos-delay={100 + items.length * 150}>
			{slice.primary.headline}
		</div>
	{/if}
	</section>
{/if}