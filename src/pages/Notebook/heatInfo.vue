<template>
  <view>
    <view class="bg-[#9dc9b6] px-3 py-6 shadow-xl">
      <view class="p-10" v-if="judge == 2">
        <view class="" style="font-size: 22px; line-height: 28px">
          今天热量摄入量
          <span class="font-semibold">{{ todayHeat }}</span>
          千卡,
        </view>
        <view
          class="py-1"
          style="float: right; font-size: 21px; line-height: 28px">
          离推荐摄入量还有
          <span class="font-semibold">{{ result }}</span>
          千卡
        </view>
      </view>

      <view class="flex justify-center p-10 text-2xl" v-if="judge == 1">
        今天热量的摄入量为推荐摄入量
      </view>

      <view class="p-10" v-if="judge == 0">
        <view class="" style="font-size: 22px; line-height: 28px">
          今天热量摄入量
          <span class="font-semibold">{{ todayHeat }}</span>
          千卡,
        </view>
        <view
          class="py-1"
          style="float: right; font-size: 21px; line-height: 28px">
          已超出推荐摄入量
          <span class="font-semibold">{{ result}}</span>
          千卡
        </view>
      </view>

      <view class="py-6"></view>

      <view class="text-lg">关于热量</view>
      <view class="py-2"></view>
      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view class="" style="font-size: 20px">正常</view>
        <p style="font-size: 18px; line-height: 1.5">
          合理摄入热量对于维持健康至关重要。适当的热量摄入可以帮助维持体重在正常范围内，促进新陈代谢的平衡，提供足够的能量支持日常活动和身体功能运转，同时降低患心血管疾病、糖尿病等慢性疾病的风险。通过合理的热量摄入，可以实现身体的健康管理，提升生活质量并延长寿命。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view style="font-size: 20px">过量</view>
        <p style="font-size: 18px; line-height: 1.5">
          过量摄入热量可能导致肥胖、心血管疾病、糖尿病等健康问题，并加重关节疼痛和炎症。此外，长期过量摄入热量还可能对心理健康造成负面影响，如自尊心下降和情绪波动。因此，限制热量摄入至适当水平是维持健康和身体功能的关键，有助于预防疾病并提高整体生活质量。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view style="font-size: 20px">过少</view>
        <p style="font-size: 18px; line-height: 1.5">
          过少摄入热量可能导致体重减轻，适用于一些特定情况，如减肥或治疗特定健康问题。在医学监督下，适度减少热量摄入也可能对改善血糖控制、降低心血管疾病风险等方面有所帮助。然而，长期过少摄入热量可能会导致营养不良、身体虚弱、免疫力下降等健康问题，因此，确保摄入足够的营养和能量对于维持整体健康至关重要。
        </p>
      </view>

      <view class="py-2"></view>
    </view>
  </view>
</template>

<script>
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

export default {
  mounted() {
    // this.getBestHeat()
    // this.getTodayHeat()
    // this.getBestHeat().then(this.getTodayHeat())
    this.init()
  },
  data() {
    return {
      bestHeat: '',
      todayHeat: '',
      judge: '', //过重:0 正常:1 过轻:2
      result: '' //差值
    }
  },
  methods: {
    // 获取推荐热量
    getBestHeat() {
      return new Promise((resolve) => {
        uni.request({
          url: import.meta.env.VITE_BASE_API + '/user/bestNutrition/' + userId,
          method: 'GET',
          header: {},
          success: (res) => {
            this.bestHeat = res.data.data.reliang
            var best = this.bestHeat
            resolve(best)
            console.log(best)
            console.log(22222)
          }
        })
      })
    },

    getTodayHeat(temp) {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/record/energy/today/' + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          let data = res.data.data
          let heat =
            data.lunch +
            data.midnightSnack +
            data.breakfast +
            data.snacks +
            data.dinner

          this.todayHeat = heat

          if (this.todayHeat > temp) {
            this.judge = 0
          } else if (this.todayHeat == temp) {
            this.judge = 1
          } else if (this.todayHeat < temp) {
            this.judge = 2
          }

          console.log(this.todayHeat, 'todayHeat')
          console.log(this.judge, 'judge')
          console.log(this.bestHeat, 'bestHeat')
          this.result = Math.abs(this.todayHeat - temp)

          console.log(111111)
        }
      })
    },

    init(){
      console.log(3333)
      this.getBestHeat().then((temp)=>{
        this.getTodayHeat(temp)
      })
    }
  }
}
</script>
