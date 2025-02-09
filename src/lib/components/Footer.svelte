<script>
    import { PrismicLink } from '@prismicio/svelte';

    export let data;
</script>

<div class="box pt-4 pb-6 flex flex-col md:flex-row justify-between">
    <a href="/" class="text-sm font-bold pt-0.5 text-[var(--text-primary-color)] text-center md:text-left hover:text-[var(--text-primary-color)]">
        JopenAI
    </a>

    <div class="flex gap-8 justify-center md:justify-start text-sm pb-20 md:pb-0 text-sm text-center md:text-left pt-6 md:pt-1">
        {#each data.footer[0].data.links as link (link.key)}
            <PrismicLink class="text-[var(--text-primary-color)]  hover:text-[var(--text-primary-color)] transition-all duration-300" field={link} />
        {/each}
    </div>
</div>