<script lang="ts">
	import TestimonialsSlice from '$lib/slices/Testimonials/index.svelte';
	import type { Content } from '@prismicio/client';

	// Create a minimal slice object with empty items to trigger global fetch
	const emptySlice: Content.TestimonialsSlice = {
		slice_type: 'testimonials',
		slice_label: null,
		variation: 'default',
		version: 'initial',
		primary: {
			items: []
		},
		items: []
	};
</script>

<TestimonialsSlice slice={emptySlice} />

