<template>
  <section :class="`theme-card ${ card.theme || 'default' }`" ref="vcard">
   <article class="name"><span class="first-name">{{ card.firstName }}</span><span class="last-name">{{ card.lastName }}</span></article>
    <article class="company"><span class="text">{{ card.organization }}</span></article>
    <article class="job"><span class="text">{{ card.job }}</span></article>
    <article class="phone">
      <span class="heading"><i class=" bx bxs-phone bx-lg"></i><strong>Phone:</strong></span>
      <a target="_blank" class="link" :href="`tel:${card.phone}`">
        <i class=" bx bxs-phone bx-sm"></i>
        <span class="text">{{ card.phone }}</span>
      </a>
      <a target="_blank" class="qr-code" @click="show('phone')"> 
        <i class='bx bx-qr bx-sm' ></i>
        <vue-qrcode type="image/png"  class="hidden" :value="card.phone" :color="color"></vue-qrcode>
      </a>
    </article>
   <article class="email">
      <span class="heading"><i class="bx bx-envelope bx-lg"></i><strong>Email:</strong></span>
      <a target="_blank" class="link" :href="`mailto:${card.email}`">
        <i class="bx bxs-envelope bx-sm"></i>
        <span class="text">{{ card.email }}</span>
      </a>
      <a class="qr-code" @click="show('email')"> 
        <i class='bx bx-qr bx-sm' ></i>
        <vue-qrcode type="image/png"  class="hidden" :value="card.email" :color="color"></vue-qrcode>
      </a>
    </article>
    <article class="website">
        <span class="heading"><i class="bx bx-globe bx-lg"></i><strong>Website:</strong></span>
        <a target="_blank" class="link" :href="card.website"><i class=" bx bx-globe bx-sm"></i>
          <span class="text">{{ card.website }}</span>
         
        </a>
         <a class="qr-code" @click="show('website')"> 
          <i class='bx bx-qr bx-sm' ></i>
            <vue-qrcode type="image/png"  class="hidden" :value="card.website" :color="color"></vue-qrcode>
          </a>
      </article>
    <article class="social">
      <div v-for="(link, index) in card.socialMedia" :key="index" :class="`${mediaName(link)} platform`">
          <span :class="`heading  social-${ mediaName(link) }`"><i :class="`bx bxl-${ mediaName(link) } bx-sm`"></i><strong>{{ mediaName(link) }}:</strong></span>
          <a target="_blank" class="link" :href="link">
            <i :class="` bx bxl-${ mediaName(link) } bx-sm`"></i>
            <span :class="`text social-${ mediaName(link) }`">@{{ socialHandle(link) }}</span>
          </a>
          <a class="qr-code" @click="show(`${mediaName(link)}`)"> 
            <i class='bx bx-qr bx-sm' ></i>
            <vue-qrcode type="image/png"  class="hidden" :value="link" :color="color"></vue-qrcode>
          </a>
      </div>
    </article>
    <article class="vcard">
      <span class="heading"><i class="bx bx-id-card bx-lg"></i><strong>vCard</strong></span>
      <a class="qr-code" @click="show('vcard')">
        <i class="bx bx-id-card bx-sm"></i>
        <vue-qrcode type="image/png" :value="vCard" :color="color"></vue-qrcode>
      </a>
    </article>
  </section>
</template>
<style lang="sass" scoped>
  @import "../themes/default"
</style>
<script setup>
     import createVCard from '../lib/vcard.js'
    import VueQrcode from 'vue-qrcode'

    const props = defineProps({
      card: null
    }), color = { dark: '#000000ff', light: '#ffffffff' } ,  
    mediaName = (url) => {
      let m = url.match(/^(?:https?:\/\/)?(?:www\.)?(?!www\.)(([^\/]+)\.[a-z]+)/)
      return m[2]
    }, socialHandle = (url) => { 
      let m = url.match(/\/([^\/]+)\/?$/)
      return m[1]
    }, show = (code) => {
        document.querySelector(`.${code}`).classList.toggle('show')
        return false;
    }, vCard = createVCard(props.card)
</script>
