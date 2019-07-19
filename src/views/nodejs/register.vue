
<template>
  <div class="login">
    <h3>注册</h3>
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
      <span>别名</span>
      <input
        v-model="name"
        type="text"
      />
    </div>
    <div>
      <span>年龄</span>
      <input
        v-model="age"
        type="text"
      />
    </div>
    <div>
      <span>电话号码</span>
      <input
        v-model="phone"
        type="text"
      />
    </div>
    <div>
      <span>邮箱</span>
      <input
        v-model="email"
        type="text"
      />
    </div>
    <div>
      <span>性别</span>
      <input
        v-model="sex"
        type="text"
      />
    </div>
    <div class="uploadWrap">
      <upload url="http://localhost:8888/file/file_upload" :success="fileUploadSuccess" :error="fileUploadError" />
    </div>
    <div>
      <button @click="registerNewUser">注册</button>
    </div>
  </div>
</template>

<script>
import Upload from 'cll-vue-components/lib/upload'
import qs from 'qs'
export default {
  data () {
    return {
      user: '',
      password: '',
      name: '',
      age: '',
      phone: '',
      email: '',
      sex: '',
      portrait: ''
    }
  },
  components: {
    Upload
  },
  methods: {
    registerNewUser: function () {
      let { user, password, name, age, phone, email, sex, portrait } = this
      this.$ajax.post('http://localhost:8888/user/register', { user, password, name, age, phone, email, sex, portrait }, {
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(ret => {
        let { state, message } = ret.data
        if (state) {
          this.$message.success(message, 3)
          this.$router.push({ path: '/nodejs/login' })
        } else {
          this.$message.error(message, 3)
        }
      }).catch(ret => console.log(ret))
    },
    fileUploadSuccess: function (ret) {
      let state = ret.state
      this.portrait = state ? ret.data : ''
    },
    fileUploadError: function (ret) {
      this.portrait = ''
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.login {
  padding: 0;
  margin: 0;
  .uploadWrap {
    width: 300px; margin: 0 auto;
  }
}
</style>
