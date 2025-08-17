import type { PageServerLoad } from './$types';
import { LANGUAGE } from '$env/static/private';
import { createClient } from '$lib/prismicio';

function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
  const res = await fetch(`/api/tools`);
  if (!res.ok) {
    return { status: res.status, error: new Error('Tools not available') } as any;
  }
  const json = await res.json();
  const items = Array.isArray(json.items) ? json.items : [];
  const tool = items.find((t: any) => slugify(t?.name) === params.slug);
  if (!tool) {
    return { status: 404, error: new Error('Tool not found') } as any;
  }

  const client = createClient({ fetch, cookies });
  const lang = LANGUAGE || 'en-us';
  const [header, footer] = await Promise.all([
    client.getAllByType('header', { lang }),
    client.getAllByType('footer', { lang })
  ]);

  return { tool, header, footer, lang };
};


