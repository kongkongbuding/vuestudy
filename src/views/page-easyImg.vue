<template>
  <div class="ppap">
    <c-easy-img
      :int="int"
      theme="default"
      :d="d"
      type="real"
    />
  </div>
</template>

<script>
// import EasyImg from 'cll-vue-components/lib/easyImg'

const radar = 'http://47.95.1.229:8069/webapi/api/v2/images/realtime-custom?category=radar/huanan&name=华南雷达拼图&time=[2018-12-13T07:59:24,2018-12-13T08:59:24]'

export default {
  // components: {
  //   EasyImg
  // },
  data () {
    return {
      int: 1,
      d: []
    }
  },
  mounted () {
    this.$ajax.get(radar).then(ret => {
      let data = ret.data
      this.d = data
      this.int++
    }
    ).catch(ret => console.log(ret))
  }
}
</script>

<style type="text/less" lang="less" scoped>
.ppap { height: 388px; width: 618px; border: 1px solid #999; margin: 0 auto;}
</style>
