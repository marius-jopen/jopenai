// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    // Get the user's IP address
    const ip = event.request.headers.get('x-forwarded-for') || event.request.headers.get('remote-address');

    // Fetch location data based on the IP address
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await response.json();

    // Check if the user is from Germany
    if (locationData.country === 'DE' && event.url.pathname !== '/de') {
        throw redirect(302, '/de'); // Redirect to the German version
    } else if (locationData.country !== 'DE' && event.url.pathname !== '/') {
        throw redirect(302, '/'); // Redirect to the English version
    }

    // Continue to the requested page
    return await resolve(event);
}