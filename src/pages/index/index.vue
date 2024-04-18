<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userId = userStore.userid
// const userId = 1
const toast = ref()

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
      uploadAiImage(tempFilePaths)
    }
  })
}
function takePhoto() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image'],
    sourceType: ['camera'],
    camera: 'back',
    success(res: any) {
      // getPicData(res.tempFiles[0])
      const tempFilePaths = res.tempFiles
      uploadAiImage(tempFilePaths)
    }
  })
}

// 存储变量
const recommandData = ref()
const recommandInfo = ref()
const renderData = ref() // 当前推荐
const curPage = ref(0) // 当前页数

const uploadImageSrc = ref()
const analyseImageRes = ref()

// 手动添加
const foodInputValue = ref({
  foodName: '',
  foodWeight: ''
})

const adviceModalStyles = ref({
  // width
  width: '100%',
  // height
  height: '350px'
})

const showAdvice = ref(true) // advice animation config
const styles = ref({})
const mode = ref(['fade'])

const styleInput = ref({}) // input animation config
const modeInput = ref(['fade'])
const showInput = ref(false)

const showImage = ref(false)
const styleImage = ref({
  width: '100%'
})
const modelImage = ref(['fade'])
const renderDataFruit = ref()
const showAdviceFruit = ref(true)
const adviceModalStylesFruit = ref({
  // width
  width: '100%',
  // height
  height: '350px'
})

const recommandDataFruit = ref()

const progressZhifangFruit = computed(() => {
  if (!recommandInfo.value.zhifang || !renderDataFruit.value.zhifang) {
    return 0
  }
  return (renderDataFruit.value.zhifang / recommandInfo.value.zhifang) * 100
})
const progressDanbaiFruit = computed(() => {
  if (!recommandInfo.value.danbai || !renderDataFruit.value.danbai) {
    return 0
  }
  return (renderDataFruit.value.danbai / recommandInfo.value.danbai) * 100
})
const progressTanshuiFruit = computed(() => {
  if (!recommandInfo.value.tanshui || !renderDataFruit.value.tanshui) {
    return 0
  }
  return (renderDataFruit.value.tanshui / recommandInfo.value.tanshui) * 100
})

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

// tools
function formatTime(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// get Function
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
  // const tempDate = '2024-03-21'

  uni.request({
    url:
      import.meta.env.VITE_BASE_API +
      `/analyse/recommand/food/${userId}/${formattedDate}`,
    method: 'GET',
    success: (res: any) => {
      // console.log(res.data.data)
      recommandData.value = res.data.data
      // console.log(res.data.data, 'returnData')
      if (!recommandData.value) {
        return
      }
      renderData.value = recommandData.value[0]
      // console.log(renderData.value, 'renderData')
    }
  })
}

async function getRecommodDataFruit() {
  // analyse/recommand/1/2023-05-10
  // const date = new Date().toLocaleDateString()
  // 获取当前日期
  const date = new Date()

  // 获取年、月、日
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()

  // 格式化日期
  const formattedDate = `${year}-${month}-${day}`
  uni.request({
    url:
      import.meta.env.VITE_BASE_API +
      `/analyse/recommand/fruit/${userId}/${formattedDate}`,
    method: 'GET',
    success: (res: any) => {
      // console.log(res.data.data)
      recommandDataFruit.value = res.data.data
      if (!recommandDataFruit.value) {
        return
      }
      renderDataFruit.value = recommandDataFruit.value[0]
      console.log(renderDataFruit.value, 'renderDataFruit')
    }
  })
}

async function getStandard() {
  uni.request({
    url: import.meta.env.VITE_BASE_API + `/user/bestNutrition/${userId}`,
    method: 'GET',
    success: (res: any) => {
      recommandInfo.value = res.data.data
      // console.log(recommandInfo.value, 'recommandInfo')
    }
  })
}

