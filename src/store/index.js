
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { generateUserId } from '../lib/utils.js'

function initializeData() {
  return {
    userId: generateUserId(),
    contacts: []
  }
}

export const state = () => ({
  data: useLocalStorage('cards', initializeData())
}), useMainStore = defineStore('main', {
  state, 
  getters: {
    contacts(state) {
      return state.data.contacts 
    },
    cards() {
      return this.contacts
    },
    userId(state) {
      return state.data.userId
    },
    getContact(state) {  return (value) => state.data.contacts.find(contact => contact.id === value) },
    getContactAt(state) { return (index) => state.data.contacts[index] }
  },
  actions: {
    setUserId(userId) {
      if (!this.data.userId) {
        this.data.userId = userId || generateUserId()
      }
    },
    setUser(value) {
      this.data.userId = value.userId || this.data.userId
      this.initContacts()
    },
    getUser() {
      return { userId: this.data.userId }
    },
    initContacts() {
      if (!this.data.contacts) {
        this.data.contacts = []
      }
    },
    setContact(value, id = null) {
      if(!this.data) this.data = initializeData()
      this.initContacts()
      if(id !== null) {
        if (typeof id === 'number' && id >= 0 && id < this.data.contacts.length) {
          this.data.contacts[id] = value
        } else {
          const idx = this.data.contacts.findIndex(c => c.id === (id.id || id))
          if(idx !== -1) this.data.contacts[idx] = value
          else this.data.contacts.push(value)
        }
      } else {
        this.data.contacts.push(value)
      }
    },
    removeContact (value) { 
      this.initContacts()
      return this.data.contacts = this.data.contacts.filter(b => b.id !== value.id)
    },
  },
})
