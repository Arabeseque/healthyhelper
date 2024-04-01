<template>
  <view class="bg-[#eee]" style="height: 100vh">
    <!-- 用户头像&用户名 -->
    <view>
      <view class="avator flex flex-col items-center pt-4">
        <image
          class="logo h-16 w-16 overflow-hidden rounded-full"
          src="https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <view class="name pt-2 text-lg font-semibold">{{ userData.name }}</view>
        <view class="pt-2 text-xs font-light" style="color: #333">
          修改信息,以便为您提供更加精准的计算
        </view>
      </view>
    </view>

    <!-- 下方修改 -->
    <view class="m-3 box-border rounded-xl bg-white p-3">
      <view class="flex justify-between">
        <view>生理性别</view>
        <view class="uni-padding-wrap">
          <view>
            <radio-group @change="radioChange">
              <label
                class="radio px-4"
                v-for="(item, index) in sex"
                :key="index">
                <radio :checked="item.checked" :value="item.value" />
                {{ item.name }}
              </label>
            </radio-group>
          </view>
        </view>
      </view>
      <view class="flex justify-between pt-4" @click="open()">
        <view>年龄</view>
        <view>{{ userData.age }} ></view>
      </view>
      <view class="flex justify-between pt-4" @click="openHeight()">
        <view>身高</view>
        <view>{{ userData.height * 100 }}cm ></view>
      </view>
      <view class="flex justify-between pt-4" @click="openWeight()">
        <view>当前体重</view>
        <view>{{ userData.weight }}kg ></view>
      </view>
      <view class="flex justify-between pt-4" @click="openTargetWeight()">
        <view>目标体重</view>
        <view>{{ userData.targetWeight }}kg ></view>
      </view>
      <view class="flex justify-between pt-4">
        <view>BMI</view>
        <view>{{ userData.bmi }}</view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <button class="confirm m-3 mt-6" type="primary" @click="postData">
      确定修改
    </button>

    <!-- -------------------底部弹窗------------------------- -->
    <!-- 年龄 -->
    <uni-popup ref="popup" type="bottom">
      <!-- <view class="test-popup">你好,底部弹出</view> -->
      <view>
        <picker-view
          class="picker-view bg-[#fff]"
          :value="age.value"
          @change="changeAge">
          <picker-view-column>
            <view class="item" v-for="(item, index) in age.ages" :key="index">
              {{ item }}
            </view>
          </picker-view-column>
        </picker-view>
        <view class="flex justify-between bg-[#fff] py-4">
          <button class="cancel" style="color: rgb(26, 173, 25)" @click="close">
            取消
          </button>
          <button class="confirm" type="primary" @click="confirm">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 身高 -->
    <uni-popup ref="popupHeight" type="bottom">
      <!-- <view class="test-popup">你好,底部弹出</view> -->
      <view>
        <picker-view
          class="picker-view bg-[#fff]"
          :value="height.value"
          @change="changeHeight">
          <picker-view-column>
            <view
              class="item"
              v-for="(item, index) in height.height"
              :key="index">
              {{ item }}
            </view>
          </picker-view-column>
        </picker-view>
        <view class="flex justify-between bg-[#fff] py-4">
          <button
            class="cancel"
            style="color: rgb(26, 173, 25)"
            @click="closeHeight">
            取消
          </button>
          <button class="confirm" type="primary" @click="confirmHeight">
            确定
          </button>
        </view>
      </view>
    </uni-popup>

    <!-- 体重 -->
    <uni-popup ref="popupWeight" type="bottom">
      <!-- <view class="test-popup">你好,底部弹出</view> -->
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

    <!-- 目标体重 -->
    <uni-popup ref="popupTargetWeight" type="bottom">
      <!-- <view class="test-popup">你好,底部弹出</view> -->
      <view>
        <picker-view
          class="picker-view bg-[#fff]"
          :value="targetWeight.value"
          @change="changeTargetWeight">
          <picker-view-column>
            <view
              class="item"
              v-for="(item1, index) in targetWeight.targetWeight1"
              :key="index">
              {{ item1 }}
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="item"
              v-for="(item2, index) in targetWeight.targetWeight2"
              :key="index">
              {{ item2 }}
            </view>
          </picker-view-column>
        </picker-view>
        <view class="flex justify-between bg-[#fff] py-4">
          <button
            class="cancel"
            style="color: rgb(26, 173, 25)"
            @click="closeTargetWeight">
            取消
          </button>
          <button class="confirm" type="primary" @click="confirmTargetWeight">
            确定
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

