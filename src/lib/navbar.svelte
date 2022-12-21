<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<nav class="w-100 h-14 sticky bg-blue-500">
	<div
		id="normal-links"
		class="hidden sm:flex flex-row h-100 items-center min-h-full justify-between"
	>
		<div class="basis-10/12 flex flex-row">
			<a
				href="/get-started/"
				class="py-4 px-4 max-w-fit min-w-fit flex flex-row items-center justify-between"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-1"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
					/>
				</svg>
				Get started</a
			>
			<a
				href="/docs/"
				class="py-4 px-4 max-w-fit min-w-fit flex flex-row items-center justify-between"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-1"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
					/>
				</svg>
				Documentation</a
			>
			<a
				href="/forum/"
				class="py-4 px-4 max-w-fit min-w-fit flex flex-row items-center justify-between"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-1"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
					/>
				</svg>
				Forum</a
			>
		</div>
		<button class="relative w-12 h-12 mr-4" data-dropdown-toggle="dropdown">
			<img
				class="rounded-full border border-gray-100 shadow-sm"
				src={$page.data.session?.user?.image}
				alt="user image"
			/>
			<div
				class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"
			/>
		</button>
		<!-- Dropdown menu -->
		<div
			class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
			id="dropdown"
		>
			<div class="px-4 py-3">
				<span class="block text-sm"
					>{$page.data.session?.user?.name ? $page.data.session?.user?.name : 'Not signed in'}</span
				>
				<span class="block text-sm font-medium text-gray-900 truncate"
					>{$page.data.session?.user?.email ? $page.data.session?.user?.email : ''}</span
				>
			</div>
			<ul class="py-1" aria-labelledby="dropdown">
				{#if $page.data.session?.user}
					<li>
						<a href="/users/" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
							>Profile</a
						>
					</li>
				{/if}
				{#if $page.data.session?.user}
					<li>
						<a
							on:click={() => signOut()}
							class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a
						>
					</li>
				{:else}
					<li>
						<a href="/login" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
							>Log in</a
						>
					</li>
				{/if}
			</ul>
		</div>
		<!-- <i class="fa-solid fa-user" /> -->
	</div>
</nav>
