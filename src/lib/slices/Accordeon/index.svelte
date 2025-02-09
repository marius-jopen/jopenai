<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import { slide } from 'svelte/transition';


	export let slice: Content.AccordeonSlice;

	let openIndex: number | null = 0; // Track the currently open item index

	function toggle(index: number) {
		// Check if the item being toggled is the only one open
		if (openIndex === index && slice.primary.items.filter((_, i) => openIndex === i).length === 1) {
			return; // Prevent closing if it's the only open item
		}
		openIndex = openIndex === index ? null : index; // Toggle the open state
	}
</script>

<section class="box pb-28" data-id={slice.primary.hash}>
	{#if slice.primary.headline}
		<div class="text-center pb-4" data-aos="fade-up">
			<h2>
				{slice.primary.headline}
			</h2>
		</div>
	{/if}

	<div class="bg-[var(--secondary-color)]  rounded-lg flex flex-col md:flex-row overflow-hidden" data-aos="fade-up">
		<div class="w-full md:w-1/2 relative mr-8 aspect-square md:aspect-auto">
			{#each slice.primary.items as item, index}
				<div class="absolute w-full h-full " style:opacity={openIndex === index ? 1 : 0} transition:opacity={{ duration: 300 }}>
					{#if item.video}
						<video src={item.video} poster={item.image.url} class="h-full w-full object-cover aspect-square md:aspect-auto" autoplay muted loop playsinline />
					{:else}
						<PrismicImage class="h-full w-full object-cover aspect-square md:aspect-auto" field={item.image} />
					{/if}
				</div>
			{/each}
		</div>

		<div class="w-full md:w-1/2 py-4 md:py-10 divide-y divide-[var(--text-quaternary-color)] pr-8 pl-8 md:pl-0">
			{#each slice.primary.items as item, index}
				<div class="pt-4 flex">
					<div class="w-full">
						<button class="w-full" on:click={() => toggle(index)} on:mouseenter={() => toggle(index)}>
							<h3 class="text-left w-full">
								{item.headline}
							</h3>
						</button>
	
						{#if openIndex === index}
							<div class="text-base text-[var(--text-secondary-color)] -mt-1 pb-6 " transition:slide={{ duration: 300 }}>
								<PrismicText field={item.text} />
							</div>
						{/if}
					</div>

					<!-- <h3 class="flex flex-col justify-center cursor-pointer" on:mouseenter={() => toggle(index)}>
						{openIndex === index ? '–' : '+'}
					</h3> -->
				</div>
			{/each}
		</div>
	</div>
</section>