function handleRecordMyself() {
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/nutrition/food',
    method: 'GET',
    data: {
      foodName: foodInputValue.value.foodName
    },
    success: (res: any) => {
      if (res.data.code === 400) {
        uni.showToast({
          title: '未找到该食品',
          icon: 'none'
        })
        return
      }

      // 计算foodType
      const now = new Date()
      const hour = now.getHours()
      if (hour >= 5 && hour <= 9) var foodType = 'breakfast'
      else if (hour >= 10 && hour <= 14) var foodType = 'lunch'
      else if (hour >= 16 && hour <= 20) var foodType = 'dinner'
      else if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 4))
        var foodType = 'midnightSnack'
      else var foodType = 'snacks'

      console.log(res.data.data)
      const item = res.data.data
      const tempDate = formatTime(new Date())
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/record/foods/foodName/userId',
        method: 'POST',
        data: [
          {
            userId,
            // foodId: item.id,
            time: tempDate,
            foodName: foodInputValue.value.foodName,
            // id: null,
            weight: foodInputValue.value.foodWeight,
            foodType
          }
        ],
        success: (res: any) => {
          showToast()

          aniInput(['fade'], true)
          console.log(userStore.shouldRefesh, 'refresh')

          userStore.shouldRefesh = true
          console.log(userStore.shouldRefesh, 'refresh')

          setTimeout(() => {
            if (!showAdvice.value) {
              ani(['fade'], true)
            }
          }, 800)

          uni.reLaunch({
            url: '../../pages/index/index'
          })
        }
      })
    }
  })
}

function uploadAiImage(tempFilePaths) {
  uploadImageSrc.value = tempFilePaths[0].tempFilePath
  console.log(uploadImageSrc.value, 'image')

  uni.uploadFile({
    url: import.meta.env.VITE_BASE_API + '/ai/pic',
    filePath: tempFilePaths[0].tempFilePath,
    name: 'image',
    success: (uploadFileRes) => {
      // JSON 处理
      // 上传内容
      const data = JSON.parse(uploadFileRes.data).data
      // 为所有的 data 添加 count 字段为100
      data.forEach((item) => {
        // item.count = 100
        item.count = (Math.floor(Math.random() * (15 - 5 + 1)) + 5) * 10
      })

      analyseImageRes.value = data
      // data.length === arr.length

      // foodCountArr.value = Array(data.length).fill(100)

      console.log(data, 'data')

      // 显示图片 调用计算器
      if (showAdvice.value) {
        ani(['fade'], true)
      }

      if (showInput.value) {
        aniInput(['fade'], true)
      }

      setTimeout(() => {
        aniImage(['fade'], true)
        // 显示图片区域
      }, 800)
    },
    fail: (err) => {
      console.error(err)
    }
  })
}
function handlePostAnalyseData() {
  // 计算foodType
  const now = new Date()
  const hour = now.getHours()
  if (hour >= 5 && hour <= 9) var foodType = 'breakfast'
  else if (hour >= 10 && hour <= 14) var foodType = 'lunch'
  else if (hour >= 16 && hour <= 20) var foodType = 'dinner'
  else if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 4))
    var foodType = 'midnightSnack'
  else var foodType = 'snacks'

  // 发送
  analyseImageRes.value.forEach((item) => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + '/record/foods',
      method: 'POST',
      data: [
        {
          id: null,
          userId,
          foodId: item.id,
          recordTime: formatTime(new Date()),
          foodWeight: item.count,
          // foodType: 'breakfast'
          foodType
        }
      ],
      success: (res: any) => {
        userStore.shouldRefesh = true
        uni.$emit('refreshCalendar')
         uni.reLaunch({
           url: '../../pages/index/index'
         })
      }
    })
  })

  showToast()

  // 显示图片 调用计算器
  aniImage(['fade'], true)

  if (showInput.value) {
    aniInput(['fade'], true)
  }

  setTimeout(() => {
    // 显示图片区域
    if (!showAdvice.value) {
      ani(['fade'], true)
    }
  }, 800)
}

