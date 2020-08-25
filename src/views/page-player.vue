<template>
  <div class="ppap">
    <Player
      :int="int"
      theme="default"
      :d="d"
      :config="playConfig"
      :change="changeEvent"
    />
  </div>
</template>

<script>
// import Player from '../components/player/index.vue'
import Player from 'cll-vue-components/lib/playBar'

const radar = 'http://47.95.1.229:8069/webapi/api/v2/images/realtime-custom?category=radar/huanan&name=华南雷达拼图&time=[2018-12-11T04:59:24,2018-12-13T08:59:24]'
const url = 'http://61.145.9.103:50053/WebApi/api/v1/images/realtime?category=Cloud%2F%E9%A3%8E%E4%BA%91%E4%BA%8C%E5%8F%B7%2F%E6%B0%B4%E6%B1%BD&time=%5B2019-07-14%2016%3A58%3A09%2C2019-07-15%2016%3A58%3A09%5D&desc=false'
export default {
  name: 'tableTest',
  components: {
    Player
  },
  data () {
    return {
      int: 1,
      d: [],
      playConfig: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'rgb(42,200,157)',
        barColor: '#fff',
        label: false,
        labelType: 'text', // time | text
        labelKey: 'name',
        // labelFmt: 'yyyyMMddHHmm',
        tick: false,
        speed: 500,
        interval: 100
      }
    }
  },
  mounted () {
    console.log(radar)
    this.$ajax.get(url).then(ret => {
      let data = ret.data
      this.d = data
      this.int++
      console.log(data)
    }).catch(ret => console.log(ret))
  },
  methods: {
    changeEvent: function (i, v) {
      console.log(i, v)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.ppap { height: 100px; width: 90%; border: 1px solid #999; margin: 0 auto; background: #999;}
</style>
