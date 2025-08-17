import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

interface AirtableRecord {
	id: string;
	createdTime: string;
	fields: Record<string, unknown>;
}

function findField<T = unknown>(fields: Record<string, unknown>, candidates: string[]): T | undefined {
	const lowerToOriginal: Record<string, string> = {};
	for (const key of Object.keys(fields)) {
		lowerToOriginal[key.toLowerCase()] = key;
	}
	for (const name of candidates) {
		const found = lowerToOriginal[name.toLowerCase()];
		if (found && found in fields) return fields[found] as T;
	}
	return undefined;
}

function firstAttachmentUrl(fields: Record<string, unknown>): string | undefined {
	for (const value of Object.values(fields)) {
		if (Array.isArray(value) && value.length > 0) {
			const first = value[0] as any;
			if (first && typeof first === 'object' && 'url' in first) return String(first.url);
		}
	}
	return undefined;
}

export const GET: RequestHandler = async ({ fetch, url }) => {
	const token = env.AIRTABLE_TOKEN;
	const baseId = env.AIRTABLE_BASE_ID;
	const tableId = env.AIRTABLE_TABLE_ID;

	if (!token || !baseId || !tableId) {
		return new Response(
			JSON.stringify({ error: 'Missing Airtable configuration. Set AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID.' }),
			{ status: 500, headers: { 'content-type': 'application/json' } }
		);
	}

	const api = `https://api.airtable.com/v0/${baseId}/${tableId}`;

	const records: AirtableRecord[] = [];
	let offset: string | undefined;
	let guard = 0;

	do {
		const params = new URLSearchParams();
		params.set('pageSize', '100');
		if (offset) params.set('offset', offset);

		const res = await fetch(`${api}?${params.toString()}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!res.ok) {
			const text = await res.text();
			return new Response(text || 'Airtable error', { status: res.status });
		}
		const json = (await res.json()) as { records: AirtableRecord[]; offset?: string };
		records.push(...json.records);
		offset = json.offset;
		guard++;
	} while (offset && guard < 50);

	const data = records.map((r) => {
		const f = r.fields;
		const name = (findField<string>(f, ['Name', 'Tool', 'Title']) || '').toString();
		const category = (findField<string>(f, ['Category', 'Type', 'Group']) || '').toString();
		const description = (findField<string>(f, ['Description', 'Summary', 'About', 'Text']) || '').toString();
		const pricing = (findField<string>(f, ['Pricing', 'Plan', 'Price', 'Free/Paid']) || '').toString();
		const urlField =
			findField<string>(f, ['URL', 'Link', 'Website', 'Homepage']) ||
			(() => {
				for (const val of Object.values(f)) {
					if (typeof val === 'string' && /^https?:\/\//.test(val)) return val;
				}
				return '';
			})();
		const imageUrl =
			(findField<any[]>(f, ['Image', 'Cover', 'Screenshot', 'Logo'])?.[0]?.url as string | undefined) ||
			firstAttachmentUrl(f);
		const checked = Boolean(findField<boolean | string>(f, ['checked', 'Checked']) ?? false);
		const weight = Number(findField<number | string>(f, ['Weight', 'Score', 'Rank']) || 0);

		return {
			id: r.id,
			createdTime: r.createdTime,
			name,
			category,
			description,
			pricing,
			url: urlField,
			imageUrl,
			checked,
			weight
		};
	});

	const qpCategory = url.searchParams.get('category');
	const qpSearch = url.searchParams.get('q');
	let filtered = data;
	if (qpCategory && qpCategory !== 'All') filtered = filtered.filter((d) => d.category?.toLowerCase() === qpCategory.toLowerCase());
	if (qpSearch) {
		const q = qpSearch.toLowerCase();
		filtered = filtered.filter((d) => d.name?.toLowerCase().includes(q) || d.description?.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q));
	}

	return new Response(JSON.stringify({ items: filtered }), {
		status: 200,
		headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' }
	});
};
