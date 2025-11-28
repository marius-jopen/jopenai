<script>
	export let infos = [];

	// Determine number of columns on md+ (default to 3)
	const requestedCols = 2;
	const clampedCols = Math.max(1, Math.min(requestedCols, 12));
	// Enumerate possible classes so Tailwind JIT includes them
	const mdGridColsClassMap = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		7: 'md:grid-cols-7',
		8: 'md:grid-cols-8',
		9: 'md:grid-cols-9',
		10: 'md:grid-cols-10',
		11: 'md:grid-cols-11',
		12: 'md:grid-cols-12'
	};
	const mdGridColsClass = mdGridColsClassMap[clampedCols] || 'md:grid-cols-3';
</script>

{#if infos && infos.length > 0}
	<section class="pb-12" data-aos="fade-up">
		<div data-aos="fade-up" class={`grid grid-cols-1 ${mdGridColsClass} gap-4 box-big`}>
			{#each infos as item, index}
				<div data-aos="fade-zoom-in" data-aos-delay={100 + index * 150} class="flex flex-col rounded-lg overflow-hidden h-full bg-[var(--secondary-color)] hover:bg-[var(--tertiary-color)] color-transition">
					<div class="rounded-lg px-6 md:px-10 pt-6 md:pt-10 pb-8 md:pb-12 w-full flex-1 flex flex-col">
						{#if item.label}
							<h4 class="mb-0 pb-3" data-aos-delay={100 + index * 150}>
								{item.label}
							</h4>
						{/if}
					
						{#if item.text}
							<div class="text-base-mobile md:text-base text-box text-[var(--text-secondary-color)] flex-1" data-aos="fade" data-aos-delay={150 + index * 150}>
								{item.text}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

