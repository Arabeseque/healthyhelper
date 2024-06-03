<template>
  <view class="flex flex-col items-center justify-center bg-[#9dc9b6]">
    <view class="flex items-center justify-center p-8 text-2xl font-bold">
      饮食配置助手
    </view>

    <view
      class="charts-box box-border flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartData"
        :canvas2d="true"
        canvasId="ypYdoAedYKLsyuSLkGGFJfUrcpvBImQV" />
    </view>

    <view class="border opacity-10"></view>

    <view class="py-2"></view>

    <view
      class="color-white flex w-full items-center justify-start px-6 py-2 text-xl font-semibold">
      正餐
    </view>

    <view
      class="color-white text-md flex w-full items-center justify-start px-6 pb-2">
      推荐食品单位 (g)
    </view>

    <view
      class="charts-box box-border flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
      <checkbox-group @change="handleCheckChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in recommandData"
          :key="item.foodId">
          <view class="flex items-center justify-between p-2">
            <view class="flex flex-col gap-1">
              <view>
                {{ item.name }}
              </view>
              <view v-if="item.alert" class="text-sm italic text-red-400">
                {{ item.alert }}
              </view>
            </view>
            <view class="flex items-center justify-center gap-1 rounded-xl">
              <view
                class="border-1 rounded-l-xl bg-white p-2"
                @click="handleCountDown(item)">
                <u-icons type="left" size="20" ></u-icons>
              </view>
              <view class="border-1 bg-white p-2 text-xl">
                {{ item.count }}
              </view>
              <view
                class="border-1 rounded-r-xl bg-white p-2"
                @click="handleCountAdd(item)">
                <u-icons type="right" size="20" ></u-icons>
              </view>
            </view>
          </view>
        </label>
      </checkbox-group>
    </view>

    <view class="py-2"></view>

    <view
      class="color-white flex w-full items-center justify-start px-6 py-2 text-xl font-semibold">
      水果
    </view>

    <view
      class="color-white text-md flex w-full items-center justify-start px-6 pb-2">
      推荐食品单位 (g)
    </view>

    <view
      class="charts-box box-border flex flex-col gap-4 rounded-xl bg-white p-4">
      <checkbox-group @change="handleCheckChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in recommandDataFruit"
          :key="item.foodId">
          <view class="flex items-center justify-between p-2">
            <view class="flex flex-col gap-1">
              <view>
                {{ item.name }}
              </view>
              <view v-if="item.alert" class="text-sm italic text-red-400">
                {{ item.alert }}
              </view>
            </view>
            <view class="flex items-center justify-center gap-1 rounded-xl">
              <view
                class="border-1 rounded-l-xl bg-white p-2"
                @click="handleCountDownFruit(item)">
                <u-icons type="left" size="20" ></u-icons>
              </view>
              <view class="border-1 bg-white p-2 text-xl">
                {{ item.count }}
              </view>
              <view
                class="border-1 rounded-r-xl bg-white p-2"
                @click="handleCountAddFruit(item)">
                <u-icons type="right" size="20"></u-icons>
              </view>
            </view>
          </view>
        </label>
      </checkbox-group>
    </view>


    <view>
      <button
        class="mt-4 w-[380px] rounded-lg py-2 text-white bg-orange-400"
        @click="handleToDetail">
        重置
      </button>
    </view>

    <view class="py-2"></view>

  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import { ref } from 'vue'

interface ChartData {
  categories: string[]
  series: {
    name: string
    data: number[]
  }[]
}

// union Data

const userId = useUserStore().userid

// TODO: chart Fuction
const chartData = ref<ChartData>({
  categories: [],
  series: []
})

const currentDataFoodId = ref([])
const recommandData = ref<any>([])
const recommandDataFruit = ref([])

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

// 获取目标值
function getBestData() {
  return new Promise(() => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + `/user/bestNutrition/${userId}`,
      method: 'GET',

      success: (res: any) => {
        if (res.data.code === 200) {
          chartData.value = {
            categories: ['蛋白', '碳水', '热量'],
            series: [
              {
                name: '推荐值',
                data: [
                  res.data.data.danbai ,
                  res.data.data.tanshui ,
                  res.data.data.reliang
                ]
              },
              {
                name:'当前添加量',
                data:[0,0,0]
              }
            ]
          }
        }
      }
    })
  })
}

