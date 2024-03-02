import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Home from './components/Home.vue';
import Business from './components/Business.vue';
import Card from './components/Card.vue';
import CardStack  from './components/stack/CardStack.vue';
import StackCard from './components/stack/StackCard.vue';
import { Inkline, components } from '@inkline/inkline';
import Vue3TouchEvents from "vue3-touch-events";

import './css/variables/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';
import './style.css';


createApp(App)
.use(createPinia())
.use(Vue3TouchEvents,{swipeTolerance : 100 })
.use(Inkline, { components })
.component('business', Business)
.component('home', Home)
.component('card', Business)
.component('card-stack', CardStack).component('stack-card', StackCard).component('card', Card).mount('#app');
