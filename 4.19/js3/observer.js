//劫持的函数
function Observer(data) {
    //把data存贮到vm的data对象中
    this.data = data;
    //开始执行
    this.walk(data);
}
//劫持的原型
Observer.prototype = {
    //劫持的构造器
    constructor: Observer,
    //执行第一个方法
    walk: function(data) {
        //把这个劫持的对象放到me中
        var me = this;
        //遍历这个data中所有属性
        Object.keys(data).forEach(function(key) {
            //转换数据
            me.convert(key, data[key]);
        });
    },
    //转换的方法
    convert: function(key, val) {
        //定义数据
        this.defineReactive(this.data, key, val);
    },
    //定义数据的方法
    defineReactive: function(data, key, val) {
        //创建新的dep
        var dep = new Dep();
        //如果val是对象   就继续创建dep
        var childObj = observe(val);
        //为对象添加属性
        Object.defineProperty(data, key, {
            // 可以遍历
            enumerable: true, 
            // 不能定义
            configurable: false, 
            //重写get
            get: function() {
                //判断是否有数据
                if (Dep.target) {
                    //有数据
                    dep.depend();
                }
                //返回
                return val;
            },
            //重写set
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
//劫持的函数
function observe(value, vm) {
    //判断是否是对象，如果不是，直接返回
    if (!value || typeof value !== 'object') {
        return;
    }
    //创建一个新的劫持对象
    return new Observer(value);
};

//dep的唯一标识
var uid = 0;
//dep的函数
function Dep() {
    //把ID给dep
    this.id = uid++;
    //创建一个订阅的数组
    this.subs = [];
}
//Dep的原型
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

Dep.target = null;