<script lang="ts">
	export let image;
	export let video;
	export let title;
	export let subtitle;
	export let date;
	export let layout = "1";

	// Format date for display
	const formatDate = (dateString: string | null | undefined): string => {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			});
		} catch {
			return dateString;
		}
	};
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

				{#if layout === "3"}
					<div class="absolute inset-0 bg-black/20 rounded-lg"></div>
				{/if}

				{#if layout === "2" && (title || subtitle)}
					<div data-aos="fade" class="text-[var(--text-tertiary-color)] px-6 pb-3.5 absolute bottom-0 left-0 w-full lg:w-3/4 h-full flex flex-col items-start justify-end">
						{#if date}
							<div class="text-sm mb-3">{formatDate(date)}</div>
						{/if}
						{#if title}
							<h2 class="pb-0">{title}</h2>
						{/if}
						{#if subtitle}
							<p class="text-base-mobile md:text-base mt-2 pl-1 mb-3.5">{subtitle}</p>
						{/if}
					</div>
				{/if}
				{#if layout === "3" && (title || subtitle)}
					<div data-aos="fade" class="mx-auto w-3/4 text-[var(--text-tertiary-color)] px-6 absolute inset-0 h-full flex flex-col items-center justify-center text-center">
						{#if date}
							<div class="text-sm mb-3">{formatDate(date)}</div>
						{/if}
						{#if title}
							<h2 class="pb-0">{title}</h2>
						{/if}
						{#if subtitle}
							<p class="text-base-mobile md:text-base mt-2 mb-3.5">{subtitle}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if layout === "1"}
		<!-- Layout 1: Title and subtitle below image -->
		<div class="box pt-4 text-center">
			{#if date}
				<div class="text-sm text-[var(--text-secondary-color)] mb-3" data-aos="fade">
					{formatDate(date)}
				</div>
			{/if}
			{#if title}
				<h2 class="mb-2 pb-4">{title}</h2>
			{/if}
			{#if subtitle}
				<p class="mx-auto w-3/4 text-base-mobile md:text-base text-[var(--text-secondary-color)]">{subtitle}</p>
			{/if}

			<div class="h-6"></div>
		</div>
	{/if}
</section>

