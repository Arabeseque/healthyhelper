<template>
  <view>
    <view class="flex items-center justify-center p-4 text-2xl font-bold">
      智能推荐
    </view>
    <adviceChart :chartData="chartData" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import adviceChart from './adviceChart.vue'

interface ChartData {
  categories: string[]
  series: {
    name: string
    data: number[]
  }[]
}

// union Data
const userId = 1

// TODO: chart Fuction
const chartData = ref({})
const bestData = ref<ChartData>({
  categories: [],
  series: []
})

// function getChartData() {
//   chartData.value = {
//     categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
//     series: [
//       {
//         name: '当前添加量',
//         data: [70, 40, 65, 100, 34, 18, 30]
//       },
//       {
//         name: '目标值',
//         data: [15, 30, 45, 20, 34, 70, 30]
//       }
//     ]
//   }
// }

// 获取目标值
function getBestData() {
  // @ts-ignore
  uni.request({
    // @ts-ignore
    url: import.meta.env.VITE_BASE_API + `/user/bestNutrition/${userId}`,
    method: 'GET',
    success: (res) => {
      console.log(res.data.data, 'bestData')
      const danbai = res.data.data.danbai
      const tanshui = res.data.data.tanshui
      const zhifang = res.data.data.zhifang
      bestData.value = {
        categories: ['蛋白质', '碳水化合物', '脂肪'],
        series: [
          {
            name: '目标值',
            data: [30, 40, 50]
          }
        ]
      }
    },
    fail: (err) => {
      console.log(err, 'err')
    }
  })
}

function init() {
  // getChartData()
  getBestData()
}
init()
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
