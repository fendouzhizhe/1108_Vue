// 劫持的构造函数
function Observer(data) {
    // 把data属性存储了vm的data对象数据
    this.data = data;
    // 开始执行
    this.walk(data);
}
// 劫持的原型对象
Observer.prototype = {
    // 构造器
    constructor: Observer,
    //执行第一个方法
    walk: function(data) {
        // 劫持对象
        var me = this;
        // 遍历这个data中所有属性
        Object.keys(data).forEach(function(key) {
            // 转换数据的操作
            me.convert(key, data[key]);
        });
    },
    // 转换数据方法
    convert: function(key, val) {
        // 定义数据(转换数据,并且定义)
        this.defineReactive(this.data, key, val);
    },
    // 定义数据的同时进行数据转换
    defineReactive: function(data, key, val) {
        // 创建dep对象
        var dep = new Dep();
        //如果val是对象   就继续创建dep
        var childObj = observe(val);
        //为对象添加属性
        Object.defineProperty(data, key, {
            // 可以遍历
            enumerable: true, 
            // 不能定义
            configurable: false, 
            // 重写get方法和set方法
            get: function() {
                // 判断是否有数据
                if (Dep.target) {
                    // 说明此时Dep.target属性中不是空的
                    dep.depend();
                }
                //返回
                return val;
            },
            set: function(newVal) {
                //判断原来的值和新值是否相同
                if (newVal === val) {
                    return;
                }
                //把新的值给val
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
// 劫持数据的方法
function observe(value, vm) {
    // 判断value是否有数据
    if (!value || typeof value !== 'object') {
        // 不是，直接返回
        return; 
    }
    // 创建Observer的实例对象(劫持实例对象)
    return new Observer(value);
};

// dep的唯一标识
var uid = 0;
// Dep 的构造函数
function Dep() {
    // dep 的 id 标识
    this.id = uid++;
    // 创建一个消息订阅的数组
    this.subs = [];
}
// Dep的原型对象
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
// 目标属性,默认为null
Dep.target = null;