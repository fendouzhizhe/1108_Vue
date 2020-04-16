<template>
  <div>
    <h2 v-if="!repUrl">正在加载中...</h2>
    <h2 v-else>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      // 获取到的地址
      repUrl: '',
      // 获取到的名字
      repName: ''
    }
  },
  // 页面渲染
  mounted() {
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    // 发送异步请求
    this.$http
      .get(url)
      .then(response => {
        const result = response.data.items[0]
        // 更新状态数据
        this.repUrl = result.html_url
        this.repName = result.name
      })
      .catch(error => {
        console.log(error)
      })
  }


}
</script>
<style scoped>
</style>