export default {
  name: '修改信息',
  components: {
    uniPopup
  },
  data() {
    // 年龄
    const ages = []

    for (let i = 0; i <= 100; i++) {
      ages.push(i)
    }

    // 身高
    const height = []

    for (let i = 0; i <= 200; i++) {
      height.push(i)
    }

    // 体重
    const weight1 = []
    const weight2 = []

    for (let i = 10; i <= 200; i++) {
      weight1.push(i)
    }
    for (let i = 0; i <= 99; i++) {
      weight2.push(i)
    }

    // 目标体重
    const targetWeight1 = []
    const targetWeight2 = []

    for (let i = 10; i <= 200; i++) {
      targetWeight1.push(i)
    }
    for (let i = 0; i <= 99; i++) {
      targetWeight2.push(i)
    }

    return {
      user: '',
      userData: {
        name: '',
        age: '',
        height: '',
        weight: '',
        targetWeight: '',
        gender: '',
        bmi: ''
      },
      // 表单数据
      sex: [
        { name: '男', checked: false, value: 1 },
        { name: '女', checked: false, value: 0 }
      ],
      age: {
        value: [],
        ages
      },
      height: {
        value: [],
        height
      },
      weight: {
        value: [],
        weight1,
        weight2
      },
      targetWeight: {
        value: [],
        targetWeight1,
        targetWeight2
      },
      // 修改表单数据
      postForm: {
        id: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        targetWeight: '',
        bmi: '',
        tel: '',
        isVip: '',
        email: '',
        id: '',
        geography: '',
        head: '',
        password: '',
        username: ''
      }
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    // 获取用户数据
    getUserData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/' + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          this.user = res.data.data
          this.userData.name = this.user.username
          this.userData.age = this.user.age
          this.userData.height = this.user.height
          this.userData.weight = this.user.weight
          this.userData.targetWeight = this.user.targetWeight
          this.userData.gender = this.user.gender
          this.userData.bmi = this.user.bmi

          //   post表单信息
          this.postForm.name = this.user.name
          this.postForm.age = this.user.age
          this.postForm.height = this.user.height
          this.postForm.weight = this.user.weight
          this.postForm.targetWeight = this.user.targetWeight
          this.postForm.gender = this.user.gender
          this.postForm.bmi = this.user.bmi
          this.postForm.id = this.user.id
          this.postForm.tel = this.user.tel
          this.postForm.siVip = this.user.isVip
          this.postForm.email = this.user.email
          this.postForm.geography = this.user.geography
          this.postForm.head = this.user.head
          this.postForm.password = this.user.password
          this.postForm.username = this.user.username

          if (this.userData.gender == 0) this.sex[1].checked = true
          else this.sex[0].checked = true

          this.age.value.push(this.userData.age)
          this.height.value.push(this.userData.height * 100)

          const weight = this.userData.weight.toString()
          this.weight.value.push(weight.split('.')[0] - 10)
          this.weight.value.push(weight.split('.')[1])

          const targetWeight = this.userData.targetWeight.toString()
          this.targetWeight.value.push(targetWeight.split('.')[0] - 10)
          this.targetWeight.value.push(targetWeight.split('.')[1])
        }
      })
    },

    // 获取表单信息
    radioChange(e) {
      this.postForm.gender = e.detail.value
    },
    changeAge(e) {
      this.postForm.age = e.detail.value[0]
      // console.log(this.postForm.age,"age")
    },
    changeHeight(e) {
      this.postForm.height = e.detail.value[0] / 100
      console.log(this.postForm.height, 'height')
    },
    changeWeight(e) {
      const zhengshu = e.detail.value[0]
      const xiaoshu = e.detail.value[1]
      const string = zhengshu + 10 + '.' + xiaoshu
      const num = parseFloat(string)
      this.postForm.weight = num
      // console.log(this.postForm.weight,"weight")
    },
    changeTargetWeight(e) {
      const zhengshu = e.detail.value[0]
      const xiaoshu = e.detail.value[1]
      const string = zhengshu + 10 + '.' + xiaoshu
      const num = parseFloat(string)
      this.postForm.targetWeight = num
      // console.log(this.postForm.targetWeight,"targetWeight")
    },
    // ------------------------------底部窗口操作---------------------------------
    // age操作
    open() {
      this.$refs.popup.open('bottom') // 底部弹出
    },
    close() {
      this.$refs.popup.close()
    },
    confirm() {
      this.userData.age = this.postForm.age
      this.age.value.length = 0
      this.age.value.push(this.postForm.age)
      this.$refs.popup.close()
    },
    // height操作
    openHeight() {
      this.$refs.popupHeight.open('bottom') // 底部弹出
    },
    closeHeight() {
      this.$refs.popupHeight.close() // 关弹窗
    },
    confirmHeight() {
      this.userData.height = this.postForm.height
      this.height.value.length = 0
      this.height.value.push(this.postForm.height * 100)
      const caculator =
        this.userData.weight / this.userData.height / this.userData.height
      this.postForm.bmi = caculator.toFixed(2)
      this.userData.bmi = this.postForm.bmi
      this.$refs.popupHeight.close()
    },
    // weight操作
    openWeight() {
      this.$refs.popupWeight.open('bottom')
    },
    closeWeight() {
      this.$refs.popupWeight.close()
    },
    confirmWeight() {
      this.userData.weight = this.postForm.weight
      this.weight.value.length = 0
      const change = this.postForm.weight.toString()
      this.weight.value.push(change.split('.')[0] - 10)
      this.weight.value.push(change.split('.')[1])
      const caculator =
        this.userData.weight / this.userData.height / this.userData.height
      this.postForm.bmi = caculator.toFixed(2)
      this.userData.bmi = this.postForm.bmi
      this.$refs.popupWeight.close()
    },
    // targetWeight
    openTargetWeight() {
      this.$refs.popupTargetWeight.open('bottom')
    },
    closeTargetWeight() {
      this.$refs.popupTargetWeight.close()
    },
    confirmTargetWeight() {
      this.userData.targetWeight = this.postForm.targetWeight
      this.targetWeight.value.length = 0
      const change = this.postForm.targetWeight.toString()
      this.targetWeight.value.push(change.split('.')[0] - 10)
      this.targetWeight.value.push(change.split('.')[1])
      this.$refs.popupTargetWeight.close()
    },
    // 上传修改信息
    postData() {
      console.log(this.postForm, 'postForm')
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/update',
        method: 'PUT',
        data: this.postForm,
        success: (res) => {
          if (res.data.code === 200) {
            uni.navigateBack({
              delta: 1,
              success() {
                prePage.$vm.goCurrent() // 当返回成功的时候调用上一级页面的回调
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
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
