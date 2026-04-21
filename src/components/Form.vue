<template>
  <div class="m-6 flex flex-col justify-center">
    <ul class="steps my-2">
      <li
        v-for="(s, idx) in steps"
        :key="s"
        :class="[
          'step',
          currentStep === idx ? 'step-primary' : '',
          s.type === 'info' ? 'step-info' : '',
          s.type === 'error' ? 'step-error' : ''
        ]"
        :data-content="s.content || ''"
        @click="goTo(idx)"
      >
        {{ s.label }}
      </li>
    </ul>
    
    <form @submit.prevent="handleSubmit" class="mt-4">
      <!-- Step 1: Brand Details -->
      <fieldset v-show="currentStep === 0" class="fieldset bg-base-200 border-base-200 rounded-box border p-4 justify-items-center">
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
        <label class="floating-label mb-4">
          <input
            v-model="card.organization"
            type="text"
            class="input w-full validator input-2xl"
            placeholder="Business or company name"
            required
          />
          <span>Business</span>
          <div class="validator-hint">Enter business or company name</div>
        </label>

        <button 
          class="btn btn-success btn-sm border border-base-300 btn-circle" 
          :disabled="!card.organization"
          @click="nextStep"
        >></button>
      </fieldset>

      <!-- Step 2: Contact Information -->
      <fieldset v-show="currentStep === 1" class="fieldset p-4">
        <legend class="fieldset-legend">Contact Information</legend>
          <label class="floating-label">
          <input
            v-model="card.name"
            type="text"
            class="input validator input-2xl"
            placeholder="Your Name"
          />
          <span>Name</span>
          <div class="validator-hint">Enter your full name</div>
        </label>
        <label class="floating-label">
          <input
            v-model="card.title"
            type="text"
            class="input validator input-2xl"
            placeholder="Job title or role"
          />
          <span>Title</span>
          <div class="validator-hint">Enter job title or role</div>
        </label>
        

            <!-- <label class="label">
            <textarea v-model="card.address" class="textarea validator textarea-sm" placeholder="Street, City, State, ZIP, Country"></textarea>
            </label> -->
      </fieldset>
      <!-- Step 3: Contact  Methods -->
       <fieldset v-show="currentStep == 2" class="fieldset">
         <!-- Phones -->
          <div>
            <label class="label">
              <span class="label-text font-medium">Phone Numbers</span>
            </label>
            <div class="space-y-2">
              <div v-for="(phone, idx) in card.phones" :key="'phone-' + idx" class="flex gap-2 items-center">
                <input
                  v-model="card.phones[idx].value"
                  type="tel"
                  class="input validator flex-1"
                  :placeholder="idx === 0 ? 'Primary phone' : 'Additional phone'"
                  required
                />
                <button
                  v-if="card.phones.length > 1"
                  type="button"
                  class="btn btn-sm btn-error"
                  @click="removePhone(idx)"
                >
                  Remove
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-sm btn-outline" @click="addPhone">Add Phone</button>
              </div>
            </div>
            <div class="validator-hint">Enter at least one phone number</div>
          </div>

          <!-- Emails -->
          <div>
            <label class="label">
              <span class="label-text font-medium">Email Addresses</span>
            </label>
            <div class="space-y-2">
              <div v-for="(email, idx) in card.emails" :key="'email-' + idx" class="flex gap-2 items-center">
                <input
                  v-model="card.emails[idx].value"
                  type="email"
                  class="input validator flex-1"
                  :placeholder="idx === 0 ? 'Primary email' : 'Additional email'"
                  required
                />
                <button
                  v-if="card.emails.length > 1"
                  type="button"
                  class="btn btn-sm btn-error"
                  @click="removeEmail(idx)"
                >
                  Remove
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-sm btn-outline" @click="addEmail">Add Email</button>
              </div>
            </div>
            <div class="validator-hint">Enter valid email addresses</div>
          </div>
       </fieldset>
      <!-- Step 3: Online Presence -->
      <fieldset v-show="currentStep === 3" class="fieldset p-4">
        <legend class="fieldset-legend text-lg font-semibold">Online Presence</legend>

        <div class="space-y-4 mt-3">
          <!-- Websites -->
          <div>
            <label class="label">
              <span class="label-text font-medium">Websites</span>
            </label>
            <div class="space-y-2">
              <div v-for="(website, idx) in card.websites" :key="'website-' + idx" class="flex gap-2 items-center">
                <input
                  v-model="card.websites[idx].value"
                  type="url"
                  class="input validator flex-1"
                  :placeholder="idx === 0 ? 'Primary website' : 'Additional website'"
                />
                <button
                  v-if="card.websites.length > 1"
                  type="button"
                  class="btn btn-sm btn-error"
                  @click="removeWebsite(idx)"
                >
                  Remove
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-sm btn-outline" @click="addWebsite">Add Website</button>
              </div>
            </div>
            <div class="validator-hint">Enter website URLs</div>
          </div>

          <!-- Social Links -->
          <div>
            <label class="label">
              <span class="label-text font-medium">Social Media Links</span>
            </label>
            <div class="space-y-2">
              <div v-for="(link, idx) in card.socialLinks" :key="'social-' + idx" class="flex gap-2 items-center">
                <select
                  v-model="card.socialLinks[idx].platform"
                  class="select select-bordered w-32"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="custom">Custom</option>
                </select>
                <input
                  v-model="card.socialLinks[idx].value"
                  type="url"
                  class="input validator flex-1"
                  placeholder="Profile URL"
                />
                <button
                  v-if="card.socialLinks.length > 1"
                  type="button"
                  class="btn btn-sm btn-error"
                  @click="removeSocial(idx)"
                >
                  Remove
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-sm btn-outline" @click="addSocial">Add Social</button>
              </div>
            </div>
            <div class="validator-hint">Enter social media profile URLs</div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Card } from '../store/models/Card.js'
