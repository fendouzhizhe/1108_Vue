// MVVM 就相当于Vue
// options 就是配置对象 {el:'#app',data:{msg:'abc', } }
function MVVM(options) {
    // 把配置给实例对象$options属性存储起来，然后判断是否存在，如果存在就是options，不存在就是空对象
    this.$options = options || {};
    // 把vm.data对象给实例对象vm._data存储起来,同时把vm.data对象给局部变量data存储起来
    var data = this._data = this.$options.data;
    // 把当前vm实例对象this存储到me变量中
    var me = this;

  // 数据代理的实现
  // data对象中所有的key（属性）全部找到,同时进行遍历操作
    Object.keys(data).forEach(function(key) {
        // 实现数据代理的关键---key--->msg属性名字,proxyDate是代理数据的意思,然而me值得是this(就是vue的实例对象)
        me._proxyData(key);
    });
    // 计算属性的实现
    this._initComputed();

    // 劫持和监视操作
    observe(data, this);

    // 模版编译,先创建编译对象,传入'#app'||body,当前的vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}
// MVVM的原型对象,原型对象中的this必然是当前的实例对象
MVVM.prototype = {
    //构造器是Vue
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现数据代理的关键---key--->msg属性名字，这个proxyData的方法是通过Vue的实例对象vm访问
    _proxyData: function(key, setter, getter) {
        // 再次把实例对象vm 存储到me变量中
        var me = this;
        setter = setter || 
        // 把data中所有的属性一个一个的添加到me(vm对象)中
        Object.defineProperty(me, key, {
            // 不能被重新定义(删除)
            configurable: false, 
            // 可以遍历
            enumerable: true, 
            //重写get
            get: function proxyGetter() {
                // 如果想获取外部vm.msg ,就会进入到当前的get方法中
                // 通过vm._data属性的方式 找到了vm.data对象中的msg属性的值,直接返回
                return me._data[key];
            },
            //重写set
            set: function proxySetter(newVal) {
                // 如果外部vm.msg被赋值或者是设置,就会进入到当前的set方法中
                // 把修改后的值,给vm._data.msg
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