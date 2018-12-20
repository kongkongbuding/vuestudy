<template>
  <div
    class="loading-box"
    v-show="show"
  >
    <div class="loading-mask"></div>
    <div class="loading-content">
      <div class="wrapp">
        <div class="k-line k-line3-1"></div>
        <div class="k-line k-line3-2"></div>
        <div class="k-line k-line3-3"></div>
        <div class="k-line k-line3-4"></div>
        <div class="k-line k-line3-5"></div>
      </div>
      <div class="loading-text">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.pmNone { padding: 0; margin: 0; }
.borderBox { box-sizing: border-box; -webkit-box-sizing: border-box; }
.animateLoadBar (@name) {
  @keyframes @name { 0% { height: 15px } 50% { height: 35px;} 100% { height: 15px } }
  @-webkit-keyframes @name { 0% { height: 15px } 50% { height: 35px;} 100% { height: 15px } }
}

.loading-box {
  font-family: Arial, Helvetica, sans-serif; position: relative; text-align: center;
  .borderBox;
  .pmNone;
  * { .pmNone }
  div { .borderBox }
  .loading-mask { position: fixed; background: rgba(0, 0, 0, .2); top: 0; bottom: 0; left: 0; right: 0; }
  .loading-text { margin: 0 0 15px; font-size: 16px; color: #3c4654;}
  .loading-content {
    position: fixed; left: 50%; top: 50%; width: 240px; height: 60px; margin-top: -60px; margin-left: -120px; text-align: center; border-radius: 5px; color: #fff; z-index: 5001;
    .wrapp {
      width: 140px; height: 40px; border-radius: 5px; text-align: center; font-size: 15px; margin: 0 auto;
      &:last-child { margin-right: 0 }
      .k-line {
        display: inline-block;
        margin: 0 2.5px;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background-color: #4b9cdb;
        .animateLoadBar(loadingA);
        &.k-line3-1 {
          animation: loadingA 1.5s 0s infinite;
          background-color: #1E88E5
        }
        &.k-line3-2 {
          animation: loadingA 1.5s .1s infinite;
          background-color: #2196F3
        }
        &.k-line3-3 {
          animation: loadingA 1.5s .2s infinite;
          background-color: #42A5F5
        }
        &.k-line3-4 {
          animation: loadingA 1.5s .3s infinite;
          background-color: #64B5F6
        }
        &.k-line3-5 {
          animation: loadingA 1.5s .4s infinite;
          background-color: #90CAF9
        }
      }
    }
  }
}
</style>
