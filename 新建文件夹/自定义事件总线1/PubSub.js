(function (window) {
  // 消息订阅对象
  const PubSub = {}
  // 容器对象,用来存储消息名字及对应的对象
  let container = {}
  // id标识
  let id = 0
  // 消息订阅
  PubSub.subscribe = function (name, fn) {
    // 根据消息名字获取对应的回调函数容器对象
    let fns = container[name]
    // 判断当前回调函数容器对象是否存在
    if (!fns) {
      // 容器对象
      fns = {}
      // 消息名字对应回调函数容器对象一起存储到大的容器对象中
      container[name] = fns
    }
    // 创建token标识
    const token = 'id_' + ++id
    // 根据token和回调函数以键值对的方式存储到 回调函数容器对象中
    fns[token] = fn
    return token
  }
  // 异步发布消息
  PubSub.publish = function (name, list) {
    // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
    let fns = container[name]
    setTimeout(() => {
      // 判断小容器是否存在
    if(fns){
      // 对象转数组
      Object.values(fns).forEach(fn => {
        fn(list)
      })
    }
    },1000)
  }
  // 同步发布消息
  PubSub.publishSync = function (name, list) {
    // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
    let fns = container[name]
    // 判断小容器是否存在
    if(fns){
      // 对象转数组
      Object.values(fns).forEach(fn => {
        fn(list)
      })
    }
  }
  // 取消消息订阅
  PubSub.unsubscribe = function (token) {
    // token---标识,token有可能是标识,有可能是消息名字,还有可能什么也没传
    // 没有传token
    if (typeof token==='undefined') {
      container = {}
    }else if (token.indexOf('id_')!==-1) {
      const fns = Object.values(container).find(fns => fns[token])
      fns && fns[token]
    }else{
      delete container[token]
    }
  }
  // 暴露出去
  window.PubSub = PubSub
})(window)