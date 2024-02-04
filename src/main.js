import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes';
import App from './App.vue';
import { Inkline, components } from '@inkline/inkline';

import './css/variables/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';
import './style.css';


createApp(App).use(createPinia()).use(router).use(Inkline, { components }).mount('#app');
