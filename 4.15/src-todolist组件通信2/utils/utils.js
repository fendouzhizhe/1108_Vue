export default {
  // 获取数据
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },
  // 设置数据
  setTodos (val) {
    localStorage.setItem('todos_key', JSON.stringify(val))
  }
}
