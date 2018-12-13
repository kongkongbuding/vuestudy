<template>
  <div class="wrapper">
    <div v-on:click="handleClick">点击</div>
    <photo-swipe-vue v-bind:slides="slide1" ref="test"></photo-swipe-vue>
  </div>
</template>

<script>
import PhotoSwipeVue from '../components/PhotoSwipeVue/PhotoSwipeVue'
// import test from '../components/PhotoPreview/PhotoPreview'
export default {
  name: 'appTest',
  props: {

  },
  data () {
    return {
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        }
      ]
    }
  },
  components: {
    PhotoSwipeVue
    // test
  },
  mounted () {
    console.log(2222)
    console.log(this.$router.query.id)
  },
  methods: {
    handleClick: function () {
      this.$refs.test.openPhotoSwipe()
    }
  }
}
</script>

<style scoped>

</style>
