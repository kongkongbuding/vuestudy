<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="routerbox">
      <h4>##router1</h4>
      <router-view class = 'view one' a=1></router-view>
    </div>
    <div class="routerbox">
      <h4>##router2</h4>
      <router-view class = 'view two' name = 'a'></router-view>
    </div>
    <div class="routerbox">
      <h4>##router3</h4>
      <router-view class = 'view three' name = 'b'></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  provide: {
    foo: 'bar'
  },
  mounted: function () {
    // console.log(this.$children)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.less';
a {
  color: #42b983;
}
.routerbox {
  border: 1px solid red;
  margin: 10px;
}
</style>
