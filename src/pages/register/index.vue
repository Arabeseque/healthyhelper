<template>
  <div class="registration-container container">
    <h1 class="py-6 text-3xl">注册</h1>
    <form class="flex flex-col gap-6">
      <label for="username">用户名:</label>

      <view class="py-2"></view>

      <fui-input
        borderTop
        placeholder="请输入用户名"
        v-model="registerData.username"></fui-input>

      <view class="py-2"></view>
      <label for="password">密码:</label>
      <view class="py-2"></view>

      <fui-input
        borderTop
        placeholder="请输入密码"
        v-model="registerData.password"></fui-input>

      <view class="py-2"></view>

      <!-- 年龄 -->
      <label for="age">年龄:</label>
      <view class="py-2"></view>

      <fui-input
        borderTop
        placeholder="请输入年龄"
        v-model="registerData.age"></fui-input>
      <view class="py-2"></view>

      <button type="submit" @click="handleRegister">注册</button>
    </form>
  </div>
</template>

<script setup lang="ts">
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
      password: registerData.value.password,
      age: registerData.value.age
    },
    success: (res) => {
      if (res.data.code === 200) {
        console.log(res, 'registerRes')
        uni.setStorageSync('token', 'tokenMock')
        // 回到首页
        uni.switchTab({
          url: '/pages/index/index'
        })
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: '注册失败',
          icon: 'none'
        })
      }
    }
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
