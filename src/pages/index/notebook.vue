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
      console.log(res.data.data, 'getTodayRecord')
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
        </view>
      </view>

      <view class="p-1.5"></view>

      <view class="flex justify-between">
        <view
          class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="py-2">🐶 晚餐</view>

          <!-- 分割线 -->
          <view class="border opacity-10"></view>

          <!-- List 早餐 午餐 晚餐 -->

          <view>
            <view class="flex flex-col gap-2">
              <view class="flex items-center justify-between">
                <span>能量</span>
                <span class="text-sm opacity-60">
                  {{ todayRecord.dinner }}/550千卡
                </span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="progressDinner"
                  stroke-width="15"
                  border-radius="6"
                  color="#f9a647" />
              </view>
            </view>
          </view>
        </view>

        <view
          class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="py-2">🦊 午餐</view>

          <!-- 分割线 -->
          <view class="border opacity-10"></view>

          <!-- List 早餐 午餐 晚餐 -->

          <view>
            <view class="flex flex-col gap-2">
              <view class="flex items-center justify-between">
                <span>能量</span>
                <span class="text-sm opacity-60">
                  {{ todayRecord.lunch }}/549千卡
                </span>
              </view>
              <view class="pt-2">
                <progress
                  :percent="progressLunch"
                  stroke-width="15"
                  border-radius="6"
                  color="#185864" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="p-1.5"></view>

      <!-- 营养摄入 -->
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">🐶 空间时间</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <!-- List 早餐 午餐 晚餐 -->

        <view>
          <view class="flex flex-col gap-2">
            <view class="flex items-center justify-between">
              <span>能量</span>
              <span class="text-sm opacity-60">
                {{ todayRecord.snacks }}/300千卡
              </span>
            </view>
            <view class="pt-2">
              <progress
                :percent="progressSnacks"
                stroke-width="15"
                border-radius="6"
                color="#e2dbd0" />
            </view>
          </view>
        </view>
      </view>

      <view class="p-1.5"></view>

      <!-- 更多 -->
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">图表分析</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <!-- List 早餐 午餐 晚餐 -->

        <Pie />
      </view>
    </view>
  </view>
</template>

<style scoped></style>
