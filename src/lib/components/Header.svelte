<script>
    import { onMount } from 'svelte';
    import Navigation from './Navigation.svelte';
	import Button from './Button.svelte';
    // import LanguageSwitch from './LanguageSwitch.svelte';
    export let data;

    let isVisible = true;
    let lastScrollY = 0;

    onMount(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Check if scrolling down or up
            if (currentScroll > lastScrollY) {
                isVisible = false; // Scrolling down
            } else {
                isVisible = true; // Scrolling up
            }

            lastScrollY = currentScroll; // Update last scroll position
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="hidden md:block fixed top-0 left-0 w-full z-20 transition-transform duration-300  bg-[var(--primary-color)] bg-opacity-80 backdrop-blur" style="transform: translateY({isVisible ? '0' : '-100%'})">
    <div class="box py-4 flex justify-between">
        <a href="/" class="font-display text-xl font-bold z-20">
            THE ROBOTS
        </a>
    
        <div class="flex gap-8 text-base z-20 mt-[-2px]">
            <Navigation {data} />
        </div>
    
        <div class="flex gap-6 z-20 -mt-0.5">            
            <Button data={data.header[0].data.button} big={false} medium={false} onwhite={false} />
        </div>
    </div>
</div>

<div class="h-[65px] w-full  bg-[var(--primary-color)] hidden md:block" />