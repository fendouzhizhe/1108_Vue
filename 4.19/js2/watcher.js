// 监视的构造函数 
function Watcher(vm, expOrFn, cb) {
    // 回调函数放到cb中
    this.cb = cb;
    // vm实例对象放到vm中
    this.vm = vm;
    // 表达式放到expOrFn中
    this.expOrFn = expOrFn;
    // 存储depIds对象
    this.depIds = {}; 
    // 判断传入进来的表达式是不是函数
    if (typeof expOrFn === 'function') {
        // 如果是函数则保存到this.getter属性中
        this.getter = expOrFn;
    } else {
        // 说明不是一个函数
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 获取表达式的数据
    this.value = this.get();
}
// 监视的原型对象
Watcher.prototype = {
    // 构造器
    constructor: Watcher,
    // 更新方法
    update: function() {
        this.run();
    },
    // 执行的方法
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
            // 把当前的dep的id连同当前的dep对象存储起来
            dep.addSub(this);
            // 把dep的id存储到当前的Watcher的实例对象中
            this.depIds[dep.id] = dep;
        }
    },
    // 获取表达式的值
    get: function() {
        // Dep的target的属性存储了当前的Watcher的实例对象
        Dep.target = this;
        // 调用getter的方法,改变this指向
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        // 返回该表达式的数据值
        return value;
    },
    parseGetter: function(exp) {
        // 判断当前的表达式和正则是否匹配
        if (/[^\w.$]/.test(exp)) return; 

        // 分割表达式中的. 形成表达式数组
        var exps = exp.split('.');
        // 回调函数是一个返回值
        return function(obj) {
            // 循环exps数组中的表达式,并且获取表达式值
            for (var i = 0, len = exps.length; i < len; i++) {
                // 如果vm对象不存在则直接返回
                if (!obj) return;
                //把这个表达式的值给obj
                obj = obj[exps[i]]; 
            }
            // 返回的是表达式的数据值
            return obj;
        }
    }
};