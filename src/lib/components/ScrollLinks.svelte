<script>
    export let data;

    const scrollToAnchor = (dataId) => {
        const element = document.querySelector(`[data-id="${dataId}"]`);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the element's position
            const offsetPosition = elementPosition - 100; // Adjust for 100px offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Element with data-id="${dataId}" not found.`);
        }
    };
</script>

{#each data.header[0].data.links as link}
    <a class="text-neutral-500 hover:text-black transition-all duration-300" href={link.url} on:click|preventDefault={() => scrollToAnchor(link.url.replace('#', ''))}>
        {link.text} 
    </a>
{/each}