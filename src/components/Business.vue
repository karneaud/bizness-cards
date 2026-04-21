<template>
  <div class="business-card h-full w-full flex flex-col">
    <!-- Header Section with Logo and Name -->
    <div class="card-header flex flex-col items-center p-6 bg-base-200">
      <!-- <div v-if="card.logo" class="logo mb-4">
        <img :src="card.logo" :alt="card.organization" class="w-20 h-20 object-contain rounded-lg" />
      </div> 
      <div v-else class="logo-placeholder mb-4 w-20 h-20 bg-primary rounded-lg flex items-center justify-center">
        <span class="text-3xl font-bold text-white">{{ initials }}</span>
      </div> -->
      
      <h1 class="text-2xl font-bold text-center">{{ card.name }}</h1>
      <p class="text-lg text-primary">{{ card.title }}</p>
      <p class="text-sm text-base-content/70">{{ card.organization }}</p>
    </div>

    <!-- Contact Information Section -->
    <div class="card-body flex-1 p-6 space-y-4 overflow-y-auto">
      
      <!-- Address -->
      <!-- <div v-if="card.address" class="contact-item flex items-start gap-3">
        <div class="icon w-8 h-8 flex items-center justify-center bg-base-300 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </div>
        <div class="info">
          <p class="text-sm font-medium">Address</p>
          <p class="text-sm text-base-content/80">{{ card.address }}</p>
        </div>
      </div> -->

      <!-- Phones -->
      <div v-if="card.phones && card.phones.length > 0" class="contact-section">
        <p class="text-xs font-semibold uppercase text-base-content/60 mb-2">Phone</p>
        <div class="space-y-2">
          <div v-for="(phone, idx) in card.phones" :key="'phone-' + idx" class="contact-item flex items-center gap-3">
            <div class="icon w-8 h-8 flex items-center justify-center bg-base-300 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <a :href="`tel:${phone.value}`" class="text-sm text-primary hover:underline">{{ phone.value }}</a>
          </div>
        </div>
      </div>

      <!-- Emails -->
      <div v-if="card.emails && card.emails.length > 0" class="contact-section">
        <p class="text-xs font-semibold uppercase text-base-content/60 mb-2">Email</p>
        <div class="space-y-2">
          <div v-for="(email, idx) in card.emails" :key="'email-' + idx" class="contact-item flex items-center gap-3">
            <div class="icon w-8 h-8 flex items-center justify-center bg-base-300 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <a :href="`mailto:${email.value}`" class="text-sm text-primary hover:underline">{{ email.value }}</a>
          </div>
        </div>
      </div>

      <!-- Websites -->
      <div v-if="card.websites && card.websites.length > 0" class="contact-section">
        <p class="text-xs font-semibold uppercase text-base-content/60 mb-2">Website</p>
        <div class="space-y-2">
          <div v-for="(website, idx) in card.websites" :key="'website-' + idx" class="contact-item flex items-center gap-3">
            <div class="icon w-8 h-8 flex items-center justify-center bg-base-300 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <a :href="website.value" target="_blank" rel="noopener" class="text-sm text-primary hover:underline truncate">{{ website.value }}</a>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div v-if="card.socialLinks && card.socialLinks.length > 0" class="contact-section">
        <p class="text-xs font-semibold uppercase text-base-content/60 mb-2">Social</p>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="(link, idx) in card.socialLinks"
            :key="'social-' + idx"
            :href="link.value"
            target="_blank"
            rel="noopener"
            class="btn btn-sm btn-outline gap-2"
          >
            <i :class="`socion socion-${getSociconClass(link.platform)}`"></i>
            {{ formatPlatform(link.platform) }}
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const initials = computed(() => {
  if (!props.card) return '?'
  const name = props.card.name || props.card.organization || ''
  const parts = name.split(' ').filter(p => p.length > 0)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

const formatPlatform = (platform) => {
  const platforms = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    custom: 'Link'
  }
  return platforms[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
}

const getSociconClass = (platform) => {
  const sociconMap = {
    facebook: 'facebook',
    twitter: 'twitter',
    instagram: 'instagram',
    linkedin: 'linkedin',
    youtube: 'youtube',
    custom: 'custom'
  }
  return sociconMap[platform] || platform
}
</script>

<style type="scss" scoped>
@import '../sass/_business.scss';
</style>
