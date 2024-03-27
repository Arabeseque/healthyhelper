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
  <view>
    <view class="rounded-2xl px-2 shadow-2xl">
      <uni-calendar
        :insert="true"
        :lunar="true"
        :start-date="'2019-3-2'"
        :end-date="'2019-5-20'"
        @change="change" />
    </view>

    <view class="bg-[#93bb92] p-3 px-2">
      <view
        class="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-2xl">
        <view class="py-2 text-xl font-bold">🍐 Chat With AI</view>
        <view class="border opacity-10"></view>

        <view>
          <view class="flex flex-col gap-2">
            <view class="flex justify-start gap-2">
              <!-- loading -->
              <fui-loading :isFixed="false"></fui-loading>

              <fui-avatar
                text="AI"
                background="#FFB703"
                size="small"></fui-avatar>

              <view
                class="flex h-16 w-32 items-center justify-center rounded-xl bg-neutral-100 px-4 py-3">
                今天有什么可以帮你?
              </view>
            </view>
          </view>

          <view class="flex items-center justify-center pt-20">
            <fui-input
              borderTop
              v-model="foodName"
              placeholder="输入食品的名称"></fui-input>
            <fui-button width="60px" background="#f9a647" @click="handleRecord">
              提问
            </fui-button>
          </view>
        </view>
        <!-- 
        <view class="charts-box h-full w-full">
          <qiun-data-charts type="column" :chartData="chartData" />
        </view> -->
      </view>

      <view class="p-1.5"></view>

      <view class="flex justify-between">
        <view
          class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="flex items-center justify-center gap-2 py-2">
            <image
              src="https://simpleicons.org/icons/affinityphoto.svg"
              class="h-6 w-6" />
            <view>ChatWithAI</view>
          </view>
        </view>

        <view
          class="box-border flex w-[48%] flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
          <!-- Header -->
          <view class="flex items-center justify-center gap-2 py-2">
            <image
              src="https://simpleicons.org/icons/affinityphoto.svg"
              class="h-6 w-6" />
            <view>TODO</view>
          </view>
        </view>
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