function init() {
  // 获取推荐数据
  getRecommodData()
  getRecommodDataFruit()
  getStandard()
  // console.log(renderData.value, 'renderData')
}

// Post Function
function commonPostFoodData(foodId: any, type: string) {
  const now = new Date()
  const formattedTime = formatTime(now)
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/record/foods',
    method: 'POST',
    data:
      // Assuming 'recommandData' is an array and 'formattedDate' is a string
      [
        {
          userId,
          foodId,
          recordTime: formattedTime
        }
      ],
    success: (res: any) => {
      // console.log(res)
      showToast()

      if (type === 'food') {
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
          showAdviceFruit.value = !showAdviceFruit.value
        }, 300)
      } else {
        aniFruit(['fade'], true)
        setTimeout(() => {
          if (curPage.value < recommandDataFruit.value.length - 1) {
            curPage.value++
            renderDataFruit.value = recommandDataFruit.value[curPage.value]
          } else {
            curPage.value = 0
            renderDataFruit.value = recommandDataFruit.value[curPage.value]
          }
          showAdviceFruit.value = !showAdviceFruit.value
        }, 300)
      }
    }
  })
}

// Animation
function ani(mode: any, mask: any) {
  if (mask) {
    styles.value.backgroundColor = 'rgba(0,0,0,0.3)'
  } else {
    styles.value.backgroundColor = 'rgba(0,0,0,0)'
  }
  setTimeout(() => {
    mode.value = mode
    showAdvice.value = !showAdvice.value
    showAdviceFruit.value = !showAdviceFruit.value
  }, 80)

  setTimeout(() => {
    // if (cur < total) {
    // }
  }, 300)
}

function aniFruit(mode: any, mask: any) {
  if (mask) {
    adviceModalStylesFruit.value.backgroundColor = 'rgba(0,0,0,0.3)'
  } else {
    adviceModalStylesFruit.value.backgroundColor = 'rgba(0,0,0,0)'
  }
  setTimeout(() => {
    mode.value = mode
    showAdviceFruit.value = !showAdviceFruit.value
  }, 80)

  setTimeout(() => {
    // if (cur < total) {
    // }
  }, 300)
}

function aniInput(mode: any, mask: any) {
  if (mask) {
    styleInput.value.backgroundColor = 'rgba(0,0,0,0.3)'
  } else {
    styleInput.value.backgroundColor = 'rgba(0,0,0,0)'
  }
  setTimeout(() => {
    modeInput.value = mode
    showInput.value = !showInput.value
  }, 80)
}

function aniImage(mode: any, mask: any) {
  modelImage.value = mode
  showImage.value = !showImage.value
}

// logic Function
function handleCountAdd(item: any) {
  // console.log(item, 'Add')
  analyseImageRes.value.forEach((element) => {
    if (element.id === item.id) {
      element.count += 5
      // console.log(analyseImageRes.value, 'analyseImageRes')
    }
  })
}
function handleCountDown(item: any) {
  analyseImageRes.value.forEach((element) => {
    if (element.id === item.id) {
      element.count -= 5
    }
  })
}
function navigateToAdvice() {
  uni.navigateTo({
    url: '/pages/advice/index'
  })
}

function handleClickRecordMyself() {
  if (showAdvice.value) {
    ani(['fade'], true)
  }
  setTimeout(() => {
    aniInput(['fade'], true)
  }, 400)
}

function handleCancelInput() {
  aniInput(['fade'], true)
  setTimeout(() => {
    if (!showAdvice.value) {
      ani(['fade'], true)
    }
  }, 800)
}

function handleCancelUploadImage() {
  aniImage(['fade'], true)
  setTimeout(() => {
    if (!showAdvice.value) {
      ani(['fade'], true)
    }
  }, 800)
}

// v-show Fuction
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

init()
</script>

