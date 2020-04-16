<template>
  <div>
    <h2>点击次数:{{number}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="add">add</button>
    <button @click="minus">minus</button>
    <button @click="addOdd">addOdd</button>
    <button @click="addAsync">addAsync</button>
  </div>
</template>
<script>

// 点击按钮修改状态
export default {
  data() {
    return {
      number: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.number % 2 !== 0 ? '奇数' : '偶数'
    }
  },
  methods: {
    // 加
    add() {
      this.number++
    },
    // 减
    minus() {
      this.number--
    },
    // 奇数加1
    addOdd() {
      if (this.number % 2 !== 0) {
        this.number++
      }
    },
    // 异步加
    addAsync() {
      setTimeout(() => {
        this.number++
      }, 1000)
    }
  }
}
</script>
<style scoped>
</style>
