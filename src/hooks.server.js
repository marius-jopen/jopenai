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

	// Return a response that won't break prerendering
	return new Response(null, {
		status: error.status || 500,
		statusText: error.message || 'Internal Server Error'
	});
}
