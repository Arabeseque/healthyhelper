<script setup>
// 体重曲线
import Line from '@/packageB/component/Line.vue'
</script>

<template>
  <view class="bg-[#eee]" style="height: 100vh">
    <view class="pt-8"></view>
    <view class="mx-3 box-border rounded-xl bg-white p-4 pt-6">
      <view class="flex justify-between" @click="openWeight">
        <view>当前体重</view>
        <view>{{ userData.weight }}kg ></view>
      </view>

      <view class="pt-8"></view>

      <view class="flex justify-between">
        <view>目标体重</view>
        <view>{{ userData.targetWeight }}kg</view>
      </view>

      <view class="pt-8"></view>

      <view>
        <view class="flex items-center justify-between">
          <span>体重进度</span>
          <span class="text-sm opacity-60">当前体重(kg)->目标体重(kg)</span>
        </view>
        <view>
          <view class="pt-2"></view>
          <progress
            :percent="targetArr"
            stroke-width="15"
            border-radius="6"
            color="#d07c6c" />
        </view>
      </view>

      <view class="pt-8"></view>

      <view
        class="box flex justify-center"
        v-show="isShow"
        @click="toWeightInfo"
        style="height: 300px;">
        <Line :reshow="isShow" class="flex justify-center" />
      </view>
      <view class="pt-2"></view>
    </view>

    <uni-popup ref="popupWeight" type="bottom" :is-mask-click="false">
      <view>
        <picker-view
          class="picker-view bg-[#fff]"
          :value="weight.value"
          @change="changeWeight">
          <picker-view-column>
            <view
              class="item"
              v-for="(item1, index) in weight.weight1"
              :key="index">
              {{ item1 }}
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="item"
              v-for="(item2, index) in weight.weight2"
              :key="index">
              {{ item2 }}
            </view>
          </picker-view-column>
        </picker-view>
        <view class="flex justify-between bg-[#fff] py-4">
          <button
            class="cancel"
            style="color: rgb(26, 173, 25)"
            @click="closeWeight">
            取消
          </button>
          <button class="confirm" type="primary" @click="confirmWeight">
            确定
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import uniPopup from '@/packageB/component/uni-popup/components/uni-popup/uni-popup.vue'
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

export default {
  name: '记录体重',
  components: {
    uniPopup
  },
  data() {
    // 体重
    const weight1 = []
    const weight2 = []

    for (let i = 10; i <= 200; i++) {
      weight1.push(i)
    }
    for (let i = 0; i <= 9; i++) {
      weight2.push(i)
    }

    return {
      isShow: 'true',
      userData: '',
      weight: {
        value: [],
        weight1,
        weight2
      },
      // 修改表单数据
      postForm: {
        userId: '',
        recordWeight: '',
        recordTime: ''
      },
      targetArr: ''
    }
  },
  mounted() {
    this.getUserData()
    this.postTime()
  },
  methods: {
    // 获取用户数据
    getUserData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/' + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          this.userData = res.data.data
          const weight = this.userData.weight.toString()
          this.weight.value.push(weight.split('.')[0] - 10)
          this.weight.value.push(weight.split('.')[1])

          // console.log(this.weight.value,"weightValue")
          if (this.userData.weight < this.userData.targetWeight) {
            this.targetArr =
              (this.userData.weight / this.userData.targetWeight) * 100
          } else {
            this.targetArr =
              (this.userData.targetWeight / this.userData.weight) * 100
          }

          this.postForm.recordWeight = this.userData.weight
          this.postForm.userId = userId
        }
      })
    },
    //计算时间
    postTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      this.postForm.recordTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      console.log(this.postForm.recordTime, 'recordTime')
    },
    //打开体重列表
    openWeight() {
      this.$refs.popupWeight.open('bottom')
      this.isShow = false
    },
    //取消
    closeWeight() {
      this.$refs.popupWeight.close()
      this.isShow = true
    },
    changeWeight(e) {
      const zhengshu = e.detail.value[0]
      const xiaoshu = e.detail.value[1]
      const string = zhengshu + 10 + '.' + xiaoshu
      const num = parseFloat(string)
      this.postForm.recordWeight = num

      console.log(this.postForm.recordWeight, 'recordWeight')
    },
    //上传体重
    confirmWeight() {
      this.weight.value.length = 0
      const change = this.postForm.recordWeight.toString()
      this.weight.value.push(change.split('.')[0])
      this.weight.value.push(change.split('.')[1])
      // console.log(this.weight.value,"weightValue")
      // console.log(this.postForm.recordWeight,"recordWeight")
      // console.log(this.postForm,"postForm")

      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/recordWeight',
        method: 'POSt',
        data: this.postForm,
        success: (res) => {
          if (res.data.code === 200) {
            uni.showToast({
              title: '记录体重成功',
              icon: 'none'
            })
            setTimeout(() => {
              uni.redirectTo({
                url: '/packageB/pages/personalPage/recordWeight'
              })
            }, 500)
          }
        }
      })

      this.$refs.popupWeight.close()
    },

    //跳转体重详情 
    toWeightInfo() {
      uni.navigateTo({
        url: `/packageA/pages/Notebook/weightInfo`
      })
    }
  }
}
</script>
<style>
.box {
  width: 100%;
  height: 300px;
}
.test-popup {
  background: white;
  border-radius: 20px;
  height: 30vh;
}
.picker-view {
  width: 750rpx;
  height: 30vh;
  margin-top: 20rpx;
}
.item {
  line-height: 55rpx;
  text-align: center;
}
</style>
