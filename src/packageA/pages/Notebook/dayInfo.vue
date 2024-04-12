<template>
  <view>
    <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
      <view>{{ breakfast.value }}</view>
      <view class="py-2"></view>
      <view>
        <!-- 三餐情况 -->
        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="py-2">今日三餐</view>

          <!-- 分割线 -->
          <view class="border opacity-10"></view>

          <!-- List 早餐 午餐 晚餐 -->

          <view>
            <view class="flex flex-col gap-2">
              <!-- 早餐 -->
              <view class="flex items-center justify-between">
                <span>早餐</span>
                <span class="text-sm opacity-60" v-if="todayInfo[0] == 0">
                  未吃
                </span>
                <span class="text-sm opacity-60" v-if="todayInfo[0] == 1">
                  已吃
                </span>
              </view>
            </view>

            <view class="p-1.5"></view>

            <!-- 午餐 -->
            <view class="flex items-center justify-between">
              <!-- Header -->
              <span>午餐</span>
              <!-- 分割线 -->
              <span class="text-sm opacity-60" v-if="todayInfo[1] == 0">
                未吃
              </span>
              <span class="text-sm opacity-60" v-if="todayInfo[1] == 1">
                已吃
              </span>
            </view>

            <view class="p-1.5"></view>

            <!-- 晚餐 -->
            <view class="flex items-center justify-between">
              <!-- Header -->
              <span>晚餐</span>
              <!-- 分割线 -->
              <span class="text-sm opacity-60" v-if="todayInfo[2] == 0">
                未吃
              </span>
              <span class="text-sm opacity-60" v-if="todayInfo[2] == 1">
                已吃
              </span>
            </view>
          </view>
        </view>

        <view class="py-2"></view>

        <!-- 是否超标 -->
        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="py-2">今日热量</view>

          <!-- 分割线 -->
          <view class="border opacity-10"></view>

          <!-- List 早餐 午餐 晚餐 -->

          <view>
            <view class="flex flex-col gap-2">
              <!-- 早餐 -->
              <view class="flex items-center justify-between">
                <span>早餐</span>
                <span class="text-sm opacity-60" v-if="todayInfo[3] == 0">
                  未超标
                </span>
                <span class="text-sm opacity-60" v-if="todayInfo[3] == 1">
                  已超标
                </span>
              </view>
            </view>

            <view class="p-1.5"></view>

            <!-- 午餐 -->
            <view class="flex items-center justify-between">
              <!-- Header -->
              <span>午餐</span>
              <!-- 分割线 -->
              <span class="text-sm opacity-60" v-if="todayInfo[4] == 0">
                未超标
              </span>
              <span class="text-sm opacity-60" v-if="todayInfo[4] == 1">
                已超标
              </span>
            </view>

            <view class="p-1.5"></view>

            <!-- 晚餐 -->
            <view class="flex items-center justify-between">
              <!-- Header -->
              <span>晚餐</span>
              <!-- 分割线 -->
              <span class="text-sm opacity-60" v-if="todayInfo[5] == 0">
                未超标
              </span>
              <span class="text-sm opacity-60" v-if="todayInfo[5] == 1">
                已超标
              </span>
            </view>
          </view>
        </view>

        <view class="py-4"></view>

        <!-- 关于三餐 -->
        <view class="text-lg">关于三餐</view>

        <view class="py-2"></view>

        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <view class="" style="font-size: 20px">早餐</view>
          <p style="font-size: 18px; line-height: 1.5">
            吃早餐和吃适量热量的早餐都对身体有益处。早餐是一天中最重要的一餐，提供身体所需的能量和营养。适量的热量有助于维持健康的新陈代谢水平，控制体重，并提高认知功能和集中力。吃早餐也有助于控制食欲，使人在接下来的餐饮中更容易做出健康的选择
          </p>
        </view>

        <view class="py-2"></view>

        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <view class="" style="font-size: 20px">午餐</view>
          <p style="font-size: 18px; line-height: 1.5">
            吃午餐和吃适量热量的午餐都对身体有益。适当热量的午餐为身体提供了中午所需的能量，有助于维持活力和精力充沛，使人在下午时保持专注和效率。午餐也是一天中身体最需要能量和营养的时候，适量的午餐可以补充早餐后消耗的能量，保持血糖水平稳定，促进新陈代谢和身体功能的正常运作。同时，适当的午餐可以提供各种营养素，满足身体对蛋白质、碳水化合物、脂肪和维生素的需求，有助于维持健康的体重和身体功能。
          </p>
        </view>

        <view class="py-2"></view>

        <view
          class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <view class="" style="font-size: 20px">晚餐</view>
          <p style="font-size: 18px; line-height: 1.5">
            吃晚餐和吃适量热量的晚餐都对身体有益。适量热量的晚餐为身体提供晚间所需的能量，有助于滋养身体，促进晚间修复和恢复。晚餐是一天中最后一顿饭，适量的晚餐可以满足身体在夜间的能量需求，帮助维持血糖水平稳定，促进健康的消化和睡眠。同时，适当的晚餐也可以提供各种营养素，满足身体对蛋白质、脂肪和维生素的需求，有助于维持健康的体重和身体功能。
          </p>
        </view>

        <view class="py-2"></view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

const todayRecord = ref()
const todayInfo: infoArr[] = []
const breakfast = ref()
// let lunch = ref()
// let dinner = ref()
// let breakfastHeat = ref()
// let lunchHeat = ref()
// let dinnerHeat = ref()
// 今日营养元素各类总和
function getTodayRecord(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    header: {},
    success: (res: any) => {
      todayRecord.value = res.data.data
      //   判断吃了没
      if (todayRecord.value.breakfast == 0) todayInfo.push(0)
      else todayInfo.push(1)

      if (todayRecord.value.lunch == 0) todayInfo.push(0)
      else todayInfo.push(1)

      if (todayRecord.value.dinner == 0) todayInfo.push(0)
      else todayInfo.push(1)

      // 判断是否超标
      if (todayRecord.value.breakfast >= 300) todayInfo.push(1)
      else todayInfo.push(0)

      if (todayRecord.value.lunch >= 549) todayInfo.push(1)
      else todayInfo.push(0)

      if (todayRecord.value.dinner >= 550) todayInfo.push(1)
      else todayInfo.push(0)

      console.log(todayInfo[0])
      console.log(todayInfo)

      breakfast.value = todayInfo[0]
      //   console.log(breakfast.value)
    }
  })
}

getTodayRecord({
  url: '/record/energy/today/' + userId,
  method: 'GET'
})

function mounted() {
  // 拍照过来刷新
  uni.$on('refreshCalendar', () => {
    getTodayRecord({
      url: '/record/energy/today/' + userId,
      method: 'GET'
    })
  })
}

mounted()
</script>
