<template>
  <NotebookHeader />

  <!-- TODO: List -->
  <view class="bg-[#99d65c]">
    <view
      class="flex w-full flex-col gap-4 rounded-t-2xl bg-white p-4 shadow-xl">
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
</template>

<script setup lang="ts">
import NotebookHeader from './NotebookHeader.vue'
</script>

<style scoped></style>
