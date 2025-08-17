<script>
  import { page } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import HeaderMobile from '$lib/components/HeaderMobile.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SimilarTools from '$lib/components/SimilarTools.svelte';
  export let data;
  let tool;
  $: tool = data.tool; // react to data updates on navigation

  let rndKey = '';
  let lastSlug = '';
  $: {
    const slug = $page.params.slug;
    if (slug && slug !== lastSlug) {
      rndKey = Math.random().toString(36).slice(2);
      lastSlug = slug;
    }
  }
</script>

<Header {data} />
<HeaderMobile {data} />

{#key rndKey}
  <section class="box py-12 md:py-12">
    <div class="max-w-3xl mx-auto">
      <a href="/tools" class="text-center text-sm pb-6 block">Back</a>
      <h1 class="text-center text-3xl md:text-5xl ">{tool?.name}</h1>
      <div class="text-center text-black text-sm pb-4">
        {tool?.category} {#if tool?.tags?.length} · {tool.tags.join(', ')}{/if} · {tool?.pricing || 'Freemium'}
      </div>

      {#if tool?.imageUrl}
        <img src={tool.imageUrl} alt={tool.name} class="rounded-lg w-full mt-6" />
      {/if}

      {#if tool?.description}
        <p class="mt-6 text-lg text-center">{tool.description}</p>
      {/if}

      {#if tool?.url}
        <div class="flex justify-center">
          <a href={tool.url} target="_blank" rel="noopener noreferrer" class="inline-block mt-8 px-5 py-2 rounded-full bg-white text-black">Visit Website</a>
        </div>
      {/if}
    </div>

    {#if tool}
      <SimilarTools current={tool} />
    {/if}
  </section>
{/key}

<Footer {data} />


