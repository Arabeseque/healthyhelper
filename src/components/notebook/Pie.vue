<template>
  <view class="charts-box">
    <qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script setup>
// import { getTableDataApi } from '@/api/table'

const opts = ref({
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc'
  ],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF'
    }
  }
})

const chartData = ref()

function getTableData(params) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' //自定义请求头信息
    },
    success: (res) => {
      if (!res.data.data) return
      console.log(res, 'Pie')
      console.log(res.data.data, 'Pie.data.data')

      chartData.value = {
        series: [
          {
            data: Object.keys(res.data.data).map((key) => ({
              name: key,
              value: res.data.data[key]
            }))
          }
        ]
      }

      console.log(chartData.value, 'charData.value')
      // chartData = res.data.data
    }
  })
}

getTableData({
  url: '/record/summary/today/1',
  method: 'GET'
})
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
