<template>
  <div>
    <i-form @submit="submitForm">
      <i-form-group>
        <i-label for="logo">Logo</i-label>
        <i-input type="file" id="logo" v-model="business.logo" />
      </i-form-group>

      <i-form-group>
        <i-label for="organization">Organization</i-label>
        <i-input type="text" id="organization" v-model="business.organization" />
      </i-form-group>

      <i-form-group>
        <i-label for="phone">Phone</i-label>
        <i-input type="number" id="phone" v-model="business.phone" />
      </i-form-group>

      <i-form-group>
        <i-label for="email">Email</i-label>
        <i-input type="email" id="email" v-model="business.email" />
      </i-form-group>

      <i-form-group>
        <i-label for="contactName">Contact Name</i-label>
        <i-input type="text" id="contactName" v-model="business.contactName" />
      </i-form-group>

      <i-form-group>
        <i-label for="website">Website</i-label>
        <i-input type="url" id="website" v-model="business.website" />
      </i-form-group>

      <div v-for="(link, index) in business.socialMedia" :key="index">
        <i-form-group>
          <i-label :for="`social-media-${index}`">Social Media</i-label>
          <i-input type="text" :id="`social-media-${index}`" v-model="business.socialMedia[index]"> 
            <template #prepend>
                <i-button @click="removeSocialMediaLink(index)">-</i-button>
            </template>
            <template #append>
                <i-button @click="addSocialMediaLink">+</i-button>
            </template>
          </i-input>
        </i-form-group>
        <i-button-group>
          
        </i-button-group>
      </div>

      <i-button type="submit">Submit</i-button>
    </i-form>
  </div>
</template>

<script setup>
import { ref , onBeforeMount } from 'vue'
import router from '../routes'
import { useMainStore } from '../store'

const store = useMainStore()

const business = ref({
  logo: '',
  organization: '',
  phone: '',
  email: '',
  contactName: '',
  website: '',
  socialMedia: ['']
})

const addSocialMediaLink = () => {
  business.value.socialMedia.push('')
}

const updateSocialMediaLink = (index) => {
  business.value.socialMedia[index] = business.value.socialMedia[index]
}

const removeSocialMediaLink = (index) => {
  business.value.socialMedia.splice(index, 1)
}

const submitForm = () => {
  store.addBusiness(business.value)
  router.push('/')
}

onBeforeMount(() => {
  if (router.currentRoute.value.params.business) {
    business.value = router.currentRoute.value.params.business
  }
})
</script>
