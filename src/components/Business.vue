<template>
  <div class="w-full flex flex-col items-center justify-center p-6 text-center">
<figure class="flex flex-col items-center relative">
      <div
        ref="avatarRef"
        class="avatar w-32 mb-6 transition-all duration-300 cursor-pointer ease-in-out"
        :class="{ 'w-64' : isExpanded }"
        @click="toggleLogo"
      >
        <div class="mask mask-squircle duration-300 ">
          <img
            v-if="card.logo"
            :src="card.logo"
            :alt="card.organization"
            class="duration-300 object-cover"
          />
          <div
            v-else
            class="bg-primary text-primary-content flex items-center justify-center w-full h-full"
          >
            <span class="text-4xl font-bold transition-all duration-300 ease-in-out" :class="isExpanded ? 'text-6xl' : 'text-4xl'">{{ initials }}</span>
          </div>
        </div>
      </div>
      <figcaption class="text-center">
        <h1 class="text-3xl text-primary-content font-bold mb-1">{{ card.organization || 'Business Name' }}</h1>
        <h2 class="text-2xl text-base-content font-semibold mb-1">{{ card.name || 'Contact Name' }}</h2>
        <p class="text-lg text-base-content">{{ card.title || 'Job Title' }}</p>
        <button
          v-show="isExpanded"
          @click.stop.prevent="handleEdit"
          class="absolute top-2 right-2 btn btn-circle btn-sm btn-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
          </svg>
        </button>
      </figcaption>
    </figure>
      
    <div
      v-if="(card.websites && card.websites.length > 0) || (card.phones && card.phones.length > 0) || (card.emails && card.emails.length > 0)"
      class="flex flex-col gap-2 mt-6 transition-all duration-300 ease-in-out"
      :class="{  'mt-0 h-0 scale-0 opacity-0' : isExpanded }"
    >
      <a
        v-if="card.websites && card.websites.length > 0"
        :href="card.websites[0].value"
        target="_blank"
        rel="noopener"
        class="btn btn-sm btn-outline rounded-full gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span class="hidden md:inline">{{ card.websites[0].value }}</span>
        <span class="md:hidden">Website</span>
      </a>
      <a
        v-if="card.phones && card.phones.length > 0"
        :href="'tel:' + card.phones[0].value"
        class="btn btn-sm btn-outline rounded-full gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
        <span class="hidden md:inline">{{ card.phones[0].value }}</span>
        <span class="md:hidden">Phone</span>
      </a>
      <a
        v-if="card.emails && card.emails.length > 0"
        :href="'mailto:' + card.emails[0].value"
        class="btn btn-sm btn-outline rounded-full gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <span class="hidden md:inline">{{ card.emails[0].value }}</span>
        <span class="md:hidden">Email</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit'])

const isExpanded = ref(false)
const avatarRef = ref(null)

function toggleLogo() {
  isExpanded.value = !isExpanded.value
}

function handleEdit() {
  isExpanded.value = false
  setTimeout(() => {
    emit('edit', props.card.id)
  }, 300)
}


const initials = computed(() => {
  if (!props.card) return '?'
  const name = props.card.name || props.card.organization || ''
  const parts = name.split(' ').filter(p => p.length > 0)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})
</script>

<style scoped>
.edit-btn-enter-active,
.edit-btn-leave-active {
  transition: all 0.3s ease-in-out;
}
.edit-btn-enter-from,
.edit-btn-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>
