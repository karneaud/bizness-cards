<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Card Title'
  },
  expanded: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'light'
  }
})

const emit = defineEmits(['collapse', 'expand'])
const cardRef = ref(null)

const handleClose = () => {
  emit('collapse', cardRef.value)
}

const handleExpand = () => {
  if (!props.expanded) {
    emit('expand', cardRef.value)
  }
}

defineExpose({
  close: handleClose
})

</script>

<template>
  <div 
    ref="cardRef" 
    :class="[
      'border-base-content bg-primary flex justify-center items-center card border',
      { 'expanded': expanded }
    ]"
    @click="handleExpand"
  >
    <button
      class="close-btn btn btn-circle absolute top-2 right-2 z-50"
      @click.stop="handleClose"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
      <div class="avatar card-image flex justify-center align-center mb-2 center">
      <figure class="w-24 h-24 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            class="rounded-xl" />
    </figure>
    </div>
    <div class="card-title mx-auto mt-2 text-center">{{ title }}</div>
    <div class="card-body  flex justify-center align-center mb-2 center overflow-y-auto overflow-x-hidden">
      <slot name="card-body">Default card body content</slot>
    </div>
  </div>
</template>
