<template>
  <div class="lock-page">
    <section class="date-box">
      <p class="time">17:47</p>
      <p class="date">11月8日, 星期5</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'lock',

  data: () => ({
    date: new Date(),

    timer: null
  }),

  computed: {
    current() {
      return {
        time: this.date,
        date: ''
      }
    }
  },

  methods: {
    tick() {

      window.setTimeout(this.tick, 2000)
    }
  },

  mounted() {
    this.tick()
  },

  beforeDestroy() {

  }
}
</script>

<style lang="scss" scoped>
.lock-page {
  width: 100%;
  height: 100%;
  background: #444;
  position: relative;
}

.date-box {
  position: absolute;
  left: 30px;
  bottom: 30px;
  color: #fff;

  .time {
    font-size: 48px;
  }

  .date {
    font-size: 24px;
  }
}

</style>