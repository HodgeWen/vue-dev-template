<template>
  <div class="err-page">
    <img src="~images/401.gif">
    <section>
      <p>无权访问此页面</p>
      <el-button @click="$router.go(-1)">返回上一页</el-button>
      <el-button>回到首页</el-button>
    </section>
  </div>
</template>
<script>
import './style.scss'
export default {
  name: 'unauthorized'
}
</script>