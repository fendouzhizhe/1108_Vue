(function(window){
  //订阅对象
  const PubSub={}
  //定义容器对象
  let subscribersContainer={}
  //定义标识
  let id=0
  //消息订阅
  PubSub.subscribe=function(msg,subscriber){
    //获取对应的回调函数
    let subscribers=subscribersContainer[msg]
    //判断是否存在回调函数
    if(!subscribers){
      //定义容器对象
      subscribers={}
      //存储对应的回调函数
      subscribersContainer[msg]=subscribers
    }

    //创建token标识
    const token='id_'+ ++id
    //存储
    subscribers[token]=subscriber
    return token
  }

  //异步
  PubSub.publish=function(msg,data){
    //获取对应的回调函数
    let subscribers=subscribersContainer[msg]
    setTimeout(()=>{
      if(subscribers){
        //对象转数组
        Object.values(subscribers).forEach(subscriber=>{
          subscriber(data)
        })
      }
    },1000)
  }

  //同步
  PubSub.publishSync=function(msg,data){
    let subscribers=subscribersContainer[msg]
    //判断对象是否存在
    if(subscribers){
      //对象转数组
      Object.values(subscribers).forEach(subscriber=>{
        subscriber(data)
      })
    }
  }

  //取消订阅
  PubSub.unsubscribe=function(token){
    if(typeof token==='undefined'){
      subscribersContainer={}
    }else if(token.indexOf('id_') !== -1){
      const subscribers=Object.values(subscribersContainer).find(subscribers=>subscribers[token])
      subscribers && delete subscribers[token]
    }else{
      delete subscribersContainer[token]
    }
  }

  //暴露
  window.PubSub=PubSub

})(window)