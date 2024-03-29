<template>
  <view class="bg-[#9dc9b6] px-3 py-2 shadow-xl">
    <!-- 日历 -->
    <view class="calendar-wrapper mx-2" style="border-radius: 20px">
      <view class="header" v-if="headerBar">
        <view class="preWidth" @click="changeMonth('pre')">
          <view class="pre"></view>
        </view>
        <view style="padding-top: 10px">
          {{ y + '年' + formatNum(m) + '月' }}
        </view>
        <view class="nextWidth" @click="changeMonth('next')">
          <view class="next"></view>
        </view>
      </view>
      <view class="week">
        <view class="week-day" v-for="(item, index) in weekDay" :key="index">
          {{ item }}
        </view>
      </view>
      <view
        :class="{ hide: monthOpen }"
        class="content"
        :style="{ height: height }">
        <view :style="{ top: positionTop + 'rpx' }" class="days">
          <view class="item" v-for="(item, index) in dates" :key="index">
            <view
              class="day"
              @click="selectOne(item, $event)"
              :class="{
                choose:
                  choose == `${item.year}-${item.month}-${item.date}` &&
                  item.isCurM,
                nolm: !item.isCurM,
                today: isToday(item.year, item.month, item.date),
                isWorkDay: isWorkDay(item.year, item.month, item.date)
              }">
              {{ Number(item.date) }}
            </view>
            <view
              class="markDay"
              v-if="
                isMarkDay(item.year, item.month, item.date) && item.isCurM
              "></view>
            <!-- <view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view> -->
          </view>
        </view>
      </view>
      <!-- 展开 -->
      <!-- <view class="weektoggle" @click="toggle">
        <image
          src="../../static/xiangxia.png"
          mode="scaleToFill"
          v-if="collapsible"></image>

          <image
          src="../../static/xiangshang.png"
          mode="scaleToFill"
          v-if="!collapsible"></image>
      </view> -->
    </view>

    <!-- 分割 -->
    <view class="py-2"></view>

    <!-- 我的记录 -->
    <view
      class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
      <!-- Header -->

      <!-- 分割线 -->
      <view class="border opacity-10"></view>
      <view class="uni-margin-wrap" v-if="this.flag == 1">
        <ul
          v-for="(items, index) in this.todayData"
          :key="index"
          class="divide-y divide-slate-200">
          <li class="flex justify-between">
            <view>
              <view>{{ items.foodName }}</view>
              <view style="font-size: 12px; color: #666">
                {{ items.zhongliang }}g
              </view>
            </view>
            <view class="pt-1.5" style="font-size: 14px; color: #666">
              {{ items.reliang }}千卡
            </view>
          </li>
          <view class="py-1"></view>
        </ul>
      </view>

      <view class="uni-margin-wrap" v-if="this.flag == 0">没有记录</view>
      <!-- <Pie /> -->
    </view>

    <view class="py-2"></view>

    <view
      class="box-border flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
      <view class="charts-box">
        <qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ren-calendar',
  props: {
    // 星期几为第一天(0为星期日)
    weekstart: {
      type: Number,
      default: 0
    },
    // 标记的日期
    // markDays: {
    //   type: Array,
    //   default: () => {
    //     return ['2024-03-27', '2024-03-29']
    //   }
    // default:this.recordDays
    // },
    // 是否展开
    open: {
      type: Boolean,
      default: true
    },
    // 是否可收缩
    // collapsible: {
    //   type: Boolean,
    //   default: true
    // },
    // 未来日期是否不可点击
    disabledAfter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      weektext: ['日', '一', '二', '三', '四', '五', '六'],
      y: new Date().getFullYear(), // 年
      m: new Date().getMonth() + 1, // 月
      dates: [], // 当前月的日期数据
      positionTop: 0,
      monthOpen: false,
      choose: '',
      headerBar: true, // 月份切换按钮,
      // collapsible:true //展开按钮

      // 有记录的天数
      recordDays: [],
      // 当天记录
      todayData: [],

      // 要查询的日期
      daySearch: '',

      // 判断当天有没有数据
      flag: '',

      // 获取计划量
      planData: '',

      // 柱状图计划量数据
      pillarPlan: [],

      // ------------------------柱状图----------------------------
      chartData: {},
      // 您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc'
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08
          }
        }
      }
    }
  },
  onReady() {
    // 柱状图
    this.getServerData()
  },
  created() {
    this.dates = this.monthDay(this.y, this.m)
    // !this.open && this.toggle()
  },
  mounted() {
    this.choose = this.getToday().date
    this.daySearch = this.getToday().date
    this.getDateData()
    this.getTodayData()
    this.getPlanData()
  },
  computed: {
    // 顶部星期栏
    weekDay() {
      return this.weektext
        .slice(this.weekstart)
        .concat(this.weektext.slice(0, this.weekstart))
    },
    height() {
      return (this.dates.length / 7) * 80 + 'rpx'
    }
  },
  methods: {
    formatNum(num) {
      const res = Number(num)
      return res < 10 ? '0' + res : res
    },
    getToday() {
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      const week = new Date().getDay()
      const weekText = ['日', '一', '二', '三', '四', '五', '六']
      const formatWeek = '星期' + weekText[week]
      const today = {
        date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
        week: formatWeek
      }
      return today
    },
    // 获取当前月份数据
    monthDay(y, month) {
      const dates = []
      const m = Number(month)
      const firstDayOfMonth = new Date(y, m - 1, 1).getDay() // 当月第一天星期几
      const lastDateOfMonth = new Date(y, m, 0).getDate() // 当月最后一天
      const lastDayOfLastMonth = new Date(y, m - 2, 0).getDate() // 上一月的最后一天
      const weekstart = this.weekstart == 7 ? 0 : this.weekstart
      const startDay = (() => {
        // 周初有几天是上个月的
        if (firstDayOfMonth == weekstart) {
          return 0
        } else if (firstDayOfMonth > weekstart) {
          return firstDayOfMonth - weekstart
        } else {
          return 7 - weekstart + firstDayOfMonth
        }
      })()
      const endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
      for (let i = 1; i <= startDay; i++) {
        dates.push({
          date: this.formatNum(lastDayOfLastMonth - startDay + i),
          day: weekstart + i - 1 || 7,
          month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
          year: m - 1 >= 0 ? y : y - 1
        })
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        dates.push({
          date: this.formatNum(j),
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: this.formatNum(m),
          year: y,
          isCurM: true // 是否当前月份
        })
      }
      for (let k = 1; k <= endDay; k++) {
        dates.push({
          date: this.formatNum(k),
          day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
          month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
          year: m + 1 <= 11 ? y : y + 1
        })
      }
      // console.log(dates);
      return dates
    },
    isWorkDay(y, m, d) {
      // 是否工作日
      const ymd = `${y}/${m}/${d}`
      const formatDY = new Date(ymd.replace(/-/g, '/'))
      const week = formatDY.getDay()
      if (week == 0 || week == 6) {
        return false
      } else {
        return true
      }
    },
    isFutureDay(y, m, d) {
      // 是否未来日期
      const ymd = `${y}/${m}/${d}`
      const formatDY = new Date(ymd.replace(/-/g, '/'))
      const showTime = formatDY.getTime()
      const curTime = new Date().getTime()
      if (showTime > curTime) {
        return true
      } else {
        return false
      }
    },
    // 标记日期
    isMarkDay(y, m, d) {
      let flag = false
      for (let i = 0; i < this.recordDays.length; i++) {
        const dy = `${y}-${m}-${d}`
        if (this.recordDays[i] == dy) {
          flag = true
          break
        }
      }
      return flag
    },
    isToday(y, m, d) {
      const checkD = y + '-' + m + '-' + d
      const today = this.getToday().date
      if (checkD == today) {
        return true
      } else {
        return false
      }
    },
    // 展开收起
    // toggle() {
    //   this.monthOpen = !this.monthOpen
    //   this.headerBar = !this.headerBar
    //   if (this.monthOpen) {
    //     this.positionTop = 0
    //     this.collapsible = false
    //   } else {
    //     let index = -1
    //     this.dates.forEach((i, x) => {
    //       this.isToday(i.year, i.month, i.date) && (index = x)
    //     })
    //     this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
    //     this.collapsible = true
    //   }
    // },
    // 点击回调
    selectOne(i, event) {
      const date = `${i.year}-${i.month}-${i.date}`
      const selectD = new Date(date).getTime()
      const curTime = new Date().getTime()
      const week = new Date(date).getDay()
      const weekText = ['日', '一', '二', '三', '四', '五', '六']
      const formatWeek = '星期' + weekText[week]
      const response = {
        date,
        week: formatWeek
      }
      if (!i.isCurM) {
        // console.log('不在当前月范围内');
        return false
      }
      if (selectD > curTime) {
        if (this.disabledAfter) {
          console.log('未来日期不可选')
          return false
        } else {
          this.choose = date
          this.$emit('onDayClick', response)
        }
      } else {
        this.choose = date
        this.$emit('onDayClick', response)
      }
      // console.log(response.date)
      this.daySearch = response.date
      this.getTodayData()
      // console.log(event)
      this.getServerData()
    },
    // 改变年月
    changYearMonth(y, m) {
      this.dates = this.monthDay(y, m)
      this.y = y
      this.m = m
    },
    changeMonth(type) {
      if (type == 'pre') {
        if (this.m + 1 == 2) {
          this.m = 12
          this.y = this.y - 1
        } else {
          this.m = this.m - 1
        }
      } else {
        if (this.m + 1 == 13) {
          this.m = 1
          this.y = this.y + 1
        } else {
          this.m = this.m + 1
        }
      }
      this.dates = this.monthDay(this.y, this.m)
    },

    // 获取日期数据
    getDateData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + '/record/dates/1',
        method: 'GET',
        header: {},
        success: (res) => {
          this.recordDays = res.data.data
          // console.log(this.recordDays)
        }
      })
    },

    // 获取当天食物
    getTodayData() {
      uni.request({
        url:
          import.meta.env.VITE_BASE_API +
          `/record/nutrition/1/` +
          this.daySearch,
        method: 'GET',
        header: {},
        success: (res) => {
          this.todayData = res.data.data
          if (this.todayData == '该用户还没有记录') this.flag = 0
          else this.flag = 1
          // console.log(this.flag)
        }
      })
    },
    // 获取计划量
    getPlanData() {
      uni.request({
        url: import.meta.env.VITE_BASE_API + `/user/plan/1`,
        method: 'GET',
        header: {},
        success: (res) => {
          this.planData = res.data.data
          this.pillarPlan.push(res.data.data.danbai)
          this.pillarPlan.push(res.data.data.zhifang)
          this.pillarPlan.push(res.data.data.tanshui)

          // console.log(this.pillarPlan)a
        }
      })
    },
    // ----------------柱状图------------------------
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        const res = {
          categories: ['蛋白质', '脂肪', '碳水'],
          series: [
            {
              name: '当天量',
              data: [70, 70, 100] // this.todayData
            },
            {
              name: '计划量',
              data: this.pillarPlan
            }
          ]
        }
        this.chartData = JSON.parse(JSON.stringify(res))
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  color: #222;
  font-size: 28rpx;
  text-align: center;
  background-color: #fff;
  padding-bottom: 10rpx;

  // box-shadow: 0 45rpx rgba(157,201,182, 0.32);
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    background-color: rgb(69, 190, 137);
    border-radius: 20px 20px 0 0;

    .preWidth,
    .nextWidth {
      // background: rgba(157,201,182, 0.3);
      width: 40rpx;
      height: 40rpx;
      padding: 10rpx;
      margin: 0 20rpx;
    }

    .pre,
    .next {
      width: 0;
      height: 0;
      border-top: 20rpx solid transparent;
      border-bottom: 20rpx solid transparent;
    }

    .pre {
      margin-right: 30rpx;
      border-right: 20rpx solid #fff;
      margin-right: 10rpx;
    }

    .next {
      margin-left: 30rpx;
      border-left: 20rpx solid #fff;
      margin-left: 10rpx;
    }
  }

  .week {
    display: flex;
    align-items: center;
    height: 80rpx;
    line-height: 80rpx;

    view {
      flex: 1;
    }
  }

  .content {
    position: relative;
    overflow: hidden;
    transition: height 0.4s ease;

    .days {
      transition: top 0.3s;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;

      .item {
        position: relative;
        display: block;
        height: 80rpx;
        line-height: 80rpx;
        width: calc(100% / 7);

        .day {
          font-style: normal;
          display: inline-block;
          vertical-align: middle;
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          overflow: hidden;
          border-radius: 60rpx;

          &.choose {
            background-color: #fe7379;
            color: #fff;
          }

          &.nolm {
            color: #333;
            opacity: 0.3;
          }
        }

        .isWorkDay {
          // color: #fff;
          color: #222;
        }

        .notSigned {
          font-style: normal;
          width: 8rpx;
          height: 8rpx;
          background: #fa7268;
          border-radius: 10rpx;
          position: absolute;
          left: 50%;
          bottom: 0;
          pointer-events: none;
        }

        .today {
          color: #fff;
          background-color: #a8c0ff;
        }

        .workDay {
          font-style: normal;
          width: 8rpx;
          height: 8rpx;
          background: #4d7df9;
          border-radius: 10rpx;
          position: absolute;
          left: 50%;
          bottom: 0;
          pointer-events: none;
        }

        .markDay {
          font-style: normal;
          width: 10rpx;
          height: 10rpx;
          background: #fc7a64;
          border-radius: 10rpx;
          position: absolute;
          left: 45%;
          bottom: 0;
          pointer-events: none;
        }
      }
    }
  }

  .hide {
    height: 80rpx !important;
  }

  .dropDown {
    width: 50rpx;
    height: 50rpx;
    background-color: #fc7a64;
  }

  // .weektoggle {
  //   width: 100rpx;
  //   height: 30rpx;
  //   position: relative;
  //   bottom: -55rpx;
  //   left: 45%;
  //   // background-color: #fe6766;
  //   border-radius: 0 0 20rpx 20rpx;
  //   padding: 10rpx;
  //   image {
  //     width: 50rpx;
  //     height: 36rpx;
  //   }
  // }
}
</style>
