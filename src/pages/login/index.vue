<script setup lang="ts">
function formSubmit(e: any) {
  console.log(
    'form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value)
  )
  var formdata = e.detail.value
  uni.showModal({
    content: '表单数据内容：' + JSON.stringify(formdata),
    showCancel: false
  })
}

function formReset(e: any) {
  console.log('form发生了reset事件')
  uni.showModal({
    content: '表单已重置',
    showCancel: false
  })
}
</script>

<template>
  <view class="content flex flex-col items-center justify-center gap-2">
    <view
      class="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 p-5">
      <view
        class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
        <image
          class="logo"
          src="https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </view>
      <text class="text-xl font-bold">Shane H</text>
      <text class="text-xs text-gray-500">
        修改信息，以便为你提供更加精准的热量计算
      </text>
    </view>

    <form
      @submit="formSubmit"
      @reset="formReset"
      class="border-box mx-2 w-[95vw] rounded-md bg-gray-100 px-2 shadow-md">
      <view class="flex justify-between border py-3">
        <view>生理性别</view>
        <view>
          <radio-group className="flex gap-5">
            <label>
              <view>
                <radio>男士</radio>
              </view>
            </label>
            <label>
              <view>
                <radio>女士</radio>
              </view>
            </label>
          </radio-group>
        </view>
      </view>

      <view class="flex justify-between border py-3">
        <view>年龄</view>
        <view>
          <radio-group class="flex gap-5">
            <label>
              <view>
                <radio>男士</radio>
              </view>
            </label>
            <label>
              <view>
                <radio>女士</radio>
              </view>
            </label>
          </radio-group>
        </view>
      </view>

      <view class="uni-btn-v">
        <button form-type="submit">Submit</button>
        <button form-type="reset">Reset</button>
      </view>
    </form>
  </view>
</template>

<style></style>
