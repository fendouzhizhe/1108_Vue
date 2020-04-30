<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in shopCartList" 
        :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" 
            :checked="item.isChecked" @change="checkCartItem(item)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" 
            type="text" 
            minnum="1" 
            class="itxt" v-model="item.skuNum" />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" 
            @click="deleteCartItem(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //引入vuex辅助函数
  import {mapState,mapGetters} from 'vuex'

  export default {
    name: 'ShopCart',
    computed: {
      ...mapState({
        shopCartList:state=>state.shopcart.shopCartList
      }),
      ...mapGetters([
        'totalCount',
        'totalPrice',
        'isAllCheck',
        'selectedCartItems'
      ]),
      

    },
    mounted () {
      //获取数据
      this.getShopCartList()
    },
    methods: {
      // 删除购物车某一项
      async deleteCartItem(skuId){
        //提示信息
        if(window.confirm('你确定删除么')){
          const errorMsg=await this.$store.dispatch('deleteCartItem',skuId)
          if(!errorMsg){
            //成功了，获取购物车数据
            this.getShopCartList()
          }else{
            alert(errorMsg)
          }
        }
      },
      async deleteCartItem1(skuId){
        //提示信息
        if(window.confirm('你确定删除么')){
          // const errorMsg=await this.$store.dispatch('deleteCartItem',skuId)
          try{
            await this.$store.dispatch('deleteCartItem',skuId)
            this.getShopCartList()
          }catch(error){
            alert(error.message||'删除失败')
          }
        }
      },
      //删除选中
      deleteCartItems(){
        //获取
        const {selectedCartItems} =this
        //判断
        if(selectedCartItems.length===0) return 
        if(window.confirm('你确定删除么')){
          //定义数组
          const promises=[]
          //发送异步请求
          selectedCartItems.forEach(item=>{
            const promise=this.$store.dispatch('deleteCartItem2',item.skuId)
            promises.push(promise)
          })
          //成功
          Promise.all(promises).then(
            values=>{
              this.getShopCartList()
            },
            error=>{
              alert(error.message||'删除失败')
            }
          )
        }
      },
      //修改购物车选中状态
      checkCartItem(item){
        //获取购物项的状态
        const isChecked=item.isChecked===1 ? 0 : 1
        const {skuId}=item
        //修改勾选状态
        this.$store.dispatch('checkCartItem',{skuId,isChecked}).then(
          ()=>{
            //成功
            this.getShopCartList()
          },
          (error)=>{
            //修改失败
            alert(error.message)
          }
        )
      },



      //封装一个方法,获取购物车数据
      getShopCartList(){
        this.$store.dispatch('getShopCartList')
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>