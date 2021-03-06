//引入axios
import axios from 'axios'

import Nprogress from 'nprogress'

import 'nprogress/nprogress.css'

const ajax=axios.create({
  //前缀路径
  baseURL:'/mock',
  //请求时间
  timeOut:20000
})

//请求拦截器
ajax.interceptors.request.use(config=>{
  //显示进度条
  Nprogress.start()
  return config
})


//响应拦截器
ajax.interceptors.response.use(response=>{
  //隐藏进度条
  Nprogress.done()
  //返回的数据
  return response.data
},error=>{
  //隐藏进度条
  Nprogress.done()

  alert('出错',+error.message || '未知错误')

  //中断Promise
  // return new Promise(()=>{})
  return Promise.reject(error)
})



//暴露
export default ajax