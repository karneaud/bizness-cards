<template>
    <div ref="card" class="stack-card _overflow:hidden!" v-touch:swipe.top="toggleExpand" :style="{ zIndex }" :class="{ expanded: isExpanded, edit: isEditing, draggable: isDragging }">
      <slot v-if="isExpanded" name="content" :toggleExpand="toggleExpand"></slot>
      <slot v-if="!isExpanded" name="placeholder" :toggleExpand="toggleExpand"></slot>
    </div>
  </template>
  <script setup>
  import { ref,  onMounted } from 'vue';

  const card = ref(null), 
      isExpanded = ref(false),
      zIndex = ref(0),
      props = defineProps({
        zIndex: 0
      })

      onMounted(() => {
        zIndex.value = parseInt(props.zIndex)
      })

      function toggleExpand(e) {
        if(!isExpanded.value) {
          isExpanded.value = true
          setZIndex(100) 
        } else if(isExpanded.value) isExpanded.value = false
      }

      function setZIndex(index) {
        zIndex.value = parseInt(index)
      }

      function incrementZIndex() {
        zIndex.value  = parseInt(zIndex.value) + 1
      }

      defineExpose({
        isExpanded: () => isExpanded.value,
        setZIndex,
        incrementZIndex
      })
  </script>
  <style lang="scss" scoped>
    @import "./stack-card.scss"
  </style>
  