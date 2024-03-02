<template>
    <div ref="stack" class="card-stack">
      <slot :handleSwipeEvent="handleSwipeEvent"></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, useSlots, onMounted } from 'vue';
  import CardFlick from '../../lib/card-flick.js';
  
      const stack = ref(), cards = useSlots(), stackedCards = ref([]) ;
    
      function handleSwipeEvent( card ) {
        
        for(var i = 0; i < stack.value.children.length; i++)  {
          let ocard = stack.value.children.item(i)
          ocard.__vnode.ctx.exposed.incrementZIndex()
        };

      }

      onMounted(() => {
        let cardFlick = new CardFlick(stack.value, stack.value.children, {
            swipeThreshold: 100,
            transitionDuration: 300,
            onSwipeRight: (card) => handleSwipeEvent(card),
            onHandeFlyOffCard: (card) => card.__vnode.ctx.exposed.setZIndex(0)
        })
      })
  
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
  