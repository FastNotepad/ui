/// Router
import { createRouter, createWebHashHistory } from 'vue-router';

// Router instance
export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			component: ()=>import('@/views/Index.vue'),
			path: '/'
		},
		{
			component: ()=>import('@/views/Desktop.vue'),
			path: '/desktop'
		}
	]
});
