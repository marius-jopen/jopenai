// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 10; // Cache for 10 minutes

export async function handle({ event, resolve }) {
    // Get the Accept-Language header
    const acceptLanguage = event.request.headers.get('accept-language');
    console.log('Accept-Language:', acceptLanguage); // Log the Accept-Language header

    // Check if the Accept-Language header is null
    if (!acceptLanguage) {
        console.log('No Accept-Language header found. Defaulting to English.');
        // Default to English if no header is found
        return await resolve(event);
    }

    // Parse the Accept-Language header
    const languages = acceptLanguage.split(',').map(lang => {
        const [code, qValue] = lang.split(';');
        return {
            code: code.trim(),
            qValue: qValue ? parseFloat(qValue.split('=')[1]) : 1.0 // Default qValue to 1.0 if not specified
        };
    });

    // Determine if German or any German variant is preferred
    const isGermanUser = languages.some(lang => 
        lang.code.startsWith('de') && lang.qValue > 0
    );

    console.log('Is German User:', isGermanUser); // Log whether the user is identified as German

    // Redirect based on language detection
    if (isGermanUser && event.url.pathname !== '/de') {
        console.log('Redirecting to /de'); // Log the redirection action
        throw redirect(302, '/de'); // Redirect to the German version
    } else if (!isGermanUser && event.url.pathname !== '/') {
        console.log('Redirecting to /'); // Log the redirection action
        throw redirect(302, '/'); // Redirect to the English version
    }

    // Continue to the requested page
    return await resolve(event);
}