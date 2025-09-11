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
<section class="box pb-14" data-aos="fade-up">
    {#if data.page.data.image?.url}
        <div class="w-full aspect-[6/3] overflow-hidden rounded-lg mb-6">
            {#if data.page.data.video}
                <video src={data.page.data.video} poster={data.page.data.image.url} class="w-full h-full object-cover aspect-[6/3]" autoplay muted loop playsinline></video>
            {:else}
                <img src={data.page.data.image.url} alt={data.page.data.title} class="w-full h-full object-cover aspect-[6/3]" />
            {/if}
        </div>
    {/if}
    {#if data.page.data.title}
        <h1 class="mb-2">{data.page.data.title}</h1>
    {/if}
    {#if data.page.data.subtitle}
        <p class="text-base-mobile md:text-base text-[var(--text-secondary-color)]">{data.page.data.subtitle}</p>
    {/if}
    
    <div class="h-6"></div>
</section>
<SliceZone slices={data.page.data.slices} {components} />
<Footer {data} />
<FloatingButton {data} />
<!-- <FloatingLanguage {data} /> -->