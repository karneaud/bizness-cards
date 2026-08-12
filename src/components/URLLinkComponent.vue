<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Website'
  },
  placeholder: {
    type: String,
    default: 'www.example.com'
  }
})

const emit = defineEmits(['update:modelValue'])

const isEditing = ref(!props.modelValue)

const displayUrl = computed(() => {
  if (!props.modelValue) return ''
  if (props.modelValue.startsWith('http://') || props.modelValue.startsWith('https://')) {
    return props.modelValue
  }
  return 'http://' + props.modelValue
})

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function onBlur() {
  if (props.modelValue) {
    isEditing.value = false
  }
}

function onClick() {
  if (props.modelValue) {
    isEditing.value = true
  }
}

function visitUrl() {
  if (props.modelValue) {
    window.open(displayUrl.value, '_blank')
  }
}
</script>

<template>
  <div class="url-link-component">
    <!-- Display Mode -->
    <div v-if="!isEditing && modelValue" class="flex items-center">
      <span class="label-text font-medium mr-2">{{ label }}:</span>
      <a
        :href="displayUrl"
        target="_blank"
        rel="noopener"
        class="link link-primary truncate"
        @click.prevent="visitUrl"
      >
        {{ modelValue }}
      </a>
      <button
        type="button"
        class="btn btn-sm btn-ghost ml-2"
        @click="onClick"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
        </svg>
      </button>
    </div>

    <!-- Edit Mode -->
    <div v-else class="w-full">
      <label class="label">
        <span class="label-text font-medium">{{ label }}</span>
      </label>
      <div class="join w-full">
        <button class="join-item btn btn-outline btn-disabled">http://</button>
        <input
          :value="modelValue"
          @input="onInput"
          @blur="onBlur"
          type="url"
          class="input validator join-item flex-1"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>