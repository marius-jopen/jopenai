<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';
	import Button from '$lib/components/Button.svelte';
	export let slice: Content.CtaSlice;
</script>

<section class="box pb-28" data-id={slice.primary.hash}>
	<div class="bg-white rounded-lg px-8 pt-16 pb-16 text-center">
		<div class="mx-auto w-9/12">
			<h1 data-aos="fade">
				{slice.primary.headline}
			</h1>
	
			<div class="text-neutral-600 pb-8" data-aos="fade" >
				<PrismicText field={slice.primary.text} />
			</div>

			<div class="flex justify-center" data-aos="fade" >
				<Button onwhite data={slice.primary.button} />
			</div>
		</div>
	</div>
</section>

