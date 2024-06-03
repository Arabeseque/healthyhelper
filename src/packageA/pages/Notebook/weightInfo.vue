<template>
  <view>
    <view class="bg-[#96b38d] px-3 py-2 shadow-xl">
      <view class="flex justify-center p-10 text-2xl" v-if="result== 1">
        您的bmi为{{Bmi}},
        体重过轻,要多吃一点哦!
      </view>
      <view class="flex justify-center p-10 text-2xl" v-if="result == 2">
        您的bmi为{{Bmi}},
        体重正常,继续保持哦!
      </view>
      <view class="flex justify-center p-10 text-2xl" v-if="result == 3">
        您的bmi为{{Bmi}},
        体重过重,要控制饮食啦!
      </view>
      <view class="text-lg">关于体重</view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view class="" style="font-size: 20px">正常(bmi:18.5~23.9)</view>
        <p style="font-size: 18px; line-height: 1.5">
          保持正常体重对身体健康和心理健康都至关重要。正常体重能降低患心血管疾病、糖尿病、高血压和某些癌症等慢性疾病的风险，优化身体功能，增加精力，提升自尊心和自信心，改善生活质量。因此，通过健康饮食和适当运动维持正常体重是一个积极的生活方式选择。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view style="font-size: 20px">过重(bmi:大于23.9)</view>
        <p style="font-size: 18px; line-height: 1.5">
          体重过重或肥胖不仅会增加心血管疾病、糖尿病、关节问题等健康风险，还可能导致睡眠呼吸暂停、消化系统问题、精神健康影响等，并严重影响生活质量和长期健康，因此需要采取积极的措施来控制体重。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
        <view style="font-size: 20px">过轻(bmi:小于18.5)</view>
        <p style="font-size: 18px; line-height: 1.5">
          体重过轻可能导致营养不良、免疫系统受损、骨质疏松、生殖系统问题、心理健康困扰以及活动能力下降等多种健康问题，这些不仅影响身体和心理健康，还可能导致生活质量下降，包括对日常活动的能力和舒适度的影响。
        </p>
      </view>

      <view class="py-2"></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

// 用户数据
const userStore = useUserStore()
const userId = userStore.userid

const Bmi = ref()
const result = ref()
// 计算BMI
function caculateBMI(params: any) {
  uni.request({
    url: import.meta.env.VITE_BASE_API + params.url,
    method: params.method,
    header: {},
    success: (res: any) => {
      Bmi.value = res.data.data.bmi
      if (Bmi.value < 18.5)
        result.value = 1 //偏瘦
      else if (Bmi.value >= 18.5 && Bmi.value <= 23.9)
        result.value = 2 //正常
      else result.value = 3 //偏胖
    }
  })
}

caculateBMI({
  url: '/user/' + userId,
  method: 'GET'
})
</script>
