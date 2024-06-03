<template>
  <!-- TODO: Header -->
  <view
    class="header flex w-full flex-col items-center bg-[#96b38d] p-4 text-sm backdrop-blur-3xl">
    <view class="flex w-full items-center justify-between">
      <view
        class="flex items-end justify-center gap-2 bg-white"
        style="border-radius: 20px;"
        @click="toPersonalPage()">
        <!-- <text class="i-mdi-account text-2xl">496</text>
        <span>{{ userData.name }}</span> -->
        <view class="flex p-2">
          <image
            class="logo h-11 w-11 overflow-hidden rounded-full"
            src="https://www.zshealthhelper.icu/avator.jpg" />
            <view class="flex flex-col pt-1 pr-8">
              <span class="flex items-center pl-4 " style="font-size: 16px;color:rgba(0,0,0,0.9)">{{ userData.name }}</span>
              <span class="pl-4" style="font-size: 16px">WELCOM!</span>
            </view>
        </view>
      </view>
      <!-- <view>上周小结</view> -->
      <image
        src="https://www.zshealthhelper.icu/logo.png"
        style="height: 73px;width:76px;"></image>
    </view>

    <view class="py-2"></view>

    <!-- 目标圆环 -->
    <view
      class="box-border flex w-full justify-between gap-4 rounded-[20px] bg-white shadow-md"
      @click="toTargetInfo">
      <view class="w-[56%]">
        <SemiBar />
      </view>
      <view
        class="flex flex-col items-center justify-center gap-4 text-black">
        <view class="flex gap-3" style="width: 140px">
          <view class="flex items-center justify-between">
            <image
              src="https://www.zshealthhelper.icu/danbai2.png"
              style="height: 43px;width:38px;"></image>
            <view class="right pl-2" style="font-size: 16px">
              <view class="pb-1">蛋白</view>
              <span class="text-sm font-bold opacity-60">
                {{ summaryData.danbai }}/{{ planData.danbai }}
              </span>
              <span class="text-sm text-stone-700">g</span>
            </view>
          </view>
        </view>
        <view class="flex gap-2" style="width: 140px">
          <view class="flex items-center justify-between">
            <image
              src="https://www.zshealthhelper.icu/zhifang2.png"
              style="height:43px;width:43px;"></image>
            <view class="right pl-2" style="font-size: 16px">
              <view class="pb-1">脂肪</view>
              <span class="text-sm font-bold opacity-60">
                {{ summaryData.zhifang }}/{{ planData.zhifang }}
              </span>
              <span class="text-sm text-stone-700">g</span>
            </view>
          </view>
        </view>
        <view class="flex gap-2" style="width: 140px">
          <view class="flex items-center justify-between">
            <image
              src="https://www.zshealthhelper.icu/tanshui2.png"
              style="width:43px;height:43px"></image>
            <view class="right pl-2" style="font-size: 16px">
              <view class="pb-1">碳水</view>
              <span class="text-sm font-bold opacity-60">
                {{ summaryData.tanshui }}/{{ planData.tanshui }}
              </span>
              <span class="text-sm text-stone-700">g</span>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="py-2"></view> -->

    <!-- <Overview /> -->
  </view>
</template>

<script setup lang="ts">
import SemiBar from '@/components/notebook/SemiBar.vue'
import Overview from './Overview.vue'
import Demo from '@/components/model/Demo.vue'
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
// const userId = userStore.userid
const userData = ref()

// onShow
onShow(() => {
  getUserData({
    url: '/user/' + userStore.userid,
    method: 'GET'
  })

  getTableData({
    url: '/record/summary/today/' + userStore.userid,
    method: 'GET'
  })

  getPlanTableData({
    url: '/user/plan/' + userStore.userid,
    method: 'GET'
  })
})

// 获取用户信息
function getUserData(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {},
    success: (res) => {
      userData.value = res.data.data
      console.log(userStore, 'userStore')
      console.log(userStore.userid, 'userStore.userid')
      console.log(userId, 'userId')
      console.log(userData.value, 'userData')
    }
  })
}

// TODO: summary data
const summaryData = ref({})
function getTableData(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    data: params.params ? params.params : {},
    header: {
      token:
        'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' // 自定义请求头信息
    },
    success: (res) => {
      summaryData.value = res.data.data
      // console.log(summaryData.value, 'summaryData')
      // console.log(111111)
    }
  })
}

const planData = ref({})
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
      // console.log(planData.value, 'planData')
      // console.log(22222)
    }
  })
}

function toTargetInfo() {
  uni.navigateTo({
    url: `/packageA/pages/Notebook/targetInfo`
  })
}

function toPersonalPage() {
  uni.navigateTo({
    url: `/packageB/pages/personalPage/personalPage`
  })
}

// sum of remommendData
// const planTotal = computed(() => {
//   return Object.values(planData.value).reduce((acc, cur) => acc + cur, 0)
// })

getUserData({
  url: '/user/' + userStore.userid,
  method: 'GET'
})

getTableData({
  url: '/record/summary/today/' + userStore.userid,
  method: 'GET'
})

getPlanTableData({
  url: '/user/plan/' + userStore.userid,
  method: 'GET'
})
</script>

<style scoped>
:root {
  --color: #a0c69d;
}

.header {
  font-family: 'Nanum', 'NoteSans';
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.tableMark {
  display: flex;
  justify-content: space-between;
  width: 190px;
  position: relative;
  top: -20px;
}
</style>