<template>
  <h2 v-if="name">请输入名字</h2>
  <h2 v-else-if="load">正在查找中...</h2>
  <h2 v-else-if="errorData">出错了:{{errorData}}</h2>
  <div
    v-else
    class="row"
  >
    <div
      class="card"
      v-for="(userName,index) in userNames"
      :key="index"
    >
      <a
        :href="userName.html_url"
        target="_blank"
      >
        <img
          :src="userName.avator_url"
          style='width: 100px'
        />
      </a>
      <p class="card-text">{{userName.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data () {
    return {
      name: true, // 默认是true,提示信息
      load: false, // 默认是false,不提示信息
      errorData: '', // 默认为空,没有任何的错误提示信息
      userNames: [] // 存储用户对象信息的
    }
  },
  // 页面加载后
  mounted () {
    // 通过事件总线绑定事件
    this.$car.$on('search', async userName => {
      const userUrl = `https://api.github.com/search/users`
      // 第一次更改状态数据
      this.name = false
      this.load = true
      try {
        // 发送异步请求
        const response = await axios.get(userUrl, {
          params: {
            q: userName
          }
        })
        // 获取响应的数据,并保存用户的信息到userNames数组中
        const userNames = response.data.items.map(userName => ({
          login: userName.login,
          html_url: userName.html_url,
          avator_url: userName.avator_url
        }))
        // 第二次更新状态数据
        this.load = false
        this.userNames = userNames
      } catch (error) {

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
