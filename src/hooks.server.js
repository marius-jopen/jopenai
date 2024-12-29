// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 10; // Cache for 10 minutes

export async function handle({ event, resolve }) {
    const ip = event.request.headers.get('x-forwarded-for') || event.request.headers.get('remote-address');

    // Check if we have cached data for this IP
    if (cache.has(ip)) {
        const { locationData, timestamp } = cache.get(ip);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return handleRedirection(locationData, event, resolve);
        }
    }

    // Mock response for development
    if (import.meta.env.MODE === 'development') {
        const mockLocationData = { country: 'DE' }; // Change this to 'EN' for testing English
        cache.set(ip, { locationData: mockLocationData, timestamp: Date.now() });
        return handleRedirection(mockLocationData, event, resolve);
    }

    // Fetch location data based on the IP address
    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!response.ok) {
        console.error('Error fetching location data:', response.status, await response.text());
        // Default to English if there's an error
        return handleRedirection({ country: 'EN' }, event, resolve);
    }

    let locationData;
    try {
        locationData = await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        // Default to English if there's a parsing error
        return handleRedirection({ country: 'EN' }, event, resolve);
    }

    // Cache the location data
    cache.set(ip, { locationData, timestamp: Date.now() });

    // Handle redirection based on the fetched location data
    return handleRedirection(locationData, event, resolve);
}

function handleRedirection(locationData, event, resolve) {
    const isGermanUser = locationData.country === 'DE';

    if (isGermanUser && event.url.pathname !== '/de') {
        throw redirect(302, '/de'); // Redirect to the German version
    } else if (!isGermanUser && event.url.pathname !== '/') {
        throw redirect(302, '/'); // Redirect to the English version
    }

    return resolve(event);
}
