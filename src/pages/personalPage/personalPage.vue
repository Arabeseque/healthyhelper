<template>
  <view class="bg-[#eee]" style="height: 100vh">
    <view class="bg-[#9dc9b6]" style="height: 25vh">
      <view class="py-4"></view>

      <!-- 健康档案&信息 -->
      <view class="m-3 box-border rounded-xl bg-white p-3">
        <view class="py-2"></view>

        <!-- 头像/用户名 -->
        <view class="flex">
          <view
            class="mx-2 flex flex-none items-center  relative">
            <image
              class="logo  h-16 w-16 overflow-hidden  rounded-full"
              src="https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <view class="vip h-5 w-5 absolute top-12 right-0" >
              <img class="h-5 w-5" src="http://129.204.224.187:8080/VIP.png" />
            </view>
          </view>
          <span
            class="flex w-40 flex-1 items-center pl-6 text-lg font-semibold">
            <view>{{ this.userData.name }}</view>
          </span>
          <view class="flex flex-initial items-center" @click="toPersonalInfo()">详情 ></view>
        </view>

        <view class="py-2"></view>

        <view class="border-b-2 opacity-10"></view>

        <view class="py-2"></view>

        <!-- 健康档案 -->
        <view>
          <view class="text-base">健康档案</view>
          <view class="py-1"></view>
          <view>
            <ul class="justify-center">
              <li class="flex justify-between">
                <view class="flex justify-between" style="width: 40vw">
                  <view>身高</view>
                  <view>{{ this.userData.height * 100 }}cm</view>
                </view>
                <view class="flex justify-between" style="width: 40vw">
                  <view>体重</view>
                  <view>{{ this.userData.weight }}kg</view>
                </view>
              </li>
              <view class="py-1"></view>

              <li class="flex justify-between">
                <view class="flex justify-between" style="width: 40vw">
                  <view>目标体重</view>
                  <view>{{ this.userData.targetWeight }}kg</view>
                </view>
                <view class="flex justify-between" style="width: 40vw">
                  <view>BMI</view>
                  <view>{{ this.userData.bmi }}</view>
                </view>
              </li>
              <view class="py-1"></view>
            </ul>
          </view>
        </view>
      </view>

      <!-- 我的数据 -->
      <view>
        <view class="m3 p-3 px-5 text-base">我的数据</view>
        <!-- <view class="py-1"></view> -->
        <view class="flex">
          <view class="m-3 box-border w-1/4 flex-1 rounded-xl bg-white p-3">
            <view class="icon h-8 w-8">
              <img
                class="h-8 w-8"
                src="http://129.204.224.187:8080/weight.png" />
            </view>
            <view class="mt-5 text-xl">{{ this.statusData.weightDayNum }}</view>
            <view class="py-1 text-xs">
              体重记录
              <span>/天</span>
            </view>
          </view>
          <view class="m-3 box-border w-1/4 flex-1 rounded-xl bg-white p-3">
            <view class="icon h-8 w-8">
              <img class="h-8 w-8" src="http://129.204.224.187:8080/heat.png" />
            </view>
            <view class="mt-5 text-xl">{{ this.statusData.hotDayNum }}</view>
            <view class="py-1 text-xs">
              热量记录
              <span>/天</span>
            </view>
          </view>
          <view class="m-3 box-border w-1/4 flex-1 rounded-xl bg-white p-3">
            <view class="icon h-8 w-8">
              <img class="h-8 w-8" src="http://129.204.224.187:8080/diet.png" />
            </view>
            <view class="mt-5 text-xl">{{ this.statusData.foodDayNum }}</view>
            <view class="py-1 text-xs">
              饮食记录
              <span>/天</span>
            </view>
          </view>
        </view>
      </view>

      <!-- 下方功能 -->
      <view class="m-3 box-border rounded-xl bg-white p-3">
        <view class="flex justify-between">
          <view>身体状态</view>
          <view>></view>
        </view>
        <view class="flex justify-between pt-4">
          <view>添加饮水</view>
          <view>></view>
        </view>
        <view class="flex justify-between pt-4">
          <view>自定义营养计划</view>
          <view>></view>
        </view>
        <view class="flex justify-between pt-4">
          <view>会员设置</view>
          <view>></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: '个人页面',
  mounted() {
    this.getUserData()
    this.getStatus()
  },
  data() {
    return {
      userData: '',
      statusData: ''
    }
  },
  methods: {
    // 获取用户信息
    getUserData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + `/user/1`,
        method: 'GET',
        header: {},
        success: (res) => {
          this.userData = res.data.data
        }
      })
    },
    // 获取用户小状态
    getStatus() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + `/user/status/1`,
        method: 'GET',
        header: {},
        success: (res) => {
          this.statusData = res.data.data
        }
      })
    },
    // 跳转用户详情
    // toPersonalInfo(){
        
    // }
  }
}
</script>
<style></style>
