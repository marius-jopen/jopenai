<script>
    import { onMount } from 'svelte';

    export let data;

    let isVisible = true;
    let lastScrollY = 0;

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
        <div class="text-xl font-bold z-20 text-center w-full">
            JopenAI
        </div>
    </div>
</div>

<div class="h-[62px] w-full bg-neutral-100 md:hidden" />