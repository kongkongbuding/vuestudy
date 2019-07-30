window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

window.AudioContext = (function () {
  return (
    window.webkitAudioContext || window.AudioContext || window.mozAudioContext
  )
})()

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {}
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    let getUserMedia =
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (!getUserMedia) {
      return Promise.reject(
        new Error('当前浏览器不支持 getUserMedia 方法！')
      )
    }

    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject)
    })
  }
}
