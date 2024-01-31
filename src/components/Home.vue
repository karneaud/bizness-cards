<script setup>
  import { useMainStore } from '../store'
  import router from '../routes'

  const store = useMainStore(),  cards = store.cards, createProfile = () => router.push('/business', null ), businesses = store.businesses, hasBusinesses = businesses.length > 0

</script>
    <template>
        <i-layout class="_width:100%! _height:100%">
          <i-layout-content>
            <section v-if="!hasBusinesses">
              <h1>Create Card</h1>
              <p>To begin...Let's create a business profile</p>
              <i-button id="create-button" circle outline size="lg" color="primary" @click="createProfile">Create</i-button>
            </section>
            <section v-else  class="_width:100%! _clearfix!">
            <h2>Business Cards</h2>
              <i-list-group :border="false" class="_width:100%!">
                <i-list-group-item class="_border-bottom! _display:flex!"  v-for="(business, index) in businesses" :key="index" :to="`/card/${index}`">
                  <span class="_text:left! _flex-grow:1!">{{ business.organization }}</span>
                  <span class="_text:right!">&#x203A;</span>
                </i-list-group-item>
              </i-list-group>
              </section>
            </i-layout-content>
          <i-layout-footer v-if="hasBusinesses">
           <div class="_width:100% _margin:1!">
              <i-button circle outline size="lg" :to="`/business`"><template #icon><i-icon name="ink-plus"/></template></i-button>
           </div>
          </i-layout-footer>
        </i-layout>
    </template>