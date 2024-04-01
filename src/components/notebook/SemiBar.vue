<template>
  <view class="charts-box">
    <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid


const chartData = ref({})

const opts = {
  color: ['#185864', '#f9a647', '#73C0DE'],
  padding: undefined,
  title: {
    name: ' ',
    fontSize: 8,
    color: '#1890ff'
  },
  subtitle: {
    name: ' ',
    fontSize: 4,
    color: '#e2dbd0'
  },
  extra: {
    arcbar: {
      type: 'circle',
      width: 20,
      backgroundColor: '#E9E9E9',
      startAngle: 1.5,
      endAngle: 0.25,
      gap: 2
    }
  }
}

// TODO: summary data
const summaryData = ref({})

function getSummaryData(params: any) {
  return new Promise(() => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + params.url,
      method: params.method,
      data: params.params ? params.params : {},
      header: {
        token:
          'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
      },
      success: (res) => {
        summaryData.value = res.data.data

        if (summaryData.value.danbai >= planData.value.danbai)
          summaryData.value.danbai = planData.value.danbai
        if (summaryData.value.zhifang >= planData.value.zhifang)
          summaryData.value.zhifang = planData.value.zhifang
        if (summaryData.value.tanshui >= planData.value.tanshui)
          summaryData.value.tanshui = planData.value.tanshui

        // console.log(summaryData.value, planData.value, "chartTest")
        chartData.value.series = [
          {
            name: 'danbai',
            data: summaryData.value.danbai / planData.value.danbai
          },
          {
            name: 'zhifang',
            data: summaryData.value.zhifang / planData.value.zhifang
          },
          {
            name: 'tanshui',
            data: summaryData.value.tanshui / planData.value.tanshui
          }
        ]
        // console.log(summaryData.value, 'summaryData')
        // console.log(chartData.value, 'success Data')
      }
    })
  })
}

function getPlanData(params: any) {
  return new Promise((resolve) => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + params.url,
      method: params.method,
      data: params.params ? params.params : {},
      header: {
        token:
          'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
      },
      success: (res) => {
        const tempPlanData = res.data.data
        resolve(tempPlanData)
        // console.log(planData.value, 'planData')
      }
    })
  })
}

// 获取用户目标
const planData = ref({})

async function init() {
  getPlanData({
  url: '/user/plan/' + userId,
  method: 'GET'
}).then((tempPlanData) => {
  planData.value = tempPlanData
  getSummaryData({
  url: '/record/summary/today/' + userId,
  method: 'GET'
})
  })
}

init()
// getTableData({
//   url: '/record/summary/today/1',
//   method: 'GET'
// })

// getPlanTableData({
//   url: '/user/plan/1',
//   method: 'GET'
// })
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
