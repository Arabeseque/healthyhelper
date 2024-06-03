<template>
  <view class="bg-[#eee]">
    <view class="mx-3 box-border rounded-xl bg-white p-3">
      <fui-input
        label="热量"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.reliang"
        holdKeyboard="true"
        placeholder="请输入自定义的热量">
        千卡
      </fui-input>

      <fui-input
        label="蛋白"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.danbai"
        holdKeyboard="true"
        placeholder="请输入自定义的蛋白">
        克
      </fui-input>

      <fui-input
        label="脂肪"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.zhifang"
        holdKeyboard="true"
        placeholder="请输入自定义的脂肪">
        克
      </fui-input>

      <fui-input
        label="碳水"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.tanshui"
        holdKeyboard="true"
        placeholder="请输入自定义的碳水">
        克
      </fui-input>

      <fui-input
        label="纤维"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.xianwei"
        holdKeyboard="true"
        placeholder="请输入自定义的纤维">
        克
      </fui-input>

      <fui-input
        label="维生素A"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.va"
        holdKeyboard="true"
        placeholder="请输入自定义的维生素A">
        毫克
      </fui-input>

      <fui-input
        label="胡萝卜素"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.huluobosu"
        holdKeyboard="true"
        placeholder="请输入自定义的胡萝卜素">
        毫克
      </fui-input>

      <fui-input
        label="烟酸"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.yansuan"
        holdKeyboard="true"
        placeholder="请输入自定义的烟酸">
        毫克
      </fui-input>

      <fui-input
        label="维生素C"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.vc"
        holdKeyboard="true"
        placeholder="请输入自定义的维生素C">
        毫克
      </fui-input>

      <fui-input
        label="维生素E"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.ve"
        holdKeyboard="true"
        placeholder="请输入自定义的维生素E">
        毫克
      </fui-input>

      <fui-input
        label="胆固醇"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.danguchun"
        holdKeyboard="true"
        placeholder="请输入自定义的胆固醇">
        毫克
      </fui-input>

      <fui-input
        label="钾"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.jia"
        holdKeyboard="true"
        placeholder="请输入自定义的钾">
        毫克
      </fui-input>

      <fui-input
        label="钠"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.na"
        holdKeyboard="true"
        placeholder="请输入自定义的钠">
        毫克
      </fui-input>

      <fui-input
        label="钙"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.gai"
        holdKeyboard="true"
        placeholder="请输入自定义的钙">
        毫克
      </fui-input>

      <fui-input
        label="镁"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.mei"
        holdKeyboard="true"
        placeholder="请输入自定义的镁">
        毫克
      </fui-input>

      <fui-input
        label="铁"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.tie"
        holdKeyboard="true"
        placeholder="请输入自定义的铁">
        毫克
      </fui-input>

      <fui-input
        label="锰"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.meng"
        holdKeyboard="true"
        placeholder="请输入自定义的锰">
        毫克
      </fui-input>

      <fui-input
        label="锌"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.xin"
        holdKeyboard="true"
        placeholder="请输入自定义的锌">
        毫克
      </fui-input>

      <fui-input
        label="铜"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.tong"
        holdKeyboard="true"
        placeholder="请输入自定义的铜">
        毫克
      </fui-input>

      <fui-input
        label="磷"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.lin"
        holdKeyboard="true"
        placeholder="请输入自定义的磷">
        毫克
      </fui-input>

      <fui-input
        label="锡"
        borderTop
        :required="true"
        textAlign="right"
        trim="true"
        :modelValue="nutritionPlan.xi"
        holdKeyboard="true"
        placeholder="请输入自定义的锡">
        毫克
      </fui-input>
    </view>

    <button class="confirm m-3 mt-6" type="primary" @click="postData">
      确定修改
    </button>
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
      planData: '',
      nutritionPlan: {
        userId: userId,
        id: '',
        reliang: '',
        danbai: '',
        zhifang: '',
        tanshui: '',
        xianwei: '',
        va: '',
        huluobosu: '',
        yansuan: '',
        vc: '',
        ve: '',
        danguchun: '',
        jia: '',
        na: '',
        gai: '',
        mei: '',
        tie: '',
        meng: '',
        xin: '',
        tong: '',
        lin: '',
        xi: ''
      }
    }
  },
  mounted() {
    this.getPlanTableData()
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
          this.nutritionPlan.id = this.planData.id
          this.nutritionPlan.reliang = this.planData.reliang
          this.nutritionPlan.danbai = this.planData.danbai
          this.nutritionPlan.zhifang = this.planData.zhifang
          this.nutritionPlan.tanshui = this.planData.tanshui
          this.nutritionPlan.xianwei = this.planData.xianwei
          this.nutritionPlan.va = this.planData.va
          this.nutritionPlan.huluobosu = this.planData.huluobosu
          this.nutritionPlan.yansuan = this.planData.yansuan
          this.nutritionPlan.vc = this.planData.vc
          this.nutritionPlan.ve = this.planData.ve
          this.nutritionPlan.danguchun = this.planData.danguchun
          this.nutritionPlan.jia = this.planData.jia
          this.nutritionPlan.na = this.planData.na
          this.nutritionPlan.gai = this.planData.gai
          this.nutritionPlan.mei = this.planData.mei
          this.nutritionPlan.tie = this.planData.tie
          this.nutritionPlan.meng = this.planData.meng
          this.nutritionPlan.xin = this.planData.xin
          this.nutritionPlan.tong = this.planData.tong
          this.nutritionPlan.lin = this.planData.lin
          this.nutritionPlan.xi = this.planData.xi
        }
      })
    },

    // 上传修改信息
    postData() {
      if (this.nutritionPlan.id) {
        this.alterPlan()
      } else {
        this.addPlan()
      }
      uni.showToast({
        title: '上传营养计划成功',
        icon: 'none'
      })
      setTimeout(() => {
        uni.redirectTo({
          url: '../../pages/personalPage/nutritionPlan'
        })
      }, 500)

      // setTimeout(()=>{
      //   this.getPlanTableData()
      // },1000)
    },

    // id为null时新增
    addPlan() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/custom',
        method: 'POST',
        data: this.nutritionPlan,
        success: (res) => {
          if (res.data.code === 200) {
            //  uni.reLaunch({
            //   url:'../../pages/personalPage/nutritionPlan'
            //  })
          }
        }
      })
    },

    // 有id时修改
    alterPlan() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/user/custom',
        method: 'PUT',
        data: this.nutritionPlan,
        success: (res) => {
          if (res.data.code === 200) {
            //  uni.reLaunch({
            //   url:'../../pages/personalPage/nutritionPlan'
            //  })
          }
        }
      })
    }
  }
}
</script>

<style></style>
