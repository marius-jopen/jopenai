import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

function findField<T = unknown>(fields: Record<string, unknown>, candidates: string[]): T | undefined {
	const lowerToOriginal: Record<string, string> = {};
	for (const key of Object.keys(fields)) lowerToOriginal[key.toLowerCase()] = key;
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

export const GET: RequestHandler = async ({ params, fetch }) => {
	const token = env.AIRTABLE_TOKEN;
	const baseId = env.AIRTABLE_BASE_ID;
	const tableId = env.AIRTABLE_TABLE_ID;

	if (!token || !baseId || !tableId) {
		return new Response(
			JSON.stringify({ error: 'Missing Airtable configuration.' }),
			{ status: 500, headers: { 'content-type': 'application/json' } }
		);
	}

	const api = `https://api.airtable.com/v0/${baseId}/${tableId}/${params.id}`;
	const res = await fetch(api, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) {
		const text = await res.text();
		return new Response(text || 'Not found', { status: res.status });
	}
	const record = (await res.json()) as { id: string; createdTime: string; fields: Record<string, unknown> };
	const f = record.fields;

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
	const imageUrl = (findField<any[]>(f, ['Image', 'Cover', 'Screenshot', 'Logo'])?.[0]?.url as string | undefined) || firstAttachmentUrl(f);
	const checked = Boolean(findField<boolean | string>(f, ['checked', 'Checked']) ?? false);
	const weight = Number(findField<number | string>(f, ['Weight', 'Score', 'Rank']) || 0);

	const rawTags = findField<unknown>(f, ['Tags', 'tags', 'Categories']);
	let tags: string[] = [];
	if (Array.isArray(rawTags)) {
		tags = (rawTags as any[])
			.map((t) => (typeof t === 'string' ? t : (t && typeof t === 'object' && 'name' in t ? String((t as any).name) : '')))
			.filter(Boolean);
	} else if (typeof rawTags === 'string') {
		tags = rawTags
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
	}

	return new Response(
		JSON.stringify({
			id: record.id,
			createdTime: record.createdTime,
			name,
			category,
			description,
			pricing,
			url: urlField,
			imageUrl,
			checked,
			weight,
			tags
		}),
		{ status: 200, headers: { 'content-type': 'application/json' } }
	);
};


