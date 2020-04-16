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
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
// 改变数据的状态
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState(['number']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    ...mapMutations({add: 'ADD', minus: 'MINUS'}),
    ...mapActions(['addOdd', 'addAsync'])
    // 加的操作
    // add() {
    //   this.$store.commit('ADD')
    // },
    // 减的操作
    // minus() {
    //   this.$store.commit('MINUS')
    // },
    // 奇数的时候做加的操作
    // addOdd() {
    //   this.$store.dispatch('addOdd')
    // },
    // 异步的加法操作
    // addAsync() {
    //  this.$store.dispatch('addAsync')
    // }
  }
}
</script>
<style scoped>
</style>