import { Phone } from '../store/models/Phone.js'
import { Email } from '../store/models/Email.js'
import { SocialLink } from '../store/models/SocialLink.js'
import { Link } from '../store/models/Link.js'

const steps = ['Company', 'Job', 'Contact', 'Social']
const currentStep = ref(0)

// Initialize Card model instance
const card = reactive(new Card({
  id: null,
  logo: '',
  organization: '',
  name: '',
  title: '',
  phones: [new Phone('')],
  emails: [new Email('')],
  socialLinks: [new SocialLink('', 'custom')],
  websites: [new Link('', 'website')],
  address: ''
}))

const logoPreview = ref(null)
const logoInput = ref(null)
const logoFile = ref(null)
const showFileInput = ref(false)

function onLogoChange(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  logoFile.value = file
  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
  logoPreview.value = URL.createObjectURL(file)
  showFileInput.value = false
  // Convert to base64 for card.logo
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

/* Phones */
function addPhone() {
  card.addPhone(new Phone(''))
}
function removePhone(idx) {
  if (card.phones.length > 1) {
    card.phones.splice(idx, 1)
  }
}

/* Emails */
function addEmail() {
  card.addEmail(new Email(''))
}
function removeEmail(idx) {
  if (card.emails.length > 1) {
    card.emails.splice(idx, 1)
  }
}

/* Websites */
function addWebsite() {
  card.websites.push(new Link('', 'website'))
}
function removeWebsite(idx) {
  if (card.websites.length > 1) {
    card.websites.splice(idx, 1)
  }
}

/* Socials */
function addSocial() {
  card.addSocialLink(new SocialLink('', 'custom'))
}
function removeSocial(idx) {
  if (card.socialLinks.length > 1) {
    card.socialLinks.splice(idx, 1)
  }
}

/* Navigation */
function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}
function goTo(idx) {
  currentStep.value = idx
}

/* Submit */
async function handleSubmit() {
  // Basic client-side validation example
  if (!card.name || !card.organization) {
    alert('Please fill required brand fields.')
    currentStep.value = 0
    return
  }
  
  // Validate the card using model's validation
  const isValid = await card.validate()
  if (!isValid) {
    alert('Please check the form data. Validation failed.')
    return
  }

  // Prepare payload using Card model
  const payload = new FormData()
  payload.append('card', card.toJsonString())
  if (logoFile.value) payload.append('logo', logoFile.value)

  // Replace with your API call
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
