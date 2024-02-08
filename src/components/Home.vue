<script setup>
  import { useMainStore } from '../store'
  import router from '../routes'

  const store = useMainStore(),  cards = store.cards, createProfile = () => router.push('/business', null ), businesses = store.businesses, hasBusinesses = true, remove = (index) => store.removeBusiness(index)

</script>
    <template>
        <i-layout class="_width:100%! _height:100%">
          <i-layout-content class="_overflow:hidden _display:flex _justify-content:center _align-items:center">
            <article v-if="!hasBusinesses">
              <h1>Create Card</h1>
              <p>To begin...Let's create a business profile</p>
              <i-button id="create-button" circle outline size="lg" color="primary" @click="createProfile">Create</i-button>
            </article>
            <article v-else  class="_width:100%! _height:100%! _overflow:hidden _flex-direction:column _display:flex _align-items:center _justify-content:center ">
            <h2>Business Cards</h2>
              <card-stack>
                <template v-slot="slotProps">
                  <stack-card @swipe="slotProps.handleSwipeEvent" v-for="(i,index) in [1,2,3,4,5]" ref="stackedCards" :key="index" :style="{ zIndex: i }" :isActive="`${ i == 5}`" :id="`card-${i}-${index}`">
                    <div class=""><p>Card {{ i }}</p></div>
                  </stack-card>
                </template>
              </card-stack>
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