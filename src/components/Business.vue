<template>
  <div>
    <i-form @submit="submitForm">
      <i-form-group>
        <i-label for="logo">Logo</i-label>
        <i-input type="file" id="logo" v-model.lazy="business.logo" />
      </i-form-group>

      <i-form-group>
        <i-label for="organization">Organization</i-label>
        <i-input type="text" id="organization" v-model.lazy="business.organization" />
      </i-form-group>

      <i-form-group>
        <i-label for="phone">Phone</i-label>
        <i-input type="number" id="phone" v-model.lazy="business.phone" />
      </i-form-group>

      <i-form-group>
        <i-label for="email">Email</i-label>
        <i-input type="email" id="email" v-model.lazy="business.email" />
      </i-form-group>

      <i-form-group>
        <i-label for="contactName">Contact Name</i-label>
        <i-input type="text" id="contactName" v-model.lazy="business.contactName" />
      </i-form-group>

      <i-form-group>
        <i-label for="website">Website</i-label>
        <i-input type="url" id="website" v-model.lazy="business.website" />
      </i-form-group>

      <div v-for="(link, index) in business.socialMedia" :key="index">
        <i-form-group>
          <i-label :for="`social-media-${index}`">Social Media</i-label>
          <i-input type="text" :id="`social-media-${index}`" v-model.lazy="business.socialMedia[index]"> 
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
  import { reactive, toRefs } from 'vue'
  import router from '../routes'
  import { useMainStore } from '../store'
  import { storeToRefs } from 'pinia'

  const store = useMainStore(), { getBusiness: { value: getBusinessById } } = storeToRefs(store), id = router.currentRoute.value.params.id || null, business = getBusinessById( id ) || reactive({
    logo: '',
    organization: '',
    phone: '',
    email: '',
    contactName: '',
    website: '',
    socialMedia: ['']
  }), addSocialMediaLink = () => {
    business.value.socialMedia.push('')
  }, updateSocialMediaLink = (index) => {
    business.value.socialMedia[index] = business.value.socialMedia[index]
  }, removeSocialMediaLink = (index) => {
    business.value.socialMedia.splice(index, 1)
  }, submitForm = () => {
    store.setBusiness(business, id )
    router.push('/')
  }
</script>
