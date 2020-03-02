/**
 * 设置动画
 * @param dom dom对象
 * @param prop dom对象属性 
 * @param targetDistance 目标移动距离
 * @param duration 动画持续时间
 */
export function setScrollAnimation(dom: HTMLElement, prop: string, targetDistance: number | string, duration = 300): void