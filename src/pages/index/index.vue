<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import Popup from '@/components/index/Popup.vue'

function chooseMedia() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res: any) {
      // getPicData(res.tempFiles[0])
      const tempFilePaths = res.tempFiles
      console.log(tempFilePaths, 'tempFile')

      uni.uploadFile({
        url: import.meta.env.VITE_BASE_API + '/ai/pic',
        filePath: tempFilePaths[0].tempFilePath,
        name: 'image',
        // formData: {
        //   user: 'test'
        // },
        success: (uploadFileRes) => {
          // JSON 处理
          console.log(JSON.parse(uploadFileRes.data), 'uploadRes')
          // 上传内容
          const data = JSON.parse(uploadFileRes.data).data
          console.log(data, 'data')
          for (const item of data) {
            commonUploadFoodInfo(item.id)
          }
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }
  })
}
function takePhoto() {
  console.log('takePhoto')
  uni.chooseMedia({
    count: 9,
    mediaType: ['image'],
    sourceType: ['camera'],
    camera: 'back',
    success(res: any) {
      // getPicData(res.tempFiles[0])
      const tempFilePaths = res.tempFiles
      console.log(tempFilePaths, 'tempFile')

      uni.uploadFile({
        url: import.meta.env.VITE_BASE_API + '/ai/pic',
        filePath: tempFilePaths[0].tempFilePath,
        name: 'image',
        // formData: {
        //   user: 'test'
        // },
        success: (uploadFileRes) => {
          // JSON 处理
          console.log(JSON.parse(uploadFileRes.data), 'uploadRes')
          // 上传内容
          const data = JSON.parse(uploadFileRes.data).data
          console.log(data, 'data')
          for (const item of data) {
            commonUploadFoodInfo(item.id)
          }
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }
  })
}

// function getPicData(file: any) {
//   const tempFilePaths = chooseImageRes.tempFilePaths
// }

// TODO: 手动记录表单

const recommandData = ref({
  danbai: 0,
  danguchun: 0,
  foodId: 0,
  gai: 0,
  huluobosu: 0,
  id: 0,
  jia: 0,
  lin: 0,
  mei: 0,
  meng: 0,
  na: 0,
  name: '',
  recordTime: '',
  reliang: 0,
  tanshui: 0,
  tie: 0,
  tong: 0,
  userId: 0,
  va: 0,
  vc: 0,
  ve: 0,
  xi: 0,
  xianwei: 0,
  xin: 0,
  yansuan: 0
})
const renderData = ref()
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
  const testFormattedDate = '2024-03-21'
  uni.request({
    url:
      import.meta.env.VITE_BASE_API +
      `/analyse/recommand/food/1/${testFormattedDate}`,
    method: 'GET',
    success: (res: any) => {
      // console.log(res.data.data)
      recommandData.value = res.data.data
      if (!recommandData.value) {
        return
      }
      renderData.value = recommandData.value[0]
      // console.log(renderData.value, 'renderData')
    }
  })
}

const userId = 1
const recommandInfo = ref({
  danbai: 0,
  danguchun: 0,
  gai: 0,
  huluobosu: 0,
  jia: 0,
  lin: 0,
  mei: 0,
  meng: 0,
  na: 0,
  reliang: 0,
  tanshui: 0,
  tie: 0,
  tong: 0,
  va: 0,
  vc: 0,
  ve: 0,
  xi: 0,
  xianwei: 0,
  xin: 0,
  yansuan: 0
})
async function getRecommodInfo() {
  uni.request({
    url: import.meta.env.VITE_BASE_API + `/user/bestNutrition/${userId}`,
    method: 'GET',
    success: (res: any) => {
      recommandInfo.value = res.data.data
      // console.log(recommandInfo.value, 'recommandInfo')
    }
  })
}

async function init() {
  await getRecommodData()
  await getRecommodInfo()
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

const curPage = ref(0) // 当前页面
function commonUploadFoodInfo(foodId: any) {
  const now = new Date()
  const formattedTime = formatTime(now)
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/record/foods',
    method: 'POST',
    data:
      // Assuming 'recommandData' is an array and 'formattedDate' is a string
      [
        {
          userId: 1,
          foodId,
          recordTime: formattedTime
        }
      ],
    success: (res: any) => {
      // console.log(res)
      showToast()
      ani(['fade'], true)

      setTimeout(() => {
        if (curPage.value < recommandData.value.length - 1) {
          curPage.value++
          renderData.value = recommandData.value[curPage.value]
        } else {
          curPage.value = 0
          renderData.value = recommandData.value[curPage.value]
        }
        showAdvice.value = !showAdvice.value
      }, 300)
    }
  })
}

function handleEating() {
  commonUploadFoodInfo(recommandData.value[curPage.value].foodId)
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

const progressZhifang = computed(() => {
  if (!recommandInfo.value.zhifang || !renderData.value.zhifang) {
    return 0
  }
  return (renderData.value.zhifang / recommandInfo.value.zhifang) * 100
})

const progressDanbai = computed(() => {
  if (!recommandInfo.value.danbai || !renderData.value.danbai) {
    return 0
  }
  return (renderData.value.danbai / recommandInfo.value.danbai) * 100
})

const progressTanshui = computed(() => {
  if (!recommandInfo.value.tanshui || !renderData.value.tanshui) {
    return 0
  }
  return (renderData.value.tanshui / recommandInfo.value.tanshui) * 100
})

const adviceModalStyles = ref({
  // width
  width: '100%',
  // height
  height: '350px'
})

init()

function handleRecord() {
  uni.navigateTo({
    url: '/pages/index/record'
  })
}
</script>

<template>
  <view class="container flex h-[100vh] flex-col" blurEffect="light">
    <fui-toast ref="toast"></fui-toast>

    <view>
      <fui-animation
        :duration="500"
        :animationType="mode"
        :show="showAdvice"
        :styles="adviceModalStyles">
        <view
          v-if="renderData"
          class="m-4 box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 opacity-90 shadow-md">
          <!-- Header -->
          <view class="flex justify-between">
            <view class="py-2 text-xl font-bold">
              {{ renderData.name }}
            </view>
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
                <span class="text-sm opacity-60">
                  <span v-if="renderData.zhifang">
                    {{ renderData.zhifang }}
                  </span>
                  /
                  <span v-if="recommandInfo.zhifang">
                    {{ recommandInfo.zhifang }}
                  </span>
                  千卡
                </span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="progressZhifang"
                  stroke-width="15"
                  border-radius="6"
                  activeColor="#185864" />
              </view>
            </view>
            <view
              class="flex flex-col gap-2"
              v-if="renderData.danbai && recommandInfo.danbai">
              <view class="flex items-center justify-between">
                <span>蛋白</span>
                <span class="text-sm opacity-60">
                  <span class="text-sm opacity-60">
                    {{ renderData.danbai }}/{{ recommandInfo.danbai }}千卡
                  </span>
                </span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="progressDanbai"
                  stroke-width="15"
                  border-radius="6"
                  activeColor="#f9a647" />
              </view>
            </view>
            <view
              class="flex flex-col gap-2"
              v-if="renderData.tanshui && recommandInfo.tanshui">
              <view class="flex items-center justify-between">
                <span>碳水</span>
                <span class="text-sm opacity-60">
                  {{ renderData.tanshui }}/{{ recommandInfo.tanshui }}千卡
                </span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="progressTanshui"
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

    <view class="z-10 flex items-center justify-center pb-6 font-bold">
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
        <button
          @click="handleRecord"
          class="border-[#185864 flex w-[150px] items-center justify-center gap-2 rounded-3xl border font-bold text-[#6fb23a]">
          <view
            class="flex h-[22px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="#185864" type="medal" size="30"></u-icons>
          </view>
          <view class="text-[#185864]">手动记录</view>
        </button>
      </view>
    </view>
  </view>
</template>

<style>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
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
