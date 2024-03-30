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
            class="mx-2 flex h-16 w-16 flex-none items-center overflow-hidden rounded-full">
            <image
              class="logo"
              src="https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </view>
          <span
            class="flex w-40 flex-initial items-center pl-6 text-lg font-semibold">
            张秀荣
          </span>
          <view class="flex flex-initial items-center">详细 ></view>
        </view>

        <view class="py-2"></view>

        <view class="border-b-2 opacity-10"></view>

        <view class="py-2"></view>

        <!-- 健康档案 -->
        <view>
          <view class="text-base">健康档案</view>
          <view class="py-1"></view>
          <view >
            <ul class="justify-center">
              <li class="flex justify-between">
                <view class="flex justify-between" style="width:40vw">
                  <view>身高</view>
                  <view>173cm</view>
                </view>
                <view class="flex justify-between" style="width:40vw">
                  <view>体重</view>
                  <view>60KG</view>
                </view>
              </li>
              <view class="py-1"></view>

              <li class="flex justify-between">
                <view class="flex justify-between" style="width:40vw">
                  <view>目标体重</view>
                  <view>65KG</view>
                </view>
                <view class="flex justify-between" style="width:40vw">
                  <view>BMI</view>
                  <view>18</view>
                </view>
              </li>
              <view class="py-1"></view>
            </ul>
          </view>
        </view>
      </view>

       <!-- 我的数据 -->
        <view>
            <view class="m3 p-3">我的数据</view>
            <!-- <view class="py-1"></view> -->
            <view class="flex">
                <view class="m-3 box-border rounded-xl bg-white p-3 w-1/4 flex-1">
                    <view class="icon">标</view>
                    <view class="mt-8 text-xl">1</view>
                    <view class="text-xs py-1">体重记录<span>/天</span></view>
                </view>
                <view class="m-3 box-border rounded-xl bg-white p-3 w-1/4 flex-1">
                    <view class="icon">标</view>
                    <view class="mt-8 text-xl">1</view>
                    <view class="text-xs py-1">热量记录<span>/天</span></view>
                </view>
                <view class="m-3 box-border rounded-xl bg-white p-3 w-1/4 flex-1">
                    <view class="icon">标</view>
                    <view class="mt-8 text-xl">1</view>
                    <view class="text-xs py-1">饮食记录<span>/天</span></view>
                </view>
            </view>
        </view>

        <!-- 下方功能 -->
        <view class="m-3 box-border rounded-xl bg-white p-3">
            <view class="flex justify-between">
                <view>我的疾病</view>
                <view>></view>
            </view>
            <view class="flex justify-between pt-4">
                <view>体重管理</view>
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
        </view>
    </view>
  </view>
</template>
<style></style>
