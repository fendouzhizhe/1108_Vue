// 编译操作的函数
function Compile (el, vm) {
    // 把vm实例对象存储到$vm属性中
    this.$vm = vm;
    // 根据#app选择器获取容器对象div,并存储到$el中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断$el容器 是否存在
    if (this.$el) {
        // 把容器中节点全部的放在文档碎片中
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化
        this.init();
        // 把文档碎片对象重新放在div容器中
        this.$el.appendChild(this.$fragment);
    }
}
// 编译的原型对象
Compile.prototype = {
    //编译的构造器
    constructor: Compile,
    //文档节点的函数
    node2Fragment: function (el) { 
        // 创建文档碎片
        var fragment = document.createDocumentFragment(),
            child;

        // 通过循环方式,把div中节点添加到文档碎片中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 初始化
    init: function () {
        // 编译元素的方法
        this.compileElement(this.$fragment);
    },
    //编译元素
    compileElement: function (el) {
        // 获取文档碎片中所有的节点
        var childNodes = el.childNodes,
        // 把编译对象放在me中
            me = this; 
        // 遍历每个子节点
        [].slice.call(childNodes).forEach(function (node) {
            // 获取节点的文本内容(node---就是每个节点)
            var text = node.textContent;
            // 插值语法的对应的正则表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的节点是不是标签节点
            if (me.isElementNode(node)) {
                // 编译标签节点
                me.compile(node);

                // 判断是不是文本节点,并且这个文本节点和正则是否匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译文本节点
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断是否有子节点
            if (node.childNodes && node.childNodes.length) {
                // 如果节点中还有子节点,继续遍历节点
                me.compileElement(node);
            }
        });
    },

    //编译节点函数的方法
    compile: function (node) {
        //存储子节点的属性
        var nodeAttrs = node.attributes,
            // 编译的实例对象存储到了me中
            me = this; 
        // 遍历所有的属性
        [].slice.call(nodeAttrs).forEach(function (attr) {
            // 获取属性的名字
            var attrName = attr.name;
            // 判断当前的这个属性是不是一个指令
            if (me.isDirective(attrName)) {
                // 获取这个属性的值
                var exp = attr.value;
                //把索引为2的属性名字取出来放在dir中
                var dir = attrName.substring(2);
                // 判断当前的指令是不是一个事件指令
                if (me.isEventDirective(dir)) {
                    // dir就是一个事件指令
                    // 为标签节点,绑定对应的事件,并让事件指向对应的回调函数
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 把原来的属性和值直接删除
                node.removeAttribute(attrName);
            }
        });
    },
    // 编译插值
    compileText: function (node, exp) {
        // 调用编译工具方法,把属性值和vm实例对象传进去
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断属性是不是一个指令
    isDirective: function (attr) {
        // 如果以v-开头的,就返回true,说明属性是一个指令属性
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是一个事件指令
    isEventDirective: function (dir) {
        //以on开头的返回0
        return dir.indexOf('on') === 0;
    },
    // 判断是不是标签节点
    isElementNode: function (node) {
        //是的话返回true   否则返回false
        return node.nodeType == 1;
    },
    // 判断是不是文本节点
    isTextNode: function (node) {
        //是的话返回true   否则返回false
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // v-text
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // v-html
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class
    class: function (node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    //v-bind
    bind: function (node, vm, exp, dir) {
        // 获取updater
        var updaterFn = updater[dir + 'Updater'];
        //  根据vm对象找性的值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 监视对象
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function (node, vm, exp, dir) {
        // 获取dir中索引为1的值
        var eventType = dir.split(':')[1],
            // vm中的methods对象是否存在
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断索引为1的值和fn这个函数是否存在
        if (eventType && fn) {
            // 绑定事件
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    //根据实例对象找属性的值
    _getVMVal: function (vm, exp) {
        // 获取对象
        var val = vm;
        // msg表达式中的.切割掉,形成一个数组
        exp = exp.split('.');
        // 遍历数组
        exp.forEach(function (k) {
            val = val[k];
        });
        // 返回属性的值
        return val; 
    },

    _setVMVal: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

//更新对象
var updater = {
    // 插值语法文本替换    v-text
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html方法
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    // v-class方法
    classUpdater: function (node, value, oldValue) {
        //获取节点的类名字
        var className = node.className;
        //替换这个类名字
        className = className.replace(oldValue, '').replace(/\s$/, '');
        //如果是类样式的名字并且这个值有就是空格   没有就是空
        var space = className && String(value) ? ' ' : '';
        //现在该标签上有现在的类名字+空格+原来的类名字
        node.className = className + space + value;
    },
    //v-model指令
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};