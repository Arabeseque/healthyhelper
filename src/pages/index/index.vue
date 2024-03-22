<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import Popup from '@/components/index/Popup.vue'
import TransDemo from '@/components/index/Transition.vue'

function chooseMedia() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      console.log(res.tempFiles)
    }
  })
}
function takePhoto() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image'],
    sourceType: ['camera'],
    camera: 'back',
    success(res) {
      console.log(res.tempFiles)
    }
  })
}

// TODO: 手动记录表单

interface RecommandData {
  danbai: number
  danguchun: number
  foodId: number
  gai: number
  huluobosu: number
  id: number
  jia: number
  lin: number
  mei: number
  meng: number
  na: number
  name: string
  recordTime: string
  reliang: number
  tanshui: number
  tie: number
  tong: number
  userId: number
  va: number
  vc: number
  ve: number
  xi: number
  xianwei: number
  xin: number
  yansuan: number
}

const recommandData = ref<RecommandData[]>()

async function getRecommodData() {
  // analyse/recommand/1/2023-05-10
  // const date = new Date().toLocaleDateString()
  // 获取当前日期
  const date = new Date()

  // 获取年、月、日
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 格式化日期
  const formattedDate = `${year}-${month}-${day}`
  uni.request({
    url:
      import.meta.env.VITE_BASE_API + `/analyse/recommand/1/${formattedDate}`,
    method: 'GET',
    success: (res: any) => {
      console.log(res.data.data)
      recommandData.value = res.data.data
      renderData.value = recommandData.value[0]
    }
  })
}

async function init() {
  await getRecommodData()
}

function formatTime(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function handleEating() {
  const now = new Date()

  const formattedTime = formatTime(now)

  uni.request({
    url: import.meta.env.VITE_BASE_API + '/record/foods',
    method: 'POST',
    data:
      // Assuming 'recommandData' is an array and 'formattedDate' is a string
      [
        // Wrap data in an object named 'records'
        {
          userId: 1,
          foodId: recommandData.value[0].foodId,
          recordTime: formattedTime
        }
      ],

    success: (res: any) => {
      console.log(res)
      showToast()
      ani(['fade'], true)
    }
  })
}

const toast = ref()
function showToast() {
  toast.value.show({
    type: 'text',
    // position: 'top',
    duration: 2000,
    text: '已添加到今日食谱',
    size: 50,
    width: 100
  })
}

const showAdvice = ref(true)
const styles = ref({})
const mode = ref(['fade'])

const total = computed(() => {
  return recommandData.value?.length
})

const curPage = ref(0)

const renderData = ref()
watch(recommandData, (newVal) => {
  renderData.value = newVal
})

function ani(mode: any, mask: any) {
  if (mask) {
    styles.value.backgroundColor = 'rgba(0,0,0,0.6)'
  } else {
    styles.value.backgroundColor = 'rgba(0,0,0,0)'
  }
  setTimeout(() => {
    mode.value = mode
    showAdvice.value = !showAdvice.value
  }, 80)

  setTimeout(() => {
    // if (cur < total) {
    // }
  }, 300)
}

init()
</script>

<template>
  <view class="container flex h-[100vh] flex-col" blurEffect="light">
    <fui-toast ref="toast"></fui-toast>

    <view class="p-4">
      <fui-animation :duration="500" :animationType="mode" :show="showAdvice">
        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 opacity-90 shadow-md">
          <!-- Header -->
          <view class="flex justify-between">
            <view class="py-2 text-xl font-bold">豆皮</view>
            <view>
              <a
                @click="handleEating"
                href="#"
                class="inline-flex items-center rounded-lg bg-orange-400 px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                就吃这个!
              </a>
            </view>
          </view>
          <view class="text-xs text-stone-800">
            健康助手根据个人营养计划生成
          </view>

          <!-- 分割线 -->
          <view class="border opacity-10"></view>

          <!-- List 早餐 午餐 晚餐 -->

          <view>
            <view class="flex flex-col gap-2">
              <view class="flex items-center justify-between">
                <span>脂肪</span>
                <span class="text-sm opacity-60">0/549千卡</span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="50"
                  stroke-width="15"
                  border-radius="6"
                  activeColor="#185864" />
              </view>
            </view>
            <view class="flex flex-col gap-2">
              <view class="flex items-center justify-between">
                <span>蛋白</span>
                <span class="text-sm opacity-60">0/549千卡</span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="50"
                  stroke-width="15"
                  border-radius="6"
                  activeColor="#f9a647" />
              </view>
            </view>
            <view class="flex flex-col gap-2">
              <view class="flex items-center justify-between">
                <span>碳水</span>
                <span class="text-sm opacity-60">0/549千卡</span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="50"
                  stroke-width="15"
                  border-radius="6"
                  activeColor="#e2dbd0" />
              </view>
            </view>
          </view>
        </view>
      </fui-animation>
    </view>

    <view class="flex-auto"></view>

    <view class="flex items-center justify-center pb-6 font-bold">
      <view class="flex items-center justify-center gap-1">
        <!-- TODO: 拍照 -->
        <button
          @click="takePhoto"
          class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#185864] text-white">
          <view
            class="flex h-[20px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="white" type="camera" size="30"></u-icons>
          </view>
          <view>拍照</view>
        </button>

        <!-- TODO: 图库 -->
        <button
          @click="chooseMedia"
          class="flex aspect-square h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full">
          <u-icons color="#185864" type="image" size="30"></u-icons>
        </button>

        <!-- TODO: 手动记录 -->
        <Popup></Popup>
      </view>
    </view>
  </view>
</template>

<style>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.unsplash.com/photo-1710089765258-a5fbe8ead59c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}

video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);
}
</style>
