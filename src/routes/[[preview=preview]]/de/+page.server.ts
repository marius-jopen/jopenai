import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('page', 'home', { lang: 'de-de' });
	const header = await client.getAllByType("header", { lang: 'de-de' });
	const footer = await client.getAllByType("footer", { lang: 'de-de' });

	return {
		page,
		header,
		footer,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export function entries() {
	return [{}];
}