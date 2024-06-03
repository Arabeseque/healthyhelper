<script setup lang="ts">
import NotebookHeader from './NotebookHeader.vue'
// import { getTableDataApi } from '@/api/table'
// import RoundArea from '@/components/notebook/RoundArea.vue'

// 体重曲线
import Line from '@/components/notebook/Line.vue'
// 热量曲线
import heatLine from '@/components/notebook/heatLine.vue'
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
// const userId = userStore.userid

const todayRecord = ref()

onShow(() => {
  getTodayRecord(userStore.userid)
})

onLoad(() => {
  setH()
})

// 今日营养元素各类总和
function getTodayRecord(userId: string) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/record/energy/today/' + userId,
    method: 'GET',
    header: {},
    success: (res: any) => {
      // console.log(res.data.data, 'getTodayRecord')
      console.log(userStore.userid, 'userStore.userid')
      todayRecord.value = res.data.data
    }
  })
}

// 计算
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

// 前往体重详情
function toWeightInfo() {
  uni.navigateTo({
    url: `/packageA/pages/Notebook/weightInfo`
  })
}

// 前往热量详情
function toHeatInfo() {
  uni.navigateTo({
    url: `/packageA/pages/Notebook/heatInfo`
  })
}

// 前往一日三餐详情
function toDayInfo() {
  uni.navigateTo({
    url: `/packageA/pages/Notebook/dayInfo`
  })
}

// function init() {
//   getTodayRecord(userStore.userid)s
// }

// init()
</script>

<template>
  <view>
    <NotebookHeader />

    <view class="bg-[#96b38d] px-3 py-2 shadow-xl">
      <view
        class="box-border flex w-full flex-col gap-4 rounded-[20px] bg-white p-4 shadow-md"
        @click="toDayInfo">
        <!-- Header -->
        <view class="flex">
          <image
            src="https://www.zshealthhelper.icu/meal.png"
            class="h-9 w-11"></image>
          <span class="flex items-center pl-2">一日三餐</span>
        </view>

        <!-- 分割线 -->
        <!-- <view class="border opacity-10"></view> -->

        <!-- List 早餐 午餐 晚餐 -->

        <view>
          <view class="flex gap-3">
            <!-- 早餐 -->
            <view
              class="flex bg-[#C4D8BD] p-3 px-4"
              style="border-radius: 20px; width: 100%">
              <view class="flex items-center">
                <image
                  src="https://www.zshealthhelper.icu/ziyuan20.png"
                  class="h-[44px] w-[50px]"></image>
              </view>

              <view class="flex flex-col pl-3" style="width: 100%">
                <view class="flex justify-between">
                  <span>早餐</span>
                  <span class="text-sm opacity-60">
                    {{ todayRecord.breakfast }}/300千卡
                  </span>
                </view>

                <view class="pt-2">
                  <progress
                    :percent="progressBreakfast"
                    stroke-width="20"
                    border-radius="10"
                    color="#FFEE56" />
                </view>
              </view>
            </view>
          </view>

          <view class="p-1.5"></view>

          <!-- 午餐 -->
          <view
            class="flex bg-[#C4D8BD] p-3 px-4"
            style="border-radius: 20px; width: 100%">
            <view class="flex items-center">
              <image
                src="https://www.zshealthhelper.icu/ziyuan22.png"
                class="h-[44px] w-[50px]"></image>
            </view>
            <view class="flex flex-col pl-3" style="width: 100%">
              <view class="flex justify-between">
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
                  stroke-width="20"
                  border-radius="10"
                  color="#FFEE56" />
              </view>
            </view>
          </view>

          <view class="p-1.5"></view>

          <!-- 晚餐 -->
          <view class="flex bg-[#C4D8BD] p-3 px-4" style="border-radius: 20px;width: 100%">
            <view class="flex items-center">
              <image
                src="https://www.zshealthhelper.icu/ziyuan21.png"
                class="h-[44px] w-[50px]"></image>
            </view>

            <view class="flex flex-col pl-3" style="width: 100%">
              <view class="flex justify-between">
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
                  stroke-width="20"
                  border-radius="10"
                  color="#FFEE56" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="py-2"></view>

      <!-- 更多 -->
      <view
        class="box-border flex w-full flex-col gap-4 rounded-[20px] bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="flex">
          <image
            src="https://www.zshealthhelper.icu/line.png"
            class="h-10 w-10"></image>
          <span class="flex items-center pl-2">变化曲线</span>
        </view>

        <!-- 分割线 -->
        <!-- <view class="border opacity-10"></view> -->

        <scroll-view class="uni-margin-wrap">
          <swiper class="swiper" circular>
            <swiper-item @click="toHeatInfo">
              <heatLine class="oneDom" />
            </swiper-item>
            <swiper-item @click="toWeightInfo">
              <Line class="oneDom" />
            </swiper-item>
            <!-- <swiper-item>
              <Line />
            </swiper-item> -->
          </swiper>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.swiper {
  height: 300px;
}
.swiper-item {
  height: 300px;
}
</style>
