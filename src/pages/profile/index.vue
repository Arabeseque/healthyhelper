<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userId = userStore.userid

interface CheckboxItem {
  name: string
  value: string
  checked: boolean
}

const formData = ref({
  name: '',
  height: 0,
  weight: 0,
  targetWeight: 0,
  bmi: 0,
  age: 0
})

const checkboxItems = ref([
  { name: '高血压', value: 'hypertension', checked: false },
  { name: '高血脂', value: 'hyperlipemia', checked: false },
  { name: '高血糖', value: 'hyperglycemia', checked: false },
  { name: '高胆固醇', value: 'hypercholesterol', checked: false },
  { name: '怀孕', value: 'pregnant', checked: false }
])

const currentPage = ref(0)

function getFormData(checkboxItems: any) {
  const formData = {
    id: null,
    userId
  }

  checkboxItems.value.forEach((item: any) => {
    if (item.checked) {
      formData[item.value] = 1
    } else {
      formData[item.value] = 0
    }
  })

  return formData
}

function handleToDetail() {
  console.log('Next button clicked')
  console.log('formData', formData.value)
  // formData 有值
  // 跳转到下一页
  if (
    !formData.value.height ||
    !formData.value.weight ||
    !formData.value.targetWeight ||
    !formData.value.age
  ) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }
  currentPage.value += 1
}

function handleToFinish() {
  putUserInfo().then(() => {
    putDisInfo().then(() => {
      uni.showToast({
        title: '注册成功',
        icon: 'success'
      })
      uni.switchTab({
        url: '/pages/index/index'
      })
    })
  })

  // currentPage.value += 1
}

async function putUserInfo() {
  formData.value.bmi = (
    formData.value.weight /
    (formData.value.height / 100) ** 2
  ).toFixed(2)
  formData.value.height = formData.value.height/100
  // promise
  return new Promise((resolve, reject) => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + '/user/update',
      method: 'PUT',
      data: {
        id: userId,
        ...formData.value
      },
      success: (res) => {
        if (res.data.code === 200) {
          console.log(res.data.message, 'putUserInfo')
          uni.showToast({
            title: '用户信息更新成功',
            icon: 'none'
          })
          resolve(res)
        } else {
          uni.showToast({
            title: '用户信息更新失败',
            icon: 'none'
          })
          reject(res)
        }
      }
    })
  })
}

async function putDisInfo() {
  // promise
  return new Promise((resolve, reject) => {
    const data = getFormData(checkboxItems)
    uni.request({
      url: import.meta.env.VITE_BASE_API + '/disease',
      method: 'POST',
      data,
      success: (res) => {
        if (res.data.code === 200) {
          console.log(res, 'putDisInfo')

          resolve(res)
        }
      },
      fail: (err) => {
        console.log(err, 'putDisInfo')
      }
    })
  })
}

function handleCheckChange(e: any) {
  console.log('checkbox change', e.detail.value)
  const checkedValue = e.detail.value
  checkboxItems.value.forEach((item: CheckboxItem) => {
    if (checkedValue.includes(item.value)) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
}
</script>
<template>
  <view class="bg-[#eee]">
    <view class="bg-[#9dc9b6]" style="height: 25vh">
      <view class="flex items-center justify-center">
        <swiper class="swiper w-full" :current="currentPage">
          <swiper-item>
            <view class="mx-3 mt-28 box-border rounded-xl bg-white p-3">
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
                  基础信息
                </span>
              </view>

              <view class="py-2"></view>

              <view class="border-b-2 opacity-10"></view>

              <view class="py-2"></view>
              <label for="username">昵称:</label>

              <view class="py-2"></view>

              <fui-input
                borderTop
                placeholder="请输入昵称"
                v-model="formData.name"></fui-input>
              <view class="py-1"></view>

              <label for="username">年龄(岁):</label>

              <view class="py-1"></view>

              <fui-input
                borderTop
                placeholder="请输入年龄"
                v-model="formData.age"></fui-input>

              <view class="py-1"></view>

              <label for="username">当前体重(kg):</label>

              <view class="py-2"></view>

              <fui-input
                borderTop
                placeholder="请输入体重"
                v-model="formData.weight"></fui-input>
              <view class="py-1"></view>

              <label for="username">当前身高(cm):</label>

              <view class="py-1"></view>

              <fui-input
                borderTop
                placeholder="请输入身高"
                v-model="formData.height"></fui-input>

              <view class="py-1"></view>

              <label for="username">目标体重(kg):</label>

              <view class="py-1"></view>

              <fui-input
                borderTop
                placeholder="请输入目标体重"
                v-model="formData.targetWeight"></fui-input>

              <button
                class="mt-4 w-full rounded-lg bg-[#9dc9b6] py-2 text-white"
                @click="handleToDetail">
                下一步
              </button>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="mx-3 mt-28 box-border rounded-xl bg-white p-3">
              <view class="py-2"></view>

              <!-- 头像/用户名 -->
              <view class="flex items-center gap-2">
                <view
                  class="mx-2 flex h-16 w-16 flex-none items-center overflow-hidden rounded-full">
                  <image
                    class="logo"
                    src="https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </view>

                <view class="flex flex-col gap-2">
                  <span
                    class="flex w-40 flex-initial items-center pl-6 text-lg font-semibold">
                    疾病信息
                  </span>
                  <span
                    class="flex w-40 flex-initial items-center pl-6 text-lg">
                    请选择是否有以下疾病，我们将帮你推荐合适的食物
                  </span>
                </view>
              </view>
              <view class="border-b-2 py-2 opacity-10"></view>

              <view class="w-full pt-2">
                <checkbox-group @change="handleCheckChange">
                  <label
                    class="uni-list-cell uni-list-cell-pd"
                    v-for="item in checkboxItems"
                    :key="item.value">
                    <view class="flex items-center justify-between p-2">
                      <view>{{ item.name }}</view>
                      <view>
                        <checkbox :value="item.value" />
                      </view>
                    </view>
                  </label>
                </checkbox-group>
              </view>

              <button
                class="mt-4 w-full rounded-lg bg-[#9dc9b6] py-2 text-white"
                @click="handleToFinish">
                完成！
              </button>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="bg-blue-500">3</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- TODO: profile 滑动 -->
  </view>
</template>

<style>
.swiper {
  height: 100vh;
}
.fui-section__title {
  margin-left: 32rpx;
}

.fui-list__item {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 28rpx 32rpx;
  box-sizing: border-box;
}

.fui-text {
  font-size: 30rpx;
  padding-left: 16rpx;
}

.fui-list__cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
