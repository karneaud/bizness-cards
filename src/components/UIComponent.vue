<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: 'text'
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isEditing = ref(true)

const hasValue = computed(() => !!props.modelValue)

function onInput(value) {
  emit('update:modelValue', value)
}

function onBlur() {
  if (props.modelValue && !props.readonly) {
    isEditing.value = false
  }
}

function onEdit() {
  isEditing.value = true
}

defineExpose({
  isEditing,
  onEdit
})
</script>

<template>
  <div class="editable-display-component">
    <!-- Display Mode -->
    <div v-if="!isEditing && hasValue" class="flex items-center grid grid-cols-6">
      <slot
        name="display"
        :value="modelValue"
        :label="label"
      >
        <!-- Default display slot - label + text -->
        <span class="label-text mr-2">{{ label }}:</span>
        <span class="link link-primary truncate col-span-2">{{ modelValue }}</span>
      </slot>
      <button
        v-if="!readonly"
        type="button"
        class="btn btn-sm btn-ghost ml-2 col-end-6 col-start-6 col-span-1"
        @click="onEdit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
        </svg>
      </button>
    </div>

    <!-- Edit Mode -->
    <div v-else class="w-full">
      <slot
        name="edit"
        :value="modelValue"
        :onUpdate="onInput"
        :placeholder="placeholder"
        :onBlur="onBlur"
        :inputType="inputType"
      >
        <!-- Default edit slot - label + simple input -->
        <label class="floating-label">
          <input
            :value="modelValue"
            @input="onInput($event.target.value)"
            @blur="onBlur"
            :type="inputType"
            class="input validator w-full my-2"
            :placeholder="placeholder"
            :aria-label="label"
          />
          <span>{{ label }}</span>
        </label>
      </slot>
    </div>
  </div>
</template>