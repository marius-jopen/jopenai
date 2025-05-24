<script lang="ts">
    import { PrismicLink } from '@prismicio/svelte';
    import { asLink } from '@prismicio/client';
    import { browser } from '$app/environment';
    import type { HeaderDocumentDataNavTopItem } from '../../prismicio-types';

    export let data;
    export let isMobile = false;
    export let closeNav = () => {};
    export let linkClass = "";

    function handleClick(e: Event, url: string) {
        console.log('Navigation click:', {url, currentPath: window.location.pathname, currentOrigin: window.location.origin});
        
        // Check if it's a hash link or a URL with hash
        if (url.startsWith('#') || url.includes('#')) {
            const hashIndex = url.indexOf('#');
            if (hashIndex !== -1) {
                const hash = url.substring(hashIndex + 1);
                
                // Check if we're linking to the same page
                let isSamePage = false;
                if (hashIndex === 0) {
                    // Pure hash link like #pricing
                    isSamePage = true;
                    console.log('Pure hash link detected');
                } else {
                    // Full URL with hash - normalize URLs for comparison
                    const linkUrl = url.substring(0, hashIndex);
                    const currentUrl = browser ? window.location.origin + window.location.pathname : '';
                    
                    // Normalize both URLs by removing trailing slashes for comparison
                    const normalizedLinkUrl = linkUrl.replace(/\/$/, '') || linkUrl;
                    const normalizedCurrentUrl = currentUrl.replace(/\/$/, '') || currentUrl;
                    
                    isSamePage = normalizedLinkUrl === normalizedCurrentUrl;
                    console.log('URL comparison:', {linkUrl, currentUrl, normalizedLinkUrl, normalizedCurrentUrl, isSamePage});
                }
                
                // Only prevent default and scroll if we're on the same page
                if (isSamePage) {
                    console.log('Same page - preventing default and scrolling');
                    e.preventDefault();
                    const element = document.querySelector(`[data-id="${hash}"]`);
                    if (element) {
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - 50;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    console.log('Different page - allowing normal navigation');
                }
            }
        }
        
        // Close mobile nav if it's mobile
        if (isMobile) {
            closeNav();
        }
    }

    function getUrl(item: any): string {
        // If there's an anchor, append it to the link URL
        if (item.anchor) {
            // Get the properly resolved link URL
            const baseUrl = asLink(item.link);
            if (baseUrl) {
                // If baseUrl is just '/', convert it to full URL (only in browser)
                const fullBaseUrl = baseUrl === '/' && browser ? window.location.origin : baseUrl;
                const fullUrl = `${fullBaseUrl}#${item.anchor}`;
                console.log('Generated URL with anchor:', fullUrl, 'from baseUrl:', baseUrl, 'anchor:', item.anchor);
                return fullUrl;
            }
        }
        // For old structure, use the URL directly or fallback to asLink
        const url = item.url || asLink(item.link) || asLink(item) || '';
        console.log('Generated URL without anchor:', url);
        return url;
    }

    // Default classes for desktop and mobile
    const defaultClass = linkClass || (isMobile 
        ? "text-xl text-[var(--text-tertiary-color)] hover:text-[var(--text-secondary-color)] transition-all duration-300 py-1"
        : "cursor-pointer text-[var(--text-primary-color)] hover:text-[var(--text-primary-color)] transition-all duration-300");


</script>

{#each data.header[0].data.nav_top || data.header[0].data.links as item, index}
    {#if item.link}
        <!-- New structure with link field and optional anchor -->
        {#if item.anchor}
            <a 
                class={defaultClass}
                href={getUrl(item)}
                on:click={(e) => handleClick(e, getUrl(item))}
                data-aos={isMobile ? "fade-zoom-in" : ""}
                data-aos-delay={isMobile ? 200 + index * 50 : ""}
            >
                {item.link.text}
            </a>
        {:else}
            <PrismicLink 
                field={item.link}
                class={defaultClass}
                on:click={() => isMobile && closeNav()}
                data-aos={isMobile ? "fade-zoom-in" : ""}
                data-aos-delay={isMobile ? 200 + index * 50 : ""}
            />
        {/if}
    {:else}
        <!-- Old structure with url and text -->
        <a 
            class={defaultClass}
            href={item.url}
            on:click={(e) => handleClick(e, item.url)}
            data-aos={isMobile ? "fade-zoom-in" : ""}
            data-aos-delay={isMobile ? 200 + index * 50 : ""}
        >
            {item.text}
        </a>
    {/if}
{/each}