<template>
  <div class="v-calendar">
    <div class="v-calendar__header">
      <ElDatePicker
        type="month"
        v-model="date"
        :clearable="false"
        style="width: 200px; margin-right: 10px"
        @change="handleChange"
      />

      <slot name="header"></slot>
    </div>

    <div class="v-calendar__body">
      <ul class="v-calendar__week">
        <li class="v-calendar__week-item" v-for="(item, index) of week" :key="index">{{ item }}</li>
      </ul>

      <ul class="v-calendar__month">
        <template v-if="renderDay">
          <li :class="classItemName(item.type)" v-for="(item, index) of month" :key="index">
            <p class="v-calendar__day-text">{{ item.date }}</p>
            <render-day :ctx="item.content" :date="item.date" :render="renderDay" />
          </li>
        </template>
        <template v-else>
          <li :class="classItemName(item.type)" v-for="(item, index) of month" :key="index">
            <p class="v-calendar__day-text">{{ item.date }}</p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { format } from 'utils/date'
export default {
  name: 'VCalendar',

  components: {
    renderDay: {
      props: {
        render: {
          type: Function
        },
        ctx: null,
        date: ''
      },

      render(createElement) {
        const { ctx, date } = this
        return this.render ? this.render(createElement, { ctx, date }) : null
      }
    }
  },

  data: (vm) => ({
    date: new Date()
  }),

  props: {
    week: {
      type: Array,
      default: () => ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    },

    data: {
      type: Object,
      default: () => ({})
    },

    renderDay: {
      type: Function
    }
  },

  methods: {
    classItemName(type) {
      let className = 'v-calendar__day'

      type === 'pre' && (className += ' v-calendar__day--pre')
      type === 'next' && (className += ' v-calendar__day--next')
      return className
    },

    handleChange(formatedDate) {
      this.$emit('change', formatedDate)
      this.date = formatedDate instanceof Date ? formatedDate : new Date(formatedDate)
    }
  },

  computed: {
    currentFirstDateWeek() {
      const _date = new Date(+this.date)
      _date.setDate(1)
      return _date.getDay()
    },

    preMonthDays() {
      const _date = new Date(+this.date)
      _date.setDate(0)
      return _date.getDate()
    },

    currentMonthDays() {
      const _date = new Date(+this.date)
      _date.setMonth(_date.getMonth() + 1)
      _date.setDate(0)
      return _date.getDate()
    },

    preMonth() {
      const { preMonthDays, currentFirstDateWeek } = this
      const ret = []
      let i = 0
      while (i < currentFirstDateWeek) {
        ret.unshift({
          type: 'pre',
          date: preMonthDays - i++
        })
      }
      return ret
    },

    currentMonth() {
      const { currentMonthDays, data } = this
      const ret = []
      let i = 0
      while (++i <= currentMonthDays) {
        ret.push(
          data[i]
            ? {
                type: 'now',
                date: i,
                content: data[i]
              }
            : {
                type: 'now',
                date: i
              }
        )
      }
      return ret
    },

    nextMonth() {
      const ret = []
      let i = 0,
        len = 42 - this.preMonth.length - this.currentMonthDays
      while (i < len) {
        ret.push({
          type: 'next',
          date: ++i
        })
      }
      return ret
    },

    month() {
      return this.preMonth.concat(this.currentMonth).concat(this.nextMonth)
    }
  },

  mounted() {
    this.$emit('change', format(this.date, 'yyyy-MM'))
  }
}
</script>
