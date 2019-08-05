<template>
  <div class="main" @mouseup="painoState = 0">
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
    <div>
      <span>创建视频</span>
      <button @click="recordVideo" >录屏</button>
      <button @click="stopRecordVideo" >停止录屏</button>
    </div>
    <div>
      <span>钢琴</span>
      <button @click="buildToneArray" >创建音调</button>
      <button @click="playPainoMusic('xxx')">小星星</button>
      <button @click="playPainoMusic('zdqc')">纸短情长</button>
      <button @click="playPainoMusic('tkzc')">天空之城高</button>
      <button @click="playPainoMusic('tkzcd')">天空之城低</button>
      <div class="paino" :toneNum='toneNum' @mousedown="painoState = 1">
        <div class="painoKey" @mousedown="clickPainoKey(v, 1)" @mouseenter="clickPainoKey(v)" v-for="(v, i) in painoKey" :doClick="painoActive == v ? 'true' : 'false'" :overbuild="tone[v] ? 'true' : 'false'" :key="'painoKey' + i">{{v}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import './polyfill.js'

const cW = 512
const cH = 256
const currentColor = [
  [255, 0, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255]
]
const duration = 2
const keyTime = 360
const music = {
  xxx: '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - -',
  zdqc: '1 1 2 3 3 2 3 - 3 2 1 5 5 3 5 - 5 6 7 1_ 1_ 1_ 1_ 1_ 7 6 7 6 3 5 - 5 6 1_ 5 6 - 6 5 3 5 3 2 1 - 1 1 3 2 2 1 2 5 2',
  tkzc: '- - 6 7 1_ - - 7 1_ - 3_ - 7 - - - - - 3 - 6 - - 5 6 - 1_ - 5 - - - - - 3 3 4 - - 3 4 - 1_ - 3 - - 0 - 1_ 1_ 1_ 7 - - 5 5 - 7 - 7 - - - - - 6 7 1_ - - 7 1_ - 3_ - 7 - - - - - 3 3 6 - - 5 6 - 1_ - 5 - - - - - 3 - 4 - 1_ 7 - - 1_ - 2_ - 3_ 1_ - - - 0 1_ 7 6 6 7 - 6 - 6 - - - - - 1_ 2_ 3_ - - 2_ 3_ - 5_ - 2_ - - - - - 5 5 1_ - - 7 1_ - 3_ - 3_ - - - - - - - 6 7 1_ - 7 1_ 2_ - 1_ - - 5 5 - - - 4_ - 3_ - 2_ - 1_ - 3_ - - - - - - - 3_ - - - 0 - 3_ - 6_ - - - 5_ - - - 3_ - 2_ 1_ - - - 0 2_ - 1_ 2_ - - 5_ - 3_ - - - - - 3_ - 6_ - - - 5_ - - - 3_ - 2_ 1_ - - - 0 2_ - 1_ 2_ - - 7 - 6 - - - - - 6 7 6 - - -',
  tkzcd: '- - _6 _7 1 - - _7 1 - 3 - _7 - - - - - _3 - _6 - - _5 _6 - 1 - _5 - - - - - _3 _3 _4 - - _3 _4 - 1 - _3 - - 0 - 1 1 1 _7 - - _5 _5 - _7 - _7 - - - - - _6 _7 1 - - _7 1 - 3 - _7 - - - - - _3 _3 _6 - - _5 _6 - 1 - _5 - - - - - _3 - _4 - 1 _7 - - 1 - 2 - 3 1 - - - 0 1 _7 _6 _6 _7 - _6 - _6 - - - - - 1 2 3 - - 2 3 - 5 - 2 - - - - - _5 _5 1 - - _7 1 - 3 - 3 - - - - - - - _6 _7 1 - _7 1 2 - 1 - - _5 _5 - - - 4 - 3 - 2 - 1 - 3 - - - - - - - 3 - - - 0 - 3 - 6 - - - 5 - - - 3 - 2 1 - - - 0 2 - 1 2 - - 5 - 3 - - - - - 3 - 6 - - - 5 - - - 3 - 2 1 - - - 0 2 - 1 2 - - _7 - _6 - - - - - _6 _7 _6 - - -'
}

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
      panner3dZ: 0,
      painoKey: ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '1', '2', '3', '4', '5', '6', '7', '1_', '2_', '3_', '4_', '5_', '6_', '7_'],
      painoferq: [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568, 1760, 1967],
      tone: {},
      toneNum: 0,
      painoState: 0,
      painoActiveTimer: null,
      painoActive: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      try {
        this.initAudioContext()
      } catch (e) {
        alert('当前浏览器不支持 Web Audio ！')
      }
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
            let ct = audioContext.currentTime
            let ct0 = ct / 2
            let ct1 = ct0 + 1
            let { ctx } = this
            ctx.strokeStyle = '#000000'
            let grad = ctx.createLinearGradient(0, 0, 0, cH)
            grad.addColorStop(0, 'rgba(' + this.getCurrentTimeColor(ct0) + ', 0.8)')
            grad.addColorStop(1, 'rgba(' + this.getCurrentTimeColor(ct1) + ', 0.8)')
            ctx.fillStyle = grad
            ctx.clearRect(0, 0, cW, cH)
            ctx.beginPath()
            for (let i = 0; i < amplitudeArray.length; i++) {
              let y = cH - amplitudeArray[i]
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
      this.play()
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
          this.destructionSourceNode()

          let { audioData, audioContext, gainNode, analyserNode } = this
          if (!audioData) return
          let sourceNode = audioContext.createBufferSource()

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
    createMediaRecorder: function (stream, useBuffer, callBack) {
      let mediaRecorder = new MediaRecorder(stream)
      let data = []
      mediaRecorder.start()
      mediaRecorder.ondataavailable = evt => {
        data.push(evt.data)
      }
      mediaRecorder.onstop = evt => {
        let blob = new Blob(data, { type: 'audio/ogg; codecs=opus' })
        if (useBuffer) {
          let f = new FileReader()
          f.readAsArrayBuffer(blob)
          f.onload = () => {
            this.audioContext.decodeAudioData(f.result, buffer => {
              callBack && callBack(buffer)
            })
          }
        } else {
          let audioTag = document.createElement('audio')
          audioTag.controls = true
          document.getElementById('app').appendChild(audioTag)
          audioTag.src = URL.createObjectURL(blob)
        }
      }
      this.mediaRecorder = mediaRecorder
      return mediaRecorder
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
      this.createMediaRecorder(dest.stream)
      osc.connect(dest)
      osc.start(0)
      setTimeout(() => {
        // mediaRecorder.requestData()
        this.stopRecording()
        osc.stop(0)
      }, 1000)
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
          this.play()

          this.createMediaRecorder(stream)
        })
        .catch(err => {
          console.log(err)
        })
    },
    stopRecording: function (mediaRecorder) {
      if (!mediaRecorder) mediaRecorder = this.mediaRecorder
      if (!mediaRecorder) return
      let stream = mediaRecorder.stream
      if (!mediaRecorder) return
      if (stream) {
        stream.getTracks()[0].stop()
        // mediaRecorder.requestData()
        mediaRecorder.stop()
        this.stream = null
        this.mediaRecorder = null
      }
    },
    recordVideo: function () {
      this.destructionSourceNode()
      let { audioContext, analyserNode } = this // , biquadFilter
      // biquadFilter.type = 'lowshelf'
      // biquadFilter.frequency.value = 1000
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
          let video = document.createElement('video')
          video.controls = true
          video.id = 'recordVideo'
          document.body.appendChild(video)
          video.srcObject = stream
          // video.volume = 1
          video.onloadedmetadata = function (e) {
            video.play()
            video.volume = 0.5
            // video.muted = true
          }

          let sourceNode = audioContext.createMediaStreamSource(stream)
          sourceNode.connect(analyserNode)
          // sourceNode.connect(biquadFilter)
          // this.sourceNode = sourceNode
          this.audioPlaying = true
          this.play()

          let mediaRecorder = new MediaRecorder(stream)
          let data = []
          mediaRecorder.start()
          mediaRecorder.ondataavailable = evt => {
            data.push(evt.data)
          }
          mediaRecorder.onstop = evt => {
            let blob = new Blob(data, { type: 'video/x-matroska;codecs=avc1,opus' })
            let videoTag = document.createElement('video')
            videoTag.controls = true
            document.getElementById('app').appendChild(videoTag)
            videoTag.src = URL.createObjectURL(blob)
          }
          this.mediaRecorder = mediaRecorder
        })
        .catch(err => {
          console.log(err)
        })
    },
    stopRecordVideo: function () {
      let { mediaRecorder } = this
      if (!mediaRecorder) return
      let stream = mediaRecorder.stream
      stream.getTracks()[0].stop()
      mediaRecorder.stop()
      let videoDom = document.getElementById('recordVideo')
      videoDom && videoDom.parentNode.removeChild(videoDom)
    },
    buildToneArray: function () {
      this.painoKey.map((v, i) => {
        let frequency = this.painoferq[i]
        frequency && this.buildTone(frequency, v)
      })
    },
    buildTone: function (frequency, key) {
      let { audioContext } = this
      let ct = audioContext.currentTime
      let oscillator = audioContext.createOscillator()
      let dest = audioContext.createMediaStreamDestination()
      let gainNode = audioContext.createGain()
      let mediaRecorder = this.createMediaRecorder(dest.stream, true, buffer => {
        this.tone[key] = buffer
        this.toneNum++
      })

      oscillator.connect(gainNode).connect(dest)
      // oscillator.type = 'square'
      oscillator.frequency.value = frequency
      oscillator.start(ct)
      gainNode.gain.setValueAtTime(0, ct)
      gainNode.gain.linearRampToValueAtTime(1, ct + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ct + duration)

      setTimeout(() => {
        this.stopRecording(mediaRecorder)
        oscillator.stop(ct + duration)
      }, duration * 1000)
    },
    clickPainoKey: function (v, mousedown) {
      let { tone, audioContext, gainNode, painoState, analyserNode } = this
      if (!tone[v] || (!painoState && !mousedown)) return
      this.setPainoActive(v)
      let sourceNode = audioContext.createBufferSource()

      sourceNode.connect(analyserNode)
      sourceNode.connect(gainNode)
      sourceNode.buffer = tone[v]
      sourceNode.start(0)

      this.audioPlaying = true
    },
    playPainoMusic: function (key) {
      let sond = music[key]
      if (!sond) return
      sond = sond.split(' ')
      let play = i => {
        if (i >= sond.length) return
        let v = sond[i]
        this.clickPainoKey(v, 1)
        i++
        setTimeout(() => {
          play(i)
        }, keyTime)
      }
      play(0)
    },
    setPainoActive: function (v) {
      clearTimeout(this.painoActiveTimer)
      this.painoActive = v
      this.painoActiveTimer = setTimeout(() => {
        this.painoActive = null
      }, keyTime)
    },
    getCurrentTimeColor: function (v) {
      let a = currentColor[Math.floor(v % 6)]
      let b = currentColor[Math.floor((v + 1) % 6)]
      let c = v % 1
      return [a[0] + (b[0] - a[0]) * c, a[1] + (b[1] - a[1]) * c, a[2] + (b[2] - a[2]) * c].join(',')
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
  * {
    box-sizing: border-box; -ms-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;
    user-select: none; -ms-user-select: none; -moz-user-select: none; -webkit-user-select: none;
  }
  div {
    margin: 10px 0;
  }
  .paino {
    text-align: center; margin: 0 auto; width: 630px;
    .painoKey {
      float: left; width: 30px; height: 50px; background: #cecece; line-height: 70px; border: 1px solid #cecece;
      &[overbuild=true] {
        background: #fff; cursor: pointer;
        &[doClick=true] { background: #ecfdee; }
      }
    }
  }
}
</style>
