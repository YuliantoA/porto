<template>
  <section class="w-full h-full flex justify-center gap-x-3 relative mt-7">
    <aside
      class="fixed top-0 left-0 border-kajian-gray h-screen transition-all ease-out duration-500 md:w-[15rem] sm:w-[10rem] z-50"
      :class="[isSidebarShow ? 'translate-x-0' : '-translate-x-64 ']"
      v-show="isMobile(width)"
    >
      <KajianUser @close="isSidebarShow = false" />
    </aside>
    <KajianUser v-if="!isMobile(width)"></KajianUser>
    <div class="flex flex-col lg:w-3/12 w-10/12 h-full">
      <FeedControl></FeedControl>
      <template v-if="isLoading">
        <KajianFeedSkeleton v-for="post in 3" :key="post" />
      </template>
      <template v-else>
        <KajianFeed
          :post-detail="post"
          v-for="(post, index, key) in showPost"
          :key="key"
          :index="index"
        ></KajianFeed>
      </template>

      <div @click="showAllPost = !showAllPost" class="h-full w-full">
        <div class="w-full h-36 flex justify-center items-baseline mt-7">
          <button
            class="border-2 border-kajian-darkBlue py-1 px-5 rounded-2xl text-kajian-darkBlue font-bold hover:bg-kajian-white hover:border-4 hover:shadow-xl"
          >
            {{ showAllPost ? 'See less post' : 'See more post' }}
          </button>
        </div>
      </div>
    </div>
    <KajianRecommend v-if="!isMobile(width)"></KajianRecommend>
    <div
      v-if="isMobile(width)"
      @click="router.push({ name: 'createPost' })"
      class="fixed bottom-4 right-4 rounded-full w-20 h-20 bg-gradient-to-br from-kajian-blue to-kajian-darkBlue flex items-center justify-center"
    >
      <font-awesome-icon :icon="['fas', 'plus']" style="color: #ffffff" />
    </div>
  </section>
</template>

<script setup>
import KajianFeed from '@/components/kajian/kajianMain/MainFeed.vue'
import KajianUser from '@/components/kajian/kajianMain/MainUser.vue'
import KajianRecommend from '@/components/kajian/kajianMain/MainRecommend.vue'
import FeedControl from '@/components/kajian/kajianMain/control/FeedControl.vue'
import KajianFeedSkeleton from '@/components/kajian/kajianMain/MainFeedSkeleton.vue'
import { getPostAllOnce } from '@/firebase/kajianDataService.js'
import { computed, onMounted, ref } from 'vue'
import { kajianFeedStore } from '../../stores/counter'
import { watch } from 'vue'
import { getUser, getUstad, getImage, getUserPhoto } from '@/firebase/kajianDataService.js'
import { isMobile } from '@/helpers/constantValue.js'
import { useWindowSize } from '@vueuse/core'
import router from '@/router'

onMounted(() => {
  getPost()
})
const { width } = useWindowSize()
const feedStore = kajianFeedStore()
const allPost = ref({})
const showAllPost = ref(false)
const sortComponent = ref('')
const sortAsc = ref('')
const search = ref('')
const isLoading = ref(true)
const isSidebarShow = ref(false)
watch(
  () => feedStore.sortComponent,
  (newValue) => {
    if (newValue) {
      sortComponent.value = feedStore.sortComponent
    }
  }
)
watch(
  () => feedStore.sortAsc,
  (newValue) => {
    sortAsc.value = newValue
  }
)
watch(
  () => feedStore.refetchPost,
  (newValue) => {
    newValue ? getPost() : ''
    feedStore.refetchPost = false
  }
)
watch(
  () => feedStore.search,
  (newValue) => {
    search.value = newValue
  }
)

watch(
  () => feedStore.showSideBar,
  (newValue) => {
    if (isMobile(width.value))
      if (newValue) {
        isSidebarShow.value = true
        feedStore.showSideBar = false
      }
  }
)

const showPost = computed(() => {
  let arrTemp = []
  for (let i in allPost.value) {
    arrTemp.push({ ...allPost.value[i], postId: i })
  }
  search.value
    ? (arrTemp = arrTemp.filter((value) => {
        return value.judul.toLowerCase().includes(search.value.toLowerCase())
      }))
    : ''
  switch (sortComponent.value) {
    case 'createdPost':
      arrTemp.sort(compareCreateTime)
      break
    case 'kajianTime':
      arrTemp.sort(compareKajianTime)
      break
    case 'judul':
      arrTemp.sort(compareJudul)
      break
    default: {
      arrTemp.sort(compareCreateTime)
    }
  }
  sortAsc.value ? arrTemp : arrTemp.reverse()
  showAllPost.value ? arrTemp : arrTemp.splice(2)
  return arrTemp
})

function compareCreateTime(a, b) {
  return new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
}
function compareKajianTime(a, b) {
  return new Date(a.waktu) < new Date(b.waktu) ? 1 : -1
}
function compareJudul(a, b) {
  {
    if (a.judul === b.judul) return 0
    if (a.judul === '') return -1
    if (b.judul === '') return +1
    return a.judul[0] < b.judul[0] ? -1 : a.judul[0] > b.judul[0] ? +1 : 0
  }
}
async function getPost() {
  allPost.value = []
  isLoading.value = true
  const data = await getPostAllOnce()
  processData(data)
}

async function processData(data) {
  for (let i in data) {
    data[i].image = await getImage(i + '.' + data[i].posterExt)
    data[i].ustadFetch = await getUstad(Object.keys(data[i].ustad)[0])
    data[i].creatorFetch = await getUser(Object.keys(data[i].creator)[0])
    data[i].creatorFetch.imageExt
      ? (data[i].creatorImage = await getUserPhoto(
          Object.keys(data[i].creator)[0] + '.' + data[i].creatorFetch.imageExt
        ))
      : '' //check user upload a photo
  }

  allPost.value = data
  isLoading.value = false
}
</script>
