<script>
    import { PrismicLink } from '@prismicio/svelte';

    export let data;
    export let onwhite;
</script>

<PrismicLink class="bg-black {onwhite ? 'hover:bg-neutral-100' : 'hover:bg-white'}  transition-colors duration-300 text-sm font-medium text-white hover:text-black px-6 py-2 rounded-full" field={data} />
