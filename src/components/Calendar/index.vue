<template>
  <div class="v-calendar">
    <div class="v-calendar__tools">
      <span>2019年11月</span>

      {{days}}
      <el-button-group>
        <el-button icon="el-icon-arrow-left" />
        <el-button>今天</el-button>
        <el-button icon="el-icon-arrow-right" />
      </el-button-group>
    </div>

    <ul class="v-calendar__week">
      <li v-for="i of 7" :key="i">{{weekMap[i]}}</li>
    </ul>

    <ul class="v-calendar__days">
      <li v-for="i of 42" :key="i">
        <p>{{i}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VCalendar',

  data: () => ({
    weekMap: {
      1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七'
    },

    
  }),

  computed: {
    days() {
      let week = this.getMonthFirstDayWeek(new Date()) // 星期几

      let currentMonthDays = this.getMonthDays(new Date()) // 本月天数

      let preMonthDays = this.getMonthDays(new Date(), -1)

      let nextMonthDays = this.getMonthDays(new Date(), 1)
      
      let ret = []


      return []

    }
  },

  methods: {
    // 根据年月获取天数
    getMonthDays(date, monthOffset = 0) {
      if (!(date instanceof Date)) {
        date = new Date(date)
      }

      let nextMonth = date.getMonth() + 1 + monthOffset

      date.setMonth(nextMonth) // 进入下个月
      date.setDate(0)          // 进入本月最后一天
      return date.getDate()    // 获得年月的天数
    },

    // 获取每月第一日为星期几
    getMonthFirstDayWeek(date) {
      if (!(date instanceof Date)) {
        date = new Date(date)
      }

      date.setDate(1)      // 每个月的第一天

      let ret = date.getDay()

      return ret === 0 ? 7 : ret + 1 // 每个月第一天对应的星期号
    }
  }


}
</script>
