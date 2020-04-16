<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <!-- replace没有上次记录 -->
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        ----
        <button @click="pDetail(m.id)">push</button>---
        <button @click="rDetail(m.id)">replace</button>
      </li>
    </ul>
    <button @click="$router.back()">go back</button>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data () {
    return {
      // 空数组
      messages: []
    }
  },
  mounted () {
    //定时器
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 2, title: 'message002' },
        { id: 3, title: 'message003' }
      ]
    }, 500)
  },
  methods: {
    pDetail (id) {
      this.$router.push(`/home/message/detail/${id}`)
    },
    // replace方式---相当于没有记录
    rDetail (id) {
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>
<style scoped>
</style>
