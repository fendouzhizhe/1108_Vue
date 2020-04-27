<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst=true"  @mouseleave="firstHide">
        <div>
          <h2 class="all">
          全部商品分类
          </h2>

          <div
            class="sort"
            @mouseleave="
              currentIndex = -2
            "
            @click="toSearch"
            v-if="isShowFirst"
          >
            <div
              class="all-sort-list2"
            >
              <div
                class="item"
                v-for="(c1,
                index) in baseCategoryList"
                :key="
                  c1.categoryId
                "
                :class="{
                  item_on:
                    currentIndex ===
                    index,
                }"
                @mouseenter="
                  showSubCategorys(
                    index
                  )
                "
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="
                      c1.categoryName
                    "
                    :data-category1Id="
                      c1.categoryId
                    "
                    >{{
                      c1.categoryName
                    }}</a
                  >
                  <!-- <router-link :to="{path:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                >
                  <div
                    class="subitem"
                  >
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="
                        c2.categoryId
                      "
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="
                            c2.categoryName
                          "
                          :data-category2Id="
                            c2.categoryId
                          "
                          >{{
                            c2.categoryName
                          }}</a
                        >
                        <!-- <router-link :to="{path:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="c3 in c2.categoryChild"
                          :key="
                            c3.categoryId
                          "
                        >
                          <a
                            href="javascript:;"
                            :data-categoryName="
                              c3.categoryName
                            "
                            :data-category3Id="
                              c3.categoryId
                            "
                            >{{
                              c3.categoryName
                            }}</a
                          >
                          <!-- <router-link :to="{path:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>

      <nav class="nav">
        <a href="###"
          >服装城</a
        >
        <a href="###"
          >美妆馆</a
        >
        <a href="###"
          >尚品汇超市</a
        >
        <a href="###"
          >全球购</a
        >
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
//引入vuex辅助函数
import { mapState } from "vuex";
//引入lodash
// import _ from 'lodash'
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      //默认显示一级分类列表
      isShowFirst: true,
    };
  },
  computed: {
    ...mapState({
      baseCategoryList: (
        state
      ) =>
        state.home
          .baseCategoryList,
    }),
  },
  //页面加载后
  mounted() {
    //获取三级分类数据(由于优化，所以干掉这个代码)
    // this.$store.dispatch(
    //   "getBaseCategoryList"
    // );
    //判断当前路径是不是/
    if (
      this.$route.path !== "/"
    ) {
      this.isShowFirst = false;
    }
  },
  methods: {
    // shouSubCategorys(index){
    //   this.currentIndex=index
    // }
    // shouSubCategorys:_.throttle(function(index){
    //   this.currentIndex=index
    // },300)

    showSubCategorys: throttle(
      function(index) {
        this.currentIndex = index;
        // console.log(index);
      },
      300
    ),
    //通过委托实现路由跳转
    toSearch(event) {
      if (
        event.target
          .tagName === "A"
      ) {
        //路由编程式跳转
        const {
          categoryname,
          category1id,
          category2id,
          category3id,
        } = event.target.dataset
        //准备参数
        const query = {
          categoryName: categoryname,
        };
        //判断对应的参数中是否有数据
        if (category1id) {
          query.category1Id = category1id
        } else if (
          category2id
        ) {
          query.category2Id = category2id
        } else if (
          category3id
        ) {
          query.category3Id = category3id
        }

        //const id=category1id?'1':(category2id?'2':(category3id?'3':''))
        //query['category'+id+'Id']=category1id||category2id||category3id

        //获取路由地址
        const { path, params} = this.$route
        if(path.indexOf('/search')===0){
          //在search页面跳转
          this.$router.replace({ path, query, params})
        }else{
          //不在search页面跳转
          this.$router.push({
            path: '/search',
            query,
          })
        }
        //重置当前的索引
        this.currentIndex=-2
        this.isShowFirst=false

        

        //跳转操作
        // this.$router.push({path:'/search'})
        // const dt=event.target.dataset
        // console.log(dt.categoryname,dt.category1id);

        //query:{categoryName,category1Id,category2Id,category3Id}
      }
    },
    //控制一级列表 ，只在首页显示
    firstHide(){
      //重新设置索引值
      this.currentIndex=-2
      if(this.$route.path!=='/'){
        this.isShowFirst=false
      }
    }
  },
}
</script>
<style
  lang="less"
  rel="stylesheet/less"
  scoped
>
.type-nav {
  border-bottom: 2px solid
    #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid
              #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0
                8px;
              dl {
                border-top: 1px
                  solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px
                    6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px
                    0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0
                      8px;
                    margin-top: 5px;
                    border-left: 1px
                      solid
                      #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background: gray;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
