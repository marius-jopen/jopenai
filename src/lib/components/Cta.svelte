<script lang="ts">
	import CtaSlice from '$lib/slices/Cta/index.svelte';
	import type { Content } from '@prismicio/client';

	// Create a minimal slice object with empty fields to trigger global fetch
	const emptySlice: Content.CtaSlice = {
		slice_type: 'cta',
		slice_label: null,
		variation: 'default',
		version: 'initial',
		primary: {
			headline: null,
			text: null,
			button: null,
			image: null,
			deactivated: false,
			hash: null
		}
	};
</script>

<CtaSlice slice={emptySlice} />

