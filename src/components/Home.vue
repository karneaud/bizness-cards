<script setup>
  import { useMainStore } from '../store'
  import router from '../routes'

  const store = useMainStore(),  cards = store.cards, createProfile = () => router.push('/business', null ), businesses = store.businesses, hasBusinesses = true, remove = (index) => store.removeBusiness(index)

</script>
    <template> 
            <section class="_width:100%! _height:100%! _overflow:hidden _flex-direction:column _display:flex _align-contents:center _justify-content:center ">
              <article class="_clearfix _height:60vh! _flex-direction:column _display:flex _align-contents:center _justify-content:center">
                <h2>Business Cards</h2>
                <card-stack class="_clearfix _height:60vh!">
                  <template v-slot="slotProps">
                    <stack-card @swiping="slotProps.handleSwipeEvent" v-for="(i,index) in [1,2,3,4,5]" ref="stackedCards" :key="index"  :zIndex="i" :id="`card-${i}-${index}`">
                      <div class=""><p>Card {{ i }}</p></div>
                    </stack-card>
                  </template>
                </card-stack>
              </article>
            </section>
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