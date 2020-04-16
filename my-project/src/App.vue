<template>
  <div>
    <h2>点击次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="deincrement">deincrement</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
// 此案例在用不同的方式改变数据的状态
export default {
  name: 'App',
  // data() {
  //   return {
  //     count: 0 // 状态数据
  //   }
  // },
  // computed: {
  //   // get的操作
  //   evenOrOdd() {
  //     return this.count % 2 === 0 ? '偶数' : '奇数'
  //   }
  // },
  mounted () {
    console.log(this)
  },
  methods: {
    // 加的操作
    increment() {
      this.$store.commit('INCREMENT')
    },
    // 减的操作
    deincrement() {
      this.$store.commit('DECREMENT')
    },
    // 奇数的时候做加的操作
    incrementIfOdd() {
      this.$store.dispatch('incrementIfOdd')
    },
    // 异步的加法操作
    incrementAsync() {
     this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style scoped>
</style>
