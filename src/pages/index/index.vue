<script setup lang="ts">
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

function chooseMedia() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      console.log(res.tempFiles)
    }
  })
}
function takePhoto() {
  uni.chooseMedia({
    count: 9,
    mediaType: ['image'],
    sourceType: ['camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      console.log(res.tempFiles)
    }
  })
}

// TODO: 手动记录表单
</script>

<template>
  <view class="container flex h-[100vh] flex-col" blurEffect="light">
    <view class="flex-auto"></view>

    <view class="flex items-center justify-center pb-6 font-bold">
      <view class="flex items-center justify-center gap-1">
        <!-- TODO: 拍照 -->
        <button
          @click="takePhoto"
          class="photo flex w-[150px] items-center justify-center gap-2 rounded-3xl bg-[#6fb23a] text-white">
          <view
            class="flex h-[20px] w-[25px] items-center justify-center overflow-hidden">
            <u-icons color="white" type="camera" size="30"></u-icons>
          </view>
          <view>拍照</view>
        </button>

        <!-- TODO: 图库 -->
        <button
          @click="chooseMedia"
          class="flex aspect-square h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full">
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
  background-image: url('https://unsplash.com/photos/a-painting-of-a-white-flower-with-green-leaves-CfUx9gx3eVk');
}

video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);
}
</style>
