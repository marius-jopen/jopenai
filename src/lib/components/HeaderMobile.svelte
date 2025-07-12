<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { afterNavigate } from '$app/navigation';
    import Navigation from './Navigation.svelte';
    import LanguageSwitch from './LanguageSwitch.svelte';

    export let data;

    let isVisible = true;
    let lastScrollY = 0;
    let navVisible = false;
    let ticking = false;  // Add this for scroll optimization
    let mounted = false;
    let stableData = data; // Create stable reference

    function triggerNav() {
        console.log('=== triggerNav ENTRY ===');
        console.log('Mounted state:', mounted);
        console.log('Current navVisible:', navVisible);
        
        if (!mounted) {
            console.log('❌ triggerNav called but component not mounted');
            return;
        }
        
        console.log('✅ Component is mounted, toggling nav');
        navVisible = !navVisible;
        console.log('New navVisible:', navVisible);
        console.log('=== triggerNav EXIT ===');
    }

    function closeNav() {
        if (!mounted) {
            console.log('closeNav called but component not mounted');
            return;
        }
        console.log('closeNav called, current navVisible:', navVisible);
        navVisible = false; // Toggle visibility
    }

    onMount(() => {
        mounted = true;
        console.log('HeaderMobile mounted');
        
        const handleScroll = () => {
            if (!mounted) return;
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
        const scrollHandler = () => {
            if (!ticking && mounted) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollHandler);
        
        return () => {
            mounted = false;
            console.log('HeaderMobile unmounted');
            window.removeEventListener('scroll', scrollHandler);
        };
    });


</script>

<div class="md:hidden fixed top-0 left-0 w-full z-20 transition-transform duration-300  bg-[var(--primary-color)] bg-opacity-80 backdrop-blur" style="transform: translateY({isVisible ? '0' : '-100%'})">
    <div class="box py-3.5 flex justify-between">
        <a href="/" class="font-display text-xl font-bold z-20 text-center w-full">
            THE ROBOTS
        </a>
    </div>

    <button 
        on:click={triggerNav}
        class="uppercase cursor-pointer fixed top-[10px] right-4 z-20 p-2 min-w-[60px] min-h-[40px] flex items-center justify-center"
        aria-label="Open menu"
    >
        Menu
    </button>
</div>

<div class="h-[62px] w-full  bg-[var(--primary-color)] md:hidden" />

{#if navVisible}
    <div 
        transition:fade={{duration: 300 }} 
        class="bg-[var(--quaternary-color)] text-[var(--text-primary-color)] fixed top-[40px] left-0 z-40 h-screen w-full"
    >
        <div class="top-0 left-0 fixed w-full fixed bg-[var(--quaternary-color)] text-[var(--text-tertiary-color)]">        
            <div class="box py-3.5 flex justify-between">
                <a on:click={closeNav} href="/" class="font-display text-xl font-bold z-20 text-center w-full">
                    THE ROBOTS
                </a>
            </div>
        
            <button 
                on:click={closeNav}
                class="uppercase cursor-pointer fixed top-[10px] right-4 z-20 p-2 min-w-[60px] min-h-[40px] flex items-center justify-center"
                aria-label="Close menu"
            >
                Close
            </button>
        </div>

        <div class="flex flex-col justify-center h-full text-center -mt-20">
            <!-- Protected Navigation component -->
            {#if mounted && stableData}
                {#key navVisible}
                    <Navigation data={stableData} isMobile={true} closeNav={closeNav} />
                {/key}
            {:else}
                <div>Loading navigation...</div>
            {/if}
        </div>

        <div data-aos="fade-zoom-in" data-aos-delay={200 + (stableData?.header?.[0]?.data?.nav_top || stableData?.header?.[0]?.data?.links || []).length * 50} class="flex justify-center pt-6 fixed bottom-8 w-full">
            {#if mounted}
                <LanguageSwitch />
            {/if}
        </div>
    </div>
{/if}
