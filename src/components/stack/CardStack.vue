<template>
    <div ref="stack" class="card-stack">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, useSlots, onMounted, onUpdated } from 'vue';
  import { Stack, Direction } from 'swing';

      const stack = ref(), cards = useSlots(), stackOfCards = Stack({
       throwOutConfidence: (x,y,e) => + !e.__vnode.ctx.exposed.isExpanded(),
        allowedDirections: [Direction.RIGHT]
      }) 
    
      function handleSwipeEvent( ) {
        for(var i = 0; i < stack.value.children.length; i++)  {
          let ocard = stack.value.children.item(i)
          ocard.__vnode.ctx.exposed.incrementZIndex()
        };
      }

      onUpdated((e) => {
        Array.from(stack.value.children).forEach((e) => stackOfCards.getCard(e) || stackOfCards.createCard(e)  )
      })

      onMounted(() => {
        Array.from(stack.value.children).forEach((e) => stackOfCards.createCard(e))
        stackOfCards.on('throwoutend', function (e) {
          e.target.__vnode.ctx.exposed.setZIndex(-1)
          handleSwipeEvent()
          stackOfCards.getCard(e.target).throwIn(0,0)
        });
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
  