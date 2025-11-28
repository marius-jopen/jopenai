<script>
	export let image;
	export let video;
	export let title;
	export let subtitle;
	export let layout = "1";
</script>

<section class="pb-4 pt-0" data-aos="fade-up">
	<div class="px-3 md:px-8 w-full">
		{#if image?.url}
			<div class="w-full aspect-[6/3] overflow-hidden rounded-lg mb-6 border border-[var(--text-quaternary-color)] relative">
				{#if video}
					<video src={video} poster={image.url} class="rounded-lg w-full h-full object-cover aspect-[6/3]" autoplay muted loop playsinline></video>
				{:else}
					<img src={image.url} alt={title} class="rounded-lg w-full h-full object-cover aspect-[6/3]" />
				{/if}

				{#if layout === "2" && (title || subtitle)}
					<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
						{#if title}
							<h2 class="pb-0">{title}</h2>
						{/if}
						{#if subtitle}
							<p class="text-base-mobile md:text-base mt-2 pl-1 mb-3.5">{subtitle}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if layout === "1"}
		<!-- Layout 1: Title and subtitle below image -->
		<div class="box pt-4">
			{#if title}
				<h2 class="mb-2 pb-4">{title}</h2>
			{/if}
			{#if subtitle}
				<p class="w-3/4 text-base-mobile md:text-base text-[var(--text-secondary-color)]">{subtitle}</p>
			{/if}

			<div class="h-6"></div>
		</div>
	{/if}
</section>

