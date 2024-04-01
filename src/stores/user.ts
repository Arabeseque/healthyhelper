import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userid = ref('')
  const userInfo = ref({})
  const isLogin = ref(false)

  const shouldRefesh = ref(false)

  function login(userInfo) {
    userInfo.value = userInfo
    isLogin.value = true
  }

  function logout() {
    userInfo.value = {}
    isLogin.value = false
  }

  const getUserName = computed(() => userInfo.value.name)

  return {
    shouldRefesh,
    userid,
    userInfo,
    isLogin,
    login,
    logout,
    getUserName
  }
})
