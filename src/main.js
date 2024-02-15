import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes';
import App from './App.vue';
import CardStack  from './components/stack/CardStack.vue';
import StackCard from './components/stack/StackCard.vue';
import { Inkline, components } from '@inkline/inkline';
import Vue3TouchEvents from "vue3-touch-events";

import './css/variables/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';
import './style.css';

window.oncontextmenu = function (event) {
    // eslint-disable-next-line no-console
    console.log(event); // prints [object PointerEvent]
  
    const pointerEvent = event ;
    // eslint-disable-next-line no-console
    console.log(`window.oncontextmenu: ${pointerEvent.pointerType}`);
  
    if (pointerEvent.pointerType === 'touch') {
      // context menu was triggerd by long press
      return false;
    }
  
    // just to show that pointerEvent.pointerType has another value 'mouse' aka right click
    if (pointerEvent.pointerType === 'mouse') {
      // context menu was triggered by right click
      return true;
    }
  
    // returning true will show a context menu for other cases
    return true;
  };

createApp(App).use(createPinia()).use(Vue3TouchEvents).use(router).use(Inkline, { components }).component('card-stack', CardStack).component('stack-card', StackCard).mount('#app');
