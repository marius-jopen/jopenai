<script>
    import { PrismicLink } from '@prismicio/svelte';

    export let data;
    export let big;
    export let medium;
    export let onwhite = false;
    export let whiteBg = false;
</script>

<PrismicLink class="{whiteBg ? 'bg-white hover:bg-black text-black hover:text-white' : onwhite ? 'bg-[var(--quaternary-color)] hover:bg-[var(--primary-color)] text-[var(--text-tertiary-color)] hover:text-[var(--text-primary-color)]' : 'bg-[var(--quaternary-color)] hover:bg-[var(--secondary-color)] text-[var(--text-tertiary-color)] hover:text-[var(--text-primary-color)]'} font-display transition-colors duration-300 {big ? 'text-lg leading-[25px] md:leading-auto md:text-2xl px-8 py-3' : medium ? 'text-base px-7 py-2' : 'text-sm px-6 py-1.5'} font-medium cursor-pointer text-center  rounded-full" field={data} />
