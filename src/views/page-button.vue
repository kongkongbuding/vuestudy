<template>
  <div class="buttonGroup">
      <div style="height: 40px; display: inline-block;">
        <div>
          <btn @click="clickEvent">名称</btn>
          <btn @click="clickEvent" type="primary">名称</btn>
          <btn @click="clickEvent" type="success">名称</btn>
          <btn @click="clickEvent" type="info">名称</btn>
          <btn @click="clickEvent" type="warning">名称</btn>
          <btn @click="clickEvent" type="danger">名称</btn>
        </div>
        <div>
          <btn @click="clickEvent" disabled>名称</btn>
          <btn @click="clickEvent" disabled type="primary" :style="{borderRadius: '10px'}">名称</btn>
          <btn @click="clickEvent" disabled type="success">名称</btn>
          <btn @click="clickEvent" disabled type="info">名称</btn>
          <btn @click="clickEvent" disabled type="warning">名称</btn>
          <btn @click="clickEvent" disabled type="danger">名称</btn>
        </div>
        <div>
          <btn @click="clickEvent" size="big" type="primary">名称</btn>
          <btn @click="clickEvent" size="middle" type="primary">名称</btn>
          <btn @click="clickEvent" size="small" type="primary">名称</btn>
        </div>
      </div>
  </div>
</template>

<script>
import Btn from 'cll-vue-components/lib/button'

export default {
  name: 'tableTest',
  components: {
    Btn
  },
  data () {
    return {}
  },
  methods: {
    clickEvent: function (e) {
      console.log('click', e)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.buttonGroup {
  text-align: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0;
  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
</style>
