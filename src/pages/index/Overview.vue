<template>
  <view class="relative">
    <view class="multigraph flex items-center justify-center overflow-hidden">
      <span class="graph"></span>
      <view class="flex flex-col items-center justify-start pt-8">
        <span class="text-5xl font-medium">{{ kilo }}</span>
        <span class="text-xl font-bold">千卡</span>
      </view>
    </view>
  </view>

  <!-- TODO: Semibar -->
  <view class="h-40 w-full">
    <SemiBar />
  </view>

  <view class="relative opacity-60">
    <view class="tableMark">
      <span class="tableRange w-20 pl-2 text-xl">0</span>
      <span class="tableRange w-9 text-xl">{{ recommendTotal }}</span>
    </view>
  </view>

  <view class="flex items-center gap-10">
    <view class="flex flex-col items-center justify-center">
      <view class="w-16">
        <progress :percent="50" stroke-width="8" border-radius="6" />
      </view>
      <span class="pt-2 text-lg font-semibold">
        {{ summaryData.tanshui }}/{{ recommendData.tanshui }}
      </span>
      <span class="text-xs opacity-60">碳水(g)</span>
    </view>

    <view class="flex flex-col items-center justify-center">
      <view class="w-16">
        <progress :percent="50" stroke-width="8" border-radius="6" />
      </view>
      <span class="pt-2 text-lg font-semibold">
        {{ summaryData.danbai }}/{{ recommendData.danbai }}
      </span>
      <span class="text-xs opacity-60">蛋白质(g)</span>
    </view>

    <view class="flex flex-col items-center justify-center">
      <view class="w-16">
        <progress :percent="50" stroke-width="8" border-radius="6" />
      </view>
      <span class="pt-2 text-lg font-semibold">
        {{ summaryData.zhifang }}/{{ recommendData.zhifang }}
      </span>
      <span class="text-xs opacity-60">脂肪(g)</span>
    </view>
  </view>
</template>

<script setup lang="ts">
import Semibar from '@/components/notebook/SemiBar.vue'

const kilo = 400
const totalkilo = 1647

const rotateDeg = computed(() => {
  return `rotate(${(kilo / totalkilo) * 180}deg)`
})

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
:root {
  --color: #6fb23a;
}

.header {
  font-family: 'Nanum', 'NoteSans';
  background-image: url('https://font-1305224645.cos.ap-nanjing.myqcloud.com/beach.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);
}
.multigraph {
  transform: scale(60%);
}

.multigraph2 {
  transform: scale(40%);
}

.multigraph {
  width: 300px;
  height: 150px;
  overflow: hidden;
}

.multigraph:before {
  content: '';
  width: 300px;
  height: 150px;
  position: absolute;
  border: 30px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;

  border-radius: 300px 300px 0 0;
}

.multigraph:hover .tooltip {
  bottom: 75%;
  opacity: 0.8;
  transform: scale(1);
}
.graph {
  width: 300px;
  height: 150px;
  position: absolute;
  border-bottom: none;
}
.graph:before,
.graph:after {
  width: 300px;
  height: 150px;
  position: absolute;
  top: 100%;
  border: 30px solid #e7e5e4;
  content: '';
  border-radius: 0 0 300px 300px;
  border-top: none;
  animation: demo 3s;
  transform-origin: center top;
}
.graph::after {
  transform: 40%;
}

@keyframes demo {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
}

.tableMark {
  display: flex;
  justify-content: space-between;
  width: 190px;
  position: relative;
  top: -20px;
}
</style>
