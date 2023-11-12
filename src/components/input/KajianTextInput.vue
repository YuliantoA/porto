<template>
  <div class="relative">
    <div
      class="h-full w-1 absolute top-0 z-10"
      :class="[props.listError.length > 0 ? ' bg-kajian-red' : 'bg-kajian-blue']"
    ></div>
    <div
      @click="focused = true"
      class="absolute left-4 text-kajian-darkGray transition-all ease-out duration-300 select-none cursor-text"
      :class="[
        focused || modelValue.length > 0
          ? 'top-1 lg:text-sm text-xs '
          : '  top-4 lg:text-lg text-sm'
      ]"
    >
      {{ props.placeholderText }}
      <slot name="icon"></slot>
    </div>

    <input
      ref="target"
      class="w-full bg-kajian-gray px-4 pb-2 pt-6 text-lg z-0 focus-visible:outline-none"
      :class="[
        props.listError.length > 0
          ? 'border border-kajian-red'
          : 'focus-visible:border-kajian-darkGray border'
      ]"
      :="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="typeInput"
    />
    <div
      @click="revealPassword()"
      v-if="props.needEye"
      class="w-5 h-5 absolute top-6 right-2 cursor-pointer"
    >
      <font-awesome-icon v-if="!isEyeOpen" class="absolute" :icon="['far', 'eye-slash']" />
      <font-awesome-icon v-else class="absolute" :icon="['far', 'eye']" />
    </div>
  </div>
  <template v-for="(error, index) of props.listError" :key="error">
    <div class="input-errors" v-if="index < 1">
      <div class="error-msg text-red-500 lg:text-xs text-xs lg:p-0 pl-3 lg:mt-0 mt-2">
        {{ error }}
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target)

defineOptions({
  inheritAttrs: false
})

defineEmits(['update:modelValue'])
const props = defineProps({
  typeInput: {
    type: String,
    default: 'String'
  },
  placeholderText: {
    type: String,
    default: 'String'
  },
  needEye: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    required: true
  },
  listError: {
    type: Array
  }
})
const typeInput = ref(props.typeInput)
let isEyeOpen = ref(false)

function revealPassword() {
  isEyeOpen.value = !isEyeOpen.value
  isEyeOpen.value ? (typeInput.value = 'text') : (typeInput.value = 'password')
}
</script>
