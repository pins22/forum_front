<script lang="ts">
	import { text } from 'svelte/internal';

	export let value: any;
	export let variant: string | undefined = 'success';
	let textColor = 'text-white';
	let bgColor = 'bg-green-400';
	switch (variant) {
		case 'success':
			textColor = 'text-white';
			bgColor = 'bg-green-600';
			break;
		case 'danger':
			// textColor = 'text-black';
			bgColor = 'bg-red-600';
	}

	export let _class: string = '';
</script>

<div class="w-fit h-fit px-3 py-1 {textColor} rounded border-none {bgColor} {_class}">
	{value}
</div>
