//MVVM的函数
function MVVM(options) {
    // 判断options是否存在，如果存在就是options，不存在就是空对象
    this.$options = options || {};
    // 把data对象存储到了两个地方,一个是data变量,一个是_data
    var data = this._data = this.$options.data; // data 就是Vue的配置对象中的data
    // 把vm.data给实例对象._data存起来，也把他给变量data存起来
    var me = this;

    // 数据代理,获取data变量,遍历找到每个属性
    Object.keys(data).forEach(function(key) {
        // 数据代理的方法
        me._proxyData(key);
    });
    // 计算属性的初始化
    this._initComputed(); 
    // 劫持和消息订阅
    observe(data, this);
    // 模版解析，创建编译对象的时候
    this.$compile = new Compile(options.el || document.body, this)
}
// Vue的原型对象
MVVM.prototype = {
    // 指定的是构造器是Vue
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现数据代理，
    _proxyData: function(key, setter, getter) {
        // 再次把vm实例对象保存到me变量中
        var me = this;
        // 把data中所有的属性添加到me(vm对象)中
        setter = setter || 
        Object.defineProperty(me, key, {
            // 不能被重新定义
            configurable: false, 
            // 可以遍历
            enumerable: true, 
            // 重写了get
            get: function proxyGetter() {
                // 通过vm._data属性找到了vm.data对象中的msg属性,直接返回
                return me._data[key];
            },
            // 重写了set
            set: function proxySetter(newVal) {
                // 把修改后的值,给vm._data
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};