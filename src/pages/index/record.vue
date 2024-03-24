<template>
  <view class="gap-2 p-2">
    <fui-input
      borderTop
      placeholder="早上 / 中午 / 晚上"
      label="时间"
      v-model="time"></fui-input>
    <fui-input
      borderTop
      placeholder="食品名称"
      label="食品"
      v-model="foodName"></fui-input>
  </view>
</template>

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
</script>
