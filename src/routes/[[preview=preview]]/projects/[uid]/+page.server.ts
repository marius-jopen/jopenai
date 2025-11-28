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
			client.getByUID('project', params.uid, { lang, fetchLinks: ['news_article.title','news_article.subtitle','news_article.image','news_article.video','project.title','project.subtitle','project.image','project.video'] }),
			client.getAllByType('header', { lang }),
			client.getAllByType('footer', { lang })
		]);

		if (!page) {
			throw error(404, 'Project not found');
		}

		// Fetch all projects separately, don't fail if this fails
		let allProjects = [];
		try {
			allProjects = await client.getAllByType('project', { lang });
		} catch (projectsError) {
			console.error('Error fetching all projects:', projectsError);
			// Continue without related projects if fetch fails
		}

		return {
			page,
			header,
			footer,
			allProjects,
			lang,
			title: asText(page.data.title) || '',
			meta_description: (page.data as any)?.meta_description,
			meta_title: (page.data as any)?.meta_title || asText(page.data.title) || '',
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
	const pages = await client.getAllByType('project');
	return pages.map((page) => ({ uid: page.uid }));
}
