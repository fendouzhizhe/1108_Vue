//监视的函数
function Watcher(vm, expOrFn, cb) {
    //回调函数
    this.cb = cb;
    //vm的实例对象
    this.vm = vm;
    //表达式
    this.expOrFn = expOrFn;
    //存储depID的对象
    this.depIds = {};
    //判断表达式是否是一个函数
    if (typeof expOrFn === 'function') {
        //是的话就放在getter的属性中
        this.getter = expOrFn;
    } else {
        //不是一个函数
        this.getter = this.parseGetter(expOrFn.trim());
    }
    //表达式的数据
    this.value = this.get();
}
//监视的原型
Watcher.prototype = {
    //监视的构造器
    constructor: Watcher,
    //更新的方法
    update: function() {
        this.run();
    },
    //执行的方法
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        //判断这个depid有没有自己的属性
        if (!this.depIds.hasOwnProperty(dep.id)) {
            //把当前的dep的id连同当前的dep对象存储起来
            dep.addSub(this);
            //把dep的id存储到当前的Watcher的实例对象中
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        //把当前监视的实例对象给这个属性
        Dep.target = this;
        //通过getter的方法改变指向
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        //返回表达式的值
        return value;
    },

    parseGetter: function(exp) {
        //判断表达式和正则是否匹配
        if (/[^\w.$]/.test(exp)) return; 
        //以点为切割
        var exps = exp.split('.');
        //返回一个函数
        return function(obj) {
            //循环每一个表达式
            for (var i = 0, len = exps.length; i < len; i++) {
                //如果没有对象就返回
                if (!obj) return;
                //把这个表达式的值给obj
                obj = obj[exps[i]];
            }
            //返回该表达式的值
            return obj;
        }
    }
};