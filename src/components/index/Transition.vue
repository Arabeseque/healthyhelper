<template>
  <view class="flex items-center justify-center">
    <button type="primary" @click="open">fade</button>
    <view>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum labore
      autem ipsa, voluptates necessitatibus in. Doloribus id odio, iusto
      officiis animi praesentium? Vero et assumenda reiciendis doloremque
      corporis repudiandae saepe!
    </view>
    <uni-transition
      mode-class="fade"
      :styles="{ width: '100px', height: '100px', backgroundColor: 'red' }"
      :show="show"
      @change="change" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  onLoad() {},
  methods: {
    open(mode) {
      this.show = !this.show
    },
    change() {
      console.log('触发动画')
    }
  }
}
</script>
