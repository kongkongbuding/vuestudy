<template>
  <div class="boxing"></div>
</template>

<script>
import download from '../../utils/download.js'
export default {
  components: {},
  data () {
    return {
      left: 100,
      top: 200
    }
  },
  mounted: function () {
    console.log(download, 'a.png')
    download('http://t3.tianditu.gov.cn/DataServer?T=vec_w&x=207&y=115&l=8&tk=16554181e1d8f9f3b82ce84fe953c164', 'a.png')
  }
}
</script>

<style type="text/less" lang="less" scoped>
.boxing {
  width: 300px; height: 240px; border: 1px solid #aaa; margin: 20px;
}
</style>
