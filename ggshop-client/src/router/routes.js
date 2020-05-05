//引入首页组件
import Home from '@/pages/Home'
//引入注册组件
import Register from '@/pages/Register'
//引入登录组件
import Login from '@/pages/Login'
//引入搜索组件
import Search from '@/pages/Search'
//引入Detail
import Detail from '@/pages/Detail'
//引入AddCartSuccess
import AddCartSuccess from '@/pages/AddCartSuccess'
//引入ShopCart
import ShopCart from '@/pages/ShopCart'
// 引入交易组件
import Trade from '@/pages/Trade'
// 引入支付组件
import Pay from '@/pages/Pay'
// 引入支付成功组件
import PaySuccess from '@/pages/PaySuccess'
// 引入个人中心组件
import Center from '@/pages/Center'
// 引入个人中心的我的订单组件
import MyOrder from '@/pages/Center/MyOrder'
// 引入个人中心的团购组件
import GroupBuy from '@/pages/Center/GroupBuy'
// 引入store
import store from '../store'

export default [
  //首页路由
  {
    path:'/',
    component:Home
  },
  //注册路由
  {
    path:'/register',
    component:Register,
    meta: {
      isHideFooter:true
    }
  },
  //登录路由
  {
    path:'/login',
    component:Login,
    meta: {
      isHideFooter:true
    },
    // 路由的独享守卫
    // beforeEnter:(to,from,next)=>{
    //   // 判断是否已经登录了
    //   if(store.state.user.userInfo.name){
    //     // 跳转到首页
    //     next('/')
    //   }else{
    //     // 没有登录,才能看到登录界面
    //     next()
    //   }
    // }
  },
  //搜索路由
  {
    name:'search',
    path:'/search/:keyword?', 
    component:Search
  },
  //Detail路由
  {
    name:'detail',
    path:'/detail/:skuId', 
    component:Detail
  },
  //添加路由
  {
    path:'/addcartsuccess', 
    component:AddCartSuccess,
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      // 获取相关的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO'))
      // 获取query参数中的skuId和skuNum
      const { skuId, skuNum } = to.query
      // console.log(to)
      if (skuId && skuNum && skuInfo) {
        // 放行
        next() 
      } else {
        next(from.path)
      }
    }
  },
  //购物车路由
  {
    path:'/shopcart', 
    component:ShopCart
  },
  // 交易组件
  {
    path: '/trade',
    component: Trade,
    // 购物车的界面跳转到交易界面(trade)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的trade
      if (from.path === '/shopcart') {
        next() 
      } else {
        // 去shopcart购物界面
        next('/shopcart')
      }
    }
  },
  // 支付组件
  {
    path: '/pay',
    component: Pay,
    props: route => ({ orderId: route.query.orderId }),
    // 跳转到支付界面(pay)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的pay
      if (from.path === '/trade') {
        next() 
      } else {
        // 去trade(要想去trade,就要先去shopcart)
        next('/trade')
      }
    }
  },
  // 支付成功组件
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 跳转到支付成功的界面(paysuccess)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的paysuccess
      if (from.path === '/pay') {
        next() 
      } else {
        // 去pay(要想去pay,就要先去trade)
        next('/pay')
      }
    }
  },
  // 个人中心组件
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: 'groupbuy',
        component: GroupBuy
      }, {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  //重定向路由
  {
    path:'/',
    redirect:'/'
  }
]