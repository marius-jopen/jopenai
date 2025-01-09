<script>
    import { currentLang } from '$lib/stores/lang';
    
    const languages = ['en-us', 'de-de'];
    $: lang = $currentLang || 'en-us';

    function getDisplayText(langCode) {
        switch(langCode) {
            case 'en-us':
                return 'EN';
            case 'de-de':
                return 'DE';
            default:
                return langCode;
        }
    }

    function getDomain(langCode) {
        switch(langCode) {
            case 'en-us':
                return 'https://jopen.ai';
            case 'de-de':
                return 'https://de.jopen.ai';
            default:
                return 'https://jopen.ai';
        }
    }
</script>

<div class="language-switcher">
    {#each languages as langCode}
        <a 
            href={getDomain(langCode)}
            class:active={lang === langCode}
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