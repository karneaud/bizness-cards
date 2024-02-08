<template>
    <div ref="card" class="stack-card" :class="{ expand: isExpanded, edit: isEditing }">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, watch, defineExpose } from 'vue';
  import interact from 'interactjs';
  
  const card = ref(null),
      isExpanded = ref(false),
      isEditing = ref(false),
      isActive = ref(false), interactXThreshold = 100,   
      emit = defineEmits(['swipe','move','drag']);
      let position = { x:0, y: 0 }
      watch(isActive, (n,o) => {  
        console.log(`#${card.value.id}`)
        if(n)  interact(`#${card.value.id}`)
            .draggable({
              listeners: {
                move(event) {
                  position.x += event.dx
                  position.y += event.dy
                  event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`
                },
                end: (event) => {
                  if(position.x > interactXThreshold) {
                    emit('swipe', { card: event.target  }); 
                    isActive.value = false;
                  }

                  position.x = position.y = 0;
                  event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`
                  
                }
              }
            })
            .gesturable({
              onstart: function (event) {
                isExpanded.value = true;
              },
              onend: function (event) {
                isExpanded.value = false;
              },
            })
            .on('doubletap', function (event) {
              if (isExpanded.value) {
                isExpanded.value = false;
              } else {
                isEditing.value = !isEditing.value;
              }
            })
           else interact(`#${card.value.id}`).unset()
      } )

      function setActive() {
        isActive.value = true;
      }

      defineExpose({
        card,
        setActive
      })
  </script>
  <style lang="scss" scoped>
    @import "./stack-card.scss"
  </style>
  