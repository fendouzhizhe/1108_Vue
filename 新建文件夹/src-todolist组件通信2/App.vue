<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <Footer :todos="todos" :checkAllTodos="checkAllTodos">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>
        <button slot="right" class="btn btn-danger">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header.vue'
// 引入List组件
import List from './components/List.vue'
// 引入Footer组件
import Footer from './components/Footer.vue'
// 引入封装之后的工具对象
import Storage from './utils/utils.js'
// 引入PubSub---消息订阅对象
import PubSub from 'pubsub-js'
export default {
  // 设置当前组件的名字
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  // 数据
  data() {
    return {
      // todos: [
      //   { id: 1, title: '铭哥', isCompleted: false },
      //   { id: 2, title: '华哥', isCompleted: true },
      //   { id: 3, title: '健哥', isCompleted: false }
      // ]
      // todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      todos: Storage.getTodos()
    }
  },
  // 写方法
  methods: {
    // 添加数据的方法
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除数据的方法
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 操作
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 设置全选和全不选的操作
    checkAllTodos(flag) {
      this.todos.forEach(todo => {
        todo.isCompleted = flag
      })
    }
  },
  // 监视
  watch: {
    // 对象的方式书写监视的代码
    todos: {
      deep: true, // 深度监视
      // handler: function(val) {
      //   // 监视
      //   // 缓存数据
      //   // localStorage.setItem('todos_key', JSON.stringify(this.todos))
      //   // Storage.setTodos(val)
      // }
      handler: Storage.setTodos
    }
  },
  // 使用PubSub实现删除操作
  mounted() {
    // 订阅消息
    this.token = PubSub.subscribe('deleteTodo', (msg, data) => {
      // 调用方法
      this.deleteTodo(data)
    })
    // 事件总线的方式进行组件之间的通信
    this.$bus.$on('togggleTodo', todo => {
      // 调用toggleTodo方法
      this.toggleTodo(todo)
    })
  },
  beforeDestroy() {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑事件的操作
    this.$bus.$off()
  },
  computed: {
    // 显示已完成的数量
    count() {
      return this.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      )
    },
    // 是否全选
    checkAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodos(val)
      }
    }
  }
}
// 使用脚手架组件化的方式实现todolist案例
// 拆分组件
// function f1(){}
// console.log(f1())
</script>
<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
