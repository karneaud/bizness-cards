import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Home from './components/Home.vue';

import './sass/index.scss';
import './style.css';


createApp(App)
.use(createPinia())
.component('home', Home).mount('#app');
