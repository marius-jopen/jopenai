// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    // Get the user's IP address
    const ip = event.request.headers.get('x-forwarded-for') || event.request.headers.get('remote-address');

    // Fetch location data based on the IP address
    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    // Check if the response is OK
    if (!response.ok) {
        console.error('Error fetching location data:', response.status, await response.text());
        // Handle the error appropriately, e.g., redirect to a default page or return an error response
        return await resolve(event); // or handle the error as needed
    }

    let locationData;
    try {
        locationData = await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle JSON parsing error
        return await resolve(event); // or handle the error as needed
    }

    // Check if the user is from Germany
    if (locationData.country === 'DE' && event.url.pathname !== '/de') {
        throw redirect(302, '/de'); // Redirect to the German version
    } else if (locationData.country !== 'DE' && event.url.pathname !== '/') {
        throw redirect(302, '/'); // Redirect to the English version
    }

    // Continue to the requested page
    return await resolve(event);
}