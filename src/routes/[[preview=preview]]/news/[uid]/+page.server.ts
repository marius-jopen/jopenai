// @ts-nocheck
import { error } from '@sveltejs/kit';
import { asText } from '@prismicio/client';
import { LANGUAGE } from '$env/static/private';
import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	const lang = LANGUAGE || 'en-us';

	try {
		const [page, header, footer] = await Promise.all([
			client.getByUID('news_article', params.uid, { lang, fetchLinks: ['news_article.title','news_article.subtitle','news_article.image','news_article.video','project.title','project.subtitle','project.image','project.video'] }),
			client.getAllByType('header', { lang }),
			client.getAllByType('footer', { lang })
		]);

		if (!page) {
			throw error(404, 'News article not found');
		}

		// Fetch all news articles separately, don't fail if this fails
		let allNewsArticles = [];
		try {
			allNewsArticles = await client.getAllByType('news_article', { lang });
		} catch (newsError) {
			console.error('Error fetching all news articles:', newsError);
			// Continue without related articles if fetch fails
		}

		return {
			page,
			header,
			footer,
			allNewsArticles,
			lang,
			title: (page.data as any)?.title || '',
			meta_description: (page.data as any)?.meta_description,
			meta_title: (page.data as any)?.meta_title || (page.data as any)?.title || '',
			meta_image: (page.data as any)?.meta_image?.url
		};
	} catch (e) {
		console.error('Prismic Error:', {
			message: e.message,
			type: e.type,
			lang,
			url: e?.url,
			uid: params.uid
		});

		throw error(500, 'Failed to load content');
	}
}

export async function entries() {
	const client = createClient();
	const pages = await client.getAllByType('news_article');
	return pages.map((page) => ({ uid: page.uid }));
}
