<script>
	import { SliceZone } from '@prismicio/svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderMobile from '$lib/components/HeaderMobile.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingButton from '$lib/components/FloatingButton.svelte';
	import { components } from '$lib/slices';
	import { currentLang } from '$lib/stores/lang';
	// import FloatingLanguage from '$lib/components/FloatingLanguage.svelte';
	export let data;
	
	$currentLang = data.lang;
</script>

<Header {data} />
<HeaderMobile {data} />
<SliceZone slices={data.page.data.slices} {components} />
<Footer {data} />
<FloatingButton {data} />
<!-- <FloatingLanguage {data} /> -->