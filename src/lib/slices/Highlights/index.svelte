<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HighlightsSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
</section>
