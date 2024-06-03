<template>
  <view class="charts-box">
    <qiun-data-charts
      type="line"
      :opts="opts"
      :chartData="chartData"
      :inScrollView="true"
      :pageScrollTop="pageScrollTop"
      :canvas2d="true"
	    canvasId="swiperHeatLine"
       />
  </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
// const userId = userStore.userid

// 折线图
const opts = ref({
  color: [
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
    '#1890FF'
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
      activeType: 'none'
    },
    // 标记线
    markLine: {
      type: 'solid',
      dashLength: 4,
      data: []
    }
  }
})

onShow(() => {
  setTimeout(() => {
    getTableData({
      url: '/record/energys/' + userStore.userid,
      method: 'GET'
    })
  }, 500)
})

const chartData = ref()

const data = ref()

// setTimeout(() => {
//   getTableData({
//     url: '/record/energys/' + userStore.userid,
//     method: 'GET'
//   })
// }, 100)

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
      data.value = res.data.data.slice(0, 6).reverse()

      var arr = []
      for (var item in data.value) {
        arr.push(
          data.value[item].date.split(' ')[0].split('-')[1] +
            '-' +
            data.value[item].date.split(' ')[0].split('-')[2]
        )
      }
      if (!data.value) return

      chartData.value = {
        categories: arr,
        series: [
          {
            name: '热量',
            data: Object.keys(data.value).map((item) => {
              return data.value[item].reliang
            })
          }
        ]
      }
      // console.log(data.value,"dataValue")
      // console.log(userStore.userid,"userStore.userid")
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
