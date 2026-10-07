
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { generateUserId } from '../lib/utils.js'
import { Card } from './models/Card.js'

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
    getContact(state) {  return (model) => state.data.contacts.find(contact => contact.id === model) },
    getContactAt(state) { return (index) => state.data.contacts[index] }
  },
  actions: {
    setUserId(userId) {
      if (!this.data.userId) {
        this.data.userId = userId || generateUserId()
      }
    },
    setUser(model) {
      this.data.userId = model.userId || this.data.userId
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
    setContact(model, id = null) {
      if(!this.data) this.data = initializeData()
      this.initContacts()
      if(id !== null) {
        if (typeof id === 'number' && id >= 0 && id < this.data.contacts.length) {
          this.data.contacts[id] = model.toJson(Card.getSchema().fields)
        } else {
          const idx = this.data.contacts.findIndex(c => c.id === (id.id || id))
          if(idx !== -1) this.data.contacts[idx] = model.toJson(Card.getSchema().fields)
          else this.data.contacts.push(model.toJson(Card.getSchema().fields))
        }
      } else {
        this.data.contacts.push(model.toJson(Card.getSchema().fields))
      }
    },
    removeContact (model) { 
      this.initContacts()
      return this.data.contacts = this.data.contacts.filter(b => b.id !== model.id)
    },
  },
})
