<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import Popup from '@/components/index/Popup.vue'
import Line from '@/components/notebook/Line.vue'

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
      uploadImage(tempFilePaths)
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
      uploadImage(tempFilePaths)
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
function commonUploadFoodInfo(foodId: any, type: string) {
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

function aniFruit(mode: any, mask: any) {
  // if (mask) {
  //   adviceModalStylesFruit.value.backgroundColor = 'rgba(0,0,0,0.6)'
  // } else {
  //   adviceModalStylesFruit.value.backgroundColor = 'rgba(0,0,0,0)'
  // }
  setTimeout(() => {
    mode.value = mode
    showAdviceFruit.value = !showAdviceFruit.value
  }, 80)

  setTimeout(() => {
    // if (cur < total) {
    // }
  }, 300)
}

function handleEating() {
  commonUploadFoodInfo(recommandData.value[curPage.value].foodId, 'food')
}

function handleEatingFruit() {
  commonUploadFoodInfo(recommandDataFruit.value[curPage.value].foodId, 'fruit')
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

const styleInput = ref({
  width: '100%',
  height: '80px',
  marginTop: '75vh'
})

const modeInput = ref(['fade'])

const showInput = ref(false)
function aniInput(mode: any, mask: any) {
  setTimeout(() => {
    modeInput.value = mode
    showInput.value = !showInput.value
  }, 80)
}

const foodInputValue = ref({
  foodName: '',
  foodWeight: ''
})
function handleRecord() {
  const percent = foodInputValue.value.foodWeight / 100
  // nutrition/search
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/nutrition/search',
    method: 'GET',
    data: {
      query: foodInputValue.value.foodName
    },
    success: (res: any) => {
      console.log(res.data.data)
      if (res.data.data.length === 0) {
        return
      }

      const itemKey = Object.keys(res.data.data)[0]
      const itemName = res.data.data[itemKey]
      console.log(itemName, 'itemName')
      // 根据Id获取 item 信息

      // /nutrition/food
      uni.request({
        url: import.meta.env.VITE_BASE_API + `/nutrition/food`,
        method: 'GET',
        data: {
          foodName: itemName
        },
        success: (res: any) => {
          const item = res.data.data
          console.log(item, 'item')

          uni.request({
            url: import.meta.env.VITE_BASE_API + '/record/foods',
            method: 'POST',
            data: [
              {
                userId: 1,
                foodId: item.id,
                recordTime: formatTime(new Date()),
                danbai: item.danbai * percent,
                danguchun: item.danguchun * percent,
                gai: item.gai * percent,
                huluobosu: item.huluobosu * percent,
                jia: item.jia * percent,
                lin: item.lin * percent,
                mei: item.mei * percent,
                meng: item.meng * percent,
                na: item.na * percent,
                reliang: item.reliang * percent,
                tanshui: item.tanshui * percent,
                tie: item.tie * percent,
                tong: item.tong * percent,
                va: item.va * percent,
                vc: item.vc * percent,
                ve: item.ve * percent,
                xi: item.xi * percent,
                xianwei: item.xianwei * percent,
                xin: item.xin * percent,
                yansuan: item.yansuan * percent
              }
            ],
            success: (res: any) => {
              // console.log(res)
              showToast()

              aniInput(['fade'], true)

              setTimeout(() => {
                if (!showAdvice.value) {
                  ani(['fade'], true)
                }
              }, 800)
            }
          })
        }
      })
    }
  })
}

const showImage = ref(false)
const styleImage = ref({
  width: '100%'
})
const modelImage = ref(['fade'])
function aniImage(mode: any, mask: any) {
  modelImage.value = mode
  showImage.value = !showImage.value
}

const uploadImageSrc = ref()
const analyseImageRes = ref()

