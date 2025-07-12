<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';
	import Button from '$lib/components/Button.svelte';
	export let slice: Content.CtaSlice;
</script>

{#if !slice.primary.deactivated}
	<section class="box pb-28" data-id={slice.primary.hash}>
		<div class="bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition rounded-lg px-6 md:px-10 pt-16 pb-16 text-center">
			<div class="mx-auto md:w-9/12">
				<h2 data-aos="fade">
					{slice.primary.headline}
				</h2>
		
				<div class="text-[var(--text-secondary-color)] pb-8 text-base-mobile md:text-base" data-aos="fade" >
					<PrismicText field={slice.primary.text} />
				</div>

				<div class="flex justify-center" data-aos="fade" >
					<Button onwhite big data={slice.primary.button} />
				</div>
			</div>
		</div>
	</section>
{/if}