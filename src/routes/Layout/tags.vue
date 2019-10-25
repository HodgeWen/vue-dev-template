<template>
  <div>
    <el-tag
      size="mini"
      v-for="(tag, index) of tags"
      @click="onClick(tag)"
      @close="onClose(index)"
      :key="index"
      :closable="tags.length > 1"
      :type="$route.name === tag.name ? 'success' : ''"
    >{{tag.meta.title}}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'tags',

  computed: {
    tags() {
      return this.$store.state.tags
    }
  },

  methods: {
    onClick({ name }) {
      name !== this.$route.name && this.$router.push({ name })
    },

    onClose(routeName) {
      this.$store.commit('deleteTags', routeName)
      const { tags } = this
      const lastIndex = tags.length ? tags.length - 1 : -1
      if (lastIndex !== -1) {
        const name = tags[lastIndex].name
        name !== this.$route.name && this.$router.replace({ name })
      }
    },

    addTags() {
      this.$store.commit('addTags', this.$route)
    }
  },

  watch: {
    $route() {
      this.addTags()
    }
  },

  mounted() {
    this.addTags()
  }
}
</script>
