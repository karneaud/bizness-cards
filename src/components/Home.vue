<script setup>
  import { useMainStore } from '../store'
  const store = useMainStore(), businesses = store.businesses, cards = store.cards
</script>
    <template> 
            <section class="_width:100%! _height:100%! _overflow:hidden _flex-direction:column _display:flex _align-contents:center _justify-content:center ">
              <article class="_clearfix _height:100%! _overflow:hidden _flex-direction:column _display:flex _align-contents:center _justify-content:center">
                <h2>Business Cards</h2>
                <card-stack>
                  <template v-slot="slotProps">
                    <stack-card @swiping="slotProps.handleSwipeEvent" v-for="(card,index) in businesses" ref="stackedCards" :key="index"  :zIndex="`${++index}`" :id="`card-$-${index}`">
                      <template #content>
                        <card :card="card" v-slot="slotProps" />
                      </template>
                      <template #placeholder>
                        <p><small>{{ card.organization }}</small></p>
                      </template>
                    </stack-card>
                    <stack-card @swiping="slotProps.handleSwipeEvent" ref="stackedCards" :zIndex="`${businesses.length > 0 ? 0 : 2 }`">
                      <template #content="slotProps">
                        <business v-slot="slotProps" @submitted="slotProps.toggleExpand" />
                      </template>
                      <template #placeholder="slotProps">
                        <h2>Create Card</h2>
                        <i-button size="lg" outline color="primary" @click="slotProps.toggleExpand" circle><i-icon name="ink-plus"></i-icon></i-button>
                      </template>
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