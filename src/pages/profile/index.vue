<script setup lang="ts"></script>
<template>
  <view>
    <!-- TODO: profile 滑动 -->
    <view class="flex h-full items-center justify-center">
      <swiper>
        <swiper-item>
          <view class="flex flex-col items-center justify-center">
            <text class="text-2xl">个人信息</text>
            <text class="text-xl">姓名：张三</text>
            <text class="text-xl">年龄：18</text>
            <text class="text-xl">性别：男</text>
            <text class="text-xl">爱好：篮球</text>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="flex flex-col items-center justify-center">
            <text class="text-2xl">个人信息</text>
            <text class="text-xl">姓名：李四</text>
            <text class="text-xl">年龄：20</text>
            <text class="text-xl">性别：女</text>
            <text class="text-xl">爱好：足球</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
