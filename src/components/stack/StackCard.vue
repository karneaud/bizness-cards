<template>
    <div ref="card" class="stack-card" :style="{ zIndex }" v-on:swiping="incrementZIndex" :class="{ expanded: isExpanded, edit: isEditing, draggable: isDragging }" v-touch:swipe.right="doSwipe" v-touch:swipe.top="toggleExpand" v-on:touchstart="setPos" v-on:touchend="stopDrag" v-touch:tap="toggleExpand" v-touch:drag="doDrag">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, watch,  onMounted } from 'vue';

  const card = ref(null), 
      isExpanded = ref(false),
      isEditing = ref(false),
      isDragging = ref(false),
      isActive = ref(false),
      zIndex = ref(0),
      props = defineProps({
        zIndex: 0
      }),
      emit = defineEmits(['swiping']);

      let position = {}, boundRect = {};

      onMounted(() => {
        boundRect = card.value.parentElement.getBoundingClientRect()
        zIndex.value = props.zIndex
      })

      function setPos(e) {
        let { clientX : x, clientY : y } = e.touches[0];

        position = { x, y }
      }

      function toggleExpand(e) {

        if(!isExpanded.value) {
          isExpanded.value = true
          setZIndex(100)
        }
        if(e.type == 'swipe.top' && isExpanded.value) isExpanded.value = false
      }

      function doSwipe(e) {
        emit('swiping', { card : card.value })
        incrementZIndex()
      }

      function doDrag(e) {
        if(isExpanded.value) return 
        
        let { clientX, clientY } = e.touches[0]
        position.x = clientX - card.value.getBoundingClientRect().x
        if(position.x < boundRect.x ) position.x  = boundRect.x
        if(position.x > boundRect.right/3 ) position.x = boundRect.right/3

        card.value.style.transform = `translate(${position.x }px, 0px)`
        if(!isDragging.value) isDragging.value = true
      }

      function stopDrag() {
         if(isDragging.value) {
          isDragging.value = false
          position = { x: 0, y: 0 }
          card.value.style.transform = 'translate(0px, 0px)'
         }

         if(isExpanded.value) isExpanded.value = false
      }

      function setZIndex(index) {
        zIndex.value = index
      }

      function incrementZIndex() {
        zIndex.value  += 1
      }

      function getZIndex() {
         return zIndex.value
      }

      defineExpose({
        card,
        isActive,
        setZIndex,
        getZIndex,
        incrementZIndex
      })
  </script>
  <style lang="scss" scoped>
    @import "./stack-card.scss"
  </style>
  