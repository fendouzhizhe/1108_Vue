<template>
  <div>
    <mt-button
      type="primary"
      @click="showMsg"
    >primary</mt-button>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: '实施了'
    }
  },
  methods: {
    showMsg () {
      console.log('实施了')
    }
  }
}
</script>
<style scoped>
</style>
