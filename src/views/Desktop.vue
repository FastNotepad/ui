<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';

// Router
const router = useRouter();

// Cookies
const { cookies } = useCookies();

// Actions
const exit = (): void=>{
	cookies.remove('jwt');
	router.push('/');
};

// Life cycle
onMounted((): void=>{
	document.title = 'Desktop | Fast Notepad';

	if (!cookies.isKey('jwt')) {
		router.push('/');
	}
});
</script>

<template>
	<div class="fixed flex inset-0">
		<aside class="bg-emerald-400 flex flex-col items-center text-white max-w-xs">
			<header class="flex items-center gap-2 p-4 select-none">
				<img class="h-8 w-8" draggable="false" src="/notepad.svg"/>
				<h1 class="font-smiley text-2xl">Fast Notepad</h1>
			</header>
			<div class="bg-emerald-200 flex-grow overflow-x-auto w-full">
				
			</div>
			<button class="font-bold my-2 transition-colors hover:text-red-500" @click="exit">Exit</button>
		</aside>
	</div>
</template>
