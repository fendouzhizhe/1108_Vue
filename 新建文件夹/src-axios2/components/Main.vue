<template>
  <h2 v-if="firstView">请输入搜索关键字</h2>
  <h2 v-else-if="loading">正在加载中...</h2>
  <h2 v-else-if="errorMsg">错误信息为:{{errorMsg}}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      // 默认第一个提示信息 是显示的
      firstView: true,
      // 默认第二个提示信息暂时不显示
      loading: false,
      // 默认没有错误信息
      errorMsg: '',
      // 用来存储获取到的用户信息对象的
      users: []
    }
  },
  // 界面渲染完毕后
  mounted() {
    // 通过事件总线绑定一个发送异步请求的事件
    this.$bus.$on('search', async searchName => {
      // 发送异步请求了
      const url = `https://api.github.com/search/users`
      // 第一次更改状态数据
      this.firstView = false
      this.loading = true
      try {
        // 根据地址和参数进行异步请求
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 遍历数据
        // avatar_url,login,html_url
         console.log(response.data.items)
        const users = response.data.items.map(user => ({
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url
        }))
        // 第二次更新状态数据
        this.loading = false
        this.users = users
      } catch (error) {
        // 再次更新状态数据
        this.loading = false
        this.errorMsg = error
      }
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
