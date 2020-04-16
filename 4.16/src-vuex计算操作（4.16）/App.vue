<template>
  <div>
    <h2>点击次数:{{$store.state.number}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
    <button @click="add">add</button>
    <button @click="minus">minus</button>
    <button @click="addOdd">addOdd</button>
    <button @click="addAsync">addAsync</button>
  </div>
</template>
<script>
// 改变数据的状态
export default {
  name: 'App',
  methods: {
    // 加
    add() {
      this.$store.commit('add')
    },
    // 减
    minus() {
      this.$store.commit('minus')
    },
    // 奇数加
    addOdd() {
      this.$store.dispatch('addOdd')
    },
    // 异步加法
    addAsync() {
     this.$store.dispatch('addAsync')
    }
  }
}
</script>
<style scoped>
</style>
