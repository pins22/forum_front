<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="h-full w-full bg-blue-500">
	<div class="flex flex-row px-2 justify-center h-[400px] pt-5 bg-gradient-to-b from-zinc-800">
		<div class="flex flex-col">
			<div class="flex flex-row justify-start ml-3">
				<h1 class="text-center text-white font-semibold text-4xl mb-4">Documentation</h1>
			</div>
			<div class="flex flex-row justify-start sm:w-[500px] w-fit">
				<p class="text-blue-100">
					Our organization strives to supply <strong>end users and developers</strong> with the best
					possible documentation. We provide documentation for our
					<a
						target="_blank"
						href="https://github.com/pins22/casual-physics-for-vehicles"
						class="underline"><strong>C# bindings</strong></a
					>
					as well as our
					<a
						target="_blank"
						href="https://github.com/pins22/casual-physics-for-vehicles"
						class="underline"><strong>C++ Core</strong></a
					>.
				</p>
			</div>
			<div class="flex flex-row justify-start sm:w-[500px] w-fit">
				<h2 class="text-left text-white mt-3 text-xl">Choose documentation:</h2>
			</div>
			<div class="flex flex-row mt-1">
				<button
					on:click={() => {
						goto('/docs/cs');
					}}
					class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
				>
					<span
						class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
					>
						C# Bindings
					</span>
				</button>
				<button
					on:click={() => {
						goto('/docs/cpp');
					}}
					class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
				>
					<span
						class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
					>
						C++ Core
					</span>
				</button>
			</div>
			<div class="flex flex-col">
				<h2 class="text-xl text-yellow-200 mt-2">Found a mistake or want to improve something?</h2>
				<p class="text-blue-300">
					Feel free to submit a pull request on our <a
						target="_blank"
						href="https://github.com/pins22"
						class="underline">github repositories</a
					>!
				</p>
			</div>
		</div>
	</div>
</div>
