import { asText } from '@prismicio/client';
import { LANGUAGE } from '$env/static/private';
import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	const lang = LANGUAGE || 'en-us';
	const page = await client.getByUID('page', params.uid, { lang });
	const header = await client.getAllByType('header', { lang });
	const footer = await client.getAllByType('footer', { lang });

	return {
		page,
		header,
		footer,
		lang,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('page');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
