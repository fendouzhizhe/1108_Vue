//编译操作的构造函数el指的是#app，vm指的是Vue的实例对象
function Compile(el, vm) {
    //把实例对象存到属性中
    this.$vm = vm;
    //把容器div存到属性中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    //判断div容器是否存在
    if (this.$el) {
        //把容器中所有的节点放在文档碎片中
        this.$fragment = this.node2Fragment(this.$el);
        //初始化
        this.init();
        //再把文档碎片重新放在div容器中
        this.$el.appendChild(this.$fragment);
    }
}
//编译的原型
Compile.prototype = {
    //构造函数
    constructor: Compile,
    //文档节点的函数
    node2Fragment: function(el) {
        //创建文档碎片
        var fragment = document.createDocumentFragment(),
            child;

        // 将节点拷贝到fragment，遍历div所有节点，然后添加到文档碎片中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        //返回文档碎片
        return fragment;
    },
    //初始化函数
    init: function() {
        //把文档碎片传入编译的元素里
        this.compileElement(this.$fragment);
    },
    //文档元素的函数
    compileElement: function(el) {
        //获取每一个文档碎片的子节点
        var childNodes = el.childNodes,
            //把编译对象放在变量中
            me = this;
        //遍历每一个子节点
        [].slice.call(childNodes).forEach(function(node) {
            //获取欧每一个节点的文本内容，node指的是每一个节点
            var text = node.textContent;
            //插值语法的正则表达式
            var reg = /\{\{(.*)\}\}/;
            //判断是否是标签节点
            if (me.isElementNode(node)) {
                //编译标签节点
                me.compile(node);
                //判断是不是文本节点并且这个文本节点是否和正则匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                //编译文本节点
                me.compileText(node, RegExp.$1.trim());
            }
            //判断是否有子节点
            if (node.childNodes && node.childNodes.length) {
                //有的话，继续编译节点
                me.compileElement(node);
            }
        });
    },
    //编译节点函数的方法
    compile: function(node) {
        //存储子节点的属性
        var nodeAttrs = node.attributes,
            //编译的实例对象放在me中
            me = this;
        //遍历属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            //获取属性的名字
            var attrName = attr.name;
            //判断这个属性名字是否是指令
            if (me.isDirective(attrName)) {
                //获取属性的值
                var exp = attr.value;
                //把索引为2的属性名字取出来放在dir中
                var dir = attrName.substring(2);
                // 判断是否是事件指令
                if (me.isEventDirective(dir)) {
                    //指向对应的回调函数
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    //是普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                //删除原来的属性名字
                node.removeAttribute(attrName);
            }
        });
    },
    //编译文本
    compileText: function(node, exp) {
        //调用编译的方法   传文本节点和实例对象
        compileUtil.text(node, this.$vm, exp);
    },
    //判断是否是指令
    isDirective: function(attr) {
        //属性以v-开头就返回0
        return attr.indexOf('v-') == 0;
    },
    //判断是否是事件指令
    isEventDirective: function(dir) {
        //以on开头的返回0
        return dir.indexOf('on') === 0;
    },
    //判断是否是标签节点
    isElementNode: function(node) {
        //是的话返回true   否则返回false
        return node.nodeType == 1;
    },
    //判断是否是文本节点
    isTextNode: function(node) {
        //是的话返回true   否则返回false
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //v-text
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    //v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    //v-model
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
    //v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    //v-bind
    bind: function(node, vm, exp, dir) {
        //获取updater
        var updaterFn = updater[dir + 'Updater'];
        //根据实例对象找到属性的值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        //监视
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        //获取dir中索引为1的值
        var eventType = dir.split(':')[1],
            //实例对象在methods方法是否存在
            fn = vm.$options.methods && vm.$options.methods[exp];
        //判断索引为1的值和fn这个函数是否存在
        if (eventType && fn) {
            //绑定事件
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    //根据实例对象找属性的值
    _getVMVal: function(vm, exp) {
        //获取对象
        var val = vm;
        //切割   变成数组
        exp = exp.split('.');
        //遍历这个数组
        exp.forEach(function(k) {
            val = val[k];
        });
        //返回该属性的值
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

//更新对象
var updater = {
    //v-text指令
    textUpdater: function(node, value) {
        
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    //v-html指令
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    //v-class指令
    classUpdater: function(node, value, oldValue) {
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
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};