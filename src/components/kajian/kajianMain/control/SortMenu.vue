<template>
  <div
    ref="focus"
    class="h-[2rem] flex items-center border border-kajian-darkGray bg-kajian-white rounded-tr-md rounded-bl-md transition-all ease-out duration-200"
    :class="[active ? 'w-[15rem]' : 'w-[3rem]']"
  >
    <div
      @click="iconClicked"
      ref="target"
      class="w-[3rem] h-[2rem] flex justify-center items-center hover:text-xl cursor-pointer"
      :class="[value && !active ? 'ring ring-kajian-lightBlue' : '']"
    >
      <div class="flex flex-col justify-evenly items-center -space-y-4">
        <font-awesome-icon :icon="['fas', 'sort-up']" />
        <font-awesome-icon :icon="['fas', 'sort-down']" />
      </div>
    </div>
    <div v-show="active" class="w-8/12 h-[2rem] flex-auto">
      <Multiselect
        ref="multiselect"
        class="h-[2rem]"
        v-model="value"
        label="name"
        value-prop="value"
        :options="options"
        :close-on-select="false"
        :close-on-deselect="false"
        :can-deselect="false"
        @change="changeValue"
      >
        <template v-slot:option="{ option, isSelected }">
          <div
            @click="changeSortOrientation"
            class="flex justify-between items-center w-full h-full"
          >
            <div class="w-10/12 flex-auto capitalize">{{ option.name }}</div>
            <div
              class="flex flex-col justify-evenly items-center -space-y-3 border-l border-kajian-gray w-2/12 text-black"
            >
              <font-awesome-icon
                :class="[asc && isSelected(option) ? 'text-kajian-red' : '']"
                :icon="['fas', 'sort-up']"
              />
              <font-awesome-icon
                :icon="['fas', 'sort-down']"
                :class="[!asc && isSelected(option) ? 'text-kajian-red' : '']"
              />
            </div>
          </div>
        </template>
      </Multiselect>
    </div>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
import { kajianFeedStore } from '@/stores/counter.js'
import { watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { delay } from '@/helpers/util.js'

const multiselect = ref()
const focus = ref()
onClickOutside(focus, () => (active.value = false))

const feedStore = kajianFeedStore()
const value = ref()
const isChange = ref(false)
const options = ref([
  { name: 'Created Post', value: 'createdPost' },
  { name: 'Kajian Time', value: 'kajianTime' },
  { name: 'Judul', value: 'judul' }
])
const active = ref(false)
const asc = ref(true)

watch(value, () => {
  feedStore.sortComponent = value.value
  feedStore.sortAsc = true
})
watch(asc, () => (feedStore.sortAsc = asc.value))

function changeValue() {
  isChange.value = true
  asc.value = true
}
function changeSortOrientation() {
  isChange.value ? (isChange.value = false) : (asc.value = !asc.value)
}
async function iconClicked() {
  active.value = !active.value
  await delay(200)
  active.value ? multiselect.value.open() : multiselect.value.close()
}
</script>

<style scoped></style>
