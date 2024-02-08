<template>
    <div ref="stack" class="card-stack">
      <slot :handleSwipeEvent="handleSwipeEvent"></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, useSlots } from 'vue';
  
      const stack = ref(), cards = useSlots(), stackedCards = ref([]) ;
    
      function handleSwipeEvent({ card }) {
         card.addEventListener('transitionend', handleTransitionEnd, { once: true })
         card.classList.add('swipe')
      }
  
      onMounted(async () => {
        await nextTick();
        const active = stack.value.children.item((stack.value.children.length -1 ))
        active.__vnode.ctx.exposed.setActive()
      });
  
      function handleTransitionEnd(event) {
        event.target.style.zIndex = 1;
        event.target.classList.remove('swipe')

        for(var i = 0; i< stack.value.children.length ; i++)  {
            let card = stack.value.children.item(i)
          if (card !== event.target) {
            card.style.zIndex = Number(card.style.zIndex) + 1;
          }
          
          if(card.style.zIndex == stack.value.children.length) {
            card.__vnode.ctx.exposed.setActive()
          }
        };
      }
  
  </script>
  
  <style scoped>
  .card-stack {
    /* add your styles here */
    width: 100%;
    height: inherit;
    position: relative;
    display: inline-flex;
    justify-content: center;
  }
  </style>
  