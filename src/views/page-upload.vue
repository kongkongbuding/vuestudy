<template>
  <div class="box">
    <c-upload :url="url" :headers="headers" :success="success" :error="error" multiple='true' />
  </div>
</template>

<script>
// import Upload from 'cll-vue-components/lib/upload'
export default {
  data () {
    return {
      url: 'http://47.95.14.220:8080/webapi-szjc/api/attachment/upload-file',
      headers: {
        sysFlag: 'SZJC',
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU1ODQwNzI1NjU2NyxcInVzSWRcIjo2NjA5LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCJkODc0ZWViM2RmMjg0MGNkYjM3OTZjMzg2ZTZhOGUyYVwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODczNzY3MjU2LCJpYXQiOjE1NTg0MDcyNTZ9.fPysitpxkXxP7IR1-bmb_R5XFGJVztoBQgjaMsrxOR8'
      }
    }
  },
  // components: {
  //   Upload
  // },
  methods: {
    success: function (ret, list) {
      console.log(ret)
      console.log(list)
    },
    error: function (err) {
      console.log(err)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.box {
  width: 400px; border: 1px solid #cecece; margin: 100px;
}
</style>
