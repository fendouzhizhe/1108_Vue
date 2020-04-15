(function (window) {
  // 事件总线对象
  const EvBus = {}
  // 容器对象，存储事件名和对应回调函数
  let container = {}
  // 绑定事件
  EvBus.on = function (evName, fn) {
    // 根据事件名在容器对象中查找相应回调数组
    let fns = container[evName]
    if (!fns) {
      fns = []
      container[evName] = fns
    }
    fns.push(fn)
  }
  // 分发事件
  EvBus.emit = function (evName, list) {
    // 根据事件名在容器对象中查找相应回调数组
    let fns = container[evName]
    if (fns && fns.length > 0) {
      fns.forEach(fn => {
        fn(list)
      })
    }
  }
  // 解绑事件
  EvBus.off=function(evName){
    // 不穿事件名,把容器置为空
    if(typeof evName === 'undefined'){
      container={}
    }else{
      delete container[evName]
    }
  }
  // 暴露
  window.EvBus = EvBus
})(window)