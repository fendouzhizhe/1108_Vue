<template>
  <li
    @mouseenter="mouseHand(true)"
    @mouseleave="mouseHand(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input
        type="checkbox"
        v-model="isCheck"
      />
      <span>{{books.bname}}</span>
    </label>
    <button
      class="btn btn-danger"
      style="display:none"
      v-show="isShow"
      @click="delBook"
    >删除</button>
  </li>
</template>

<script>
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  // props: {
  //   todo: Object,
  //   deleteTodo: Function,
  //   index: Number,
  //   toggleTodo: Function
  // },
  props: {
    book: Object,
    index: Number
  },
  data () {
    return {
      fontColor: 'black', // 文字的颜色
      bgColor: 'white', // 背景颜色
      isShow: false // 默认按钮是隐藏的
    }
  },
  methods: {
    // 鼠标进入和离开的事件
    mouseHand (flag) {
      if (flag) { // 鼠标进入事件
        this.fontColor = 'yellow'
        this.bgColor = 'pink'
        this.isShow = true
      } else { // 鼠标离开事件
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 删除数据
    delBook () {
      // 友好的删除提示信息
      if (confirm('您确定要删除吗')) {
        PubSub.publish('deleteBook', this.index)
        // this.deleteTodo(this.index)
      }
    }
  },
  // 计算属性
  computed: {
    isCheck: {
      get () {
        return this.book.isReady
      },
      set () {
        // console.log(this.$bus)
        this.$car.$emit('toggleBook', this.book)
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
