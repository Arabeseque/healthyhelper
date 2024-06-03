<template>
  <view class="charts-box">
    <qiun-data-charts
      :inScrollView="true"
      :pageScrollTop="pageScrollTop"
      type="line"
      :opts="opts"
      :chartData="chartData"
      :canvas2d="true" 
      canvasId="line"
      :ontap="false"
      :onmouse="false"
      />
  </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

// 折线图
const opts = ref({
  color: [
    '#F5D066',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc'
  ],
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2
  },
  extra: {
    line: {
      type: 'curve',
      width: 2,
      // activeType: 'none',
    }
  }
})

const chartData = ref()
const weightData = ref()

onShow(() => {
  getTableData({
    url: '/user/weights/' + userId,
    method: 'GET'
  })
})

setTimeout(() => {
  getTableData({
    url: '/user/weights/' + userId,
    method: 'GET'
  })
  // console.log('Delayed log after 1000ms')
}, 100)

function getTableData(params) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
    },
    success: (res) => {
      weightData.value = res.data.data.slice(0, 6).reverse()

      console.log(weightData.value, 'data')

      var weightArr = []
      for (var item in weightData.value) {
        weightArr.push(
          weightData.value[item].recordTime.split(' ')[0].split('-')[1] +
            '-' +
            weightData.value[item].recordTime.split(' ')[0].split('-')[2]
        )
      }

      console.log(weightArr, 'weightArr')

      if (!weightData.value) return

      chartData.value = {
        categories: weightArr,
        series: [
          {
            name: '体重',
            data: Object.keys(weightData.value).map((item) => {
              return weightData.value[item].recordWeight
            })
          }
        ]
      }

      // console.log(weightArr, 'data')
      // console.log(2222)
    }
  })
}
</script>

<style scoped>
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
