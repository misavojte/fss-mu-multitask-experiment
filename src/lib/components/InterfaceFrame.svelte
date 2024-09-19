<script lang="ts">
	export let frameColor: string = '#333333'; // Default frame color
	export let width: number = 300; // Default width in pixels
	export let height: number = 600; // Default height in pixels
	export let showBezels: boolean = true; // Show decorative bezels by default

	// Calculate bezel positions and sizes based on the width and height
	const bezel1Top = height * (72 / 600);
	const bezel2Top = height * (124 / 600);
	const bezel3Top = height * (178 / 600);
	const bezel4Top = height * (142 / 600);

	const bezel1Height = height * (32 / 600);
	const bezel2Height = height * (46 / 600);
	const bezel3Height = height * (46 / 600);
	const bezel4Height = height * (64 / 600);

	const bezelWidth = 3 * (width / 300);
	const bezelLeftOffset = -17 * (width / 300);
	const bezelRightOffset = -17 * (width / 300);

	// Inner content dimensions accounting for borders
	const innerWidth = width - 28; // Subtract border sizes (14px on each side)
	const innerHeight = height - 28;
</script>

<div
	class="relative mx-auto device-frame"
	style="
    background-color: {frameColor};
    border-color: {frameColor};
    width: {width}px;
    height: {height}px;"
>
	{#if showBezels}
		<!-- Left Bezels -->
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidth}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel1Top}px;
        height: {bezel1Height}px;"
		></div>
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidth}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel2Top}px;
        height: {bezel2Height}px;"
		></div>
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidth}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel3Top}px;
        height: {bezel3Height}px;"
		></div>
		<!-- Right Bezel -->
		<div
			class="bezel right-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidth}px;
        --bezel-right-offset: {bezelRightOffset}px;
        top: {bezel4Top}px;
        height: {bezel4Height}px;"
		></div>
	{/if}

	<!-- Screen Content -->
	<slot>
		<div
			class="screen"
			style="
      width: {innerWidth}px;
      height: {innerHeight}px;
      background-color: white;"
		>
			<img
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
				class="dark:hidden"
				style="width: 100%; height: 100%;"
				alt=""
			/>
			<img
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png"
				class="hidden dark:block"
				style="width: 100%; height: 100%;"
				alt=""
			/>
		</div>
	</slot>
</div>

<style>
	.device-frame {
		border-width: 14px;
		border-style: solid;
		border-radius: 2.5rem;
	}
	.screen {
		border-radius: 2rem;
		overflow: hidden;
	}
	.bezel {
		position: absolute;
		width: var(--bezel-width);
		background-color: var(--frame-color);
		border-radius: 0.5rem;
	}
	.left-bezel {
		left: var(--bezel-left-offset);
		border-top-left-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
	}
	.right-bezel {
		right: var(--bezel-right-offset);
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}
</style>
