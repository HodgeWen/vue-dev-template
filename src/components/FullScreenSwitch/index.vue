<template>
  <v-icon pointer :type="isInFullScreen ? 'fullscreen-exit' : 'fullscreen'" @click="toggleScreen" />
</template>

<script>
export default {
  name: 'VFullscreenSwitch',

  data: () => ({
    isInFullScreen: false
  }),

  methods: {
    // 进入/退出全屏
    toggleScreen() {
      const el = document.documentElement
      this.isInFullScreen ? ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].some(item => {
        let ret = document[item] ? true : false
        ret && document[item]()
        return ret
      }) : ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'].some(item => {
        let ret = el[item] ? true : false
        ret && el[item]()
        return ret
      })
      this.watchScreen()
    },

    watchScreen() {
      this.isInFullScreen = (document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement) ? true : false 
    },

    preventF11(e) {
      if (e.key === 'F11' || e.keyCode === 122) e.preventDefault()
    }
  },

  mounted() {
    this.watchScreen()
    window.addEventListener('fullscreenchange', this.watchScreen)
    window.addEventListener('keydown', this.preventF11)
  },

  beforeDestroy() {
    window.removeEventListener('fullscreenchange', this.watchScreen)
    window.removeEventListener('keydown', this.preventF11)
  }
}
</script>