<template>
  <div class="flex flex-col justify-center">
    <form @submit.prevent="handleSubmit" class="mt-4">
      <FormStepper
        v-model="currentStep"
        :steps="['Company', 'Job', 'Contact', 'Social']"
        :show-navigation="true"
        :show-prev-button="true"
        :show-next-button="true"
        :validate-on-nav="true"
        :validate-step="validateCurrentStep"
        @step-complete="onStepComplete"
        @complete="handleSubmit"
      >
        <template #default="{ currentStep }">
          <!-- Step 1: Brand Details -->
          <div v-show="currentStep === 0" class="divide-y-1 divide-base-300"> 
              <div class="avatar mb-4">
                <div class="mask mask-squircle h-24 w-24 cursor-pointer">
                  <img
                    v-if="logoPreview"
                    :src="logoPreview"
                    alt="logo preview"
                    @click="changeLogo"
                    class="hover:opacity-75 transition-opacity"
                  />
                  <img
                    v-else
                    src="https://placehold.co/300x300?text=Logo"
                    alt="logo placeholder"
                  />
                </div>
              </div>
              <label v-if="showFileInput || !logoPreview" class="floating-label mb-4">
                <input
                  ref="logoInput"
                  @change="onLogoChange"
                  type="file"
                  accept="image/*"
                  class="file-input validator"
                />
                <span>Upload Logo</span>
                <div class="validator-hint">Upload your company or brand logo</div>
              </label>
              <UIComponent
                  v-model="card.organization"
                  label="Business"
                  placeholder="Enter business name"
                />
              <div class="mt-4">
                <span class="label-text mb-2 block">Card Theme</span>
                <div class="grid grid-cols-8 gap-3">
                  <button
                    v-for="theme in themes"
                    :key="theme"
                    type="button"
                    :data-theme="theme"
                    :class="[
                      'w-8 h-8 rounded-full border-2 transition-all bg-primary',
                      card.color === theme ? 'border-base-100 scale-110' : 'border-secondary'
                    ]"
                    @click="card.color = theme"
                    :title="theme"
                  />
                </div>
              </div>
          </div>

          <!-- Step 2: Contact Information -->
          <div v-show="currentStep === 1" class="divide-y-1 divide-base-300">
              <UIComponent
                  v-model="card.name"
                  label="Name"
                  placeholder="Your full name"
                />
              <UIComponent
                  v-model="card.title"
                  label="Title"
                  placeholder="Job title or role"
                />
          </div>

          <!-- Step 3: Contact Methods -->
          <div v-show="currentStep === 2" class="divide-y-1 divide-base-300">
              <!-- Phones -->
              <div>
                <UIComponent
                  v-model="card.phones[0].value"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  input-type="tel">
                  <template #edit="{ value, onUpdate, placeholder, onBlur }">
                    <label class="floating-label">
                      <input
                        :value="value"
                        @input="onUpdate($event.target.value)"
                        @blur="onBlur"
                        type="tel"
                        class="input my-2 validator w-full"
                        :placeholder="placeholder"
                      />
                      <span>{{ label }}</span>
                    </label>
                  </template>
                </UIComponent>
              </div>

              <!-- Emails -->
              <div>
                <UIComponent
                  v-model="card.emails[0].value"
                  label="Email"
                  placeholder="Enter a valid email address"
                  input-type="email"
                >
                  <template #edit="{ value, onUpdate, placeholder, onBlur }">
                    <label class="floating-label">
                      <input
                        :value="value"
                        @input="onUpdate($event.target.value)"
                        @blur="onBlur"
                        type="email"
                        class="input my-2 validator w-full"
                        :placeholder="placeholder"
                      />
                      <span>{{ label }}</span>
                    </label>
                  </template>
                </UIComponent>
              </div>
          </div>

          <!-- Step 4: Online Presence -->
          <div v-show="currentStep === 3">
              <div class="space-y-2 mt-3 divide-y-1 divide-base-300">
<!-- Websites -->
              <div>
                <UIComponent
                  v-model="card.websites[0].value"
                  label="Website"
                  placeholder="www.example.com"
                >
                  <template #edit="{ value, onUpdate, placeholder, onBlur }">
                    <label class="floating-label">
                      <div class="join w-full">
                        <button class="join-item btn btn-outline btn-disabled">http://</button>
                        <input
                          :value="value"
                          @input="onUpdate($event.target.value)"
                          @blur="onBlur"
                          type="url"
                          class="input validator join-item flex-1"
                          placeholder=" "
                        />
                      </div>
                      <span>Website</span>
                    </label>
                  </template>
                  <template #display="{ value, label }">
                    <span class="label-text font-large mr-2">{{ label }}:</span>
                    <a
                      :href="'http://' + value"
                      target="_blank"
                      rel="noopener"
                      class="link link-primary truncate"
                    >
                      {{ value }}
                    </a>
                  </template>
                </UIComponent>
              </div>

                <!-- Social Links -->
                <div>
                <h6 class="text-base-500 font-medium my-1">Social:</h6>
                  <!-- Existing committed social links -->
                  <div
                    v-for="(link, idx) in card.socialLinks"
                    :key="'social-' + idx"
                    class="flex items-center gap-2"
                  >
                    <SocialLinkInput
                      v-model="card.socialLinks[idx].value"
                      :platform="card.socialLinks[idx].platform"
                      placeholder="@username"
                      @update:platform="card.socialLinks[idx].platform = $event"
                    />
                    <button
                      type="button"
                      class="btn btn-circle btn-xs btn-error shrink-0"
                      @click="removeSocial(idx)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                  </div>
                  <!-- Draft input — commits to card.socialLinks on blur -->
                  <SocialLinkInput
                    v-model="socialDraft.value"
                    :platform="socialDraft.platform"
                    placeholder="@username"
                    @update:platform="socialDraft.platform = $event"
                  />
                </div>
              </div>
          </div>
        </template>
      </FormStepper>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import FormStepper from './FormStepper.vue'
