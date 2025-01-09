<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import LanguageSwitch from './LanguageSwitch.svelte';

    export let data;

    let isVisible = true;
    let lastScrollY = 0;
    let navVisible = false;

    function triggerNav() {
        navVisible = !navVisible; // Toggle visibility
    }

    function closeNav() {
        navVisible = false; // Toggle visibility
    }

    onMount(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Check if scrolling down or up
            if (currentScroll > lastScrollY && currentScroll > 0) {
                isVisible = false; // Scrolling down
            } else if (currentScroll < lastScrollY && currentScroll > 0) {
                isVisible = true; // Scrolling up, but not at the top
            }

            lastScrollY = currentScroll; // Update last scroll position
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="md:hidden fixed top-0 left-0 w-full z-20 transition-transform duration-300 bg-neutral-100 bg-opacity-80 backdrop-blur" style="transform: translateY({isVisible ? '0' : '-100%'})">
    <div class="box py-4 flex justify-between">
        <a href="/" class="text-xl font-bold z-20 text-center w-full">
            JopenAI
        </a>
    </div>

    <div on:click={triggerNav} class="cursor-pointer fixed top-[18px] right-4 z-20">
        Menu
    </div>
</div>

<div class="h-[62px] w-full bg-neutral-100 md:hidden" />

{#if navVisible}
    <div transition:fade={{duration: 300 }} class="bg-black text-white fixed top-[40px] left-0 z-40 h-screen w-full">
        <div class="top-0 left-0 fixed w-full fixed bg-black text-white">        
            <div class="box py-4 flex justify-between">
                <a on:click={closeNav} href="/" class="text-xl font-bold z-20 text-center w-full">
                    JopenAI
                </a>
            </div>
        
            <div on:click={closeNav} class="cursor-pointer fixed top-[18px] right-4 z-20 ">
                Close
            </div>
        </div>

        <div class="flex flex-col justify-center h-full text-center -mt-12">
            {#each data.header[0].data.links as link, index}
                <a data-aos="fade-zoom-in" data-aos-delay={200 + index * 50} on:click={closeNav} class="text-xl text-white hover:text-neutral-500 transition-all duration-300 py-1" href={link.url} >
                    {link.text} 
                </a>
            {/each}

            <LanguageSwitch />
        </div>
    </div>
{/if}
