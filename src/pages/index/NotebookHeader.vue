<template>
  <!-- TODO: Header -->
  <view
    class="header flex w-full flex-col items-center bg-[#9dc9b6] p-4 text-sm text-white backdrop-blur-3xl">
    <view class="flex w-full items-center justify-between">
      <view class="flex items-end justify-center gap-2" @click="toPersonalPage()">
        <text class="i-mdi-account text-2xl">496</text>
        <span>Shane H</span>
      </view>
      <view>上周小结</view>
    </view>

    <view class="py-2"></view>

    <!-- 目标圆环 -->
    <view
      class="box-border flex w-full justify-between gap-4 rounded-xl bg-white px-4 shadow-md" @click="toTargetInfo">
      <view class="w-[48%]">
        <SemiBar />
      </view>
      <view
        class="flex flex-col items-center justify-center gap-2 pr-8 text-black">
        <view class="flex gap-2">
          <view class="flex items-center justify-between">
            <image
              src="https://api.iconify.design/ph:bowl-food-fill.svg?color=%2373c0de"
              class="h-6 w-6 pr-1"></image>
            <span class="text-sm font-bold opacity-60">
              {{ summaryData.danbai }}
            </span>
            <span class="p-1 text-sm opacity-60">
              / {{ planData.danbai }}
            </span>

            <span class="text-xs text-stone-700">g</span>
          </view>
        </view>
        <view class="flex gap-2">
          <view class="flex items-center justify-between">
            <image
              src="https://api.iconify.design/material-symbols:local-fire-department-rounded.svg?color=%23df4242"
              class="h-6 w-6 pr-1"></image>
            <span class="text-sm font-bold opacity-60">
              {{ summaryData.zhifang }}
            </span>
            <span class="p-1 text-sm opacity-60">
              / {{ planData.zhifang }}
            </span>

            <span class="text-xs text-stone-700">g</span>
          </view>
        </view>
        <view class="flex gap-2">
          <view class="flex items-center justify-between">
            <image
              src="https://api.iconify.design/fluent:food-24-filled.svg?color=%23fac858"
              class="h-6 w-6 pr-1"></image>
            <span class="text-sm font-bold opacity-60">
              {{ summaryData.tanshui }}
            </span>
            <span class="p-1 text-sm opacity-60">
              / {{ planData.tanshui }}
            </span>

            <span class="text-xs text-stone-700">g</span>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="py-2"></view> -->

    <!-- <Overview /> -->
  </view>
</template>

<script setup lang="ts">
import SemiBar from '@/components/notebook/SemiBar.vue'
import Overview from './Overview.vue'
import Demo from '@/components/model/Demo.vue'

// TODO: summary data
const summaryData = ref({})
function getTableData(params: any) {
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
      // console.log(summaryData.value, 'summaryData')
    }
  })
}

const planData = ref({})
function getPlanTableData(params: any) {
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
      // console.log(planData.value, 'planData')
    }
  })
}

function toTargetInfo(){
  uni.navigateTo({
    url:`../../pages/Notebook/targetInfo`
  })
}

function toPersonalPage(){
  uni.navigateTo({
    url:`../../pages/personalPage/personalPage`
  })
}

// sum of remommendData
// const planTotal = computed(() => {
//   return Object.values(planData.value).reduce((acc, cur) => acc + cur, 0)
// })

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
:root {
  --color: #a0c69d;
}

.header {
  font-family: 'Nanum', 'NoteSans';
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.tableMark {
  display: flex;
  justify-content: space-between;
  width: 190px;
  position: relative;
  top: -20px;
}
</style>
