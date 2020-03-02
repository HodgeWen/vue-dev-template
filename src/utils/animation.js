// 帧速公式
// 浏览器每帧绘制时间 * (动画移动距离 / 动画持续时间)
function getStep(ft, distance, duration) {
  return (ft * distance) / duration
}

export function setScrollAnimation(dom, prop, distance, duration = 300) {
  let preTime = null
  let origin = dom[prop]
  let accum = 0

  // 一帧
  function frame(currentTime) {
    if (!preTime) preTime = currentTime

    let step = getStep(currentTime - preTime, distance, duration)
    accum += step

    preTime = currentTime

    if (distance > 0 ? accum < distance : accum > distance) {
      dom[prop] = origin + accum
      window.requestAnimationFrame(frame)
    } else {
      dom[prop] = origin + distance
    }
  }

  return window.requestAnimationFrame(frame)
}
