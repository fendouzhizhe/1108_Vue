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
// 引入Vuex中的辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// 引入mutation-type
import {ADD,MINUS} from './vuex/mutation-type'
export default {
  name: 'App',
  data() {
    return {}
  },
  // 获取状态数据
  computed: {
    // number() {
    //   return this.$store.state.number
    // },
    // evenOrOdd() {
    //   return this.$store.getters.evenOrOdd
    // }
    // 拆包
    ...mapState(['number']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    ...mapMutations({ add: ADD, minus: MINUS }),
    ...mapActions(['addOdd', 'addAsync'])

    // 加
    // add() {
    //   this.$store.commit('ADD')
    // },
    // // 减
    // minus() {
    //   this.$store.commit('MINUS')
    // },
    // 奇数加
    // addOdd() {
    //   // 提交对应的action
    //   this.$store.dispatch('addOdd')
    // },
    // // 异步加
    // addAsync() {
    //   this.$store.dispatch('addAsync')
    // }
  }
}
</script>
<style scoped>
</style>
