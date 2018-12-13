<template>
  <div>
    <v-touch v-on:panup="handleSwiper"
            v-on:pandown="handleSwiper"
            v-on:doubletap="handleDoubleClick"
            v-on:panend="handlePressUp"
            class="imgWrapper"
            v-bind:style="{width: pageW + 'px', height: pageH + 'px'}"
            v-if="!!showImg">
      <img v-bind:style="{maxWidth: pageW + 'px', maxHeight: pageH + 'px'}" class="coverImg" src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg" alt="">
    </v-touch>
    <transition name="fade">
      <div v-if="!!showBg" class="photo_wrapper" v-bind:style="{width: pageW + 'px', height: pageH + 'px'}"></div>
    </transition>
  </div>
</template>

<script>
let pageW = document.documentElement.clientWidth || document.body.clientWidth
let pageH = document.documentElement.clientHeight || document.body.clientHeight
export default {
  name: 'StrongPhotoPreview',
  data () {
    return {
      pageW: pageW,
      pageH: pageH,
      showImg: true,
      showBg: true
    }
  },
  components: {

  },
  methods: {
    handleSwiper: function () {
      this.showBg = false
    },
    /* 双击 */
    handleDoubleClick: function () {
      console.log('test')
    },
    handlePressUp: function () {
      // console.log(1111)
      this.showImg = false
    }
  }
}
</script>

<style scoped>
  .photo_wrapper {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: black;
  }
  .imgWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgWrapper .coverImg {
    width: auto;
    height: auto;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
