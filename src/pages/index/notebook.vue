<script setup lang="ts">
import NotebookHeader from './NotebookHeader.vue'
import { getTableDataApi } from '@/api/table'
import RoundArea from '@/components/notebook/RoundArea.vue'
import Pie from '@/components/notebook/Pie.vue'

// 今日营养元素各类总和
</script>

<template>
  <NotebookHeader />

  <view class="bg-[#99d65c] p-3">
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
            <span class="text-sm opacity-60">0/549千卡</span>
          </view>
          <view class="pt-2">
            <progress :percent="50" stroke-width="15" border-radius="6" />
          </view>
        </view>
      </view>
    </view>

    <view class="p-1.5"></view>

    <view class="flex justify-between">
      <view
        class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">🐶 营养摄入</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <!-- List 早餐 午餐 晚餐 -->

        <view>
          <view class="flex flex-col gap-2">
            <view class="flex items-center justify-between">
              <span>早餐</span>
              <span class="text-sm opacity-60">0/549千卡</span>
            </view>
            <view class="pt-2">
              <progress :percent="50" stroke-width="15" border-radius="6" />
            </view>
          </view>
        </view>
      </view>

      <view
        class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">🦊 营养摄入</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <!-- List 早餐 午餐 晚餐 -->

        <view>
          <view class="flex flex-col gap-2">
            <view class="flex items-center justify-between">
              <span>早餐</span>
              <span class="text-sm opacity-60">0/549千卡</span>
            </view>
            <view class="pt-2">
              <progress :percent="50" stroke-width="15" border-radius="6" />
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
      <view class="py-2">🐶 营养摄入</view>

      <!-- 分割线 -->
      <view class="border opacity-10"></view>

      <!-- List 早餐 午餐 晚餐 -->

      <view>
        <view class="flex flex-col gap-2">
          <view class="flex items-center justify-between">
            <span>早餐</span>
            <span class="text-sm opacity-60">0/549千卡</span>
          </view>
          <view class="pt-2">
            <progress :percent="50" stroke-width="15" border-radius="6" />
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
</template>

<style scoped></style>
