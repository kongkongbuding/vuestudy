<template>
  <div>
    <div>
      <div class="can">
        <canvas-animate icon='circle' />
      </div>
      <div class="can">
        <canvas-animate icon='polygon-5' />
      </div>
      <div class="can">
        <canvas-animate icon='polygon-8' />
      </div>
      <div class="can">
        <canvas-animate :icon='icon' />
      </div>
      <div class="can">
        <canvas-animate icon='rotate-10' color="#000fff" speed=16000 />
      </div>
      <div style="height: 1px; clear: both;"></div>
      <div class="can big">
        <canvas-animate icon='circle' height=200 width=200 color="#fff000" speed=2000 />
      </div>
      <div class="can big">
        <canvas-animate icon='rotate-6' height=200 width=200 color="#ffffff" speed=16000 />
      </div>
    </div>
  </div>
</template>

<script>
import CanvasAnimate from 'cll-vue-components/lib/canvasAnimate'
export default {
  components: {
    CanvasAnimate
  },
  data () {
    return {
      icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADIklEQVR4Xu1bS3LTQBB9rVIFdsg5gV0Ve21OkOQEmBPgLGNvkhvkBoaF7SXmBJgT4JwgZmtRZbhAIna4EGpqRASKY2v0yygpt7aa7pl+/ZnumWnCjn+04/JDABAL0CDgDBdtIhoQcKQDi4EZr+zX3nnDi8Y6I/fMAgY62vX/zPCY6MTrHUzVP2ewdKy9XwMGdYjgJPFTtKBwLSfxtWyi0bpAbbi4IqJ2WgEC4NzrNd9G42tDd0qEV2np747jD9e9VjcEYLjoWkTvs/BhxqebfrOTRKMFYH/ksmKgBANhvo0ZMS4IOFyfVGkOz/3NADLaFm/WZkDwsLInkQYjIJnxnYBJIhDEdYDeqDHXvWaijOkBIBx7p83Ztonjph6s7JrO9LJoUo2tDd0bZfrrFraJjzN2jyzGZ7MAjJd1i/1lZC1xN8gq7Pr4uPkHZDe808a3JJ6VAKAWtD9aTJTphQEMfOz1W1tdJi0oznhZp8C/Utpn4PKm19QG48oACBfL/pyAF0pAtSukFXTrOEY7ivoB88s0oFYGwG20VtvmLAKhMAB/gfzBzGdev5Uc/G4nqxSAaM/GM7+7HuGZ9LnEHcDCXAAzkD3V+X2crnIAytB6ER4CQBXbYBGNlU0rFiAWUEEmWLYZF+EnLiAuIC5grhp0Ru5hEX8tSuv1mpf3qkdTLpD3uKuo0HH6Tac+xoKgM/rascAfyxQoMy+md9f9gzOpBWIIGLOAzNoyRCAAmAqChhSaeRqxALEAyQTNZYKZHdQAgdEYoC5PQRQeg+f6VvaXsm+RjAHwGFJhVJkJ5rmxzWUlCUSV1gLhHcB4WQf8etmCpeb3056vu5AxF0i9SMMDBQBJhCQRkkTI+AsRw3EucToJghIEDQXBnT8UfQy1QPWpsKoGLUp8uvqgAVJS4fvwyi4gu4ChXeBBfbsAc3EBcQFxAakGpRosu2ECzBNYlNioUCBw5yYNfmMOC/+atEJGzG2LKOxbKtwyUxu56ul7pe+A8qJTStOUanqiPX+C/61q7TJ7AfIKp6NTwjP4QtdgoW2a0k301P8LAE9dg0XXv/MW8Ae+8ydu3HpXvgAAAABJRU5ErkJggg=='
    }
  },
  mounted () {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.can {
  height: 100px; width: 100px; float: left; background: #cecece; border-radius: 4px; margin: 20px;
  &.big { height: 200px; width: 200px; }
}
</style>
