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
          <div v-show="currentStep === 0"> 
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
          </div>

          <!-- Step 2: Contact Information -->
          <div v-show="currentStep === 1">
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
          <div v-show="currentStep === 2">
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
              <div class="space-y-4 mt-3">
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
                    <span class="label-text font-medium mr-2">{{ label }}:</span>
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
                <hr class="bg-base-300 m-0 text-base-300"/>
                <h6 class="text-base-500 font-medium my-1">Social</h6>
                <div>
                  <SocialLinkInput
                    v-for="(link, idx) in card.socialLinks"
                    :key="'social-' + idx"
                    v-model="card.socialLinks[idx].value"
                    :platform="card.socialLinks[idx].platform"
                    placeholder="@username"
                    @update:platform="card.socialLinks[idx].platform = $event"
                  />
                  <div class="mt-2 flex gap-2">
                    <button
                      type="button"
                      class="btn btn-circle btn-xs btn-outline"
                      @click="addSocial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      v-if="card.socialLinks.length > 1"
                      type="button"
                      class="btn btn-circle btn-xs btn-error"
                      @click="removeSocial(idx)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </template>
      </FormStepper>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormStepper from './FormStepper.vue'
import UIComponent from './UIComponent.vue'
import SocialLinkInput from './SocialLinkInput.vue'
import { Card } from '../store/models/Card.js'
import { Phone } from '../store/models/Phone.js'
import { Email } from '../store/models/Email.js'
import { SocialLink } from '../store/models/SocialLink.js'
import { Link } from '../store/models/Link.js'

const currentStep = ref(0)

const card = reactive(new Card({
  id: null,
  logo: '',
  organization: '',
  name: '',
  title: '',
  phones: [new Phone('')],
  emails: [new Email('')],
  socialLinks: [new SocialLink('', 'instagram')],
  websites: [new Link('', 'website')],
  address: ''
}))

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
  card.addPhone(new Phone(''))
}
function removePhone(idx) {
  if (card.phones.length > 1) {
    card.phones.splice(idx, 1)
  }
}

function addEmail() {
  card.addEmail(new Email(''))
}
function removeEmail(idx) {
  if (card.emails.length > 1) {
    card.emails.splice(idx, 1)
  }
}

function addWebsite() {
  card.websites.push(new Link('', 'website'))
}
function removeWebsite(idx) {
  if (card.websites.length > 1) {
    card.websites.splice(idx, 1)
  }
}

function addSocial() {
  card.addSocialLink(new SocialLink('', 'instagram'))
}
function removeSocial(idx) {
  if (card.socialLinks.length > 1) {
    card.socialLinks.splice(idx, 1)
  }
}

const getPlatformLabel = SocialLink.getPlatformLabel

async function handleSubmit() {
  if (!card.name || !card.organization) {
    alert('Please fill required brand fields.')
    currentStep.value = 0
    return
  }

  const isValid = await card.validate()
  if (!isValid) {
    alert('Please check the form data. Validation failed.')
    return
  }

  const payload = new FormData()
  payload.append('card', card.toJsonString())
  if (logoFile.value) payload.append('logo', logoFile.value)

  console.log('Submitting Card model:', card)
  console.log('Card as JSON:', card.toJson())
  console.log('FormData payload:', payload)
  alert('Form submitted. Check console for Card model data.')
}
</script>

<style scoped>
.fieldset-legend {
  padding: 0 0.5rem;
}
</style>