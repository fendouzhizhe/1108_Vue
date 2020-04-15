<template>
  <div>
    <mt-button type="primary" style="width:100%" @click="showMsg">我好帅哦</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'App',
  methods: {
    showMsg() {
      // 弹出对话框
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      })
    }
  }
}
</script>
<style scoped>
</style>
