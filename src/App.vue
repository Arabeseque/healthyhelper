<script setup lang="ts">
import { setToken } from '@/utils/auth'

onLaunch(() => {
  // const token = uni.getStorageSync('token')
  // if (!token || token === 'null') {
  //   // 未找到 token，跳转到登录页
    uni.redirectTo({
      url: '/pages/login/index'
    })
  // }
  // uni.redirectTo({
  //   url: '/pages/login/index'
  // })
  // uni.login({
  //   provider: 'weixin',
  //   success: function (loginRes) {W
  //     console.log(loginRes.authResult)
  //     // 获取用户信息
  //     uni.getUserInfo({
  //       provider: 'weixin',
  //       success: function (infoRes) {
  //         // console.log(infoRes)
  //       }
  //     })
  //     // TODO: 是否可以使用手段来快速推进？
  //     // 调用微信 API 登录
  //     // 直接 setToken 模拟登录
  //     setToken(
  //       'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0MjGzMDKz1FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAFG2HZRBAAAA.zJ5x45yNYTJRgcsglmDhw-nsSx6ZpAsKqne_QR0DaO4tk-b85dUv4TgNefOE5YeY5HPvxrbvuCB0t8Ir78w1tw'
  //     )
  //   }
  // })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
onError((err) => {
  console.log('App Error', err)
})
</script>
<style lang="scss">
:root {
  font-family: 'Nanum', 'NoteSans';
}

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
