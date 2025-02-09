<script>
    export let data;
</script>

{#each data.header[0].data.links as link}
    <a class="text-[var(--text-primary-color)] hover:text-[var(--text-primary-color)] transition-all duration-300" href={link.url} >
        {link.text} 
    </a>
{/each}