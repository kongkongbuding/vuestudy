<template>
  <div class="vue-loading-spinner" v-if="!!show">
    <div class="loading-inner">
      <div v-if="type != 'svg'">
        <gif v-bind:size="size"></gif>
      </div>
      <div v-else-if="!!children">
        {{children}}
      </div>
      <div class="svg-loader" v-bind:style="$_style" v-else>
        <svg width="1em" height="1em">
          <circle v-bind:style="{stroke: color}" cx="0.5em" cy="0.5em" r=".45em"></circle>
        </svg>
      </div>
      <div class="alert-text">{{text}}</div>
    </div>
  </div>
  <span v-else></span>
</template>

<script>
import Gif from './gif'
export default {
  name: '',
  props: {
    type: {
      type: String,
      default: 'svg'
    },
    styles: {
      type: Object,
      default: function () {
        return {}
      }
    },
    color: {
      type: String,
      default: '#9b59b6'
    },
    text: {
      type: String,
      default: '加载中...'
    },
    cls: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    display: {
      type: String
    },
    children: String
  },
  data () {
    return {
    }
  },
  computed: {
    $_style: function () {
      let size = this.size
      let style = Object.assign({}, this.styles)
      if (size > 0) {
        style.fontSize = size
        return style
      }
      return style
    }
  },
  components: {
    Gif
  },
  methods: {

  }
}
</script>

<style scoped>
  @import './css/Spinner.css';
</style>
