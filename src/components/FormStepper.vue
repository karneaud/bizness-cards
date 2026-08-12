<template>
  <div class="stepper-container center">
    <!-- Steps indicator -->
    <ul v-if="showStepsIndicator" class="steps mx-auto flex justify-center align-center center my-2">
      <li
        v-for="(label, idx) in steps"
        :key="idx"
        :class="['step', currentStep === idx ? 'step-primary' : '']"
        @click="canJumpToStep(idx) && goToStep(idx)"
      >
        <span class="text-xs">{{ label }}</span>
      </li>
    </ul>

    <!-- Fieldset wrapper -->
    <fieldset class="fieldset bg-base-200 border-base-200 rounded-box border p-4 justify-items-stretch">
      <slot :currentStep="currentStep" :totalSteps="totalSteps" />
    </fieldset>

    <!-- Navigation buttons -->
    <div v-if="showNavigation" class="stepper-nav mt-2 center flex justify-center">
      <button
        v-if="showPrevButton"
        type="button"
        class="btn btn-circle btn-ghost"
        :disabled="!canGoPrev"
        @click="handlePrev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="showNextButton"
        type="button"
        class="btn btn-circle btn-ghost"
        @click="handleNext"
      >
        <svg v-if="!isLastStep" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: 0
  },
  showStepsIndicator: {
    type: Boolean,
    default: true
  },
  showNavigation: {
    type: Boolean,
    default: true
  },
  showPrevButton: {
    type: Boolean,
    default: true
  },
  showNextButton: {
    type: Boolean,
    default: true
  },
  allowJump: {
    type: Boolean,
    default: false
  },
  validateOnNav: {
    type: Boolean,
    default: false
  },
  beforePrev: {
    type: Function,
    default: null
  },
  beforeNext: {
    type: Function,
    default: null
  },
  validateStep: {
    type: Function,
    default: null
  }
})

const emit = defineEmits([
  'update:modelValue',
  'prev',
  'next',
  'step-change',
  'step-complete',
  'complete',
  'invalid',
  'blocked'
])

const currentStep = ref(props.modelValue)

const totalSteps = computed(() => props.steps.length)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)
const canGoPrev = computed(() => {
  if (isFirstStep.value) return false
  return true
})

const canGoNext = computed(() => {
  if (isLastStep.value) return false
  if (props.validateOnNav && props.validateStep) {
    return props.validateStep({ step: currentStep.value }) !== false
  }
  return true
})

function canJumpToStep(idx) {
  if (!props.allowJump) return false
  if (idx < 0 || idx >= totalSteps.value) return false
  return true
}

function validateAndProceed(direction) {
  const step = currentStep.value
  const isPrev = direction === 'prev'

  if (props.validateOnNav) {
    if (props.validateStep && props.validateStep({ step }) === false) {
      emit('invalid', { step })
      return false
    }
  }

  if (isPrev) {
    if (props.beforePrev && props.beforePrev({ step }) === false) {
      emit('blocked', { step, direction })
      return false
    }
  } else {
    if (props.beforeNext && props.beforeNext({ step }) === false) {
      emit('blocked', { step, direction })
      return false
    }
  }

  return true
}

function goToStep(newIndex) {
  if (newIndex < 0 || newIndex >= totalSteps.value) return

  const from = currentStep.value
  currentStep.value = newIndex
  emit('update:modelValue', newIndex)
  emit('step-change', { from, to: newIndex })
}

function handlePrev() {
  if (!canGoPrev.value) return
  if (!validateAndProceed('prev')) return

  emit('prev', { step: currentStep.value })
  goToStep(currentStep.value - 1)
}

function handleNext() {
   if (isLastStep.value) {
    emit('complete', {})
    return
  } else if (!canGoNext.value) return

  if (!validateAndProceed('next')) return

  emit('next', { step: currentStep.value })

  emit('step-complete', { step: currentStep.value })

  goToStep(currentStep.value + 1)
}

function next() {
  handleNext()
}

function prev() {
  handlePrev()
}

function reset() {
  goToStep(0)
}

defineExpose({
  next,
  prev,
  reset,
  goToStep
})
</script>