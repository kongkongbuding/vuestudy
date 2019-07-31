<template>
  <div class="main">
    <h3>audio</h3>
    <canvas id="canvas" ref="canvas" :width="cW" :height="cH" ></canvas>
    <div>
      <input
        type="file"
        id='audio'
        :accept="accept"
        @change="fileChange"
      />
    </div>
    <div>
      <span>音量 </span>
      <input type="range" @change="changeVolume" min="-1" max="2" value="0.01" step="0.01" />
      <input type="button" @click="waveVolume" value="wave" >
    </div>
    <div>
      <input type="radio" name="panner" checked @click="usePanner" />
      <span>声道 </span>
      <span>
        左
        <input type="range" @change="changePanner"  min="-1" max="1" value="0" step="0.01" />
        右
      </span>
    </div>
    <div>
      <input type="radio" name="panner" @click="usePanner3d" />
      <span>3d声道 </span>
      <span>
        左
        <input type="range" min="-10" max="10" v-model="panner3dPosition[0]" step="0.1" />
        右
      </span>
      <span>
        上
        <input type="range" min="-10" max="10" v-model="panner3dPosition[1]" step="0.1" />
        下
      </span>
      <span>
        里
        <input type="range" min="-10" max="10" v-model="panner3dPosition[2]" step="0.1" />
        外
      </span>
    </div>
    <div>
      <span>播放速率</span>
      <input type="range" @change="playbackRate" min="0.2" max="2" value="1" step="0.1" />
    </div>
    <div>
      <button @click="play">播放</button>
      <button @click="stop">暂定</button>
    </div>
    <div>
      <span>创建音频</span>
      <button @click="createOscillator" >空白音调</button>
      <button @click="recording" >录音</button>
      <button @click="stopRecording" >停止录音</button>
    </div>
  </div>
</template>

<script>

import './polyfill.js'

const cW = 512
const cH = 256

