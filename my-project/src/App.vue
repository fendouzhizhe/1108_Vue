<template>
  <div>
    <h2 v-if="!repUrl">正在加载....</h2>
    <h2>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      repUrl: '',
      repName: ''
    }
  },
  mounted () {
    // 发送异步请求
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    this.$http
      .get(url)
      .then(response => {
        const result = response.data.items[0]
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
