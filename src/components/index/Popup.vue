<template>
  <view class="fui-wrap">
    <view class="fui-page__bd">
      <button
        @click="showPopup(3)"
        class="border-[#185864 flex w-[150px] items-center justify-center gap-2 rounded-3xl border font-bold text-[#6fb23a]">
        <view
          class="flex h-[22px] w-[25px] items-center justify-center overflow-hidden">
          <u-icons color="#185864" type="medal" size="30"></u-icons>
        </view>
        <view class="text-[#185864]">手动记录</view>
      </button>
    </view>

    <fui-bottom-popup :show="show3" @close="closePopup(3)">
      <view class="fui-scroll__wrap">
        <view class="fui-title fui-title__pb">选择时间</view>
        <scroll-view scroll-y class="fui-scroll__view">
          <fui-list-cell
            v-for="(item, index) in itemList"
            :key="index"
            @click="handleTimeClick(index)">
            {{ item }}
          </fui-list-cell>
        </scroll-view>
        <view class="fui-icon__close" @tap="closePopup(3)">
          <fui-icon name="close" :size="48"></fui-icon>
        </view>
      </view>
    </fui-bottom-popup>
  </view>
</template>

<script>
import uIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

export default {
  data() {
    return {
      show3: false,
      itemList: ['早餐', '中餐', '晚餐']
    }
  },
  methods: {
    showPopup(type) {
      if (type === 1) {
        this.show = true
      } else if (type === 2) {
        this.show2 = true
      } else {
        this.show3 = true
      }
    },
    closePopup(type) {
      if (type === 1) {
        this.show = false
      } else if (type === 2) {
        this.show2 = false
      } else {
        this.show3 = false
      }
    }
  }
}
</script>

<script setup>
function handleTimeClick(typeId) {
  console.log(typeId, 'typeId')
  uni.navigateTo({
    url: `/pages/index/notebook`,
    replace: true,
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', {
        data: 'data from starter page'
      })
    }
  })
}
</script>

<style>
page {
  font-weight: normal;
}

.fui-page__bd {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.fui-custom__wrap {
  width: 100%;
  height: 520rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 案例一 start*/
.fui-popup__container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.fui-title {
  font-size: 30rpx;
  font-weight: bold;
  text-align: center;
}

.fui-sub__title {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  text-align: center;
  font-size: 24rpx;
  color: #7f7f7f;
  transform: scale(0.9);
}

.fui-descr {
  font-weight: bold;
  padding-top: 64rpx;
}

.fui-sub__descr {
  font-size: 26rpx;
  color: #b2b2b2;
  padding: 32rpx 0;
}

.fui-btn__box {
  display: flex;
  justify-content: center;
  padding: 32rpx 0;
  box-sizing: border-box;
}

.fui-icon__close {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
}

/* 案例一 end*/
.fui-scroll__wrap {
  padding-top: 30rpx;
  position: relative;
}

.fui-scroll__view {
  width: 100%;
  height: 600rpx;
}

.fui-title__pb {
  padding-bottom: 24rpx;
}
</style>
