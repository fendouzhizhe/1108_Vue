<template>
  <div>
    <!-- 商品分类导航 -->
        <TypeNav/>

        <!--列表-->
        <ListContainer/>

        <!--今日推荐-->
        <TodayRecomment/>

        <!-- 商品排行 -->
        <Rank/>

        <!-- 猜你喜欢 -->
        <Like/>

        <!--楼层-->
        <Floor/>

        <!--楼层-->
        <Floor/>

        <!--商标-->
        <Brand/>
  </div>
</template>
<script>
//引入列表组件
import ListContainer from './ListContainer'
//引入推荐组件
import TodayRecomment from './TodayRecommend'
//引入商品排行组件
import Rank from './Rank'
//引入猜你喜欢组件
import Like from './Like'
//引入楼层组件
import Floor from './Floor'
//引入商标组件
import Brand from './Brand'

export default {
  name: 'Home',
  //注册组件
  components: {
      ListContainer,
      TodayRecomment,
      Rank,
      Like,
      Floor,
      Brand
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
    
    
    
    
    
    
    
</style>