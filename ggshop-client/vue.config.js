//解决跨域
module.exports={
  //关闭eslint语法检查
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://47.93.148.192',
        //进行跨域
        changeOrigin:true
      }
    }
  }
}