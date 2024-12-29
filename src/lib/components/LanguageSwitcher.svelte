<script>
    import { page } from '$app/stores';
    
    export let minimal = false

    let isGerman = $page.url.pathname.includes('/de');
</script>

<div class="text-sm pt-1 flex gap-2">
    {#if !minimal}
        <a href="/de" class:is-active={!isGerman} class:text-black={!isGerman} class:text-neutral-500={isGerman}>
            DE
        </a>
    
        <a href="/" class:is-active={isGerman} class:text-black={isGerman} class:text-neutral-500={!isGerman}>
            EN
        </a>

    {:else}
        <a href="/de" class:hidden={isGerman} >
            DE
        </a>

        <a href="/" class:hidden={!isGerman} >
            EN
        </a>
    {/if}
</div>