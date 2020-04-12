(function(window){

  //定义插件对象
  const theyPlugin={}
  //给插件对象添加一个install方法
  theyPlugin.install=function (Vue){
      //1.添加全局方法或属性
      Vue.theyGlobalMethod=function(){
          console.log('Vue全局方法 调用')
      };
      //2.添加一个全局指令
      Vue.directive('they-directive',function(el,binding){
          el.textContent='they-directive'+'==='+binding.value
      });
      //添加实例方法
      Vue.prototype.$theyMethod=function(){
          console.log('vm $theyMethod()调用')
      }
  }
  window.theyPlugin=theyPlugin
})(window)