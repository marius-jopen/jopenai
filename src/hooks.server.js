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
		// Return a 404 response for missing documents
		return new Response(
			JSON.stringify({
				message: 'Content not found',
				status: 404
			}),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}

	// For all other errors, return a generic 500 response
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

// Add this to disable prerendering for routes that might fail
export const config = {
	prerender: {
		handleHttpError: ({ path, referrer, message }) => {
			// Ignore 404s and continue prerendering
			if (message.includes('No documents were returned')) {
				return;
			}
			// Throw other errors
			throw new Error(message);
		}
	}
};
