<template>
  <div class="index">
    <div class="routerbox">
      <router-view
        class='view'
        name='login'
      ></router-view>
    </div>
    <div class="routerbox">
      <router-view
        class='view'
        name='register'
      ></router-view>
    </div>
    <div class="routerbox">
      <router-view
        class='view'
        name='main'
      ></router-view>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.login {
  padding: 0;
  margin: 0;
}
</style>
