<template>
  <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
    <view class="py-2"></view>
    <!-- 不健康 -->
    <view v-if="healthy">
      <view class="box-border rounded-xl bg-white p-3">
        <ul v-for="(item, index) in diseaseName" :key="index">
          <li class="py-2">{{ item }}</li>
          <view class="border-b-2 opacity-10"></view>
        </ul>
      </view>
      <view class="mx-3 py-2 text-xs" style="color: #666; font-style: italic">
        已为您标注不适合您的食物
      </view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md"
        v-show="showInfo[0]">
        <view class="" style="font-size: 20px">高血压</view>
        <p style="font-size: 18px; line-height: 1.5">
          高血压患者需注意控制血压，定期监测，并遵医嘱服药。推荐采用低钠饮食，多摄入高钾食物如水果、蔬菜、全谷类，限制高脂高糖食物摄入，控制体重，适度运动，限制饮酒，戒烟，减少咖啡因摄入，有效减轻压力。这些措施有助于控制血压，减少并发症风险，维护身体健康。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md"
        v-show="showInfo[1]">
        <view class="" style="font-size: 20px">高血脂</view>
        <p style="font-size: 18px; line-height: 1.5">
          高血脂患者需关注饮食，建议采用低脂低胆固醇饮食，多食用富含膳食纤维的食物如水果、蔬菜、全谷类，适量摄入健康脂肪如坚果、鱼类，限制饱和脂肪和反式脂肪的摄入，减少高糖高盐食物的摄入。同时，进行适度的有氧运动，控制体重，戒烟限酒，保持良好的心态和规律的生活作息，有助于降低血脂水平，减少心血管疾病的风险，维护健康。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md"
        v-show="showInfo[2]">
        <view class="" style="font-size: 20px">高血糖</view>
        <p style="font-size: 18px; line-height: 1.5">
          高血糖患者需密切监测血糖水平，遵循医嘱进行药物治疗。在饮食方面，建议采用低GI（血糖指数）食物，如全谷类、豆类、蔬菜和水果，限制高糖高脂食物的摄入，控制餐食份量，避免过度进食和暴饮暴食。同时，保持适度的运动，控制体重，规律作息，减少压力和焦虑，有助于控制血糖水平，减少并发症风险，提高生活质量。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md"
        v-show="showInfo[3]">
        <view class="" style="font-size: 20px">高胆固醇</view>
        <p style="font-size: 18px; line-height: 1.5">
          高胆固醇患者需遵循低胆固醇饮食原则，减少饱和脂肪和反式脂肪的摄入，多食用富含膳食纤维的食物如水果、蔬菜、全谷类，适量摄入健康脂肪如橄榄油、鱼类。同时，减少高胆固醇食物的摄入，如动物内脏、黄油、奶酪等。积极进行适度的有氧运动，控制体重，戒烟限酒，保持良好的心态和规律的生活作息。这些措施有助于降低胆固醇水平，减少心血管疾病的风险，维护身体健康。
        </p>
      </view>

      <view class="py-2"></view>

      <view
        class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md"
        v-show="showInfo[4]">
        <view class="" style="font-size: 20px">孕妇</view>
        <p style="font-size: 18px; line-height: 1.5">
          孕妇需要特别关注自身和胎儿的健康。在怀孕期间，重视均衡营养的饮食，包括摄取丰富的蔬菜、水果、全谷类和蛋白质来源，同时避免生鱼片、生肉和生蛋等潜在的食品安全问题。定期进行产前检查，遵循医生的建议，保持适度的运动和休息，避免过度劳累和压力。此外，避免接触有害物质和环境污染，并注意个人卫生。最重要的是，保持积极的心态，享受孕期，与家人和医护人员密切合作，以确保健康的妊娠和顺利的分娩。
        </p>
      </view>
    </view>

    <!-- 健康 -->
    <view class="bg-[#9dc9b6]" style="height: 100vh" v-if="!healthy">
      <view class="m-3 box-border rounded-xl bg-white p-3">
        您很健康,请继续保持!
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
      healthy: '', //0健康,1不健康
      dieaseData: '',
      diseaseName: [],
      showInfo: []
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + `/disease/` + userId,
        method: 'GET',
        header: {},
        success: (res) => {
          this.diseaseData = res.data.data
          this.diseaseName.length = 0
          this.showInfo.length = 0
          if (this.diseaseData.hypertension + this.diseaseData.hyperlipemia + this.diseaseData.hyperglycemia + this.diseaseData.hypercholesterol + this.diseaseData.pregnant == 0) {
            var arr = [0, 0, 0, 0, 0]
            this.showInfo = arr
            this.healthy = 0
          } else {
            this.healthy = 1
            if (this.diseaseData.hypertension == 1) {
              this.diseaseName.push('高血压')
              this.showInfo.push(1)
            } else {
              this.showInfo.push(0)
            }

            if (this.diseaseData.hyperlipemia == 1) {
              this.diseaseName.push('高血脂')
              this.showInfo.push(1)
            } else {
              this.showInfo.push(0)
            }

            if (this.diseaseData.hyperglycemia == 1) {
              this.diseaseName.push('高血糖')
              this.showInfo.push(1)
            } else {
              this.showInfo.push(0)
            }

            if (this.diseaseData.hypercholesterol == 1) {
              this.diseaseName.push('高胆固醇')
              this.showInfo.push(1)
            } else {
              this.showInfo.push(0)
            }

            if (this.diseaseData.pregnant == 1) {
              this.diseaseName.push('怀孕')
              this.showInfo.push(1)
            } else {
              this.showInfo.push(0)
            }
          }

          console.log(this.diseaseName, 'diseaseName')
          console.log(this.showInfo, 'showInfo')
        }
      })
    }
  }
}
</script>
