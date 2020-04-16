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
      // 用来存储文本框中输入的数据的
      txtName: ''
    }
  },
  methods: {
    // 点击事件的回调
    searchHandle() {
      // 获取数据
      const txt = this.txtName.trim()
      if (txt) {
        // 文本框数据存在
        this.$bus.$emit('search', txt)
        // 清空
        this.txtName = ''
      }
    }
  }
}
</script>
<style scoped>
</style>
