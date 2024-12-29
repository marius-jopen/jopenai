<script>
    import { onMount } from 'svelte';
    import ScrollLinks from './ScrollLinks.svelte';
    // import { PrismicLink } from '@prismicio/svelte';
	import Button from './Button.svelte';

    export let data;

    let isVisible = true;
    let lastScrollY = 0;

    // console.log(data.header[0].data.links);

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

<!-- <div class="bg-gradient-to-b from-white dark:from-black to-transparent h-16 fixed w-full top-0 left-0 mix-blend-screen dark:mix-blend-multiply z-20">
</div> -->

<div class="hidden md:block fixed top-0 left-0 w-full z-20 transition-transform duration-300 bg-neutral-100 bg-opacity-80 backdrop-blur" style="transform: translateY({isVisible ? '0' : '-100%'})">
    <div class="box py-4 flex justify-between">
        <div class="text-xl font-bold pt-0.5">
            JopenAI
        </div>
    
        <div class="flex gap-8 text-sm pt-1 absolute top-[17px] left-0 w-full justify-center">
            <ScrollLinks {data} />
            <!-- {#each data.header[0].data.links as link (link.key)}
                <PrismicLink field={link} />
            {/each} -->
        </div>
    
        <div class="flex gap-6">  
            <div class="text-sm pt-1 flex gap-2">
                <a href="/de" class="text-black">
                    DE
                </a>
    
                <a href="/" class="text-black">
                    EN
                </a>
            </div>
          
            <div class="-mt-0.5">
                <Button data={data.header[0].data.button} />
            </div>
        </div>
    </div>
</div>

<div class="h-[70px] w-full bg-neutral-100 hidden md:block" />