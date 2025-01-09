/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
	// Log the error
	console.error('Server Error:', error);

	return {
		message: 'Internal Server Error',
		code: error?.code ?? 'UNKNOWN'
	};
}

/** @type {import('@sveltejs/kit').HandleHttpError} */
export function handleHttpError({ error, event }) {
	// Log the error
	console.error('HTTP Error:', error);

	// Check if this is a Prismic API error
	if (error.message?.includes('No documents were returned')) {
		console.log('Document not found, continuing...');
		return;
	}

	return new Response(
		JSON.stringify({
			message: error.message || 'Internal Server Error',
			status: error.status || 500
		}),
		{
			status: error.status || 500,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
}

// Disable prerendering globally
export const config = {
	prerender: {
		entries: [] // This will prevent automatic prerendering
	}
};
