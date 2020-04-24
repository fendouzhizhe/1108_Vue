<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>
<script>
// 引入Header
import Header from './components/Header'
// 引入Footer
import Footer from './components/Footer'
// 引入api
// import {reqBaseCategoryList} from './api'

export default {
  name: 'App',
  //注册
  components: {
    Header,
    Footer
  },
  mounted () {
    //提交对应的action
    this.$store.dispatch(
      "getBaseCategoryList"
    );
    // const result=await reqBaseCategoryList()
    // console.log(result);
    

  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>