import UIComponent from './UIComponent.vue'
import SocialLinkInput from './SocialLinkInput.vue'
import { Card } from '../store/models/Card.js'
import { SocialLink } from '../store/models/SocialLink.js'
import { useMainStore } from '../store/index.js'
import { generateId } from '../lib/utils.js'
import THEME_COLORS from '../lib/utils.js'

const emit = defineEmits(['saved'])

const store = useMainStore()

const props = defineProps({
  editCard: {
    type: Object,
    default: null
  }
})

const themes = computed(() => THEME_COLORS)

const currentStep = ref(0)

const card = reactive({
  id: generateId('card'),
  logo: '',
  organization: '',
  name: '',
  title: '',
  phones: [{ value: '', type: 'phone' }],
  emails: [{ value: '', type: 'email' }],
  socialLinks: [],
  websites: [{ value: '', type: 'website' }],
  address: '',
  color: THEME_COLORS[0],
  ...(props.editCard || { })
})

const socialDraft = reactive({
  value: '',
  type: 'social',
  platform: 'instagram'
})

watch(() => socialDraft.value, (newVal) => {
  if (newVal && newVal.trim().length > 0) {
    card.socialLinks.push({
      value: newVal,
      type: 'social',
      platform: socialDraft.platform
    })
    socialDraft.value = ''
    socialDraft.platform = 'instagram'
  }
})

watch(() => props.editCard, (newVal) => {
  if (!newVal) return

  Object.assign(card, JSON.parse(JSON.stringify(newVal)))
  logoPreview.value = card.logo || null
  logoFile.value = null
  showFileInput.value = false
  currentStep.value = 0
  if (logoInput.value) logoInput.value.value = ''
})

const logoPreview = ref(null)
const logoInput = ref(null)
const logoFile = ref(null)
const showFileInput = ref(false)

const stepValidation = {
  0: {
    fields: ['organization'],
    message: 'Company name is required'
  },
  1: {
    fields: ['name', 'title'],
    requireAll: true,
    message: 'Name and title are required'
  },
  2: {
    fields: ['phones', 'emails'],
    message: 'At least one contact method required'
  }
}

function validateCurrentStep({ step }) {
  const validation = stepValidation[step]
  if (!validation) return true

  const { fields, requireAll } = validation
  const values = fields.map(field => {
    const value = card[field]
    if (Array.isArray(value)) {
      return value.length > 0 && value.some(v => v && v.value && v.value.length > 0)
    }
    return value && value.length > 0
  })

  const hasRequired = requireAll ? values.every(v => v) : values.some(v => v)

  if (!hasRequired) {
    console.warn(validation.message)
    return false
  }
  return true
}

function onStepComplete({ step }) {
  console.log('Step completed:', step)
}

function onLogoChange(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  logoFile.value = file
  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
  logoPreview.value = URL.createObjectURL(file)
  showFileInput.value = false
  const reader = new FileReader()
  reader.onload = (ev) => {
    card.logo = ev.target.result
  }
  reader.readAsDataURL(file)
}

function changeLogo() {
  if (logoPreview.value) {
    showFileInput.value = true
  }
}

function removeLogo() {
  logoFile.value = null
  card.logo = ''
  if (logoPreview.value) {
    URL.revokeObjectURL(logoPreview.value)
    logoPreview.value = null
  }
  if (logoInput.value) logoInput.value.value = ''
}

function addPhone() {
  card.phones.push({ value: '', type: 'phone' })
}
function removePhone(idx) {
  if (card.phones.length > 1) {
    card.phones.splice(idx, 1)
  }
}

function addEmail() {
  card.emails.push({ value: '', type: 'email' })
}

function removeEmail(idx) {
  if (card.emails.length > 1) {
    card.emails.splice(idx, 1)
  }
}

function addWebsite() {
  card.websites.push({ value: '', type: 'website' })
}

function removeWebsite(idx) {
  if (card.websites.length > 1) {
    card.websites.splice(idx, 1)
  }
}

function removeSocial(idx) {
  card.socialLinks.splice(idx, 1)
}

const getPlatformLabel = SocialLink.getPlatformLabel

async function handleSubmit() {
  if (!card.name || !card.organization) {
    alert('Please fill required brand fields.')
    currentStep.value = 0
    return
  }
  
  const tempCard = new Card(card), isValid = await tempCard.validate()
  if (!isValid) {
    alert('Please check the form data. Validation failed.')
    return
  }

  store.setContact(tempCard, props.editCard?.id )
  emit('saved', tempCard )
  currentStep.value = 0
}
</script>

<style scoped>
.fieldset-legend {
  padding: 0 0.5rem;
}
</style>