<template>
  <!-- <canvas class="wordcloud" ref="wordcloud" height="800" width="800" /> -->
  <div class="wordcloud" ref="wordcloud" ></div>
</template>

<script>
/* eslint-disable */
import wordcloud from 'wordcloud'

const randomChineseWord = () => eval('"\\u' + Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16) + '"')

const rand = (min, max) => Math.random() * (max - min) + min

export default {
  data () {
    return {
      options: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'normal',
        color: 'random-dark', // function(word, weight, fontSize, distance, theta)
        minSize: 0,
        weightFactor: 1,
        clearCanvas: true,
        backgroundColor: 'rgba(255,255,255,0)',
        gridSize: 4,
        drawOutOfBound: false,
        shrinkToFit: false,
        origin: null,
        drawMask: false,
        maskColor: 'rgba(255,0,0,0.3)',
        maskGapWidth: 0.3,
        wait: 0,
        abortThreshold: 0,
        abort: function noop () {},
        minRotation: -Math.PI / 2,
        maxRotation: Math.PI / 2,
        rotationSteps: 2,
        shuffle: true,
        rotateRatio: 0.5,
        ellipticity: 1,
        classes: null, // function(word, weight, fontSize)
        hover: null, // function(info.item, info.dimension, evt)
        click: this.select, // function(info.item, info.dimension, evt)

        shape: 'circle', // function(theta) circle
        list: new Array(80).join('0').split('0').map((v, i) => {

          let text = ''
          let len = rand(2, 5)
          while (--len > 0) text += randomChineseWord()
          
          return [text, Math.max(50 - i, 14)]

        })

      }
    }
  },
  mounted () {
    (function(){
      try {
        new window.CustomEvent('T')
      } catch(e){
        var CustomEvent = function(event, params){
            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');

            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

            return evt;
        };

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
      }
    })()

    this.$nextTick(() => {
      wordcloud(this.$refs.wordcloud, this.options)

    })

  },
  methods: {
    select (a, b, c) {
      console.log(a)
      console.log(b)
      console.log(c)
    }
  }
}
</script>

<style type='text/less' lang='less' >
.wordcloud {
  height: 800px;
  width: 800px;
  border: 1px solid #ccc;
  margin: 50px;
  font-family: Arial, Helvetica, sans-serif;
}
.wordcloud > span {
  transition: text-shadow 1s ease, opacity 1s ease;
  -webkit-transition: text-shadow 1s ease, opacity 1s ease;
  -ms-transition: text-shadow 1s ease, opacity 1s ease;
  cursor: pointer;
}

.wordcloud > span:hover {
  text-shadow: 0 0 10px, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
  opacity: 0.5;
}
</style>
