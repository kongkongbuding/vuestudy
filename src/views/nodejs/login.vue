<template>
  <div class="login">
    <h3>登录</h3>
    <div>
      <span>用户名</span>
      <input
        v-model="user"
        type="text"
      />
    </div>
    <div>
      <span>密码</span>
      <input
        v-model="password"
        type="password"
      />
    </div>
    <div>
      <button @click="login">登录</button>
      <button>
        <router-link :to="{ path: '/nodejs/register'}">注册</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      s: this.$store.login,
      user: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    login: function () {
      let { user, password } = this
      this.$ajax.post('http://localhost:8888/user/login', { user, password }, {
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(ret => {
        let { data, state, message } = ret.data
        if (state) {
          this.$message.success(message, 3)
          this.$router.push({ path: '/nodejs/main' })
          this.$store.commit('setUser', data)
        } else {
          this.$message.error(message, 3)
        }
      }
      ).catch(ret => console.log(ret))
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.login {
  padding: 0;
  margin: 0;
}
</style>
