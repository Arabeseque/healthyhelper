<template>
  <view class="charts-box">
    <qiun-data-charts
      type="column"
      :opts="opts"
      :chartData="chartData"
      :canvas2d="true"
      canvasId="ypYdoAedYKLsyuSLkGGFJfUrcpvBImQV" />
  </view>
</template>

<script setup lang="ts">
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
    url: import.meta.env.VITE_BASE_API + '/user/index/getBestData',
    method: 'POST',
    data: {
      userId
    },
    success: (res) => {
      if (res.data.code === 200) {
        bestData.value = {
          categories: Object.keys(res.data.data.slice(0, 7)).map((item) => {
            return item
          }),
          series: [
            {
              name: '热量',
              data: Object.values(res.data.data.slice(0, 7)).map((item) => {
                return item
              })
            }
          ]
        }
      }
    }
  })
}

function init() {
  // getChartData()
  getBestData()
}
init()
const opts = {
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
  padding: [15, 15, 0, 5],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true
  },
  yAxis: {
    data: [
      {
        min: 0
      }
    ]
  },
  extra: {
    column: {
      type: 'group',
      width: 30,
      activeBgColor: '#000000',
      activeBgOpacity: 0.08
    }
  }
}
</script>
