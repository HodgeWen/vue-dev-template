<template>
  <div class="lock-page">
    <div class="lock-input">
      <el-input @keyup.native.enter="onUnlock" style="width: 100%" type="password" placeholder="输入解锁密码" v-model="pwd">
        <template #append>
          <el-button @click="onUnlock">解锁</el-button>
          <el-button @click="logout">退出</el-button>
        </template>
      </el-input>
      <transition name="fade-transform" mode="out-in">
        <div v-if="errText" class="error-box">
          {{errText}}
        </div>
      </transition>
    </div>
    
    <div class="tips" :class="{'tips--active': tipsActive}" @mouseleave="tipsActive = false">
      <p class="tips-text" @mouseenter="tipsActive = true">{{tip.title}}</p>
      <transition name="fade">
        <div class="tips-content" v-if="tipsActive">
          {{tip.content}}
        </div>
      </transition>
    </div>

    <section class="date-box">
      <p class="time">{{time}}</p>
      <p class="date">{{date}} {{week}}</p>
    </section>
  </div>
</template>

<script>
import { sessionCache } from '@/cache'
export default {
  name: 'lock',

  data: () => ({
    time: '',

    date: '',

    week: '',

    timer: null,

    pwd: '',

    _weekMap: {
      0: '天',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六'
    },

    errText: '',

    tipsActive: false,

    _tips: [
      { title: '你知道表格的使用技巧吗?', content: '在表格界面, 你可以通过←和→按键来控制分页的前进和后退, 可以使用Alt + R组合键来重置请求条件并刷新数据。' },
      { title: '觉得页面看起来太小或太大?', content: '在系统的左侧有个小开关, 打开它, 在里面你可以调整页面的大小。' },
      { title: '每次的登录欢迎太烦人?', content: '在系统的左侧有个小开关, 打开它, 在里面你可以关闭每次的登录欢迎。' },
      { title: '系统页面左侧的小球是干什么的?', content: '点击它, 以调整你的用户界面样式。' }
    ],

    tip: {}
  }),

  methods: {
    tick() {
      let date = new Date()

      this.time = date.toLocaleTimeString()
      this.date = date.toLocaleDateString()
      this.week = '星期' + this.$data._weekMap[date.getDay()]

      date = null

      this.timer = window.setTimeout(this.tick, 1000)
    },

    onUnlock() {
      this.errText = ''
      const lockInfo = sessionCache.get('lock-info')
      if (!lockInfo) {
        return this.$router.go(-1)
      }
      if (lockInfo.pwd === this.pwd) {
        let name = lockInfo.from
        sessionCache.remove('lock-info')
        this.$router.push({ name })
      } else {
        this.errText = '密码错误'
      }
    },

    logout() {
      sessionCache.clear()
      this.$router.replace({ name: 'login' })
    }
  },

  mounted() {
    this.tick()
    this.tip = this.$data._tips[Math.floor(Math.random() * 4)]
  },

  beforeDestroy() {
    window.clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.lock-page {
  width: 100%;
  height: 100%;
  background: #444;
  position: relative;
  background: url('~images/industry.jpg');
}

.date-box {
  position: absolute;
  left: 30px;
  bottom: 30px;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  background: rgba(0, 0, 0, .5);
  .time {
    font-size: 48px;
    margin-bottom: 10px;
  }

  .date {
    font-size: 24px;
  }
}
.lock-input {
  position: absolute;
  width: 300px;
  left: 50%;
  transform: translate(-50%);
  top: 40%;
}

.error-box {
  padding: 4px;
  color: rgb(204, 29, 43);
}
.tips {
  position: absolute;
  width: 300px;
  right: 100px;
  top: 200px;
  padding: 10px;
  border-radius: 3px;
  transition: background-color .3s;

  &--active {
    background: rgba(0, 0, 0, .4);
  }

  &-text {
    color: #fff;
    margin-bottom: 10px;
  }

  &-content {
    color: #ddd;
    font-size: 14px;
    line-height: 1.2;
  }
}
</style>