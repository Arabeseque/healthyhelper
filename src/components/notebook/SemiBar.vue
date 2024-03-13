<template>
  <view class="charts-box">
    <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script setup lang="ts">
const chartData = computed(() => {
  return {
    series: [
      {
        name: 'danbai',
        data: summaryData.value.danbai / recommendData.value.danbai
      },
      {
        name: 'zhifang',
        data: summaryData.value.zhifang / recommendData.value.zhifang
      },
      {
        name: 'tanshui',
        data: summaryData.value.tanshui / recommendData.value.tanshui
      }
    ]
  }
})

const opts = {
  color: ['#FAC858', '#EE6666', '#73C0DE'],
  padding: undefined,
  title: {
    name: '活力指标',
    fontSize: 8,
    color: '#1890ff'
  },
  subtitle: {
    name: '营养水平',
    fontSize: 4,
    color: '#666666'
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
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' //自定义请求头信息
    },
    success: (res) => {
      summaryData.value = res.data.data
      console.log(summaryData.value, 'summaryData')
    }
  })
}
getTableData({
  url: '/record/summary/today/1',
  method: 'GET'
})

const recommendData = ref({})
function getRecommodTableData(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' //自定义请求头信息
    },
    success: (res) => {
      recommendData.value = res.data.data
      console.log(recommendData.value, 'recommendData')
    }
  })
}

// sum of remommendData
const recommendTotal = computed(() => {
  return Object.values(recommendData.value).reduce((acc, cur) => acc + cur, 0)
})

getTableData({
  url: '/record/summary/today/1',
  method: 'GET'
})

getRecommodTableData({
  url: '/user/bestNutrition/1',
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
