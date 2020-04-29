<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  //引入throttle
  import throttle from 'lodash/throttle'

  export default {
    name: "Zoom",
    props:{
      imgUrl:String,
      bigImgUrl:String
    },
    mounted () {
      //获取event图片宽度
      this.maskWidth=this.$refs.event.clientWidth/2

    },
    methods: {
      //鼠标移动
      handleMove:throttle(function(event){
        const {offsetX,offsetY}=event
        //计算mask宽度
        const maskWidth=this.maskWidth
        //设置left和top
        let left=0
        let top=0
        left=offsetX-maskWidth/2
        top=offsetY-maskWidth/2

        //限制范围
        if(left<0){
          left=0
        }else if(left>maskWidth){
          left=maskWidth
        }
        if(top<0){
          top=0
        }else if(top>maskWidth){
          top=maskWidth
        }

        //读取mask
        const maskDiv=this.$refs.mask
        maskDiv.style.left=left+'px'
        maskDiv.style.top=top+'px'

        //获取大图
        const bigImg=this.$refs.bigImg
        bigImg.style.left=-2*left+'px'
        bigImg.style.top=-2*top+'px'


      },50)     
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>