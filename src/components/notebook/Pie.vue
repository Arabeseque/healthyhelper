<template>
  <view class="charts-box">
    <qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script setup>
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
      activeType: 'hollow'
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
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
    },
    success: (res) => {
      if (!res.data.data) return

      chartData.value = {
        categories: Object.keys(res.data.data.slice(0, 7)).map((item) => {
          return (
            res.data.data[item].recordTime.split(' ')[0].split('-')[1] +
            '-' +
            res.data.data[item].recordTime.split(' ')[0].split('-')[2]
          )
        }),
        series: [
          {
            name: '体重',
            data: Object.keys(res.data.data.slice(0, 7)).map((item) => {
              return res.data.data[item].recordWeight
            })
          }
        ]
      }
    }
  })
}

getTableData({
  url: '/user/weights/1',
  method: 'GET'
})
</script>

<style scoped>
.charts-box {
  width: 100%;
  /* height: 300px; */
}
</style>
