<template>
  <div class="colorPanel">
    <div :style="{background: color, height: '20px', width: '20px'}"></div>
    <div class="a cp">
      <color-picker v-model="color" :predefineColors='predefineColors' />
    </div>
    <div class="b cp">
      <color-picker v-model="color" :predefineColors='predefineColors' />
    </div>
    <div class="c cp">
      <color-picker v-model="color" :predefineColors='predefineColors' />
    </div>
    <div class="d cp">
      <color-picker v-model="color" :predefineColors='predefineColors' />
    </div>
  </div>
</template>

<script>
import ColorPicker from 'cll-vue-components/lib/colorPicker'
export default {
  name: 'pagepicker',
  components: {
    ColorPicker
  },
  data () {
    return {
      color: '#1290a3',
      predefineColors: [
        '#ff0000',
        '#ffff00',
        '#00ff00',
        '#00ffff',
        '#0000ff',
        '#ff00ff',
        '#2950a4',
        '#86aa32',
        '#fa3203',
        '#02f3da',
        '#3059da',
        '#904d23',
        '#88f088',
        '#66ffff',
        '#90023a',
        '#23aaff',
        '#ffaa66',
        '#ad020c',
        'rgba(124,22,12,0.5)',
        'hsl(210, 57%, 10%)'
      ]
    }
  },
  mounted: function () {},
  methods: {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.colorPanel {
  width: 100%; height: 100%; position: relative;
  .cp {
    position: absolute;
  }
  .a {
    top: 40px; left: 50px;
  }
  .b {
    top: 40px; right: 50px;
  }
  .c {
    bottom: 40px; left: 50px;
  }
  .d {
    bottom: 40px; right: 50px;
  }
}
</style>