export default {
  data () {
    return {
      accept: '.mp3,.ogg,.flac',
      audioContext: null,
      gainNode: null,
      biquadFilter: null,
      panner: null,
      panner3d: null,
      audioBuffer: null,
      sourceNode: null,
      stream: null,
      mediaRecorder: null,
      analyserNode: null,
      javascriptNode: null,
      audioData: null,
      audioPlaying: false,
      amplitudeArray: null,
      ctx: null,
      cW,
      cH,
      panner3dPosition: [0, 0, 0],
      panner3dX: 0,
      panner3dY: 0,
      panner3dZ: 0
    }
  },
  mounted () {
    try {
      this.initAudioContext()
    } catch (e) {
      alert('当前浏览器不支持 Web Audio ！')
    }
    this.$nextTick(() => {
      this.ctx = this.$refs.canvas.getContext('2d')
    })
  },
  methods: {
    initAudioContext: function () {
      let audioContext = new AudioContext()
      let destination = audioContext.destination
      let gainNode = audioContext.createGain()
      let biquadFilter = audioContext.createBiquadFilter()
      let panner = new StereoPannerNode(audioContext, { pan: 0 })
      let panner3d = audioContext.createPanner()
      let analyserNode = audioContext.createAnalyser()
      let amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount)
      let javascriptNode = audioContext.createScriptProcessor(analyserNode.frequencyBinCount, 1, 1)

      gainNode.connect(panner).connect(destination)
      biquadFilter.connect(panner).connect(destination)
      panner3d.connect(destination)
      analyserNode.connect(javascriptNode).connect(destination)
      javascriptNode.onaudioprocess = audioProcessingEvent => {
        // analyserNode.getByteTimeDomainData(amplitudeArray)
        analyserNode.getByteFrequencyData(amplitudeArray)
        if (this.audioPlaying) {
          window.requestAnimFrame(() => {
            let { ctx } = this
            ctx.strokeStyle = '#000000'
            let grad = ctx.createLinearGradient(0, 0, 0, cH)
            grad.addColorStop(0, 'rgba(255, 0, 0, 0.8)')
            grad.addColorStop(1, 'rgba(255, 255, 0, 0.8)')
            ctx.fillStyle = grad
            ctx.clearRect(0, 0, cW, cH)
            ctx.beginPath()
            for (let i = 0; i < amplitudeArray.length; i++) {
              let y = cH - amplitudeArray[i] - 1
              ctx[i ? 'lineTo' : 'moveTo'](i, y)
            }
            ctx.lineTo(amplitudeArray.length - 1, cH)
            ctx.lineTo(0, cH)
            ctx.fill()
          })
        }
      }

      this.audioContext = audioContext
      this.gainNode = gainNode
      this.biquadFilter = biquadFilter
      this.panner = panner
      this.panner3d = panner3d
      this.analyserNode = analyserNode
      this.amplitudeArray = amplitudeArray
      this.javascriptNode = javascriptNode
    },
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
          // this.audioPlaying && this.sourceNode && this.sourceNode.stop()
          this.destructionSourceNode()

          console.log('加载完成!')
          let { audioData, audioContext, gainNode, analyserNode } = this // , gainNode, analyserNode
          if (!audioData) return
          let sourceNode = audioContext.createBufferSource()

          // sourceNode.connect(audioContext.destination)
          sourceNode.connect(analyserNode)
          sourceNode.connect(gainNode)

          sourceNode.buffer = audioData
          sourceNode.loop = true
          sourceNode.start(0)

          this.sourceNode = sourceNode

          // let sourceNodeCopy = audioContext.createBufferSource()
          // sourceNodeCopy.connect(gainNode)
          // sourceNodeCopy.buffer = audioData
          // sourceNodeCopy.loop = true
          // sourceNodeCopy.start(0.1, 0.05)

          this.audioPlaying = true
        }, err => {
          console.log(err)
        })
      }
    },
    play: function () {
      this.audioContext.resume()
    },
    stop: function () {
      this.audioContext.suspend()
    },
    destructionSourceNode: function () {
      if (this.audioPlaying && this.sourceNode && this.sourceNode.stop) {
        this.sourceNode.stop()
        this.sourceNode = null
      }
    },
    changeVolume: function (e) {
      let value = e.target.value
      this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime)
      this.biquadFilter.gain.setValueAtTime(value, this.audioContext.currentTime)
      // this.gainNode.gain.linearRampToValueAtTime(value, this.audioContext.currentTime + 2)
      // this.gainNode.gain.exponentialRampToValueAtTime(value, this.audioContext.currentTime + 2)
      // this.gainNode.gain.setTargetAtTime(value, this.audioContext.currentTime + 1, 0.5)
    },
    waveVolume: function () {
      this.gainNode.gain.setValueCurveAtTime(new Float32Array([-1, 1, -1, 1, -1, 1, -1, 1]), this.audioContext.currentTime, 10)
    },
    changePanner: function (e) {
      let value = e.target.value
      // this.panner.pan.setValueAtTime(value, this.audioContext.currentTime)
      this.panner.pan.linearRampToValueAtTime(value, this.audioContext.currentTime + 2)
      // this.panner.pan.exponentialRampToValueAtTime(value, this.audioContext.currentTime + 2)
      // this.panner.pan.setTargetAtTime(value, this.audioContext.currentTime + 1, 0.5)
    },
    playbackRate: function (e) {
      let value = e.target.value
      this.sourceNode.playbackRate.linearRampToValueAtTime(value, this.audioContext.currentTime + 3)
    },
    usePanner3d: function () {
      let { gainNode, panner, panner3d } = this
      gainNode.disconnect(panner)
      gainNode.connect(panner3d)
    },
    usePanner: function () {
      let { gainNode, panner, panner3d } = this
      gainNode.disconnect(panner3d)
      gainNode.connect(panner)
    },
    setPanner3dX: function () {
      let { panner3d, panner3dPosition } = this
      if (panner3d.positionX) {
        panner3d.positionX.value = panner3dPosition[0]
        panner3d.positionY.value = panner3dPosition[1]
        panner3d.positionZ.value = panner3dPosition[2]
      } else {
        panner3d.setPosition(panner3dPosition[0], panner3dPosition[1], panner3dPosition[2])
      }
    },
    createOscillator: function () {
      let { audioContext } = this
      let osc = audioContext.createOscillator()
      let dest = audioContext.createMediaStreamDestination()
      let mediaRecorder = new MediaRecorder(dest.stream)
      osc.connect(dest)
      mediaRecorder.start()
      osc.start(0)
      setTimeout(() => {
        // mediaRecorder.requestData()
        mediaRecorder.stop()
        osc.stop(0)
      }, 1000)
      let data = []
      mediaRecorder.ondataavailable = evt => {
        data.push(evt.data)
      }
      mediaRecorder.onstop = evt => {
        let blob = new Blob(data, { type: 'audio/ogg; codecs=opus' })
        let audioTag = document.createElement('audio')
        audioTag.controls = true
        document.getElementById('app').appendChild(audioTag)
        audioTag.src = URL.createObjectURL(blob)
      }
    },
    recording: function () {
      this.destructionSourceNode()
      this.stopRecording()
      let { audioContext, biquadFilter, analyserNode } = this // gainNode
      biquadFilter.type = 'lowshelf'
      biquadFilter.frequency.value = 1000
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          let sourceNode = audioContext.createMediaStreamSource(stream)
          sourceNode.connect(analyserNode)
          sourceNode.connect(biquadFilter)
          this.sourceNode = sourceNode
          this.audioPlaying = true
          this.stream = stream
          this.play()

          this.createMediaRecorder(stream)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createMediaRecorder: function (stream) {
      let mediaRecorder = new MediaRecorder(stream)
      let data = []
      mediaRecorder.start()
      mediaRecorder.ondataavailable = evt => {
        data.push(evt.data)
      }
      mediaRecorder.onstop = evt => {
        let blob = new Blob(data, { type: 'audio/ogg; codecs=opus' })
        let audioTag = document.createElement('audio')
        audioTag.controls = true
        document.getElementById('app').appendChild(audioTag)
        audioTag.src = URL.createObjectURL(blob)
      }
      this.mediaRecorder = mediaRecorder
    },
    stopRecording: function () {
      let { stream, mediaRecorder } = this
      if (stream) {
        stream.getTracks()[0].stop()
        if (mediaRecorder) {
          mediaRecorder.stop()
        }
      }
    }
  },
  watch: {
    panner3dPosition: {
      handler: function () {
        this.setPanner3dX()
      },
      deep: true
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.main {
  padding: 0;
  margin: 0;
  div {
    margin: 10px;
  }
}
</style>
