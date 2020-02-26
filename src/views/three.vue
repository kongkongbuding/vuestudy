<template>
  <div class='ppap' id='app'></div>
</template>

<script>
import Model3d from 'model3d'

export default {
  components: {},
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      let model = new Model3d('app', {
        center: [100.18, 25.78, 1973],
        scale: {
          x: 800,
          y: 800,
          z: 1
        },
        camera: {
          for: 60,
          near: 10,
          far: 1000000,
          position: [520, 390, -325],
          lookAt: [0, 0, 0]
        },
        controls: {
          type: 'OrbitControls',
          state: true,
          params: {
            minDistance: 200,
            maxDistance: 3000,
            enableDamping: true,
            dampingFactor: 1,
            screenSpacePanning: false,
            maxPolarAngle: Math.PI / 2
          }
        },
        marker: {
          rotationAngle: Math.PI / 60
        }
      })

      model.marker.addPoints([
        {
          geometry: [100.224552, 25.623247, 1975],
          name: '小关邑水质站'
        },
        {
          geometry: [100.156999, 25.859201, 1997],
          name: '喜洲(金河)水质站'
        }
      ], {
        color: '#00fd3c',
        size: 1.4,
        opacity: 0.9
      })
    })
  },
  methods: {}
}
</script>

<style type='text/less' lang='less' scoped>
.ppap {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}
</style>
