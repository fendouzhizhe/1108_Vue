<template>
  <div>
    <h2 v-if="!repgitUrl">loading...</h2>
    <h2 v-else>前端必备欢迎来到 <a :href="repgitName">{{repgitName}}</a></h2>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
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
    axios
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
