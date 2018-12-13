<template>
  <div :style="{height: h + 'px', width: w + 'px', border: '1px solid #999', margin: '0 auto'}">
    <img-view
      :int="int"
      theme="default"
      :d="d"
      :config="config"
    />
  </div>
</template>

<script>
import ImgView from './imgView/index.vue'
const radar = 'http://47.95.1.229:8069/webapi/api/v2/images/realtime-custom?category=radar/huanan&name=华南雷达拼图&time=[2018-12-13T04:59:24,2018-12-13T08:59:24]'
export default {
  name: 'tableTest',
  components: {
    ImgView
  },
  data () {
    return {
      w: 1200,
      h: 680,
      int: 1,
      d: [],
      config: {
        a: 1
      }
    }
  },
  created () {
  },
  mounted () {
    this.$ajax.get(radar).then(ret => {
      let data = ret.data
      this.d = data
      this.int++
    }
    ).catch(ret => console.log(ret))
  },
  methods: {
  }
}
</script>
