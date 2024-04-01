<template>
  <view>
    <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <!-- Header -->
        <view class="py-2">今日摄入量</view>

        <!-- 分割线 -->
        <view class="border opacity-10"></view>

        <view>
          <view
            class="flex flex-col gap-2 pt-3"
            v-for="(item, key, index) in planData"
            :key="key">
            <!-- 目标清单 -->
            <view class="flex items-center justify-between">
              <span>{{ name[index] }}</span>
              <span class="text-sm opacity-60">
                {{ todayData[key] }}/{{ item }} {{ danwei[index] }}
              </span>
            </view>
            <view>
              <progress
                :percent="todayArr[index]"
                stroke-width="15"
                border-radius="6"
                color="#d07c6c" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script >
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

export default {
  data() {
    return {
      planData: '',
      todayData: '',
      todayArr: [],
      danwei: [
        '千卡',
        '克',
        '克',
        '克',
        '克',
        '微克',
        '微克',
        '毫克',
        '毫克',
        '毫克',
        '毫克',
        '微克',
        '毫克',
        '毫克',
        '毫克',
        '微克',
        '毫克',
        '毫克',
        '毫克',
        '毫克',
        '毫克'
      ],
      name: [
        '热量',
        '蛋白',
        '脂肪',
        '碳水',
        '纤维',
        '维生素A',
        '胡罗卜素',
        '盐酸',
        '维生素C',
        '维生素E',
        '胆固醇',
        '钾',
        '钠',
        '钙',
        '镁',
        '铁',
        '锰',
        '锌',
        '铜',
        '磷',
        '锡'
      ]
    }
  },
  onLoad() {
    this.getPlanTableData()
    this.getTodayData()
    setTimeout(() => {
      this.rating()
    }, 200);
  },
  mounted(){
    uni.$on('refreshCalendar', () => {
      this.getPlanTableData()
      this.getTodayData()
      this.rating()
    })
  },
  methods: {
    // 获取计划数据
    getPlanTableData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/plan/' + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          this.planData = res.data.data
          // console.log(this.planData,"pladnData")
        }
      })
    },
    // 获取今日数据
    getTodayData() {
      // console.log(222222)
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/record/summary/today/' + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          // console.log(1111111)
          this.todayData = res.data.data
        }
      })
    },
    // 插入比例数据
    rating(){
      for (var temp in this.todayData) {
            this.todayArr.push((this.todayData[temp] / this.planData[temp]) * 100)
          }
          // console.log(this.todayArr,"todayArr")
    },
    
  }
}

</script>
