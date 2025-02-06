<script>
    export let data;
</script>

{#each data.header[0].data.links as link}
    <a class="text-black hover:text-black transition-all duration-300" href={link.url} >
        {link.text} 
    </a>
{/each}