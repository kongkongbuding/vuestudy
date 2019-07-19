<template>
  <div class="login">
    <h3>主页</h3>
    <img :src="userImg">
    <div>
      <span>用户名</span>
      {{s.user}}
    </div>
    <div>
      <span>密码</span>
      {{s.password}}
    </div>
    <div>
      <span>别名</span>
      {{s.name}}
    </div>
    <div>
      <span>年龄</span>
      {{s.age}}
    </div>
    <div>
      <span>电话号码</span>
      {{s.phone}}
    </div>
    <div>
      <span>邮箱</span>
      {{s.email}}
    </div>
    <div>
      <span>性别</span>
      {{s.sex}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      s: this.$store.state.login
    }
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
  },
  watch: {
  },
  computed: {
    userImg: function () {
      return 'http://localhost:8888' + this.s.portrait_path
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.login {
  padding: 0; margin: 0;
}
</style>
