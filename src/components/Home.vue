<script setup>

  import { ref, onMounted, onBeforeUnmount } from "vue"
  import { useMainStore } from "../store"
  import CardFlick from "../lib/card-flick"
  import Card from "./Card.vue"
  import Form from "./Form.vue"
  import Help from "./Help.vue"
import Business from "./Business.vue"
  import THEME_COLORS from "../lib/utils.js"

  const store = useMainStore()
  const cardContainer = ref(null), currentCard = ref(null)
  let cardFlickInstance = null
  const expandedCardId = ref(null)
  const cardInstances = ref({})
  const editCard = ref(null)

  const componentMap = {
    Business,
    Form,
    Help
  }

  

  function randomColor() {
    return THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)]
  }

  const cards = ref([...store.cards.map(card => ({
    ...card,
    type: card.type || 'Business',
    color: card.color || 'corporate'
  })), ...[
    { id: 20000, title: "Test Card ", type: "Business", color: randomColor() },{ id: 30000, title: "Test Card 2", type: "Business", color: randomColor() },
    { id: 4000, type: "Form", color: "light", title: "Add Business"},
    { id: 6000, type: "Help", color: "emerald", title: "Help" }
  ]])

  function rotateCards() {

    const first = cards.value.shift()
    cards.value.push(first)

  }

  function onFlyOff() {

    rotateCards()

  }

  function onCollapse(card) {
    expandedCardId.value = null
    cardFlickInstance.collapseCard(card)
  }


  function onExpand(card) {
    expandedCardId.value = card.id
  }

  function onSaved(card) {
    const formCardInstance = cardInstances.value[4000]
    if (formCardInstance?.close) {
      formCardInstance.close()
      if(editCard?.value?.id == card.id) {
        setTimeout(async () => {
            let c = cards.value.findIndex(c => c.id === card.id)
            if (c === -1) return

            if (c > 0) {
              await cardFlickInstance.swipeToCard(c, 'right')
            }

          }, 320)
          editCard.value = null
      }
    }
  }

  function onEditBusiness(cardId) {
   const cardInstance = cardInstances.value[cardId]
    if (cardInstance?.close) {
      cardInstance.close()
    }

    const businessCard = cards.value.find(c => c.id === cardId)
    if (!businessCard) return

    editCard.value = { ...businessCard }

    setTimeout(async () => {
      const formIndex = cards.value.findIndex(c => c.id === 4000 && c.type === 'Form')
      if (formIndex === -1) return

      if (formIndex > 0) {
        await cardFlickInstance.swipeToCard(formIndex, 'left')
      }

    }, 320)
  }

  onMounted(() => {

    cardFlickInstance = new CardFlick(cardContainer.value, {

      cardThreshold: 100,
      transitionDuration: 250,
      onHandleFlyOffCard: onFlyOff,
      onSwipeCycleEnd: (cardd) => onExpand(cards.value[0])
    })

  })

  onBeforeUnmount(() => {

    if (cardFlickInstance) {
      cardFlickInstance.destroy()
    }

  })

</script>


<template>

  <section class="page flex justify-center items-center w-full h-full overflow-hidden">

    <article ref="cardContainer" class="stack stack-bottom aspect-[2/3] m-4">

      <Card
        v-for="(card,index) in cards"
        :key="card.id"
        :id="`card-${index}`"
        :class="[
          'card',
          `stack-${Math.min(index,6)}`
        ]"
        :title="card.title"
        :data-theme="card.color"
        :expanded="expandedCardId === card.id"
        :ref="el => { if (el) cardInstances[card.id] = el }"
        @collapse="onCollapse"
        @expand="onExpand"
      >
        <template #card-body class="bg-primary">
          <component
            v-if="card.type === 'Form'"
            :is="componentMap[card.type]"
            :card="card"
            :edit-card="editCard"
            @saved="onSaved"
          />
          <component
            v-else-if="card.type === 'Help'"
            :is="componentMap[card.type]"
            :card="card"
          />
          <component
            v-else
            :is="componentMap[card.type]"
            :card="card"
            @edit="onEditBusiness"
          />
        </template>
      </Card>
    


    </article>

  </section>

</template>