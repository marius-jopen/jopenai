<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import LanguageSwitch from './LanguageSwitch.svelte';

    export let data;

    let isVisible = true;
    let lastScrollY = 0;
    let navVisible = false;
    let ticking = false;  // Add this for scroll optimization

    function triggerNav() {
        navVisible = !navVisible;
    }

    function closeNav() {
        navVisible = false; // Toggle visibility
    }

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

    onMount(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            
            // Only hide navbar after scrolling down 50px
            if (currentScroll > lastScrollY && currentScroll > 50) {
                isVisible = false; // Scrolling down
            } else {
                isVisible = true;  // Scrolling up or within first 50px
            }
            
            lastScrollY = currentScroll;
            ticking = false;
        };

        // Optimize scroll event handling
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                });
                ticking = true;
            }
        });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="md:hidden fixed top-0 left-0 w-full z-20 transition-transform duration-300  bg-[var(--primary-color)] bg-opacity-80 backdrop-blur" style="transform: translateY({isVisible ? '0' : '-100%'})">
    <div class="box py-3.5 flex justify-between">
        <a href="/" class="font-display text-xl font-bold z-20 text-center w-full">
            Marius Jopen
        </a>
    </div>

    <div on:click={triggerNav} class="uppercase cursor-pointer fixed top-[15px] right-4 z-20">
        Menu
    </div>
</div>

<div class="h-[62px] w-full  bg-[var(--primary-color)] md:hidden" />

{#if navVisible}
    <div transition:fade={{duration: 300 }} class="bg-[var(--quaternary-color)] text-[var(--text-primary-color)] fixed top-[40px] left-0 z-40 h-screen w-full">
        <div class="top-0 left-0 fixed w-full fixed bg-[var(--quaternary-color)] text-[var(--text-tertiary-color)]">        
            <div class="box py-3.5 flex justify-between">
                <a on:click={closeNav} href="/" class="font-display text-xl font-bold z-20 text-center w-full">
                    Marius Jopen
                </a>
            </div>
        
            <div on:click={closeNav} class="uppercase cursor-pointer fixed top-[15px] right-4 z-20 ">
                Close
            </div>
        </div>

        <div class="flex flex-col justify-center h-full text-center -mt-20">
            {#each data.header[0].data.links as link, index}
                <a  on:click={(e) => handleClick(e, link.url)} data-aos="fade-zoom-in" data-aos-delay={200 + index * 50} on:click={closeNav} class="text-xl text-[var(--text-tertiary-color)] hover:text-[var(--text-secondary-color)] transition-all duration-300 py-1" href={link.url} >
                    {link.text} 
                </a>
            {/each}    
        </div>

        <div data-aos="fade-zoom-in" data-aos-delay={200 + data.header[0].data.links.length * 50} class="flex justify-center pt-6 fixed bottom-8 w-full">
            <LanguageSwitch />
        </div>
    </div>
{/if}
