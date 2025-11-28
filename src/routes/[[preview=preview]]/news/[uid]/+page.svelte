<script>
	import { SliceZone } from '@prismicio/svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderMobile from '$lib/components/HeaderMobile.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingButton from '$lib/components/FloatingButton.svelte';
	import NewsHero from '$lib/components/NewsHero.svelte';
	import Related from '$lib/components/Related.svelte';
	import Cta from '$lib/components/Cta.svelte';
	import { components } from '$lib/slices';
	import { currentLang } from '$lib/stores/lang';
	// import FloatingLanguage from '$lib/components/FloatingLanguage.svelte';
	export let data;
	
	$currentLang = data.lang;
</script>

<Header {data} />
<HeaderMobile {data} />
<NewsHero 
	image={data.page.data.image}
	video={data.page.data.video}
	title={data.page.data.title}
	subtitle={data.page.data.subtitle}
	date={data.page.data.date}
	layout={data.page.data.layout || "1"}
/>
<SliceZone slices={data.page.data.slices} {components} />
{#if data.allNewsArticles && data.allNewsArticles.length > 0}
	<Related projects={data.allNewsArticles} currentUid={data.page.uid} type="news_article" />
{/if}
<Cta />
<Footer {data} />
<FloatingButton {data} />
<!-- <FloatingLanguage {data} /> -->