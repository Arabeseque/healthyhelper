<template>
  <view class="charts-box">
    <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script setup lang="ts">
const chartData = ref({
  // series: [
  //   {
  //     name: 'danbai',
  //     data: 0.5
  //   },
  //   {
  //     name: 'zhifang',
  //     data: 0
  //   },
  //   {
  //     name: 'tanshui',
  //     data: 0
  //   }
  // ]
})

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
function getTableData(params: any) {
  setTimeout(function () {
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
  }, 100)
}

// 获取用户目标
const planData = ref({})
function getPlanTableData(params: any) {
  setTimeout(function () {
    uni.request({
      url: import.meta.env.VITE_BASE_API + params.url,
      method: params.method,
      data: params.params ? params.params : {},
      header: {
        token:
          'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
      },
      success: (res) => {
        planData.value = res.data.data
        console.log(planData.value, 'planData')
      }
    })
  }, 100)
}

getTableData({
  url: '/record/summary/today/1',
  method: 'GET'
})

getPlanTableData({
  url: '/user/plan/1',
  method: 'GET'
})
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
