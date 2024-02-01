import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes';
import App from './App.vue';
import { Inkline, components } from '@inkline/inkline';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { LaEdit } from "oh-vue-icons/icons";

import './css/variables/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';
import './style.css';


addIcons(LaEdit);

createApp(App).component('v-icon',OhVueIcon).use(createPinia()).use(router).use(Inkline, { components }).mount('#app');
