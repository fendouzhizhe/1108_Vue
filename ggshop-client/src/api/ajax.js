//引入axios
import axios from 'axios'

const ajax=axios.create({
  //前缀路径
  baseUrl:'/api',
  //请求时间
  timeOut:20000
})

//请求拦截器
ajax.interceptors.request.use(config=>{

})


//响应拦截器
ajax.interceptors.response.use(response=>{},error=>{})



//暴露
export default ajax