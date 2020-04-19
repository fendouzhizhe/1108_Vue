// 编译函数
function Compile(el, vm) {
    // 把vm对象保存到$vm属性中
    this.$vm = vm;
    // 根据#app选择器获取容器对象div,并存储到$el中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断div容器是否存在
    if (this.$el) {
        // 把div容器中所有的节点全都存放在文档碎片对象
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化
        this.init();
        // 把文档碎片对象重新放在div容器中
        this.$el.appendChild(this.$fragment);
    }
}
// 编译对象的原型对象
Compile.prototype = {
    //编译的构造器
    constructor: Compile,
    //文档节点的函数
    node2Fragment: function(el) {
        // 创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;

        // 通过while循环，将div容器中所有的节点全部的放在文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 初始化的方法
    init: function() {
        // 模版解析的操作
        this.compileElement(this.$fragment);
    },
    // 模版解析的操作
    compileElement: function(el) {
        // 获取文档碎片对象中所有的子节点
        var childNodes = el.childNodes,
        // 编译对象放在me中
            me = this;
        // 遍历文档碎片对象中的所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 获取文本内容（node----每个子节点）
            var text = node.textContent;
            // 插值语法的正则表达式
            var reg = /\{\{(.*)\}\}/;   
            // 判断当前的节点是不是标签
            if (me.isElementNode(node)) {
                // 编译标签节点
                me.compile(node);
                // 判断是不是文本节点,并且这个文本节点和正则是否匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 插值语法的解析
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断当前的节点里面还有没有其他的子节点
            if (node.childNodes && node.childNodes.length) {
                //如果有则继续遍历(当前节点中没有任何的子节点)
                me.compileElement(node);
            }
        });
    },
    // 编译节点函数的方法
    compile: function(node) { 
        // 获取当前节点的所有的属性  
        var nodeAttrs = node.attributes,
            // 编译实例对象放在me中
            me = this; 
        // 遍历当前节点中所有的属性  
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 获取属性的名字
            var attrName = attr.name;
            // 判断当前的属性是不是一个指令
            if (me.isDirective(attrName)) {
                // 获取这个属性的值
                var exp = attr.value;
                //把索引为2的属性名字取出来放在dir中
                var dir = attrName.substring(2);
                // 判断当前的指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    // 说明是事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                   
                } else {  
                    // 当前的指令是普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 把当前这个标签节点上的属性全部干掉    
                node.removeAttribute(attrName);
            }
        });
    },
    // 解析插值
    compileText: function(node, exp) {
        // 调用编译工具方法,把属性值和vm实例对象传进去
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的这个属性是不是指令
    isDirective: function(attr) {
        // 当前的这个属性是不是v-开头
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是事件指令
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是标签
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //  node----{{msg}},vm,exp---msg
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model指令
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class 指令
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node----{{msg}},vm,exp---msg  dir----->'text'

    // v-bind指令
    bind: function(node, vm, exp, dir) {
        // 获取updater
        var updaterFn = updater[dir + 'Updater'];
        //  根据vm对象找性的值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 监视对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理  
    eventHandler: function(node, vm, exp, dir) {
        // 获取dir中索引为1的值
        var eventType = dir.split(':')[1],
            // 判断methods对象是否存在  
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断索引为1的值和fn这个函数是否存在
        if (eventType && fn) {
            // 绑定事件
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 根据vm实例对象找data属性中的msg的属性值  
    _getVMVal: function(vm, exp) {
        // 获取对象
        var val = vm;
        // msg表达式中的.切割掉,形成一个数组
        exp = exp.split('.');
        // 遍历数组
        exp.forEach(function(k) {
            val = val[k];
        });
        // 返回属性的值
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 更新的对象
var updater = {

    // 插值语法的文本替换操作的方法
    // v-text指令
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html的指令
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    //  v-class指令
    classUpdater: function(node, value, oldValue) {
        // 获取节点的类样式的名字
        var className = node.className;
        // 类样式的名字替换为空格的方式
        className = className.replace(oldValue, '').replace(/\s$/, '');
        //如果是类样式的名字并且这个值有就是空格   没有就是空
        var space = className && String(value) ? ' ' : '';
        // 该标签上有原来的类样式名字+空格+现在的类样式名字
        node.className = className + space + value;
    },
    // v-model指令
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};