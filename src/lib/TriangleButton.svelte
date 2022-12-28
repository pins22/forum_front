<script lang="ts">
	export let onClick: (e: MouseEvent) => void;
	export let type: string = 'up'; // up, down
	export let isPressed: boolean = false;

	const triangleClasses = {
		up: 'border-t-[0px] border-[12px] border-l-transparent border-t-transparent border-r-transparent',
		down: 'border-b-[0px] border-[12px] border-l-transparent border-b-transparent border-r-transparent'
	};

	const pressedClasses = {
		up: `border-b-green-500`,
		down: `border-t-red-500`
	};
	const unpressedClasses = {
		up: `border-b-grey-500`,
		down: `border-t-grey-500`
	};

	type ObjectKey = keyof typeof triangleClasses;

	const typeAsKey: ObjectKey = type as ObjectKey;
</script>

<button
	on:click={(e) => {
		onClick(e);
	}}
>
	<div
		class="w-0 h-0  {triangleClasses[typeAsKey]} {isPressed
			? pressedClasses[typeAsKey]
			: unpressedClasses[typeAsKey]}"
	/>
</button>
