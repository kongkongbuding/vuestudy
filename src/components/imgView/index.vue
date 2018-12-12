<template>
  <div :class="cName">
    112
  </div>
</template>

<script>
export default {
  name: 'easyTable',
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
    config: Object
  },
  data () {
    return {
      defaultConfig: {
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.setSize()
      this.initEvent()
    })
  },
  updated: function () {
    this.$nextTick(function () {
      this.autoScroll()
    })
  },
  methods: {
    initEvent: function () {
      window.onresize = () => {
        this.setSize()
      }
    },
    setSize: function () {

    }
  },
  computed: {
    cName: function () {
      return 'imgView ' + this.theme
    }
  },
  filters: {
  },
  watch: {
    int: function (v) {
      this.setSize()
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
@import "./style.less";
</style>
