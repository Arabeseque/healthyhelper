<template>
  <view>
    <button type="primary" @click="open">fadeDemo</button>
    <uni-trans
      mode-class="fade"
      :styles="{ width: '100px', height: '100px', backgroundColor: 'red' }"
      v-show="show"
      @change="change" />
  </view>
</template>

<script setup>
import uniTrans from '@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue'
const show = ref(false)

const open = () => {
  show.value = !show.value
}

const change = () => {
  console.log('触发动画')
}
</script>
