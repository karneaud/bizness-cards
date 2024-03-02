<template>
  <section class="_overflow:hidden _overflow-y:auto _height:99vh">
    <i-form @submit="submitForm" class="_display:flex! _flex-direction:column _justify-content:space-between _padding-y:1">
     <!-- <i-form-group>
        <i-label for="logo">Logo</i-label>
        <i-input type="file" id="logo" v-model.lazy="business.logo" />
      </i-form-group>
    -->
    
      <i-form-group>
        <i-input placeholder="Organization" class="input-field" type="text" id="organization" v-model.lazy="business.organization" />
        <i-form-group class="_display:flex">
          <i-input class="input-field" size="sml" placeholder="First Name" type="text" id="firstName" v-model.lazy="business.firstName" />   
          <i-input class="input-field" size="sml" placeholder="Last Name" type="text" id="lastName" v-model.lazy="business.lastName" />
        </i-form-group>
        <i-input class="input-field" type="text" id="job" v-model.lazy="business.job" placeholder="Job Title" />
      </i-form-group>

      <i-form-group>
        <i-input class="input-field" placeholder="Phone" type="number" id="phone" v-model.lazy="business.phone" />
        <i-input class="input-field" placeholder="Email" type="email" id="email" v-model.lazy="business.email" />
        <i-input class="input-field" type="url" placeholder="Website" id="website" v-model.lazy="business.website" />
      </i-form-group>
      <i-form-group class="_margin:1">
        <i-form-group v-for="(social, index) in business.socialMedia" :key="index">
          <i-input class="input-field" placeholder="Social Media URL" type="text" :id="`social-media-${index}`" v-model.lazy="business.socialMedia[index]"> 
            <template #prepend>
                <i-button @click="removeSocialMediaLink(index)" link>
                  <template #icon>
                    <i-icon name="ink-minus"></i-icon>
                  </template>
                </i-button>
            </template>
            <template v-if="index == (business.socialMedia.length - 1)" #append>
                <i-button @click="addSocialMediaLink" link>
                  <template #icon>
                    <i-icon name="ink-plus"></i-icon>
                  </template>
                </i-button>
            </template>
          </i-input>
        </i-form-group>
        <i-form-group  v-if="business.socialMedia.length < 1">
          <i-input class="input-field" placeholder="Social Media URL" type="text" :id="`social-media-0`" v-model.lazy="business.socialMedia[0]"> 
            <template #append>
                <i-button @click="addSocialMediaLink" link>
                  <template #icon>
                    <i-icon name="ink-plus"></i-icon>
                  </template>
                </i-button>
            </template>
          </i-input>
        </i-form-group>

      </i-form-group>
      
      <i-button type="submit">Add</i-button>
    </i-form>
  </section>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useMainStore } from '../store'
  import { storeToRefs } from 'pinia'

  const store = useMainStore(), emit = defineEmits(['submitted']), { getBusiness: { value: getBusinessById } } = storeToRefs(store), id = null, business = getBusinessById( id ) || reactive({
    logo: '',
    organization: '',
    phone: '',
    email: '',
    firstName: '',
    lastName:'',
    website: '',
    job:'',
    socialMedia: [],
    theme: 'default'
  }), addSocialMediaLink = () => {
    business.socialMedia.push('')
  }, updateSocialMediaLink = (index) => {
    business.socialMedia[index] = business.socialMedia[index]
  }, removeSocialMediaLink = (index) => {
    business.socialMedia.length > 0? business.socialMedia.splice(index, 1) : false
  }, submitForm = () => {
    store.setBusiness(business, id )
    emit('submitted', { type: 'swipe.top' })
  }
</script>
<style lang="css" scoped>
.stack-card {
  background-color: var(--color-light);
}
</style>