<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const COMPONENT_SELECTOR = '.ss-carousel__wrapper';
		const CONTENT_SELECTOR = '.ss-carousel__content';

		const components = document.querySelectorAll(COMPONENT_SELECTOR);
		let maxScrollWidth;

		const toggleArrows = (content, nextButton, prevButton) => {
			if (content.scrollLeft >= maxScrollWidth) {
				nextButton.classList.add('disabled');
			} else {
				nextButton.classList.remove('disabled');
			}
			if (content.scrollLeft <= 0) {
				prevButton.classList.add('disabled');
			} else {
				prevButton.classList.remove('disabled');
			}
		};

		const scrollHandlers = [];

		for (const component of components) {
			const content = component.querySelector(CONTENT_SELECTOR);
			let x = 0;
			maxScrollWidth = content.scrollWidth - content.clientWidth - 1;

			const nextButton = component.querySelector('.arrow-next');
			const prevButton = component.querySelector('.arrow-prev');

			const scrollHandler = () => {
				console.log('Scroll position:', content.scrollLeft);
				toggleArrows(content, nextButton, prevButton);
			};

			scrollHandlers.push(scrollHandler);

			const itemWidth = content.querySelector('.ss-carousel__content > *').clientWidth;

			if (nextButton) {
					nextButton.addEventListener('click', (event) => {
						event.preventDefault();
						console.log('Next button clicked');
						if (!nextButton.classList.contains('disabled')) {
							x = content.scrollLeft + itemWidth;
							content.scroll({
								left: x,
								behavior: 'smooth',
							});
						}
					});
			}

			if (prevButton) {
				prevButton.addEventListener('click', (event) => {
					event.preventDefault();
					console.log('Previous button clicked');
					if (!prevButton.classList.contains('disabled')) {
						x = content.scrollLeft - itemWidth;
						content.scroll({
							left: x,
							behavior: 'smooth',
						});
					}
				});
			}

			content.addEventListener('scroll', scrollHandler);
		}

		// Call toggleArrows initially to set the correct state
		for (const component of components) {
			const content = component.querySelector(CONTENT_SELECTOR);
			toggleArrows(content, component.querySelector('.arrow-next'), component.querySelector('.arrow-prev'));
		}

		// Cleanup function to remove event listeners
		return () => {
			for (let i = 0; i < components.length; i++) {
				const component = components[i];
				const content = component.querySelector(CONTENT_SELECTOR);
				content.removeEventListener('scroll', scrollHandlers[i]);
			}
		};
	});
</script>

<style lang="postcss">
	.ss-carousel .ss-carousel__header {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}
	
	.ss-carousel .ss-carousel__content {
		overflow-y: hidden;
		overflow-x: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
		display: grid;
		-webkit-overflow-scrolling: touch;
		padding: 0;
		margin: 0;
		grid-gap: 30px;
		grid-auto-flow: column;
		list-style: none;
	}

	.ss-carousel .ss-carousel__content::-webkit-scrollbar {
		display: none;
	}

	.ss-carousel .ss-carousel__controls {
		display: grid;
		grid-auto-flow: column;
		grid-gap: 24px;
	}

	.ss-carousel .ss-carousel__arrow {
		padding: 0;
		background: transparent;
		box-shadow: none;
		border: 0;
		position: relative;
		z-index: 10;
		transform: scale(0.8);
	}

	.ss-carousel .ss-carousel__arrow:before {
		content: '';
		background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTUgOSI+Cgk8cGF0aCBmaWxsPSIjMzMzMzMzIiBkPSJNNy44NjcgOC41NzRsLTcuMjItNy4yMi43MDctLjcwOEw3Ljg2NyA3LjE2IDE0LjA1Ljk4bC43MDYuNzA3Ii8+Cjwvc3ZnPgo=');
		background-size: contain;
		filter: brightness(1);
		/* @apply brightness-100; */
		display: block;
		width: 38px;
		height: 23px;
		cursor: pointer;
		transition: filter 0.5s ease-in-out;
	}

	.ss-carousel .ss-carousel__arrow.arrow-prev:before {
		transform: rotate(90deg);
	}

	.ss-carousel .ss-carousel__arrow.arrow-next:before {
		transform: rotate(-90deg);
	}

	.ss-carousel .ss-carousel__arrow.disabled::before {
		filter: brightness(4);
		/* @apply brightness-50; */
	}
</style>

<section>
	<div class="ss-carousel">
		<div class="ss-carousel__wrapper">
			<div class="ss-carousel__content">
                <slot />
			</div>

			<div class="flex justify-center w-full pt-12" data-aos="fade-up" data-aos-delay={500}>
				<div class="ss-carousel__header">
					<div class="ss-carousel__controls">
						<button class="ss-carousel__arrow disabled arrow-prev" aria-label="Previous"></button>
						<button class="ss-carousel__arrow arrow-next" aria-label="Next"></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
