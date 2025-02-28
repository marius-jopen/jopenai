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

<div class="flex gap-2.5 rounded-full px-4 pt-1 pb-1.5 bg-[var(--primary-color)] md:bg-[var(--secondary-color)]">
    {#each languages as langCode}
        <a
            href={getDomain(langCode)}
            class:active={lang === langCode}
            aria-label={`Switch to ${getDisplayText(langCode)}`}
            class="text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] transition-colors duration-300 text-base md:text-base"
        >
            {getDisplayText(langCode)}
        </a>
    {/each}
</div>

<style>
    .active {
        @apply font-bold text-[var(--text-primary-color)] md:text-[var(--text-primary-color)];
    }
</style>