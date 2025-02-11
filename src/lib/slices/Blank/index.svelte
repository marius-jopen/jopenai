<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.BlankSlice;

	let selection = slice.primary.selector;

	// Mapping of selection values to height classes
	const heightClasses = {
		"xxl": "h-80",
		"xl": "h-64",
		"l": "h-24",
		"m": "h-12",
		"s": "h-4"
	};

	// Get the corresponding height class based on the selection
	let heightClass = heightClasses[selection] || '';
</script>

<section class={heightClass}>
	
</section>
