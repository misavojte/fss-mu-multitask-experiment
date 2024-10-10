<script lang="ts">
	export let frameColor: string = '#333333'; // Default frame color
	export let width: number = 300; // Default width in pixels
	export let height: number = 650; // Default height in pixels
	export let showBezels: boolean = true; // Show decorative bezels by default
	export let borderWidth: number = 14; // Default border width in pixels

	// Calculate bezel positions and sizes based on the width and height
	const bezel1Top = height * (72 / 600);
	const bezel2Top = height * (124 / 600);
	const bezel3Top = height * (178 / 600);
	const bezel4Top = height * (142 / 600);

	const bezel1Height = height * (32 / 600);
	const bezel2Height = height * (46 / 600);
	const bezel3Height = height * (46 / 600);
	const bezel4Height = height * (64 / 600);

	const bezelWidthValue = (width + borderWidth) / 80;
	const bezelLeftOffset = -borderWidth - bezelWidthValue;
	const bezelRightOffset = -borderWidth - bezelWidthValue;

	// External dimensions including border width
	const externalWidth = width + 2 * borderWidth; // Add border sizes (borderWidth on each side)
	const externalHeight = height + 2 * borderWidth;
</script>

<div
	class="relative mx-auto device-frame shadow-md"
	style="
    background-color: {frameColor};
    border-color: {frameColor};
    border-width: {borderWidth}px;
    width: {externalWidth}px;
    height: {externalHeight}px;"
>
	{#if showBezels}
		<!-- Left Bezels -->
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidthValue}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel1Top + borderWidth}px;
        height: {bezel1Height}px;"
		></div>
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidthValue}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel2Top + borderWidth}px;
        height: {bezel2Height}px;"
		></div>
		<div
			class="bezel left-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidthValue}px;
        --bezel-left-offset: {bezelLeftOffset}px;
        top: {bezel3Top + borderWidth}px;
        height: {bezel3Height}px;"
		></div>
		<!-- Right Bezel -->
		<div
			class="bezel right-bezel"
			style="
        --frame-color: {frameColor};
        --bezel-width: {bezelWidthValue}px;
        --bezel-right-offset: {bezelRightOffset}px;
        top: {bezel4Top + borderWidth}px;
        height: {bezel4Height}px;"
		></div>
	{/if}
	<div
		class="screen"
		style="
      width: {width}px;
      height: {height}px;
      background-color: white;"
	>
		<!-- Screen Content -->
		<slot>
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
		</slot>
	</div>
</div>

<style>
	.device-frame {
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
		left: calc(var(--bezel-left-offset));
		border-top-left-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
	}
	.right-bezel {
		right: calc(var(--bezel-right-offset));
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}
</style>