function getRecommodData() {
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
  // const tempDate = '2024-03-21'

  uni.request({
    url:
      import.meta.env.VITE_BASE_API +
      `/analyse/recommand/food/${userId}/${formattedDate}`,
    method: 'GET',
    success: (res: any) => {
      // console.log(res.data.data)
      res.data.data.forEach((item: any) => {
        item.count = 0
      })
      recommandData.value = res.data.data
      console.log(res.data.data, 'recommondData')
    }
  })
}

function getRecommodDataFruit() {
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
  const tempDate = '2024-03-21'

  uni.request({
    url:
      import.meta.env.VITE_BASE_API +
      `/analyse/recommand/fruit/${userId}/${formattedDate}`,
    method: 'GET',
    success: (res: any) => {
      res.data.data.forEach((item: any) => {
        item.count = 0
      })
      // console.log(res.data.data)
      recommandDataFruit.value = res.data.data
    }
  })
}

// 场景函数
function handleCheckChange(e: any) {
  console.log('checkbox change', e.detail.value)
  const checkedValue = e.detail.value
  currentDataFoodId.value = checkedValue
}

function handleCountAdd(item: any) {
  // console.log(item, 'Add')
  recommandData.value.forEach((element: any) => {
    if (element.id === item.id) {
      element.count += 50
    }
  })
  handleUpdateChart()
}
function handleCountDown(item: any) {
  recommandData.value.forEach((element: any) => {
    if (element.id === item.id) {
      if (element.count === 0) {
        return
      }
      element.count -= 50
    }
  })
  handleUpdateChart()
}

function handleCountAddFruit(item: any) {
  // console.log(item, 'Add')
  recommandDataFruit.value.forEach((element: any) => {
    if (element.id === item.id) {
      element.count += 50
    }
  })
  handleUpdateChart()
}
function handleCountDownFruit(item: any) {
  recommandDataFruit.value.forEach((element: any) => {
    if (element.id === item.id) {
      if (element.count === 0) {
        return
      }
      element.count -= 50
    }
  })
  handleUpdateChart()
}

function handleToDetail() {

  uni.showToast({
          title: '重置成功',
          icon: 'none'
        })
  setTimeout(()=>{
    recommandData.value.forEach((element: any) => {
    element.count = 0
  })
  recommandDataFruit.value.forEach((element: any) => {
    element.count = 0
  })
  
  handleUpdateChart()
  },500)
  
}

function handleUpdateChart() {
  if (chartData.value.series.length > 1) {
    chartData.value.series.pop()
  }

  const tempUsedRecommandData = recommandData.value.filter((item: any) => {
    return item.count !== 0
  })

  console.log(tempUsedRecommandData.value, 'tempRecommendData')

  const tempUsedRecommandDataFruit = recommandDataFruit.value.filter(
    (item: any) => {
      return item.count !== 0
    }
  )

  chartData.value.series.push({
    name: '当前添加量',
    data: [
      tempUsedRecommandData.reduce((acc, cur: any) => {
        return acc + cur.danbai * (cur.count / 100)
      }, 0) +
        tempUsedRecommandDataFruit.reduce((acc, cur: any) => {
          return acc + cur.danbai * (cur.count / 100)
        }, 0),
      tempUsedRecommandData.reduce((acc, cur: any) => {
        return acc + cur.tanshui * (cur.count / 100)
      }, 0) +
        tempUsedRecommandDataFruit.reduce((acc, cur: any) => {
          return acc + cur.tanshui * (cur.count / 100)
        }, 0),
      tempUsedRecommandData.reduce((acc, cur: any) => {
        return acc + cur.reliang * (cur.count / 100)
      }, 0) +
        tempUsedRecommandDataFruit.reduce((acc, cur: any) => {
          return acc + cur.reliang * (cur.count / 100)
        }, 0)
    ]
  })
}

function init() {
  // 获取推荐数据
  getRecommodData()
  getRecommodDataFruit()
  // 图标渲染
  getBestData().then(() => {
    // chartData.value = bestData.value
  })
}

init()
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 90%;
}
</style>
