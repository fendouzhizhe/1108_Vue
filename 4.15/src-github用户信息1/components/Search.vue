<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">找好友</h3>
    <div>
      <input
        type="text"
        placeholder="请输入昵称"
        v-model="inputTxt"
      />
      <button @click="lookup">查找</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      inputTxt: '' // 存储输入框中输入的数据
    }
  },
  methods: {
    lookup () {
      // 获取文本框的数据
      const userTxt = this.inputTxt.trim()
      if (userTxt) {
        // 分发事件
        this.$car.$emit('search', userTxt)
        // 清空输入框
        this.inputTxt = ''
      }
    }
  }
}
</script>
<style scoped>
</style>
