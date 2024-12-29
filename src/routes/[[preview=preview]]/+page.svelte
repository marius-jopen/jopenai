<script>
	import { SliceZone } from '@prismicio/svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderMobile from '$lib/components/HeaderMobile.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingButton from '$lib/components/FloatingButton.svelte';
	import { components } from '$lib/slices';

	export let data;
</script>

<Header {data} />
<HeaderMobile {data} />
<SliceZone slices={data.page.data.slices} {components} />
<Footer {data} />
<FloatingButton {data} />