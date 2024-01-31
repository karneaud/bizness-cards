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
    }
  },
  actions: {
    addBusiness(value) { if(!this.data) { this.data = { businesses: [], user: { themes: [] } } } this.data.businesses.push(value) },
    removeBusiness (value) { return this.data.businesses = this.data.businesses.filter(b => b.id !== value.id)},
    getBusiness(value) {  return this.data.businesses.filter(b => b.id !== value)} ,
    setUser(value) {  return this.data.user = value },
    addTheme (value) { return this.data.user.themes.push(value) },
    removeTheme (value) { return this.data.user.themes = this.data.user.themes.filter(t => t.id !== value) },
  },
})
