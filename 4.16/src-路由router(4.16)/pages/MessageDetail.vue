<template>
  <div>
    <ul>
      <li>id:{{id}}</li>
      <li>title:{{detail.title}}</li>
      <li>detail:{{detail.content}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MessageDetail',
  props: ['id'],
  data () {
    return {
      messageDetails: [
        { id: 1, title: 'message1', content: 'detail1' },
        { id: 2, title: 'message2', content: 'detail2' },
        { id: 3, title: 'message3', content: 'detail3' }
      ],
      // 用来存储对象
      detail: {}
    }
  },
  mounted () {
    this.sDetail(this.$route)
  },
  //监视
  watch: {
    $route (value) {
      this.sDetail(value)
    }
  },
  methods: {
    sDetail (route) {
      const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>
