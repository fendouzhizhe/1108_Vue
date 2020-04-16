<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="txtName" />
      <button @click="searchHandle">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      // 存储数据
      txtName: ''
    }
  },
  methods: {
    // 按钮的点击事件的回调
    searchHandle() {
      // 获取数据
      const txt = this.txtName.trim()
      if (txt) {
        this.$store.dispatch('search', txt)
        // 清空
        this.txtName = ''
      }
    }
  }
}
</script>
<style scoped>
</style>
