<script>
    import { onMount } from 'svelte';
    export let data;
    let mounted = false;

    onMount(() => {
        mounted = true;
        if (window.location.hash) {
            const hash = window.location.hash.replace('#', '');
            findAndScrollToElement(hash);
        }
    });

    function handleClick(e, url) {
        if (url.startsWith('#')) {
            e.preventDefault();
            const hash = url.replace('#', '');
            findAndScrollToElement(hash);
        }
    }

    function findAndScrollToElement(hash, attempts = 0, maxAttempts = 10) {
        const element = document.querySelector(`[data-id="${hash}"]`);
        
        if (element) {
            // Element found, scroll to it
            const headerOffset = 50;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition
            });
        } else if (attempts < maxAttempts) {
            // Element not found, try again in 100ms
            setTimeout(() => {
                findAndScrollToElement(hash, attempts + 1, maxAttempts);
            }, 100);
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