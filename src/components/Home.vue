<script setup>
  import { useMainStore } from '../store'
  import router from '../routes'

  const store = useMainStore(),  cards = store.cards, createProfile = () => router.push('/business', null ), businesses = store.businesses, hasBusinesses = businesses.length > 0, remove = (index) => store.removeBusiness(index)

</script>
    <template>
        <i-layout class="_width:100%! _height:100%">
          <i-layout-content>
            <article v-if="!hasBusinesses">
              <h1>Create Card</h1>
              <p>To begin...Let's create a business profile</p>
              <i-button id="create-button" circle outline size="lg" color="primary" @click="createProfile">Create</i-button>
            </article>
            <article v-else  class="_width:100%! _clearfix!">
            <h2>Business Cards</h2>
              <i-list-group :border="false" class="_width:100%!">
                <i-list-group-item class="_border-bottom! _display:flex! _padding-left:0! _width:100%"  v-for="(business, index) in businesses" :key="index">
                  <div class="_padding-right:1 _flex:fill!"><router-link :to="`/business/${index}`"><i class="bx bx-edit bx-sm"></i></router-link></div>
                  <router-link :to="`/card/${index}`" class="_text:left! _display:flex _max-width:90% _width:100vw">
                    <span class="_text-overflow:ellipsis _padding-right:1 _width:100%!"><strong>{{ business.organization }}</strong></span>
                    <span class="_text:right!">&#x203A;</span>
                  </router-link>
                  <div class="_flex:fill! _padding-left:1"><a @click="remove(index)"><i class="bx bx-minus-circle bx-sm"></i></a></div>
                </i-list-group-item>
              </i-list-group>
              </article>
            </i-layout-content>
          <i-layout-footer v-if="hasBusinesses">
           <div class="_width:100% _margin:1!">
              <i-button circle outline primary btn-primary size="lg" :to="`/business`">
                <template #icon><i-icon name="ink-plus"/></template>
              </i-button>
           </div>
          </i-layout-footer>
        </i-layout>
    </template>
    <style lang="css" scoped>
      button#create-button {
        display: flex;
        margin: 0 auto;
        padding: 20%;
      }

      .layout-content, .layout-footer {
        padding: 8px;
      }

      #app > main > section {
        height: 100%;
        width: 100%;
        padding: 24px;
      }


    </style> 