<script>
    export let data;

    function handleClick(e, url) {
        // Check if it's a hash link
        if (url.startsWith('#')) {
            e.preventDefault();
            const hash = url.replace('#', '');
            const element = document.querySelector(`[data-id="${hash}"]`);
            
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - 50; // Add 20px offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>

{#each data.header[0].data.links as link}
    <a 
        class="cursor-pointer text-[var(--text-primary-color)] hover:text-[var(--text-primary-color)] transition-all duration-300" 
        href={link.url}
        on:click={(e) => handleClick(e, link.url)}
    >
        {link.text} 
    </a>
{/each}