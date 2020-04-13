<template>
  <div>
    这是组件
    <Hello/>
  </div>
</template>
<script>
// 引入Hello组件
import Hello from './components/Hello'
export default {
  name: 'App',
  components: {
    Hello
  }
}
</script>
<style scoped>
div{
  width:200px;
  height:100px;
  color:red;
}
</style>
