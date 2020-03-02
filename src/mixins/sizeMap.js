export const sizeMap = {
  computed: {
    pxWidth() {
      let { size } = this.$ELEMENT
      switch(size) {
        case 'large':
          return '200px'
        case 'medium':
          return '180px';
        case 'small':
          return '160px';
        case 'mini':
          return '150px';
      }
    }
  }
}