//MVVM的函数（MVVM相当于Vue）
function MVVM(options) {
    //判断这个options的对象是否存在
    this.$options = options || {};
    //把vm.data给实例对象._data存起来，也把他给变量data存起来
    var data = this._data = this.$options.data;
    //放到me中
    var me = this;

    // 数据代理
    // 遍历，找到每一个属性
    Object.keys(data).forEach(function(key) {
        //实现数理代理，传入msg
        me._proxyData(key);
    });
    //初始化计算属性
    this._initComputed();
    //劫持数据
    observe(data, this);
    //模板编译   创建模板编译对象
    this.$compile = new Compile(options.el || document.body, this)
}
//MVVM的原型
MVVM.prototype = {
    //构造器
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    //实现数据代理    添加方法
    _proxyData: function(key, setter, getter) {
        //再次把实例对象给me
        var me = this;
        //把属性添加到vm对象中
        setter = setter || 
        Object.defineProperty(me, key, {
            //不能重新定义
            configurable: false,
            //可以遍历
            enumerable: true,
            //重写get
            get: function proxyGetter() {
                //通过这个me._data属性找到msg属性的值
                return me._data[key];
            },
            //重写set
            set: function proxySetter(newVal) {
                //把修改后的值给vm._data
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