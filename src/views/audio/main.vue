<template>
  <div class="main">
    <h3>audio</h3>
    <canvas id="canvas" ref="canvas" width="512" height="256" ></canvas>
    <div>
      <input
        type="file"
        id='audio'
        :accept="accept"
        @change="fileChange"
      />
    </div>
    <div>
      <button @click="play">播放</button>
      <button @click="stop">暂定</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accept: '.mp3,.ogg',
      audioContext: null,
      audioBuffer: null,
      sourceNode: null,
      analyserNode: null,
      javascriptNode: null,
      audioData: null,
      audioPlaying: false,
      sampleSize: 1024,
      amplitudeArray: null,
      ctx: null
    }
  },
  mounted () {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback, element) {
          window.setTimeout(callback, 1000 / 60)
        }
    })()
    window.AudioContext = (function () {
      return window.webkitAudioContext || window.AudioContext || window.mozAudioContext
    })()
    try {
      this.audioContext = new AudioContext()
    } catch (e) {
      alert('当前浏览器不支持 Web Audio ！')
    }
    this.$nextTick(() => {
      this.ctx = this.$refs.canvas.getContext('2d')
    })
  },
  methods: {
    fileChange: function (v) {
      let file = v.target.files[0]
      if (!file) {
        alert('未选中文件 ！')
        return
      }
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      this.audioData = null
      reader.onload = () => {
        this.audioContext.decodeAudioData(reader.result, buffer => {
          this.audioData = buffer
          console.log('加载完成')
        }, err => {
          console.log(err)
        })
      }
    },
    play: function () {
      let { audioData, audioContext, sampleSize } = this
      if (!audioData) return
      let sourceNode = audioContext.createBufferSource()
      let analyserNode = audioContext.createAnalyser()
      let javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1)
      let amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount)

      this.sourceNode = sourceNode
      this.analyserNode = analyserNode
      this.javascriptNode = javascriptNode
      this.amplitudeArray = amplitudeArray

      sourceNode.connect(audioContext.destination)
      sourceNode.connect(analyserNode)
      analyserNode.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)
      javascriptNode.onaudioprocess = () => {
        analyserNode.getByteTimeDomainData(amplitudeArray)
        if (this.audioPlaying) {
          window.requestAnimFrame(() => {
            this.ctx.clearRect(0, 0, 512, 256)
            for (let i = 0; i < amplitudeArray.length; i++) {
              let value = amplitudeArray[i] / 256
              let y = 256 - (256 * value) - 1
              this.ctx.fillStyle = '#000000'
              this.ctx.fillRect(i, y, 1, 1)
            }
          })
        }
      }

      this.sourceNode.buffer = audioData
      this.sourceNode.loop = true
      this.sourceNode.start(0)
      this.audioPlaying = true
    },
    stop: function () {
      this.sourceNode.stop()
      this.audioPlaying = false
    }
  },
  watch: {
  },
  computed: {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.main {
  padding: 0;
  margin: 0;
}
</style>
