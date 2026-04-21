<script setup>

import { ref, onMounted, onBeforeUnmount } from "vue"
import { useMainStore } from "../store"
import CardFlick from "../lib/card-flick"
import Card from "./Card.vue"
import Form from "./Form.vue"
import Help from "./Help.vue"
import Business from "./Business.vue"

const store = useMainStore()
const cardContainer = ref(null), currentCard = ref(null)
let cardFlickInstance = null
const expandedCardId = ref(null)

const componentMap = {
  Business,
  Form,
  Help
}

const cards = ref([...store.cards, ...[
  { id: 4000, type: "Form", color: "bg-(--color-mist-300)", title: "Add Business"},
  { id: 6000, type: "Help", color: "bg-(--color-info)", title: "Help" }
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

onMounted(() => {

  cardFlickInstance = new CardFlick(cardContainer.value, {

    cardThreshold: 100,
    transitionDuration: 250,
    onHandleFlyOffCard: onFlyOff
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
        `stack-${Math.min(index,6)}`,
        card.color
      ]"
      :title="card.title"
      :expanded="expandedCardId === card.id"
      @collapse="onCollapse"
      @expand="onExpand"
    >
      <template #card-body>
        <component :is="componentMap[card.type]" :card="card"
        />
      </template>
    </Card>
   


  </article>

</section>

</template>