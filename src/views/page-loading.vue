<template>
  <div class = 'loadingbtn'>
    <div @click="show">show</div>
  </div>
</template>

<script>

export default {
  name: 'pageTooltip',
  data () {
    return {}
  },
  methods: {
    show: function () {
      if (!this.$loading) return
      this.$loading.show('数据加载中...')
      setTimeout(() => this.hide(), 3000)
    },
    hide: function () {
      this.$loading.hide()
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.loadingbtn {
  div {
    height: 30px; width: 60px; background: #0f9; margin: 100px; float: left; cursor: pointer;
  }
}
</style>
