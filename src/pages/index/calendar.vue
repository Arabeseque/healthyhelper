<script setup lang="ts">
import uniCalendar from '@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'

function change() {
  console.log('change')
}

const chartData = ref({
  categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
  series: [
    {
      name: '目标值',
      data: [35, 36, 31, 33, 13, 34]
    },
    {
      name: '完成量',
      data: [18, 27, 21, 24, 6, 28]
    }
  ]
})
</script>
<template>
  <view class="rounded-2xl px-2 shadow-2xl">
    <uni-calendar
      :insert="true"
      :lunar="true"
      :start-date="'2019-3-2'"
      :end-date="'2019-5-20'"
      @change="change" />
  </view>

  <view class="bg-[#b8ec78] p-3 px-2">
    <view
      class="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-2xl">
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

      <!-- TODO: 图表 -->
      <view class="charts-box h-full w-full">
        <qiun-data-charts type="column" :chartData="chartData" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.uni-calendar-item__weeks-box-circle {
  background-color: transparent;
}

::v-deep {
  .uni-calendar-item--extra {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6fb23a;
    color: #fff;
  }
  .uni-calendar-item--isDay {
    background-color: #6fb23a;
  }

  .uni-calendar-item--isDay {
    background-color: #6fb23a;
  }
}
</style>
