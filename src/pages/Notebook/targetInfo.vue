<template>
  <view>
    <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">今日摄入量</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <view>
          <view
            class="flex flex-col gap-2 pt-3"
            v-for="(item, key,index) in planData"
            :key="key">
            <!-- 目标清单 -->
            <view class="flex items-center justify-between">
              <span>{{ name[index] }}</span>
              <span class="text-sm opacity-60">{{todayData[key]}}/{{ item }} {{danwei[index]}}</span>
            </view>
            <view>
              <progress
                :percent= todayArr[index]
                stroke-width="15"
                border-radius="6"
                color="#d07c6c" />
            </view>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

//获取计划数据
const planData = ref()
function getPlanTableData(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
    },
    success: (res) => {
        planData.value = res.data.data
    }
  })
}
getPlanTableData({
  url: '/user/plan/1',
  method: 'GET'
})

//获取今日数据
const todayData = ref()
let todayArr:arr[]=[]
let  danwei:arr2[]=["千卡","克","克","克","克","微克","微克","毫克","毫克","毫克","毫克","微克","毫克","毫克","毫克","微克","毫克","毫克","毫克","毫克","毫克"]
let name:arr3[] = ["热量","蛋白","脂肪","碳水","纤维","维生素A","胡罗卜素","盐酸","维生素C","维生素E","胆固醇","钾","钠","钙","镁","铁","锰","锌","铜","磷","锡"]
function getTodayData(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
    },
    success: (res) => {
        todayData.value = res.data.data
        for(var temp in todayData.value){
           todayArr.push((todayData.value[temp] / planData.value[temp])*100)
        }
        // console.log(todayArr)
    }
  })
}

getTodayData({
    url:'/record/summary/today/1',
    method:'GET'
})

//计算

// const progressBreakfast = computed(() => {
//   return (todayRecord.value.breakfast / 300) * 100
// })
</script>
