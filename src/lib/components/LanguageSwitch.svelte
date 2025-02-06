<script lang="ts">
    import { currentLang } from '$lib/stores/lang';
    
    type LanguageCode = 'en-us' | 'de-de';
    const languages: LanguageCode[] = ['en-us', 'de-de'];
    $: lang = $currentLang || 'en-us';

    const domainMap: Record<LanguageCode, string> = {
        'en-us': 'https://jopen.ai',
        'de-de': 'https://de.jopen.ai'
    };

    function getDisplayText(langCode: LanguageCode): string {
        return langCode === 'en-us' ? 'EN' : 'DE';
    }

    function getDomain(langCode: LanguageCode): string {
        return domainMap[langCode];
    }
</script>

<div class="flex gap-2.5 border border-neutral-200 rounded-full px-4 py-1 bg-neutral-800 md:bg-white">
    {#each languages as langCode}
        <a
            href={getDomain(langCode)}
            class:active={lang === langCode}
            aria-label={`Switch to ${getDisplayText(langCode)}`}
            class="text-neutral-500 hover:text-black transition-colors duration-300 text-base md:text-base"
        >
            {getDisplayText(langCode)}
        </a>
    {/each}
</div>

<style>
    .active {
        @apply text-white md:text-black;
    }
</style>