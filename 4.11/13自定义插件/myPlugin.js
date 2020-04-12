(function(window){

  //定义插件对象
  const myPlugin={}
  //给插件对象添加一个install方法
  myPlugin.install=function (Vue){
      //1.添加全局方法或属性
      Vue.myGlobalMethod=function(){
          console.log('Vue全局方法 调用')
      };
      //2.添加一个全局指令
      Vue.directive('my-directive',function(el,binding){
          el.textContent='my-directive'+'==='+binding.value
      });
      //添加实例方法
      Vue.prototype.$myMethod=function(){
          console.log('vm $myMethod()调用')
      }
  }
  window.myPlugin=myPlugin
})(window)