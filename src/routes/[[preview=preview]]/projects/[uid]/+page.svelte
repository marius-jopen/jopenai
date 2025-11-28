<script>
	import { SliceZone } from '@prismicio/svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderMobile from '$lib/components/HeaderMobile.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingButton from '$lib/components/FloatingButton.svelte';
	import ProjectHero from '$lib/components/ProjectHero.svelte';
	import ProjectInfo from '$lib/components/ProjectInfo.svelte';
	import Related from '$lib/components/Related.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Cta from '$lib/components/Cta.svelte';
	import { components } from '$lib/slices';
	import { currentLang } from '$lib/stores/lang';
	// import FloatingLanguage from '$lib/components/FloatingLanguage.svelte';
	export let data;
	
	$currentLang = data.lang;
</script>

<Header {data} />
<HeaderMobile {data} />
<ProjectHero 
	image={data.page.data.image}
	video={data.page.data.video}
	title={data.page.data.title}
	subtitle={data.page.data.subtitle}
	layout={data.page.data.layout}
/>
<ProjectInfo infos={data.page.data.infos} />
<SliceZone slices={data.page.data.slices} {components} />

<div class="pt-12">
	<Testimonials />
</div>
{#if data.allProjects && data.allProjects.length > 0}
	<Related projects={data.allProjects} currentUid={data.page.uid} type="project" />
{/if}
<Cta />
<Footer {data} />
<FloatingButton {data} />
<!-- <FloatingLanguage {data} /> -->