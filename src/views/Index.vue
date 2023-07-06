<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { useCookies } from 'vue3-cookies';

// Router
const router = useRouter();

// Cookies
const { cookies } = useCookies();

// Reactive
const password = ref('');

// Actions
const login = (ev: KeyboardEvent): void=>{
	// Check enter
	if (ev.key !== 'Enter') {
		return;
	}

	// Lose focus
	(ev.target as HTMLInputElement).blur();

	// Try login
	axios({
		baseURL: import.meta.env.BASE_URL,
		data: {
			password: password.value
		},
		method: 'post',
		url: '/api/login'
	}).then((res: AxiosResponse): void=>{
		const data: { status: number; msg: string; } = res.data;
		if (data.status !== 200) {
			notify({
				duration: 5000,
				title: data.msg,
				type: data.status === 400 ? 'warn' : 'error'
			});
			(ev.target as HTMLInputElement).select();
			return;
		}

		// Success
		notify({
			title: 'Welcome',
			type: 'success'
		});
		router.push('/desktop');
	}).catch((err: AxiosError): void=>{
		notify({
			duration: 5000,
			text: err.message,
			title: 'Network failure',
			type: 'error'
		});
		(ev.target as HTMLInputElement).select();
	});
}

// Life cycle
onMounted((): void=>{
	document.title = 'Login | Fast Notepad';

	if (cookies.isKey('jwt')) {
		router.push('/desktop');
	}
});
</script>

<template>
	<div class="fixed flex flex-col gap-8 inset-0 items-center justify-center">
		<header class="backdrop-blur-sm border flex items-center gap-4 p-4 rounded select-none shadow-md">
			<img class="h-12 w-12" draggable="false" src="/notepad.svg"/>
			<h1 class="font-smiley font-bold text-4xl">Fast Notepad</h1>
		</header>
		<main class="bg-white border p-4 rounded-lg shadow-md">
			<input v-model="password" class="border-2 border-gray-300 outline-none px-2 py-1 rounded transition-colors w-96 focus:border-blue-300 placeholder:select-none selection:bg-gray-200" @keyup="login" placeholder="Password" type="password"/>
		</main>
		<footer class="absolute bottom-4">
			<p class="text-gray-400 text-sm">Powered By <a class="transition-colors hover:text-blue-500" href="https://github.com/FastNotepad" target="_blank">Fast Notpad</a></p>
		</footer>
	</div>
</template>
