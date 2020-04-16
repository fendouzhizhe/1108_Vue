<template>
  <div>
    <h2 v-if="!repgitUrl">玩命加载中...</h2>
    <h2 v-else>点击进入 <a :href="repgitUrl">{{repgitName}}</a></h2>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      repgitUrl: '',
      repgitName: ''
    }
  },
  // 页面加载后的生命周期
  mounted () {
    // 发送异步请求
    const giturl = `https://api.github.com/search/repositories?q=v&sort=stars`
    this.$http
      .get(giturl)
      .then(response => {
        const datas = response.data.items[0]
        // 更新状态数据
        this.repgitUrl = datas.html_url
        this.repgitName = datas.name
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style scoped>
</style>
