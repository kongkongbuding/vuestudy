<template>
  <div class="user">
    没有内容
    <img :src="img1" />
  </div>
</template>

<script>
import img1 from '-/1.png'
export default {
  name: 'cTemplate',
  props: {

  },
  data () {
    return {
      s: this.$store.state,
      img1: img1
    }
  },
  methods: {},
  computed: {}
}
</script>
