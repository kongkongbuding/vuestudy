<template>
  <div class="ppap">
    <easy-map
      :d="d"
      :int="int"
      :config="config"
      :click="clickEvent"
      :hover="hover"
    />
  </div>
</template>

<script>
import EasyMap from './easyMap/index.vue'
import bgImg from '../assets/map-bg.png'
import mapImg from '../assets/map.png'
import normal from '../assets/normal.png'
import over from '../assets/over.png'

const dataUrl = 'http://192.168.118.226:50053/webapi/api/v1.1/basic/data?key=s_water_rain_info&begin_time=2018-12-14 12:00:00&end_time=2018-12-14 15:00:00&begin_time_rain=2018-12-14 08:00:00&end_time_rain=2018-12-14 15:00:00'

export default {
  name: 'mapTest',
  components: {
    EasyMap
  },
  data () {
    return {
      int: 1,
      d: {},
      config: {
        background: bgImg,
        map: mapImg,
        bounds: [[112.909211, 22.8231784], [113.183204, 22.5454124]],
        viewBounds: [0.1, 0.1, 0.9, 0.9],
        mapType: 'fullReal' // 'fullReal'
      }
    }
  },
  created () {
  },
  mounted () {
    this.$ajax.get(dataUrl).then(ret => {
      let data = ret.data.data
      let points = [], lines = [], areas = []
      data.map(v => {
        if (parseInt(v.batch) === 1) {
          points.push({
            lat: v.lttd,
            lng: v.lgtd,
            stnm: v.stnm,
            stcd: v.stcd,
            batch: v.batch,
            icon: normal,
            size: [10, 10],
            tooltip: {
              permanent: false,
              direction: 'top',
              data: [
                { name: '', key: 'stnm', textAlign: 'center' },
                { name: 'stcd:', key: 'stcd' },
                { name: 'batch:', key: 'batch' }
              ]
            }
          })
          try {
            let latlng = JSON.parse(v.map_data)
            let area = {
              latlng,
              color: 'rgba(255, 255, 255, .7)',
              hover: '#ffe845',
              stnm: v.stnm,
              stcd: v.stcd,
              batch: v.batch,
              tooltip: {
                lat: latlng[0][0].lat,
                lng: latlng[0][0].lng,
                permanent: false,
                direction: 'top',
                data: [
                  { name: '', key: 'stnm', textAlign: 'center' },
                  { name: 'stcd:', key: 'stcd' },
                  { name: 'batch:', key: 'batch' }
                ]
              }
            }
            areas.push(area)
          } catch (err) {}
        }
        if (parseInt(v.batch) === 2) {
          points.push({
            lat: v.lttd,
            lng: v.lgtd,
            icon: over,
            size: [10, 10]
          })
          try {
            let latlng = JSON.parse(v.map_data)[0].map(v => [v.lng, v.lat])
            let line = {
              latlng,
              color: '#f00',
              hover: '#ffe845',
              width: 3
            }
            lines.push(line)
          } catch (err) {}
        }
      })
      this.d = {
        points,
        lines,
        areas
      }
      this.int++
    }
    ).catch(ret => console.log(ret))
  },
  methods: {
    clickEvent: function (v) {
      console.log(v)
    },
    hover: function (v) {
      console.log(v)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.ppap { height: 80%; width: 90%; border: 1px solid #999; margin: 0 auto;}
</style>
