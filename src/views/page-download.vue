<template>
  <div class="box" v-download="url" fileName="图片.svg" >
    下载
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg'
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.box {
  height: 100px; width: 400px; border: 1px solid #cecece; color: #000; cursor: pointer;
}
</style>
