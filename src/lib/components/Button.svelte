<script>
    import { PrismicLink } from '@prismicio/svelte';

    export let data;
    export let big;
    export let onwhite;
</script>

<PrismicLink class="bg-black {onwhite ? 'hover:bg-neutral-100' : 'hover:bg-white'}  transition-colors duration-300 {big ? 'text-2xl px-8 py-3' : 'text-sm px-6 py-1.5'} font-medium cursor-pointer text-white hover:text-black rounded-full" field={data} />
