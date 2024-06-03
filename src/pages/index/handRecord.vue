<template>
  <view class="h-[100vh] bg-[#96b38d] pt-4">
    <view class="p-4">
      <view class="flex items-center justify-center">
        <fui-input
          v-model="queryData.query"
          label="食品"
          borderTop
          placeholder="输入食品的名称"></fui-input>

        <button
          @click="getSearch"
          class="ml-2 flex aspect-square items-center justify-center overflow-hidden rounded-full">
          <image
            src="https://www.zshealthhelper.icu/search.png"
            style="width: 33px; height: 33px"></image>
        </button>
      </view>

      <view class="pt-4"></view>
      <!-- 列表 -->
      <scroll-view class="rounded-[20px] h-[61vh]" v-show="showSearch" scroll-y="true">
        <fui-list
          class="rounded-[20px]"
          v-for="(item, index) in searchData"
          :key="index">
          <fui-list-cell @click="getName(item)">{{ item }}</fui-list-cell>
        </fui-list>
      </scroll-view>

      <!-- 后续提交 -->
      <view v-show="showNext">
        <view>
          <fui-input
            label="重量"
            v-model="queryData.weight"
            borderTop
            placeholder="输入食品的重量(g)"></fui-input>
        </view>

        <view class="flex justify-between pt-4">
          <button
            @click="inputData"
            class="photo w-[150px] rounded-[50px] bg-[#f9a647] p-1 text-white">
            添加
          </button>

          <button
            class="photo w-[150px] rounded-[50px] bg-[#f9a647] p-1 text-white"
            @click="cancel">
            取消
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

export default {
  data() {
    return {
      queryData: {
        query: '',
        weight: ''
      },
      searchData: '',
      showSearch: false,
      showNext: true
    }
  },
  methods: {
    getSearch() {
      if (this.queryData.query != '') {
        uni.request({
          url: import.meta.env.VITE_BASE_API + `/nutrition/search`,
          method: 'GET',
          data: {
            query: this.queryData.query
          },
          header: {},
          success: (res) => {
            this.searchData = res.data.data
            if (this.searchData !== '未查询到数据') {
              this.showNext = false
              this.showSearch = true
            } else {
              this.showNext = true
              this.showSearch = false
              uni.showToast({
                title: '未查询到该食物',
                icon: 'none'
              })
            }
          }
        })
      } else {
        uni.showToast({
          title: '请先输入食物名称',
          icon: 'none'
        })
        this.showNext = true
        this.showSearch = false
      }
    },
    getName(res) {
      this.queryData.query = res
      this.showSearch = false
      this.showNext = true
    },
    formatTime(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },

    inputData() {
      // 计算foodType
      const now = new Date()
      const hour = now.getHours()
      if (hour >= 5 && hour <= 9) var foodType = 'breakfast'
      else if (hour >= 10 && hour <= 14) var foodType = 'lunch'
      else if (hour >= 16 && hour <= 20) var foodType = 'dinner'
      else if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 4))
        var foodType = 'midnightSnack'
      else var foodType = 'snacks'
      var tempDate = this.formatTime(new Date())

      uni.request({
        url: import.meta.env.VITE_BASE_API + '/record/foods/foodName/userId',
        method: 'POST',
        data: [
          {
            userId,
            // foodId: item.id,
            time: tempDate,
            foodName: this.queryData.query,
            weight: this.queryData.weight,
            foodType
          }
        ],
        success: (res) => {
          setTimeout(() => {
            uni.reLaunch({
              url: '../../pages/index/index'
            })
          }, 500)
        }
      })
    },
    cancel() {
      setTimeout(() => {
        uni.reLaunch({
          url: '../../pages/index/index'
        })
      }, 500)
    }
  }
}
</script>
