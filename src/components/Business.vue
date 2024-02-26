<template>
  <section>
    <i-form @submit="submitForm" class="_display:flex! _flex-direction:column _justify-content:space-between _height:99vh _padding-y:1">
     <!-- <i-form-group>
        <i-label for="logo">Logo</i-label>
        <i-input type="file" id="logo" v-model.lazy="business.logo" />
      </i-form-group>
    -->
    
      <i-form-group>
        <i-input placeholder="Organization" type="text" id="organization" v-model.lazy="business.organization" />
      </i-form-group>

      <i-form-group>
        <i-input placeholder="Phone" type="number" id="phone" v-model.lazy="business.phone" />
      </i-form-group>

      <i-form-group>
        <i-input placeholder="Email" type="email" id="email" v-model.lazy="business.email" />
      </i-form-group>

        <i-form-group class="_display:flex">
          <i-input size="sml" placeholder="First Name" type="text" id="firstName" v-model.lazy="business.firstName" />   
          <i-input size="sml" placeholder="Last Name" type="text" id="lastName" v-model.lazy="business.lastName" />
        </i-form-group>
          <i-form-group>
          <i-input type="text" id="job" v-model.lazy="business.job" placeholder="Job Title" />
        </i-form-group>
      <i-form-group class="_margin-bottom:1!">
        <i-input type="url" placeholder="Website" id="website" v-model.lazy="business.website" />
      </i-form-group>

      <div v-for="(link, index) in business.socialMedia" :key="index">
        <i-form-group>
          <i-input placeholder="Social Media URL" type="text" :id="`social-media-${index}`" v-model.lazy="business.socialMedia[index]"> 
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
  </section>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useMainStore } from '../store'
  import { storeToRefs } from 'pinia'

  const store = useMainStore(), { getBusiness: { value: getBusinessById } } = storeToRefs(store), id = null, business = getBusinessById( id ) || reactive({
    logo: '',
    organization: '',
    phone: '',
    email: '',
    firstName: '',
    lastName:'',
    website: '',
    job:'',
    socialMedia: [''],
    theme: 'default'
  }), addSocialMediaLink = () => {
    business.socialMedia.push('')
  }, updateSocialMediaLink = (index) => {
    business.socialMedia[index] = business.socialMedia[index]
  }, removeSocialMediaLink = (index) => {
    business.socialMedia.splice(index, 1)
  }, submitForm = () => {
    store.setBusiness(business, id )
  }
</script>
<style lang="css">
 .input input {
   transition: all .2s ;
 }

 .input input:focus
 {
    height: 54px;
    color: 125%;
 }

@media (prefers-color-scheme: dark) {
    input, .input {
        background-color: transparent !important;
    }
}
</style>