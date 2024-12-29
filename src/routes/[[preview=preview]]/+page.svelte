<script>
	import { SliceZone } from '@prismicio/svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { components } from '$lib/slices';

	export let data;
</script>

<Header {data} />
<SliceZone slices={data.page.data.slices} {components} />
<Footer {data} />