<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
</script>
<template>
  <view class="container flex h-[100vh] flex-col">
    <view class="flex-auto"></view>

    <view class="flex items-center justify-center pb-6 font-bold">
      <view class="flex items-center justify-center gap-1">
        <!-- TODO: 拍照 -->
        <button
          class="flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#6fb23a] text-white">
          <view
            class="flex h-[20px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="white" type="camera" size="30"></u-icons>
          </view>
          <view>拍照</view>
        </button>

        <!-- TODO: 图库 -->
        <button
          class="flex aspect-square w-[50px] items-center justify-center overflow-hidden rounded-full">
          <u-icons color="#6fb23a" type="image" size="30"></u-icons>
        </button>

        <!-- TODO: 手动记录 -->
        <button
          class="border-[#6fb23a flex w-[150px] items-center justify-center gap-2 rounded-3xl border font-bold text-[#6fb23a]">
          <view
            class="flex h-[22px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="#6fb23a" type="medal" size="30"></u-icons>
          </view>
          <view>手动记录</view>
        </button>
      </view>
    </view>
  </view>
</template>

<style>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.unsplash.com/photo-1708708553991-6a97854e151f?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
</style>
