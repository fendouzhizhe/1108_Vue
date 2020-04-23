<template>
  <div>
    <Header/>
    <Footer/>
  </div>
</template>
<script>
//引入Header
import Header from './components/Header'
//引入Footer
import Footer from './components/Footer'
export default {
  name: 'App',
  //注册组件
  components: {
    Header,
    Footer,
  },
};
</script>
<style
  lang="less"
  rel="stylesheet/less"
  scoped
></style>
