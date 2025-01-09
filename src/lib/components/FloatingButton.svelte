<script>
    import Button from './Button.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    // import LanguageSwitch from './LanguageSwitch.svelte';
    export let data;
    let isVisible = true;

    function handleScroll() {
        const ctaElement = document.querySelector('[data-id="cta"]');
        if (ctaElement) {
            const rect = ctaElement.getBoundingClientRect();
            isVisible = rect.top > window.innerHeight; // Button is visible if cta is above the viewport
        }
    }

    onMount(() => {
        // Add scroll event listener only in the browser
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component destroy
        onDestroy(() => {
            window.removeEventListener('scroll', handleScroll);
        });
    });
</script> 

{#if isVisible}
    <div 
        class="fixed bottom-0 left-0 mb-6 mr-4 z-20 flex md:hidden justify-center w-full" 
        transition:fade={{ duration: 300 }}
    >
        <Button big={true} data={data.header[0].data.button} />
        <!-- <LanguageSwitch /> -->
    </div>
{/if}
