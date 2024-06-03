<template>
  <view style="height: 100vh; background: #fff">
    <view class="img-a">
      <view class="t-b">
        <span class="pb-2 text-3xl font-bold">智膳生活</span>
        <br />
        <span class="text-xl font-bold">WLECOME</span>
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
              v-model="loginData.username" />
          </view>
          <view class="t-a">
            <text class="txt">密码</text>
            <input
              type="password"
              name="code"
              maxlength="18"
              placeholder="请输入您的密码"
              v-model="loginData.password" />
          </view>
          <button @click="handleLogin">登 录</button>
          <view class="reg" @click="handleRegister">注 册</view>
        </form>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const loginData = reactive({
  username: '',
  password: ''
})

const userStore = useUserStore()

function handleLogin() {
  console.log('Login button clicked')
  uni.request({
    url: import.meta.env.VITE_BASE_API + '/user/index/login',
    method: 'POST',
    data: {
      username: loginData.username,
      password: loginData.password
    },
    success: (res) => {
      if (res.data.code === 200) {
        // console.log(res.data, 'loginRes')
        userStore.userid = res.data.data.id
        console.log(userStore.userid, 'userStore.userid')
        uni.setStorageSync('token', res.data.data.token)

        uni.showToast({
          title: '登录成功',
          icon: 'none'
        })

        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }, 500)
      } else {
        uni.showToast({
          title: '账户或密码错误',
          icon: 'none'
        })
      }
    }
  })
}

function handleRegister() {
  console.log('Register button clicked')
  uni.redirectTo({
    url: '/pages/register/index'
  })
}
</script>

<style scoped>
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-image: url('https://www.zshealthhelper.icu/back1.png'); */
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
  width: 100%; /* 图片容器的宽度 */
  height: 800rpx; /* 图片容器的高度 */
  background-color: #96b38d; /* 底色 */

  /* 设置背景图片 */
  background-image: url(https://www.zshealthhelper.icu/login.png);
  background-size: auto; /* 图片大小设置为auto，保持图片原始比例 */

  /* 居中图片 */
  background-position: center 13%; /* 设置背景图片居中，垂直位置上移 10% */

  /* 确保图片不会重复 */
  background-repeat: no-repeat;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 480rpx;
  color: #fcfefc;
  justify-content: center;
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