<template>
  <view class="container flex h-[100vh] flex-col" blurEffect="light">
    <fui-toast ref="toast"></fui-toast>
    <view v-show="!showImage">
      <view
        class="flex items-center justify-center pt-20 text-3xl font-bold"
        style="color: rgba(0, 0, 0, 0.7)">
        智膳生活
      </view>
      <!-- subtitle -->
      <view
        class="flex items-center justify-center pt-2 text-xl font-bold"
        style="color: rgba(0, 0, 0, 0.7)">
        为您提供健康饮食建议
      </view>
    </view>

    <view class="pt-6">
      <swiper circular class="h-96">
        <!-- normal -->
        <swiper-item>
          <fui-animation
            :duration="500"
            :animationType="mode"
            :show="showAdvice"
            :styles="adviceModalStyles">
            <view
              v-if="renderData"
              @click="navigateToAdvice"
              class="foodContainer m-4 box-border flex w-full flex-col gap-4 rounded-xl p-4 opacity-90 shadow-md">
              <!-- Header -->
              <view class="flex justify-between">
                <view
                  class="py-2 text-xl font-bold"
                  style="color: rgba(0, 0, 0, 0.8)">
                  {{ renderData.name }}
                  <view style="font-size: 14px">(每百克)</view>
                </view>
                <view>
                  <a
                    href="#"
                    class="inline-flex items-center rounded-lg bg-orange-400 px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    智能推荐
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
                      {{ renderData.zhifang }}/{{ recommandInfo.zhifang }}克
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
                        {{ renderData.danbai }}/{{ recommandInfo.danbai }}克
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
                      {{ renderData.tanshui }}/{{ recommandInfo.tanshui }}克
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
        </swiper-item>
        <!-- TODO: fruit -->
        <swiper-item>
          <fui-animation
            @click="navigateToAdvice"
            :duration="500"
            :animationType="mode"
            :show="showAdviceFruit"
            :styles="adviceModalStylesFruit">
            <view
              v-if="renderDataFruit"
              class="fruitContainer m-4 box-border flex w-full flex-col gap-4 rounded-xl p-4 opacity-90 shadow-md">
              <!-- Header -->
              <view class="flex justify-between">
                <view
                  class="py-2 text-xl font-bold"
                  style="color: rgba(0, 0, 0, 0.8)">
                  {{ renderDataFruit.name }}
                  <view style="font-size: 14px">(每百克)</view>
                </view>

                <view>
                  <a
                    href="#"
                    class="inline-flex items-center rounded-lg bg-[#ffaf2d] px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    智能推荐
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
                    <span>热量</span>
                    <span class="text-sm opacity-60">
                      <span v-if="renderDataFruit.reliang">
                        {{ renderDataFruit.reliang }}
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
                      :percent="progressZhifangFruit"
                      stroke-width="15"
                      border-radius="6"
                      activeColor="#037f8f" />
                  </view>
                </view>
                <view
                  class="flex flex-col gap-2"
                  v-if="renderDataFruit.danbai && recommandInfo.danbai">
                  <view class="flex items-center justify-between">
                    <span>蛋白</span>
                    <span class="text-sm opacity-60">
                      <span class="text-sm opacity-60">
                        {{ renderDataFruit.danbai }}/{{
                          recommandInfo.danbai
                        }}千卡
                      </span>
                    </span>
                  </view>
                  <view class="pt-2">
                    <progress
                      :percent="progressDanbaiFruit"
                      stroke-width="15"
                      border-radius="6"
                      activeColor="#94b7c6" />
                  </view>
                </view>
                <view
                  class="flex flex-col gap-2"
                  v-if="renderDataFruit.tanshui && recommandInfo.tanshui">
                  <view class="flex items-center justify-between">
                    <span>碳水</span>
                    <span class="text-sm opacity-60">
                      {{ renderDataFruit.tanshui }}/{{
                        recommandInfo.tanshui
                      }}千卡
                    </span>
                  </view>
                  <view class="pt-2">
                    <progress
                      :percent="progressTanshuiFruit"
                      stroke-width="15"
                      border-radius="6"
                      activeColor="#037f8f" />
                  </view>
                </view>
              </view>
            </view>
          </fui-animation>
        </swiper-item>
      </swiper>
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
          @click="handleClickRecordMyself"
          class="border-[#185864 flex w-[150px] items-center justify-center gap-2 rounded-3xl border font-bold text-[#6fb23a]">
          <view
            class="flex h-[22px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="#185864" type="medal" size="30"></u-icons>
          </view>
          <view class="text-[#185864]">手动记录</view>
        </button>
      </view>
    </view>

    <fui-animation
      :duration="500"
      :animationType="mode"
      :styles="styleInput"
      :show="showInput">
      <view class="flex flex-col gap-2 pb-8">
        <view class="flex items-center justify-center">
          <fui-input
            label="食品"
            borderTop
            v-model="foodInputValue.foodName"
            placeholder="输入食品的名称"></fui-input>
        </view>

        <view class="flex items-center justify-center">
          <fui-input
            label="重量"
            borderTop
            v-model="foodInputValue.foodWeight"
            placeholder="输入食品的重量(g)"></fui-input>
          <!-- <fui-button width="60px" @click="handleCancelInput">取消</fui-button>
          <fui-button
            width="60px"
            background="#f9a647"
            class="pt-1"
            @click="handleRecordMyself">
            添加
          </fui-button> -->
        </view>
        <view class="flex justify-between">
          <button
            @click="handleRecordMyself"
            class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#f9a647] text-white">
            <view>添加</view>
          </button>
          <!-- <fui-button width="60px" @click="handleCancelUploadImage">
            取消
          </fui-button> -->
          <button
            @click="handleCancelInput"
            class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#f9a647] text-white">
            取消
          </button>
        </view>
      </view>
    </fui-animation>

    <!-- TODO: showImage  最后上传-->
    <fui-animation
      :duration="500"
      :animationType="mode"
      :styles="styleImage"
      :show="showImage">
      <view class="flex flex-col items-center justify-center pb-20">
        <image
          lazy-load="true"
          :src="uploadImageSrc"
          class="h-45 w-80 rounded-xl shadow-md"></image>

        <view class="flex flex-col gap-2 pt-4">
          <view
            class="flex items-center justify-end gap-4 pr-4 opacity-90"
            :key="item.id"
            v-for="item in analyseImageRes">
            <view class="text-xl font-semibold" style="color: white">
              {{ item.name }}
            </view>
            <view
              class="flex items-center justify-center gap-1 rounded-xl bg-white shadow-xl">
              <view
                class="border-1 rounded-l-xl bg-white p-1"
                @click="handleCountDown(item)">
                <u-icons type="left" size="25"></u-icons>
              </view>
              <view class="border-1 p-1 text-xl">
                {{ item.count }}
              </view>
              <view
                class="border-1 rounded-r-xl bg-white p-1"
                @click="handleCountAdd(item)">
                <u-icons type="right" size="25"></u-icons>
              </view>
            </view>
            <span class="text-xl font-semibold" style="color: white">克</span>
          </view>
        </view>

        <!-- TODO: 拍照 -->
        <view class="mt-5 flex items-center justify-center gap-2">
          <button
            @click="handlePostAnalyseData"
            class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#f9a647] text-white">
            <view>提交</view>
          </button>
          <!-- <fui-button width="60px" @click="handleCancelUploadImage">
            取消
          </fui-button> -->
          <button
            @click="handleCancelUploadImage"
            class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#f9a647] text-white">
            取消
          </button>
        </view>
      </view>
    </fui-animation>
  </view>
</template>

<style>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'); */
  background-image: url('http://129.204.224.187:8080/back3.png');
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

.fruitContainer {
  /* background-image: url('https://images.pexels.com/photos/1028598/pexels-photo-1028598.jpeg?auto=compress&cs=tinysrgb&w=600'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgb(255, 255, 255);
  /* opacity: 0.9; */
}

.foodContainer {
  /* background-image: url('https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&w=400'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgb(255, 255, 255);
  /* opacity: 0.9; */
}
</style>
