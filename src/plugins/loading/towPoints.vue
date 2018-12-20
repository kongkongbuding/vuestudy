<template>
  <div
    class="loading-box"
    v-show="show"
  >
    <div class="loading-mask"></div>
    <div class="loading-content">
      <div class="loadingAnimition"></div>
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
.borderBox { box-sizing: border-box; -ms-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; }
@keyframes preloader_3_before {
  0% {transform: translateX(0px) rotate(0deg)}
  50% {transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
  100% {transform: translateX(0px) rotate(0deg)}
}
@keyframes preloader_3_after {
  0% {transform: translateX(0px)}
  50% {transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
  100% {transform: translateX(0px)}
}
@-webkit-keyframes preloader_3_before {
  0% {-webkit-transform: translateX(0px) rotate(0deg)}
  50% {-webkit-transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
  100% {-webkit-transform: translateX(0px) rotate(0deg)}
}
@-webkit-keyframes preloader_3_after {
  0% {-webkit-transform: translateX(0px)}
  50% {-webkit-transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
  100% {-webkit-transform: translateX(0px)}
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
    .loadingAnimition {
      position: relative; height: 40px; width: 0; margin: 0 auto;
      &:before {
        width:20px; height:20px; border-radius:20px; background:blue; content:''; position:absolute; background:#9b59b6; left:-20px;
        animation: preloader_3_before 1.5s infinite ease-in-out;
      }
      &:after {
        width:20px; height:20px; border-radius:20px; background:blue; content:''; position:absolute; background:#2ecc71; left:0px;
        animation: preloader_3_after 1.5s infinite ease-in-out;
      }
    }
  }
}
</style>
