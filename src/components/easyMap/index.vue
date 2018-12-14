<template>
  <div :class="cName" ref="box" :style="{background: background}">
    <div v-if="!!baseMap.img" class="wrapBox" :style="position">
      <img class="baseMap" v-if="baseMap.img" :src="baseMap.src" />
      <canvas ref="canvas" class="drawCanvas" />
      <div class="mapPoint" v-for="(v, i) in data" :key="'point' + i" :style="{left: v.__left__, top: v.__top__}">
        <img :src="v.icon" :style="{marginLeft: v.size[0] / -2 + 'px', marginTop: v.size[1] / -2 + 'px'}" />
      </div>
    </div>
  </div>
</template>

<script>

// const O = Object.prototype.toString
// const isArray = v => O.call(v) === '[object Array]'

export default {
  name: 'easyMap',
  props: {
    theme: {
      type: String,
      default: ''
    },
    int: {
      type: Number,
      default: -9
    },
    config: {
      type: Object,
      required: true
    },
    d: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      data: [],
      f: -1,
      baseMap: {
        src: null,
        img: false,
        w: 100,
        h: 100,
        t: 0,
        l: 0
      },
      cof: {
        background: 'rgba(0, 0, 0, 0)',
        map: null,
        bounds: [[0, 20], [20, 0]], // [lng, lat]
        mapType: 'fullReal', // full | fullReal
        viewBounds: [0, 0, 1, 1] // 地图显示的区域限制
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.building()
      window.addEventListener('resize', this.initEvent)
    })
  },
  methods: {
    initEvent: function () {
      this.setSize()
    },
    building: function () {
      let cof = Object.assign({}, this.cof, this.$props.config)
      this.cof = cof
      if (cof.map !== this.baseMap.src) {
        let img = document.createElement('img')
        img.src = cof.map
        img.onload = () => {
          this.baseMap.img = img
          this.setSize()
        }
        img.onerror = () => {
          this.baseMap.img = false
          this.f++
          this.draw()
        }
        return
      }
      this.setSize()
    },
    setSize: function () {
      let { baseMap, cof } = this, { img } = baseMap, { viewBounds, mapType } = cof
      if (!img) return
      let box = this.$refs.box
      let bw = box.offsetWidth, bh = box.offsetHeight
      let vw = bw * (viewBounds[2] - viewBounds[0]), vh = bh * (viewBounds[3] - viewBounds[1])
      switch (mapType) {
        case 'full':
          this.baseMap = {
            img,
            src: cof.map,
            w: vw,
            h: vh,
            t: bh * viewBounds[1],
            l: bw * viewBounds[0]
          }
          break
        case 'fullReal':
          let iw = img.width, ih = img.height
          let w = iw, h = ih
          if (vw / vh >= iw / ih) {
            h = Math.min(vh, ih)
            w = h * iw / ih
          } else {
            w = Math.min(vw, iw)
            h = w * ih / iw
          }
          this.baseMap = {
            img,
            src: cof.map,
            w,
            h,
            t: (vh - h) / 2 + bh * viewBounds[1],
            l: (vw - w) / 2 + bw * viewBounds[0]
          }
          break
      }
      this.draw()
    },
    draw: function () {
      let canvas = this.$refs.canvas
      let { cof, baseMap, d } = this, { w, h } = baseMap, { bounds } = cof
      let { points = [], lines = [], areas = [] } = d
      if (!canvas) {
        setTimeout(() => this.draw(), 200)
        return
      }
      canvas.width = w
      canvas.height = h
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      if (!this.baseMap.img) {
        this.data = []
        return
      }
      let np = []
      points.map(v => {
        if (!v.lat || !v.lng) return
        v.__left__ = (v.lng - bounds[0][0]) / (bounds[1][0] - bounds[0][0]) * w + 'px'
        v.__top__ = (v.lat - bounds[0][1]) / (bounds[1][1] - bounds[0][1]) * h + 'px'
        np.push(v)
      })
      this.data = np
      lines.map(v => {
        ctx.strokeStyle = v.color || '#fff'
        ctx.lineWidth = v.width || 2
        // if (isArray(v.latlng[0]) && isArray(v.latlng[0][0])) {
        //   v.latlng.map(c => {
        //     this.buildPath(ctx, c, bounds, w, h)
        //     ctx.stroke()
        //   })
        // } else {
        //   this.buildPath(ctx, v.latlng, bounds, w, h)
        //   ctx.stroke()
        // }
        this.buildPath(ctx, v.latlng, bounds, w, h)
        ctx.stroke()
      })
      areas.map(v => {
        ctx.fillStyle = v.color || '#fff'
        // if (isArray(v.latlng[0]) && isArray(v.latlng[0][0])) {
        //   v.latlng.map(c => {
        //     this.buildPath(ctx, c, bounds, w, h)
        //     ctx.closePath()
        //     ctx.fill()
        //   })
        // } else {
        //   this.buildPath(ctx, v.latlng, bounds, w, h)
        //   ctx.closePath()
        //   ctx.fill()
        // }
        this.buildPath(ctx, v.latlng, bounds, w, h)
        ctx.fill()
      })
    },
    buildPath: function (ctx, d, bounds, w, h, key) {
      ctx.beginPath()
      d.map((v, i) => {
        let a = v.lng === void 0 ? v[0] : v.lng
        let b = v.lat === void 0 ? v[1] : v.lat
        let x = (a - bounds[0][0]) / (bounds[1][0] - bounds[0][0]) * w
        let y = (b - bounds[0][1]) / (bounds[1][1] - bounds[0][1]) * h
        ctx[i ? 'lineTo' : 'moveTo'](x, y)
      })
    }
  },
  computed: {
    cName: function () {
      return 'easyMap ' + this.theme
    },
    position: function () {
      let b = this.baseMap
      let s = {
        width: b.w + 'px',
        height: b.h + 'px',
        top: b.t + 'px',
        left: b.l + 'px'
      }
      return s
    },
    background: function () {
      let b = this.cof.background
      let s = b.toString().substring(0, 3)
      if (s === 'rgb' || s.charAt(0) === '#') {
        return b
      }
      return 'url(' + b + ') no-repeat center / 100% 100%'
    }
  },
  filters: {
  },
  watch: {
    int: function (v) {
      this.building()
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
@import "./index.less";
</style>
