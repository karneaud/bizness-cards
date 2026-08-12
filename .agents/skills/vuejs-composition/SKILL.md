---
name: vuejs-composition
description: Vue 3 Composition API with ES6 for this project
---

# Vue 3 Composition API Guidelines

## Required Patterns

- Use `<script setup>` syntax for all new Vue components
- Use ES6 `const` / `let` instead of `var`
- Use arrow functions for callbacks and computed properties
- Use ES6 modules with `import` / `export`
- Use destructuring for props and reactive objects
- Use `defineProps` and `defineEmits` with TypeScript type inference or runtime declarations
- Use `ref`, `reactive`, `computed`, `watch`, `onMounted` from Vue
- Use Pinia for state management (store in `src/store/`)
- Use `@` alias for `src/` (already configured in vite.config.ts)

## Component Template

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useYourStore } from '@/store/yourStore'

const props = defineProps({
  someProp: { type: String, required: true },
  optionalProp: { type: Number, default: 0 }
})

const emit = defineEmits(['update', 'delete'])

const data = ref(null)
const store = useYourStore()

const computedValue = computed(() => data.value?.length)

function handleClick() {
  emit('update', data.value)
}

onMounted(() => {
  // initialization
})
</script>

<template>
  <div>{{ computedValue }}</div>
</template>
```

## Store Pattern

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useYourStore = defineStore('your', () => {
  const items = ref([])

  const count = computed(() => items.value.length)

  function addItem(item) {
    items.value.push(item)
  }

  return { items, count, addItem }
})
```