function uploadImage(tempFilePaths) {
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
        item.count = 100
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

function handleUpload() {
  // console.log('upload')
  // console.log(analyseImageRes.value, 'analyseImageRes')

  analyseImageRes.value.forEach((item) => {
    const percent = item.count / 100

    uni.request({
      url: import.meta.env.VITE_BASE_API + '/record/foods',
      method: 'POST',
      data: [
        {
          userId: 1,
          foodId: item.id,
          recordTime: formatTime(new Date()),
          danbai: item.danbai * percent,
          danguchun: item.danguchun * percent,
          gai: item.gai * percent,
          huluobosu: item.huluobosu * percent,
          jia: item.jia * percent,
          lin: item.lin * percent,
          mei: item.mei * percent,
          meng: item.meng * percent,
          na: item.na * percent,
          reliang: item.reliang * percent,
          tanshui: item.tanshui * percent,
          tie: item.tie * percent,
          tong: item.tong * percent,
          va: item.va * percent,
          vc: item.vc * percent,
          ve: item.ve * percent,
          xi: item.xi * percent,
          xianwei: item.xianwei * percent,
          xin: item.xin * percent,
          yansuan: item.yansuan * percent
        }
      ],
      success: (res: any) => {}
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

// TODO: renderDataFruit
const renderDataFruit = ref()
const showAdviceFruit = ref(true)
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

const adviceModalStylesFruit = ref({
  // width
  width: '100%',
  // height
  height: '350px'
})

const recommandDataFruit = ref({
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

async function getRecommodDataFruit() {
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
      `/analyse/recommand/fruit/1/${testFormattedDate}`,
    method: 'GET',
    success: (res: any) => {
      // console.log(res.data.data)
      recommandDataFruit.value = res.data.data
      if (!recommandData.value) {
        return
      }
      renderDataFruit.value = recommandDataFruit.value[0]
      // console.log(renderData.value, 'renderData')
    }
  })
}

getRecommodDataFruit()
</script>

<template>
  <view class="container flex h-[100vh] flex-col" blurEffect="light">
    <fui-toast ref="toast"></fui-toast>

    <view class="pt-36">
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
        </swiper-item>
        <!-- TODO: fruit -->
        <swiper-item>
          <fui-animation
            :duration="500"
            :animationType="mode"
            :show="showAdviceFruit"
            :styles="adviceModalStylesFruit">
            <view
              v-if="renderDataFruit"
              class="fruitContainer m-4 box-border flex w-full flex-col gap-4 rounded-xl p-4 shadow-md">
              <!-- Header -->
              <view class="flex justify-between">
                <view class="py-2 text-xl font-bold">
                  {{ renderDataFruit.name }}
                </view>

                <view>
                  <a
                    @click="handleEatingFruit"
                    href="#"
                    class="inline-flex items-center rounded-lg bg-[#ffaf2d] px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
        <swiper-item>
          <view
            class="m-4 box-border flex w-[90%] flex-col gap-4 rounded-xl bg-white p-4 opacity-90 shadow-md">
            <!-- Header -->
            <view class="flex justify-between">
              <view class="py-2 text-xl font-bold">图表</view>
            </view>
            <Line></Line>
          </view>
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
          @click="aniInput(['fade'], true)"
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
            placeholder="输入食品的重量"></fui-input>
          <fui-button width="60px" background="#f9a647" @click="handleRecord">
            添加
          </fui-button>
        </view>
      </view>
    </fui-animation>

    <!-- TODO: showImage  -->
    <fui-animation
      :duration="500"
      :animationType="mode"
      :styles="styleImage"
      :show="showImage">
      <view class="flex flex-col items-center justify-center pb-20">
        <image
          lazy-load="true"
          :src="uploadImageSrc"
          class="h-60 w-60 rounded-xl shadow-md"></image>

        <view class="flex flex-col gap-2 pt-4">
          <view
            class="flex items-center justify-end gap-4 pr-4 opacity-90"
            :key="item.id"
            v-for="item in analyseImageRes">
            <view>{{ item.name }}</view>
            <view
              class="flex items-center justify-center gap-1 rounded-xl shadow-xl">
              <view
                class="border-1 rounded-l-xl bg-white p-2 shadow-xl"
                @click="handleCountDown(item)">
                <u-icons type="left" size="25"></u-icons>
              </view>
              <view class="border-1 bg-white p-2 text-xl">
                {{ item.count }}
              </view>
              <view
                class="border-1 rounded-r-xl bg-white p-2 shadow-xl"
                @click="handleCountAdd(item)">
                <u-icons type="right" size="25"></u-icons>
              </view>
            </view>
          </view>
        </view>

        <!-- TODO: 拍照 -->
        <button
          @click="handleUpload"
          class="photo mr-14 mt-5 flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#f9a647] text-white">
          <view>提交</view>
        </button>
      </view>
    </fui-animation>
  </view>
</template>

<style>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.pexels.com/photos/302457/pexels-photo-302457.jpeg?auto=compress&cs=tinysrgb&w=400');
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
  background-image: url('https://images.pexels.com/photos/1028598/pexels-photo-1028598.jpeg?auto=compress&cs=tinysrgb&w=600');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9;
}
</style>
