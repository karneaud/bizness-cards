---
name: javascript-es6
description: ES6 OOP patterns with async/await and Yup validation for this project
---

# ES6 JavaScript Patterns

## Required Patterns

- Use ES6 `const` / `let` instead of `var`
- Use arrow functions for callbacks and computed properties
- Use ES6 modules with `import` / `export`
- Use class inheritance with `extends`
- Use `async` / `await` for asynchronous operations
- Use `try` / `catch` for error handling
- Use `for...of` for iteration, `map` / `filter` / `reduce` for array operations

## OOP Model Pattern

Models live in `src/store/models/` and extend a base `Model` class:

```javascript
import { Model } from './Model.js';
import * as yup from 'yup';

export class YourModel extends Model {
  constructor({ prop1 = '', prop2 = [] } = {}) {
    super();
    this.prop1 = prop1;
    this.prop2 = prop2.map(p => p instanceof YourModelItem ? p : new YourModelItem(p));
  }

  static getSchema() {
    return yup.object({
      prop1: yup.string().required('Prop1 is required'),
      prop2: yup.array().of(YourModelItem.getSchema()).nullable()
    });
  }

  async validate() {
    return this.validateWithSchema(YourModel.getSchema());
  }

  validateSync() {
    return this.validateSyncWithSchema(YourModel.getSchema());
  }

  addProp2(item) {
    if (typeof item === 'string') {
      this.prop2.push(new YourModelItem(item));
    } else if (item instanceof YourModelItem) {
      this.prop2.push(item);
    }
  }

  toJson() {
    return {
      prop1: this.prop1,
      prop2: this.prop2.map(item => item.toJson())
    };
  }

  static fromJson(json) {
    if (!json) return null;
    return new YourModel({
      prop1: json.prop1,
      prop2: (json.prop2 || []).map(p => new YourModelItem(p.value))
    });
  }
}
```

## Base Model Methods

The base `Model` class (`src/store/models/Model.js`) provides:

- `validateWithSchema(schema)` - async validation with Yup
- `validateSyncWithSchema(schema)` - sync validation with Yup
- `serializeWithSchema(schema, data)` - serialize data with Yup
- `toStringFromValue(value)` - convert value to string
- `generateId()` - generate unique ID
- `toJson()` - convert to JSON object
- `toJsonString()` - convert to JSON string

## Async/Await Pattern

```javascript
async function fetchData() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
```

## Pinia Store Pattern

```javascript
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const state = () => ({
  data: useLocalStorage('key', { contacts: [] })
})

export const useMainStore = defineStore('main', {
  state,
  getters: {
    contacts(state) {
      return state.data.contacts
    },
    getContact(state) {
      return (value) => state.data.contacts.find(contact => contact.id === value)
    }
  },
  actions: {
    setContact(value, id = null) {
      if (!this.data) this.data = { contacts: [] }
      if (id !== null) this.data.contacts[id] = value
      else this.data.contacts.push(value)
    },
    removeContact(value) {
      return this.data.contacts = this.data.contacts.filter(b => b.id !== value.id)
    }
  }
})
```