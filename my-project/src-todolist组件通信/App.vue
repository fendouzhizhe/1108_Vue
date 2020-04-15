<template>
  <div class="todo-container">

    <div class="todo-wrap">
      <Header @addBook="addBook" />
      <List :books="books" />
      <Footer
        :books="books"
      >
        <label slot="left">
          <input
            type="checkbox"
            v-model="checkAll"
          />
        </label>
        <span slot="center">
          <span>已完成{{counts}}</span> / 全部{{books.length}}
        </span>
        <button
          class="btn btn-danger"
          slot="right"
        >清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>

<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
// 引入utils暴露的对象
import Storage from './utils/utils'
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  data () {
    return {
      // books: [
      //   { id: 1, bname: '西游记', isReady: false },
      //   { id: 2, bname: '红楼梦', isReady: true },
      //   { id: 3, bname: '斗破苍穹', isReady: false }
      // ],
      // books: JSON.parse(localStorage.getItem('books_key') || '[]')
      books: Storage.getBooks()
    }
  },
  // 书写方法的对象
  methods: {
    // 添加数据
    addBook (book) {
      this.books.unshift(book)
    },
    // 删除数据
    deleteBook (index) {
      this.books.splice(index, 1)
    },
    // 切换操作(选中/不选中)
    toggleBook (book) {
      book.isReady = !book.isReady
    },
    // 全选/全不选
    checkAllBook (flag) {
      this.books.forEach(book => {
        book.isReady = flag
      })
    }
  },
  // todos数组数据发生变化，就要缓存数据，某个数据发生变化，要做一些操作---监视
  watch: {
    books: {
      deep: true, // 深度监视
      // handler: function (val) { // 要执行的相关操作
      //   // 缓存数据
      //   // localStorage.setItem('books_key', JSON.stringify(this.books))
      //   Storage.setBooks(val)
      // }
      handler: Storage.setBooks
    }
  },
  // 页面加载完毕
  mounted () {
    this.token = PubSub.subscribe('deleteBook', (msg, data) => {
      // 删除数据
      this.deleteBook(data)
    })
    // 通过事件总线的方式来绑定事件总线
    this.$car.$on('toggleBook', (book) => {
      this.toggleBook(book)
    })
  },
  // 销毁之前的生命周期钩子---回调
  beforeDestroy () {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑事件
    // this.$bus.$off('toggleTodo')
  },
  computed: {
    // 已经完成的数量(选中的个数)
    counts () {
      return this.books.reduce((p, book) => p + (book.isReady ? 1 : 0), 0)
    },
    // 全选/全不选的计算属性
    checkAll: {
      get () {
        return this.counts === this.books.length && this.counts > 0
      },
      set (val) {
        this.checkAllBook(val)
      }
    }
  }
}
</script>

<style scoped>
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
