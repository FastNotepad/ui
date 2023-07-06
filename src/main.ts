/// Main entrance
import { createApp } from 'vue';

// Plugins
import { pinia } from './stores';
import { router } from './router';
import notifications from '@kyvg/vue3-notification';

// Stylesheets
import 'normalize.css';
import './style.css';

// Root component
import App from './App.vue';

// Create application
createApp(App)
	.use(notifications)
	.use(pinia)
	.use(router)
	.mount('#app');
