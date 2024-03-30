<template>
  <div class="registration-container container">
    <h1 class="py-6 text-3xl">登录</h1>
    <form class="flex flex-col gap-6">
      <label for="username">用户名:</label>

      <view class="py-2"></view>

      <fui-input
        borderTop
        placeholder="请输入用户名"
        v-model="loginData.username"></fui-input>

      <view class="py-2"></view>
      <label for="password">密码:</label>
      <view class="py-2"></view>

      <fui-input
        borderTop
        placeholder="请输入密码"
        v-model="loginData.password"></fui-input>

      <view class="py-2"></view>

      <button type="submit" @click="handleLogin">登录</button>
      <view class="py-2"></view>

      <button type="submit" @click="handleRegister">注册</button>
    </form>
  </div>
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
        // console.log(userStore.userid, 'userStore.userid')
        uni.setStorageSync('token', res.data.data.token)
        uni.switchTab({
          url: '/pages/index/index'
        })
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
</style>
