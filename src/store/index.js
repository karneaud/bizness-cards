
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const state = () => ({
    data: useLocalStorage('cards',{ 
      contacts: [], 
  //      user: { themes: [] }
    })
  }), useMainStore = defineStore('main', {
  state, 
  getters: {
    // 1) retrieve the property "contacts"
    contacts(state) {
      return state.data.contacts 
    },
//   user() { return this.data.user},
//    themes() {return this.data.user.themes},
    cards() {
        return this.contacts
    },
    getContact(state) {  return (value) => state.data.contacts.find(contact => contact.id === value) },
    getContactAt(state) { return (index) => state.data.contacts[index] }
  },
  actions: {
    setContact(value, id = null) {
      if(!this.data) this.data = { contacts: [] }
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
    removeContact (value) { return this.data.contacts = this.data.contacts.filter(b => b.id !== value.id)},
 //   setUser(value) {  return this.data.user = value },
 //   addTheme (value) { return this.data.user.themes.push(value) },
 //   removeTheme (value) { return this.data.user.themes = this.data.user.themes.filter(t => t.id !== value) }
  },
})
