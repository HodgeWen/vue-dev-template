<template>
  <div>
    <!-- 默认宽度为240px -->
    <v-double-select
      :first-option="firstOption"
      :second-option="secondOption"
      clearable
      width="300px"
      v-model="value"
    />
  </div>
</template>

<script>
export default {
  data: vm => ({
    value: [],

    // 如果key值不是label和value 则可以在模板中定义
    // :lable-key="xxx" :value-key="xxx"
    firstOption: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }],

    secondOption: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }]
  })
}
</script>
