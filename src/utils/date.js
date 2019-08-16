Date.prototype.format = function(template = 'yyyy-MM-dd') {
  const map = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12,
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(template)) {
    template = template.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in map) {
    if (new RegExp('(' + k + ')').test(template)) {
      template = template.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? map[k] : ('00' + map[k]).substr(('' + map[k]).length)
      )
    }
  }
  return template
}
