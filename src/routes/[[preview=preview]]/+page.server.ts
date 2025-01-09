import { error } from '@sveltejs/kit';
import { asText } from '@prismicio/client';
import { LANGUAGE } from '$env/static/private';
import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	const lang = LANGUAGE || 'en-us';

	try {
		const [page, header, footer] = await Promise.all([
			client.getByUID('page', 'home', { lang }),
			client.getAllByType('header', { lang }),
			client.getAllByType('footer', { lang })
		]);

		if (!page) {
			throw error(404, 'Page not found');
		}

		return {
			page,
			header,
			footer,
			lang,
			title: asText(page.data.title),
			meta_description: page.data.meta_description,
			meta_title: page.data.meta_title,
			meta_image: page.data.meta_image?.url
		};
	} catch (e) {
		console.error('Prismic Error:', {
			message: e.message,
			type: e.type,
			lang,
			url: e?.url
		});

		throw error(500, {
			message: 'Failed to load content',
			code: e.code || 'PRISMIC_ERROR'
		});
	}
}

export function entries() {
	return [{}];
}
