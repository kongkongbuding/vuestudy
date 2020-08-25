<template>
  <div>
    <div>
      <div class="btn" v-badge="a" max='99'></div>
      <div class="btn" v-badge="b"></div>
      <div class="btn" v-badge="c"></div>
      <div class="btn" v-badge="d"></div>
      <div class="btn" v-badge="e" max='999'></div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      a: 100,
      b: 10,
      c: 5,
      d: 999,
      e: 1000
    }
  },
  mounted () {
    setTimeout(() => {
      this.a = 99
    }, 2000)
    setTimeout(() => {
      this.a = 0
    }, 4000)
  }
}
</script>

<style type="text/less" lang="less" scoped>
.btn {
  height: 30px; width: 60px; float: left; background: #cecece; border-radius: 4px; margin-left: 20px;
}
</style>
