<template>
  <!-- TODO: Header -->
  <view
    class="header flex w-full flex-col items-center bg-[#99d65c] p-4 text-sm text-white backdrop-blur-3xl">
    <view class="flex w-full items-center justify-between">
      <view class="flex items-end justify-center gap-2">
        <text class="i-mdi-account text-2xl">496</text>
        <span>Shane H</span>
      </view>
      <view>上周小结</view>
    </view>

    <Overview />
  </view>
</template>

<script setup lang="ts">
import Overview from './Overview.vue'
</script>

<style scoped>
:root {
  --color: #6fb23a;
}

.header {
  font-family: 'Nanum', 'NoteSans';
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);
}

.tableMark {
  display: flex;
  justify-content: space-between;
  width: 190px;
  position: relative;
  top: -20px;
}
</style>
