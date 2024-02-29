<template>
  <!-- TODO: Header -->
  <view
    class="header flex w-full flex-col items-center bg-[#99d65c] p-4 text-sm text-white">
    <view class="flex w-full items-center justify-between">
      <view class="flex items-end justify-center gap-2">
        <text class="i-mdi-account text-2xl"></text>
        <span>Shane H</span>
      </view>
      <view>上周小结</view>
    </view>
    <!-- TODO: circle Table -->
    <view class="multigraph flex items-center justify-center">
      <span class="graph"></span>
      <view class="flex flex-col items-center justify-center pt-16">
        <span class="text-5xl font-bold">{{ kilo }}</span>
        <span class="pt-2 text-xl font-bold">千卡</span>
      </view>
    </view>

    <view class="relative opacity-60">
      <view class="tableMark">
        <span class="tableRange w-20 pl-2 text-xl">0</span>
        <span class="tableRange w-9 text-xl">{{ totalkilo }}</span>
      </view>
    </view>

    <!-- TODO: 基本碳水 蛋白质 脂肪 -->
    <view class="flex items-center gap-10">
      <view class="flex flex-col items-center justify-center">
        <view class="w-16">
          <progress :percent="50" stroke-width="8" border-radius="6" />
        </view>
        <span class="pt-2 text-lg font-bold">0/247</span>
        <span class="text-xs opacity-60">碳水(g)</span>
      </view>

      <view class="flex flex-col items-center justify-center">
        <view class="w-16">
          <progress :percent="50" stroke-width="8" border-radius="6" />
        </view>
        <span class="pt-2 text-lg font-bold">0/247</span>
        <span class="text-xs opacity-60">蛋白质(g)</span>
      </view>

      <view class="flex flex-col items-center justify-center">
        <view class="w-16">
          <progress :percent="50" stroke-width="8" border-radius="6" />
        </view>
        <span class="pt-2 text-lg font-bold">0/247</span>
        <span class="text-xs opacity-60">脂肪(g)</span>
      </view>
    </view>
  </view>

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
const kilo = 400
const totalkilo = 1647

const rotateDeg = computed(() => {
  return `rotate(${(kilo / totalkilo) * 180}deg)`
})
</script>

<style scoped>
.multigraph {
  transform: scale(60%);
}

.multigraph {
  width: 300px;
  height: 150px;
  overflow: hidden;
}

.multigraph:before {
  content: '';
  width: 300px;
  height: 150px;
  position: absolute;
  border: 30px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;

  border-radius: 300px 300px 0 0;
}

.multigraph:hover .tooltip {
  bottom: 75%;
  opacity: 0.8;
  transform: scale(1);
}
.graph {
  width: 300px;
  height: 150px;
  position: absolute;
  border-bottom: none;
}
.graph:before,
.graph:after {
  width: 300px;
  height: 150px;
  position: absolute;
  top: 100%;
  border: 30px solid #e7e5e4;
  content: '';
  border-radius: 0 0 300px 300px;
  border-top: none;
  animation: demo 3s;
  transform-origin: center top;
}
.graph::after {
  transform: v-bind(rotateDeg);
}

@keyframes demo {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
}

.tableMark {
  display: flex;
  justify-content: space-between;
  width: 190px;
  position: relative;
  top: -20px;
}
</style>
