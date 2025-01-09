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

<div class="language-switcher">
    {#each languages as langCode}
        <a
            href={getDomain(langCode)}
            class:active={lang === langCode}
            aria-label={`Switch to ${getDisplayText(langCode)}`}
        >
            {getDisplayText(langCode)}
        </a>
    {/each}
</div>

<style>
    .language-switcher {
        display: flex;
        gap: 0.5rem;
    }
    
    .active {
        font-weight: bold;
    }
</style>