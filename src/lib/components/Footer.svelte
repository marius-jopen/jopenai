<script>
    import { PrismicLink } from '@prismicio/svelte';

    export let data;
</script>

<div class="box py-4 flex flex-col md:flex-row justify-between">
    <div class="text-sm font-bold pt-0.5 text-neutral-400 text-center md:text-left">
        JopenAI
    </div>

    <div class="flex gap-8 justify-center md:justify-start text-sm pb-4 md:pb-0 text-sm text-neutral-400 text-center md:text-left pt-6 md:pt-1">
        {#each data.footer[0].data.links as link (link.key)}
            <PrismicLink field={link} />
        {/each}
    </div>
</div>