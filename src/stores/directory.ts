/// Directory store
import { defineStore } from 'pinia';
import { useCookies } from 'vue3-cookies';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { notify } from '@kyvg/vue3-notification';

// Types
export enum TreeNodeType {
	Collection,
	Note
}
export interface TreeNode {
	collection?: {
		children?: TreeNode[];
		collectionId: number;
		name: string;
	};
	note?: {
		noteId: number;
		title: string;
	};
	type: TreeNodeType;
}
export interface NoteMeta {
	collectionId: number | null;
	title: string;
}
export interface CollectionMeta {
	parentId: number | null;
	name: string;
}

// No reactive
const noteMap = new Map<number, NoteMeta>();
const collectionMap = new Map<number, CollectionMeta>();

// Export
export const useDirStore = defineStore('directory', {
	state: ()=>({
		tree: [] as TreeNode[]
	}),
	actions: {
		init: async ()=>{
			const { cookies } = useCookies();

			Promise.all([
				axios({
					baseURL: import.meta.env.BASE_URL,
					headers: {
						Authorization: `Bearer ${cookies.get('jwt')}`
					},
					method: 'get',
					url: '/api/meta/collections'
				}),
				axios({
					baseURL: import.meta.env.BASE_URL,
					headers: {
						Authorization: `Bearer ${cookies.get('jwt')}`
					},
					method: 'get',
					url: '/api/meta/notes'
				})
			]).then((v: AxiosResponse[])=>{
				const collections = v[0].data;
				const notes = v[1].data;
			}).catch((err: AxiosError)=>{
				if (err.response === undefined) {
					notify({
						text: err.message,
						title: 'Network failure',
						type: 'error'
					});
					return;
				}

				if (err.response.status === 401 || err.response.status === 403) {
					window.location.reload();
				} else {
					notify({
						title: err.message,
						type: 'error'
					});
				}
			});
		}
	}
});
