<script setup lang="ts">
defineProps({
  title: String
})

import Pie from './Pie.vue'
</script>
<template>
  <view
    class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
    <!-- Header -->
    <view class="w-[60%] py-2"></view>
    <!-- 分割线 -->
    <view class="border opacity-10"></view>
    <Pie />
  </view>
</template>
