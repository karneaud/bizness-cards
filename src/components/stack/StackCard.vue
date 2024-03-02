<template>
    <div ref="card" class="stack-card _overflow:hidden!" :style="{ zIndex }" v-on:swiping="incrementZIndex" :class="{ expanded: isExpanded, edit: isEditing, draggable: isDragging }"  v-on:touchmove="doPinch" v-touch:hold="toggleExpand" v-touch:swipe.right="doSwipe" v-touch:swipe.top="toggleExpand" v-on:touchstart="setPos" v-on:touchend="stopDrag" v-touch:drag="doDrag">
      <slot v-if="isExpanded" name="content" :toggleExpand="toggleExpand"></slot>
      <slot v-if="!isExpanded" name="placeholder" :toggleExpand="toggleExpand"></slot>
    </div>
  </template>
  <script setup>
  import { ref,  onMounted } from 'vue';

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

      let position = {}, boundRect = {}, pinch = {}, pinching = false;

      onMounted(() => {
        boundRect = card.value.parentElement.getBoundingClientRect()
        zIndex.value = props.zIndex
      })

      function setPos(e) {
        let { clientX : x, clientY : y } = e.touches[0];

        position = { x, y }

        if(e.touches.length > 1) {
          let { clientY : y2 } = e.touches[1];
          pinch = { y1: position.y, y2 }
        }

      }

      function toggleExpand(e) {
       if(!isExpanded.value) {
          isExpanded.value = true
          setZIndex(100) 
        } else if(isExpanded.value) isExpanded.value = false
      }

      function doSwipe(e) {
        emit('swiping', { card : card.value })
        incrementZIndex()
      }

      function doDrag(e) {
        if(!isExpanded.value && e.touches.length == 1) {
          let { clientX, clientY } = e.touches[0]
          position.x = clientX - card.value.getBoundingClientRect().x
          if(position.x < boundRect.x ) position.x  = boundRect.x
          if(position.x > boundRect.right/3 ) position.x = boundRect.right/3

          card.value.style.transform = `translate(${position.x }px, 0px)`
          if(!isDragging.value) isDragging.value = true
        }

       
      }

      function stopDrag() {
         if(isDragging.value) {
          isDragging.value = false
          position = { x: 0, y: 0 }
          card.value.style.transform = 'translate(0px, 0px)'
         }
      }

      function doPinch(e) {
       
        const MIN_PIXES_DISTANCE = 25;
        // If is not using 2 fingers
        const touches = e.changedTouches;
        if (touches.length !== 2) {
          return;
        } 
        
        
        let { clientY: pinch1 } = touches[0], { clientY: pinch2 } = touches[1]
        if (
        (pinch.y1 - pinch1 < -MIN_PIXES_DISTANCE &&
        pinch.y2 - pinch2 >= MIN_PIXES_DISTANCE && !isExpanded.value && !pinching)
          ) {
              pinching = Date.now()
              toggleExpand(e);
          } else if (
              (pinch.y2 - pinch2 < -MIN_PIXES_DISTANCE &&
              pinch.y1 - pinch1 >= MIN_PIXES_DISTANCE && isExpanded.value && ((Date.now() - pinching) >= 1000 ))
          ) {
            pinching = false
            toggleExpand(e);
          }
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
  