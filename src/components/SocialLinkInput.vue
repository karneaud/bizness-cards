<style type="css" scoped>
@import url('~/socicon-sass/dist/css/socicon.css');
</style>
<script setup>
import { ref, computed } from 'vue'
import { SocialLink } from '../store/models/SocialLink.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  platform: {
    type: String,
    default: 'instagram'
  },
  placeholder: {
    type: String,
    default: '@username'
  }
})

const emit = defineEmits(['update:modelValue', 'update:platform'])

const isEditing = ref(true)

const supportedPlatforms = SocialLink.getSupportedPlatforms()

const displayHandle = computed(() => {
  const link = new SocialLink(props.modelValue, props.platform)
  return link.getDisplayHandle()
})

const editHandle = computed(() => {
  const link = new SocialLink(props.modelValue, props.platform)
  return link.extractHandle() || ''
})

const iconClass = computed(() => {
  const link = new SocialLink(props.modelValue, props.platform)
  return link.getIconClass()
})

function onHandleInput(handle) {
  const link = new SocialLink('', props.platform)
  const newValue = link.buildUrl(handle)
  emit('update:modelValue', newValue)
}

function onPlatformChange(newPlatform) {
  emit('update:platform', newPlatform)
  const handle = editHandle.value
  if (handle) {
    const link = new SocialLink('', newPlatform)
    const newValue = link.buildUrl(handle)
    emit('update:modelValue', newValue)
  }
}

function onBlur(e) {
  const handle = e.target.value
  onHandleInput(handle)
  if (handle) {
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
    <div v-if="!isEditing && modelValue" class="flex items-center">
      <slot name="display" :iconClass="iconClass" :handle="displayHandle" :platform="platform">
        <span :class="iconClass"></span>
        <span class="ml-2">@{{ displayHandle }}</span>
      </slot>
      <button type="button" class="btn btn-sm btn-ghost ml-2" @click="onEdit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
        </svg>
      </button>
    </div>

    <div v-else class="w-full">
      <slot name="edit" :handle="editHandle" :onHandleInput="onHandleInput" :placeholder="placeholder" :onBlur="onBlur" :platform="platform" :onPlatformChange="onPlatformChange" :supportedPlatforms="supportedPlatforms">
        <label class="floating-label">
          <div class="join w-full">
            <select
              :value="platform"
              @change="onPlatformChange($event.target.value)"
              class="select select-bordered join-item w-32"
            >
              <option v-for="p in supportedPlatforms" :key="p" :value="p">
                {{ SocialLink.getPlatformLabel(p) }}
              </option>
            </select>
            <input
              :value="editHandle"
              @blur="onBlur"
              type="text"
              class="input validator join-item flex-1"
              :placeholder="placeholder"
            />
          </div>
          <span>{{ SocialLink.getPlatformLabel(platform) }}</span>
        </label>
      </slot>
    </div>
  </div>
</template>