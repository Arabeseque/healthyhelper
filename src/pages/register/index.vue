<template>
  <view style="height: 100vh; background: #fff">
    <view class="img-a">
      <view class="t-b">
        您好，
        <br />
        欢迎使用，智膳生活
      </view>
    </view>
    <view class="login-view" style="">
      <view class="t-login">
        <form class="cl">
          <view class="t-a">
            <text class="txt">用户名</text>
            <input
              type="text"
              name="username"
              placeholder="请输入您的用户名"
              maxlength="11"
              v-model="registerData.username" />
          </view>
          <view class="t-a">
            <text class="txt">密码</text>
            <input
              type="password"
              name="code"
              maxlength="18"
              placeholder="请输入您的密码"
              v-model="registerData.password" />
          </view>
          <button @click="handleRegister">注册</button>
        </form>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const registerData = ref({
  username: '',
  password: '',
  age: 0
})

function handleRegister() {
  console.log('Register button clicked')
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/user/index/register',
    method: 'POST',
    data: {
      username: registerData.value.username,
      password: registerData.value.password
      // age: registerData.value.age
    },
    success: (res) => {
      if (res.data.code === 200) {
        console.log(res, 'registerRes')
        uni.setStorageSync('token', 'tokenMock')

        postUserLogin().then(() => {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/profile/index'
            })
          }, 500)
        })

        // uni.switchTab({
        //   url: '/pages/index/index'
        // })
      } else {
        uni.showToast({
          title: '用户已经存在',
          icon: 'none'
        })
      }
    }
  })
}

async function postUserLogin() {
  return new Promise((resolve) => {
    uni.request({
      url: import.meta.env.VITE_BASE_API + '/user/index/login',
      method: 'POST',
      data: {
        username: registerData.value.username,
        password: registerData.value.password
      },
      success: (res) => {
        if (res.data.code === 200) {
          userStore.userid = res.data.data.id

          uni.setStorageSync('token', res.data.data.token)
          resolve(res)
        } else {
          uni.showToast({
            title: '账户或密码错误',
            icon: 'none'
          })
        }
      }
    })
  })
}
</script>

<style scoped>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400');
}

.registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.input-large {
  width: 300px;
  height: 40px;
}

/* Add your custom styles here */
.rounded-lg {
  border-radius: 8px;
}

.txt {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}
.img-a {
  width: 100%;
  height: 450rpx;
  /* background-image: url(https://www.zshealthhelper.icu/back1.png); */
  background-image: url(https://www.zshealthhelper.icu/back1.png);
  background-size: 100%;
}
.reg {
  font-size: 28rpx;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 50rpx;
  font-weight: bold;
  background: #f5f6fa;
  color: #000000;
  text-align: center;
  margin-top: 30rpx;
}

.login-view {
  width: 100%;
  position: relative;
  margin-top: -120rpx;
  background-color: #ffffff;
  border-radius: 8% 8% 0% 0;
}

.t-login {
  width: 600rpx;
  margin: 0 auto;
  font-size: 28rpx;
  padding-top: 80rpx;
}

.t-login button {
  font-size: 28rpx;
  background: #96b38d;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 50rpx;
  font-weight: bold;
}

.t-login input {
  height: 90rpx;
  line-height: 90rpx;
  margin-bottom: 50rpx;
  border-bottom: 1px solid #e9e9e9;
  font-size: 28rpx;
}

.t-login .t-a {
  position: relative;
}

.t-b {
  text-align: left;
  font-size: 42rpx;
  color: #ffffff;
  padding: 130rpx 0 0 70rpx;
  font-weight: bold;
  line-height: 70rpx;
}

.t-login .t-c {
  position: absolute;
  right: 22rpx;
  top: 22rpx;
  background: #5677fc;
  color: #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 25rpx;
}

.t-login .t-d {
  text-align: center;
  color: #999;
  margin: 80rpx 0;
}

.t-login .t-e {
  text-align: center;
  width: 250rpx;
  margin: 80rpx auto 0;
}

.t-login .t-g {
  float: left;
  width: 50%;
}

.t-login .t-e image {
  width: 50rpx;
  height: 50rpx;
}

.t-login .t-f {
  text-align: center;
  margin: 150rpx 0 0 0;
  color: #666;
}

.t-login .t-f text {
  margin-left: 20rpx;
  color: #aaaaaa;
  font-size: 27rpx;
}

.t-login .uni-input-placeholder {
  color: #aeaeae;
}

.cl {
  zoom: 1;
}

.cl:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  content: '\20';
}
</style>
