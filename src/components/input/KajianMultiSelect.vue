<template>
  <div
    @click="trigger"
    ref="target"
    class="relative w-full lg:h-[4rem] h-[3rem]"
    :class="[disabled ? 'bg-kajian-darkestGray' : 'bg-kajian-gray']"
  >
    <div
      class="absolute top-0 left-0 w-full lg:h-[4rem] h-[3.4rem] z-10"
      :class="[
        listError.length > 0
          ? 'border-kajian-red border-l-4  border'
          : 'border-kajian-blue border-l-4  '
      ]"
    ></div>
    <div
      class="absolute left-3 z-20 transition-all ease-out duration-200"
      :class="[
        modelValue || placeholderActive ? 'top-1 lg:text-sm text-xs' : 'top-5 lg:text-lg text-sm',
        disabled ? 'text-kajian-white ' : 'text-kajian-darkGray'
      ]"
    >
      {{ customPlaceholder }}
    </div>
    <Multiselect
      ref="multiselect"
      :="$attrs"
      @change="onChange"
      @search-change="checkSearch"
      :value="modelValue"
      :valueProp="props.valueProp"
      :label="props.label"
      :close-on-select="true"
      :searchable="true"
      :disabled="props.disabled"
      :loading="listOption.length > 0 ? false : true"
      :options="listOption"
      :classes="{
        search:
          'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 lg:text-base text-xs font-sans rounded pl-3.5 rtl:pl-0 rtl:pr-3.5 bg-kajian-gray ',
        containerDisabled: 'cursor-default !bg-kajian-darkestGray ',
        container:
          'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-kajian-gray lg:text-base text-xs leading-snug outline-none pt-4  ',
        option:
          'flex items-center justify-start box-border text-left cursor-pointer lg:text-base text-xs leading-snug py-2 px-3'
      }"
    >
      <template v-slot:clear>
        <template> </template>
      </template>
    </Multiselect>
  </div>
  <template v-for="(error, index) of props.listError" :key="error">
    <div class="input-errors" v-if="index < 1">
      <div class="error-msg text-red-500 lg:text-xs text-xs lg:p-0 pl-3 lg:mt-0 mt-3">
        {{ error }}
      </div>
    </div>
  </template>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  asyncFunction: {
    type: Function
  },
  modelValue: {
    required: true
  },
  listOption: { type: Array },
  listError: { type: Array },
  customPlaceholder: {
    type: String
  },
  label: {
    type: String
  },
  valueProp: {
    type: String
  },
  disabled: {
    type: Boolean
  }
})
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits(['updateValue'])
const isOptionOper = ref(false)
const target = ref(null)
const multiselect = ref()
const placeholderActive = ref(false)
function trigger() {
  isOptionOper.value ? multiselect.value.close() : props.disabled ? '' : multiselect.value.open()
  isOptionOper.value = !isOptionOper.value
}
onClickOutside(target, () => multiselect.value.close())
function checkSearch(value) {
  value.length > 0 ? (placeholderActive.value = true) : (placeholderActive.value = false)
}

async function onChange(modelValue, x) {
  emit('updateValue', { value: modelValue, text: x.ariaLabel })
  isOptionOper.value = !isOptionOper.value
}
</script>

<style>
@import '@vueform/multiselect/themes/tailwind.css';
</style>
