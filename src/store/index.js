import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const state = () => ({
    data: useLocalStorage('cards',{
      businesses: [],
      user: { themes: [] }
    })
  }), useMainStore = defineStore('main', {
  state,
  getters: {
    // 1) retrieve the property "businesses"
    businesses() { return this.data.businesses }, 
    user() { return this.data.user},
    themes() {return this.data.user.themes},
    cards() {
        return this.businesses
    },
    getBusiness(state) {  return (value) => state.data.businesses[value]/*filter(b => b.id !== value)*/ } 
  },
  actions: {
    setBusiness(value, id) { 
      if(!this.data) this.data = { businesses: [], user: { themes: [] } } 
      else if(id !== null) this.data.businesses[id] = value
      else this.data.businesses.push(value) 
    },
    removeBusiness (value) { return this.data.businesses = this.data.businesses.filter(b => b.id !== value.id)},
    setUser(value) {  return this.data.user = value },
    addTheme (value) { return this.data.user.themes.push(value) },
    removeTheme (value) { return this.data.user.themes = this.data.user.themes.filter(t => t.id !== value) }
  },
})
