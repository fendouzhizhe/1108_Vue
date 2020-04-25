<template>
  <div class="swiper-container" id="sw1" ref="sw">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in carouselList" :key="carouse.id">
        <img :src="carouse.imgUrl" alt="">
      </div>          
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>
<script>
//引入Swiper
import Swiper from "swiper";
export default {
  name: 'Carousel',
  props:{
    carouselList:Array
  },
  mounted:{
    
  },
  watch:{
    carouselList:{
      handler(){
        if(this.carouselList.length===0)return
        this.$nextTick(()=>{
          var mySwiper = new Swiper (this.$refs.sw, {
            loop: true, // 循环模式选项
            autoplay:true,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
      //该回调将会在侦听开始之后被立即调用
      immediate:true      
    }


    // carouselList(){
    //   this.$nextTick(()=>{
    //     var mySwiper = new Swiper (this.$refs.sw, {
    //       loop: true, // 循环模式选项
    //       autoplay:true,
          
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination',
    //       },
          
    //       // 如果需要前进后退按钮
    //       navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //       },
    //     })
    //   })
    // }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>