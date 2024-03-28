<script setup lang="ts">
import NotebookHeader from './NotebookHeader.vue'
// import { getTableDataApi } from '@/api/table'
// import RoundArea from '@/components/notebook/RoundArea.vue'
import Pie from '@/components/notebook/Pie.vue'

const todayRecord = ref()
// 今日营养元素各类总和
function getTodayRecord(userId: number) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/record/energy/today/' + userId,
    method: 'GET',
    header: {},
    success: (res: any) => {
      // console.log(res.data.data, 'getTodayRecord')
      todayRecord.value = res.data.data
    }
  })
}

const progressBreakfast = computed(() => {
  return (todayRecord.value.breakfast / 300) * 100
})

const progressLunch = computed(() => {
  return (todayRecord.value.lunch / 549) * 100
})

const progressDinner = computed(() => {
  return (todayRecord.value.dinner / 550) * 100
})

const progressSnacks = computed(() => {
  return (todayRecord.value.snacks / 300) * 100
})

function init() {
  getTodayRecord(1)
}

init()
</script>

<template>
  <view>
    <NotebookHeader />

    <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">🍐 一日三餐</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <!-- List 早餐 午餐 晚餐 -->

        <view>
          <view class="flex flex-col gap-2">
            <!-- 早餐 -->
            <view class="flex items-center justify-between">
              <span>早餐</span>
              <span class="text-sm opacity-60">
                {{ todayRecord.breakfast }}/300千卡
              </span>
            </view>
            <view class="pt-2">
              <progress
                :percent="progressBreakfast"
                stroke-width="15"
                border-radius="6"
                color="#d07c6c" />
            </view>
          </view>

          <view class="p-1.5"></view>

          <!-- 午餐 -->
          <view class="flex items-center justify-between">
            <!-- Header -->
            <span>午餐</span>
            <!-- 分割线 -->
            <span class="text-sm opacity-60">
              {{ todayRecord.lunch }}/549千卡
            </span>
          </view>
          <view class="pt-2">
            <progress
              :percent="progressLunch"
              stroke-width="15"
              border-radius="6"
              color="#d07c6c" />
          </view>

          <view class="p-1.5"></view>

          <!-- 晚餐 -->
          <view class="flex items-center justify-between">
            <!-- Header -->
            <span>晚餐</span>
            <!-- 分割线 -->
            <span class="text-sm opacity-60">
              {{ todayRecord.dinner }}/550千卡
            </span>
          </view>
          <view class="pt-2">
            <progress
              :percent="progressDinner"
              stroke-width="15"
              border-radius="6"
              color="#d07c6c" />
          </view>
        </view>
      </view>

      <view class="py-2"></view>

      <!-- 更多 -->
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-1">变化曲线</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <view class="uni-margin-wrap">
          <swiper
            class="swiper"
            circular
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration">
            <swiper-item>
              <Pie />
            </swiper-item>
            <swiper-item>
              <Pie />
            </swiper-item>
            <swiper-item>
              <Pie />
            </swiper-item>
          </swiper>
        </view>

        <!-- <Pie /> -->
      </view>
    </view>
  </view>
</template>

<style scoped>
.swiper {
  height: 300px;
}
</style>
