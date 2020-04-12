(function(window){

  //定义插件对象
  const youPlugin={}
  //给插件对象添加一个install方法
  youPlugin.install=function (Vue){
      //1.添加全局方法或属性
      Vue.youGlobalMethod=function(){
          console.log('Vue全局方法 调用')
      };
      //2.添加一个全局指令
      Vue.directive('you-directive',function(el,binding){
          el.textContent='you-directive'+'==='+binding.value
      });
      //添加实例方法
      Vue.prototype.$youMethod=function(){
          console.log('vm $youMethod()调用')
      }
  }
  window.youPlugin=youPlugin
})(window)