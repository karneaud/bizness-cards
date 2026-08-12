# Plan: Save Form to Store + Trigger Card Collapse on Submit

## Goal
When the user submits the form in `Form.vue`:
1. Save the card data to the Pinia store (`localStorage`)
2. Trigger `Card.vue`'s `handleClose` / `emit('collapse')` to close the expanded card

## Event Flow
```
Form.vue (save succeeds)
  → emit('saved')
    → Home.vue catches @saved
      → calls Card.vue's exposed close() method
        → Card.vue emits('collapse', cardRef.value)
          → Home.vue onCollapse(cardEl)
            → cardFlickInstance.collapseCard(cardEl)
```

## Changes Required

### 1. `src/components/Form.vue`
- Import `useMainStore` from `../store`
- In `handleSubmit()`, after validation passes:
  - Call `store.setContact(card.toJson())`
  - Emit `@saved` event
  - Reset form to fresh `Card` instance so fields clear

### 2. `src/components/Card.vue`
- Add `defineExpose({ close: handleClose })` so `Home.vue` can trigger collapse programmatically

### 3. `src/components/Home.vue`
- Add a `ref` map to track Card component instances: `const cardInstances = ref({})`
- Use function refs on the `Card` `v-for`: `:ref="el => { if (el) cardInstances[card.id] = el }"`
- Listen for `@saved` on the `Form` component in the slot:
  ```vue
  <component :is="componentMap[card.type]" :card="card" @saved="onSaved" />
  ```
- Add `onSaved()` handler that finds the Form card instance and calls its `close()` method

## Validation
- `card.toJson()` serializes the reactive Card model into a plain object compatible with `store.contacts`
- `setContact()` with no `id` argument pushes to the array; localStorage persistence is automatic via `useLocalStorage`
- Card constructor auto-generates `id` and `userId` if null, so saved records always have IDs
- Large base64 logos are stored in localStorage — monitor quota but no immediate change needed
