<template>
  <li
    @mouseenter="mouseHandle(true)"
    @mouseleave="mouseHandle(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isCheck" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>
<script>
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  // 设置组件的名字
  name: 'Item',
  // props接收传递的数据
  props: {
    // 设置当前传递过来的数据的类型
    todo: Object,
    index: Number
  },
  data() {
    return {
      // 设置按钮显示或者隐藏
      isShow: false,
      fontColor: 'black',
      bgColor: 'white'
    }
  },
  // 写方法的地方
  methods: {
    mouseHandle(flag) {
      // 鼠标进入事件
      if (flag) {
        this.isShow = true
        this.bgColor = 'gray'
        this.fontColor = 'pink'
      } else {
        // 鼠标离开事件
        this.isShow = false
        this.bgColor = 'white'
        this.fontColor = 'black'
      }
    },
    // 删除操作
    delTodo() {
      // 提示用户是否删除
      if (confirm('您确定删除吗')) {
        // 通过PubSub发布消息即可
        PubSub.publish('deleteTodo', this.index)
        // this.deleteTodo(this.index)
      }
    }
  },
  computed: {
    isCheck: {
      get() {
        return this.todo.isCompleted
      },
      set() {
        // 事件总线的方式实现切换效果操作
        // 分发事件
        this.$bus.$emit('togggleTodo', this.todo)
        // this.toggleTodo(this.todo)
      }
    }
  }
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
