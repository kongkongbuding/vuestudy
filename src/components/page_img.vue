<template>
  <div :style="{height: h + 'px', width: w + 'px', background: '#cecece', margin: '0 auto'}">
    <img-view
      :int="int"
      theme="default"
    />
  </div>
</template>

<script>
import ImgView from './imgView/index.vue'
export default {
  name: 'tableTest',
  components: {
    ImgView
  },
  data () {
    return {
      w: 1000,
      h: 600,
      int: 1
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
