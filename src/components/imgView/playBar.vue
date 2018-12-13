<template>
  <canvas
    :class='cName'
    ref='canvas'
    @mousemove="move"
    @click="click"
  />
</template>

<script>

const PI = Math.PI
const INTERVAL = 80
const BLEFT = 120
const BARLEFT = 5
const BARRIGHT = 30
const INDENT = 12
const TICKHALF = 12

export default {
  name: 'playBar',
  props: {
    theme: {
      type: String,
      default: ''
    },
    int: {
      type: Number,
      default: -1
    },
    d: Array,
    config: Object,
    change: Function
  },
  data () {
    return {
      cof: {
        backgroundColor: '#f4f4f4',
        color: '#4987c5',
        barColor: '#32608f',
        label: 'time', // time text
        tick: true,
        speed: 1000
      },
      c: {
        i: 0,
        timer: null,
        tickIndex: 1,
        tickInterval: INTERVAL,
        w: 2000,
        h: 100,
        rect: [0, 2000],
        hit: false,
        btn: [
          { key: 'btn_pre', left: 20, r: 12 },
          { key: 'btn_play', left: 56, r: 22 },
          { key: 'btn_next', left: 92, r: 12 }
        ],
        iBtn: [
          { key: 1, size: 7, left: 56, type: 'play' },
          { key: 1, size: 3.5, left: 89 },
          { key: 1, size: 3.5, left: 95 },
          { key: -1, size: 3.5, left: 17 },
          { key: -1, size: 3.5, left: 23 }
        ]
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initEvent()
    })
  },
  methods: {
    initEvent: function () {
      window.onresize = () => {
        this.setSize()
        this.draw()
      }
    },
    setSize: function () {
      let canvas = this.$refs.canvas, w = 2000, h = 100
      if (canvas) {
        w = canvas.offsetWidth
        h = canvas.offsetHeight
      }
      this.c.w = w
      this.c.h = h
    },
    move: function (e) {
      let { btn, rect, h, w, tickInterval } = this.c
      let canvas = this.$refs.canvas
      if (!canvas) return
      let cr = canvas.getBoundingClientRect()
      let x = (e.clientX - cr.left) / cr.width * w
      let y = (e.clientY - cr.top) / cr.height * h
      let hit = false
      btn.map(v => {
        if (Math.sqrt(Math.pow(x - v.left, 2) + Math.pow(y - h / 2, 2)) < v.r) hit = v.key
      })
      if (!hit && x > rect[0] && x < rect[1] && Math.abs(y - h / 2) < 5) {
        let i = Math.min(Math.max(0, Math.round((x - (rect[0] + INDENT)) / tickInterval)), this.d.length - 1)
        hit = 'index_' + i
      }
      if (this.c.hit === hit) return
      canvas.style.cursor = hit ? 'pointer' : 'default'
      if (this.c.hit.toString().indexOf('btn') > -1 || hit.toString().indexOf('btn') > -1) {
        this.c.hit = hit
        this.draw()
        return
      }
      this.c.hit = hit
    },
    click: function () {
      let { hit } = this.c
      if (!hit) return
      if (hit.indexOf('index') > -1) {
        let _i = hit.split('_')[1]
        this.c.i = _i
        return
      }
      switch (hit) {
        case 'btn_pre':
          this.changeI(-1)
          break
        case 'btn_next':
          this.changeI(1)
          break
        case 'btn_play':
          if (this.c.timer === null) {
            this.changeI(1)
            this.c.timer = setInterval(() => {
              this.changeI(1)
            }, this.cof.speed)
          } else {
            clearInterval(this.c.timer)
            this.c.timer = null
            this.draw()
          }
          break
      }
    },
    changeI: function (v) {
      let i = parseInt(this.c.i)
      i = i + v
      if (i < 0) i = this.d.length - 1
      if (i > this.d.length - 1) i = 0
      this.c.i = i
    },
    building: function () {
      this.c.i = 0
      !!this.$props.change && this.$props.change(0)
      clearInterval(this.c.timer)
      this.c.timer = null
      this.draw()
    },
    draw: function () {
      let { cof, c, d = [] } = this, { i, w, h, btn, iBtn, hit } = c
      let canvas = this.$refs.canvas
      if (!canvas) return
      canvas.width = w
      canvas.height = h
      let ctx = canvas.getContext('2d')
      let len = d.length < 2 ? 1 : d.length - 1
      let tickInterval = (w - BLEFT - BARLEFT - INDENT * 2 - BARRIGHT) / len
      let tickIndex = tickInterval > INTERVAL ? 1 : Math.floor(INTERVAL / tickInterval)
      this.c.tickInterval = tickInterval
      this.c.tickIndex = tickIndex
      let start = BLEFT + INDENT + BARLEFT
      // 背景色
      ctx.fillStyle = cof.backgroundColor
      ctx.fillRect(0, 0, w, h)
      ctx.lineCap = 'round'

      // 按钮圆形
      btn.map(v => {
        ctx.fillStyle = cof.color
        this.drawArc(ctx, v)
        if (v.key === hit) {
          ctx.fillStyle = 'rgba(255, 255, 255, .3)'
          this.drawArc(ctx, v)
        }
      })

      // 按钮三角形
      ctx.fillStyle = ctx.strokeStyle = '#fff'
      ctx.lineWidth = 4
      iBtn.map(v => {
        if (this.c.timer !== null && v.type === 'play') {
          this.drawStop(ctx, v)
          return
        }
        this.drawTriangle(ctx, v)
      })

      // 绘制主刻度
      ctx.fillStyle = cof.color
      if (cof.label) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '12px serif'
        d.map((v, i) => {
          if (i % tickIndex !== 0) return
          let l = start + i * tickInterval
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(l, h / 2 - TICKHALF)
          ctx.lineTo(l, h / 2 + TICKHALF)
          ctx.stroke()
          let ta = '', tb = v.tm
          if (cof.label === 'time') {
            let time = v.tm.replace(/^(\d{4})[-/](\d{2})[-/](\d{2})[ T](.*)$/, '$1/$2/$3 $4')
            time = new Date(time)
            ta = time.getHours() + '时'
            tb = (time.getMonth() + 1) + '月' + time.getDay() + '日'
          }
          ctx.fillText(ta, l, h / 2 - TICKHALF - 12)
          ctx.fillText(tb, l, h / 2 + TICKHALF + 12)
        })
      }

      // 绘制播放条背景
      ctx.strokeStyle = cof.barColor
      ctx.lineWidth = 10
      let barLineLeft = BLEFT + BARLEFT
      let barLineWidth = w - BLEFT - BARLEFT - BARRIGHT
      ctx.beginPath()
      ctx.moveTo(barLineLeft, h / 2)
      ctx.lineTo(barLineLeft + barLineWidth, h / 2)
      ctx.stroke()
      this.c.rect = [barLineLeft, barLineLeft + barLineWidth]

      // 绘制进度
      ctx.strokeStyle = cof.color
      let progress = Math.min(Math.max(INDENT, INDENT + i * tickInterval), barLineWidth)
      ctx.beginPath()
      ctx.moveTo(BLEFT + BARLEFT, h / 2)
      ctx.lineTo(BLEFT + BARLEFT + progress, h / 2)
      ctx.stroke()

      // 绘制刻度
      if (cof.tick) {
        d.map((v, i) => {
          let l = start + i * tickInterval
          ctx.strokeStyle = '#fff'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(l, h / 2)
          ctx.lineTo(l, h / 2 + 5)
          ctx.stroke()
        })
      }
    },
    drawArc: function (ctx, v) {
      let { h } = this.c
      ctx.beginPath()
      ctx.arc(v.left, h / 2, v.r, 0, PI * 2)
      ctx.fill()
    },
    drawTriangle: function (ctx, v) {
      let { h } = this.c, { left, size, key } = v
      ctx.beginPath()
      ctx.moveTo(left - size * key * 0.7, h / 2 - size * 1.5)
      ctx.lineTo(left - size * key * 0.7, h / 2 + size * 1.5)
      ctx.lineTo(left + size * key * 1.3, h / 2)
      ctx.closePath()
      ctx.fill()
    },
    drawStop: function (ctx, v) {
      let { h } = this.c, { left, size } = v
      ctx.beginPath()
      ctx.moveTo(left - size * 0.7, h / 2 - size * 1.5)
      ctx.lineTo(left - size * 0.7, h / 2 + size * 1.5)
      ctx.stroke()
      ctx.moveTo(left + size * 0.7, h / 2 - size * 1.5)
      ctx.lineTo(left + size * 0.7, h / 2 + size * 1.5)
      ctx.stroke()
    }
  },
  computed: {
    cName: function () {
      return 'playBar ' + this.theme
    }
  },
  filters: {
  },
  watch: {
    int: function (v) {
      let cof = Object.assign({}, this.cof, this.$props.config)
      this.cof = cof
      this.setSize()
      this.building()
    },
    'c.i': function (i) {
      !!this.$props.change && this.$props.change(i)
      this.draw()
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.playBar {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
