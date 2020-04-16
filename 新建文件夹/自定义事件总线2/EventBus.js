(function(window){
  const EventBus={}
  let listenersContainer={}
  EventBus.on=function(eventName,listener){
    let listeners=listenersContainer[eventName]
    if(!listeners){
      listeners=[]
      listenersContainer[eventName]=listeners
    }
    listeners.push(listener)
  }

  EventBus.emit=function(eventName,data){
    let listeners=listenersContainer[eventName]
    if(listeners && listeners.length>0){
      listeners.forEach(listener=>{
        listener(data)
      })
    }
  }

  EventBus.off=function(eventName){
    if(typeof eventName === 'undefined'){
      listenersContainer={}
    }else{
      delete listenersContainer[eventName]
    }
  }

  window.EventBus=EventBus

})(window)