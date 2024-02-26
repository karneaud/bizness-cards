<template>
    <div ref="stack" class="card-stack" @click="">
      <slot :handleSwipeEvent="handleSwipeEvent"></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, useSlots } from 'vue';
  
      const stack = ref(), cards = useSlots(), stackedCards = ref([]) ;
    
      function handleSwipeEvent({ card }) {
        card.addEventListener('transitionend', handleTransitionEnd, { once: true })
        
        for(var i = 0; i < stack.value.children.length; i++)  {
          let card = stack.value.children.item(i)
          card.__vnode.ctx.exposed.incrementZIndex()
        };

        card.classList.add('swipe')
      }
  
      function handleTransitionEnd(event) {
        event.target.classList.remove('swipe')
        event.target.__vnode.ctx.exposed.setZIndex(0)
        
      }
  
  </script>
  
  <style scoped>
  .card-stack {
    /* add your styles here */
    width: 100%;
    height: 60vh;
    position: relative;
    display: inline-flex;
    justify-content: center;
    
  }
  </style>
  