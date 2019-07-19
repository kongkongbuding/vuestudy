<template>
  <div class="ppap">
    <easy-map
      :d="d"
      :int="int"
      :config="config"
      :click="clickEvent"
      :hover="hover"
    >
      <div
        class="legend"
        slot="bottomRight"
      >
        图例
        <div>行1</div>
      </div>
    </easy-map>
  </div>
</template>

<script>
import EasyMap from 'cll-vue-components/lib/easyMap'
import bgImg from '../assets/map-bg.png'
import mapImg from '../assets/bg.png'
import normal from '../assets/normal.png'
import over from '../assets/over.png'

const dataUrl = 'http://192.168.118.226:50053/webapi/api/v1.1/basic/data?key=s_water_rain_info&begin_time=2018-12-14 12:00:00&end_time=2018-12-14 15:00:00&begin_time_rain=2018-12-14 08:00:00&end_time_rain=2018-12-14 15:00:00'

export default {
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
        tooltip: {
          // backgroundColor: 'rgba(0, 0, 0, .7)',
          color: '#ff0'
        },
        // bounds: [[106.20640954, 26.39684000], [106.41949300, 26.30171796]],
        bounds: [[106.20660954, 26.39484000], [106.41949300, 26.30291796]],
        viewBounds: [0.1, 0.1, 0.9, 0.9],
        mapType: 'real' // 'full'
      }
    }
  },
  mounted () {
    this.$ajax.get(dataUrl).then(ret => {
      let data = ret.data.data
      let points = [], lines = [], areas = []
      data.map((v, n) => {
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
              direction: n % 2 === 0 ? 'bottom' : 'top',
              data: [
                { name: '', key: 'stnm', style: { textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '16px' } },
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
          } catch (err) { }
        }
        if (parseInt(v.batch) === 2) {
          points.push({
            lat: v.lttd,
            lng: v.lgtd,
            stnm: v.stnm,
            stcd: v.stcd,
            batch: v.batch,
            icon: over,
            size: [10, 10],
            tooltip: {
              permanent: false,
              direction: 'top',
              data: `<div style="background: rgba(5, 73, 148, .6); padding: 5px;">` +
                `<div>站点名称：` + v.stnm + `</div>` +
                `<div>站点编号：` + v.stcd + `</div>` +
                `<div>显示序列：` + v.batch + `</div>` +
                `</div>`
            }
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
          } catch (err) { }
        }
      })
      this.d = {
        points,
        lines,
        areas
      }
      this.d.lines = [
        {
          color: '#f00',
          hover: '#ffe845',
          width: 3,
          latlng: [{ lng: 106.314334, lat: 26.354274 }, { lng: 106.310551, lat: 26.352917 }, { lng: 106.307945, lat: 26.351418 }, { lng: 106.307838, lat: 26.350026 }, { lng: 106.307553, lat: 26.348599 }, { lng: 106.307731, lat: 26.346636 }, { lng: 106.308267, lat: 26.344887 }, { lng: 106.308623, lat: 26.342852 }, { lng: 106.308766, lat: 26.340604 }, { lng: 106.308766, lat: 26.339319 }, { lng: 106.308195, lat: 26.337356 }, { lng: 106.308766, lat: 26.336214 }, { lng: 106.308802, lat: 26.334929 }, { lng: 106.307838, lat: 26.333251 }, { lng: 106.307339, lat: 26.331324 }, { lng: 106.307053, lat: 26.329396 }, { lng: 106.305911, lat: 26.327683 }, { lng: 106.305161, lat: 26.32597 }, { lng: 106.304626, lat: 26.324043 }, { lng: 106.304483, lat: 26.322151 }, { lng: 106.305161, lat: 26.320438 }, { lng: 106.307339, lat: 26.317832 }, { lng: 106.308159, lat: 26.316833 }, { lng: 106.307803, lat: 26.315869 }, { lng: 106.305411, lat: 26.315155 }, { lng: 106.303995, lat: 26.314638 }, { lng: 106.302092, lat: 26.314043 }, { lng: 106.300212, lat: 26.313948 }, { lng: 106.29888, lat: 26.313163 }, { lng: 106.298189, lat: 26.312116 }, { lng: 106.298665, lat: 26.310926 }, { lng: 106.300807, lat: 26.308665 }, { lng: 106.301402, lat: 26.308237 }, { lng: 106.301259, lat: 26.307404 }, { lng: 106.299284, lat: 26.305453 }, { lng: 106.296738, lat: 26.305429 }, { lng: 106.292764, lat: 26.306167 }, { lng: 106.289314, lat: 26.306905 }, { lng: 106.286911, lat: 26.30769 }, { lng: 106.285745, lat: 26.307975 }, { lng: 106.283603, lat: 26.309617 }, { lng: 106.281819, lat: 26.310521 }, { lng: 106.279796, lat: 26.311092 }, { lng: 106.27756, lat: 26.311449 }, { lng: 106.274704, lat: 26.311568 }].map(v => {
            return [v.lng, v.lat]
          })
        },
        {
          color: '#f00',
          hover: '#ffe845',
          width: 3,
          latlng: [{ lng: 106.317332, lat: 26.355594 }, { lng: 106.316202, lat: 26.356826 }, { lng: 106.314608, lat: 26.358444 }, { lng: 106.313656, lat: 26.360514 }, { lng: 106.313085, lat: 26.361918 }, { lng: 106.312704, lat: 26.362441 }, { lng: 106.313037, lat: 26.364131 }, { lng: 106.313275, lat: 26.365654 }, { lng: 106.3123, lat: 26.367034 }, { lng: 106.310943, lat: 26.36789 }, { lng: 106.309325, lat: 26.368723 }, { lng: 106.308897, lat: 26.369413 }, { lng: 106.307422, lat: 26.369389 }, { lng: 106.307184, lat: 26.37165 }, { lng: 106.306779, lat: 26.372459 }, { lng: 106.305804, lat: 26.373696 }, { lng: 106.303876, lat: 26.374481 }, { lng: 106.302116, lat: 26.375481 }, { lng: 106.300902, lat: 26.376147 }, { lng: 106.296619, lat: 26.376932 }, { lng: 106.294006, lat: 26.376863 }].map(v => {
            return [v.lng, v.lat]
          })
        },
        {
          color: '#f00',
          hover: '#ffe845',
          width: 3,
          latlng: [{ lng: 106.335321, lat: 26.381792 }, { lng: 106.333358, lat: 26.379972 }, { lng: 106.331502, lat: 26.378009 }, { lng: 106.329789, lat: 26.374725 }, { lng: 106.32936, lat: 26.368658 }, { lng: 106.329182, lat: 26.366052 }, { lng: 106.327968, lat: 26.364303 }, { lng: 106.326898, lat: 26.362376 }, { lng: 106.325541, lat: 26.361127 }, { lng: 106.325042, lat: 26.359556 }, { lng: 106.3239, lat: 26.358557 }, { lng: 106.319652, lat: 26.356772 }, { lng: 106.317332, lat: 26.355594 }].map(v => {
            return [v.lng, v.lat]
          })
        }
      ]
      console.log(this.d)
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
.ppap {
  height: 80%;
  width: 90%;
  border: 1px solid #999;
  margin: 0 auto;
}
.legend {
  height: 100px;
  width: 100px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
