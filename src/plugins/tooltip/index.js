/*
 * v-tooltip.top.bottom.left.right.click
 */

import './index.less'

export default {
  install (Vue, options = {}) {
    const DIR = ['top', 'bottom', 'left', 'right']
    const NAME = options.name || 'tooltip'
    const BASEC = 'tooltip-target-'
    const CLASS = BASEC + 'atk'
    const HIDEEVENT = 'mouseout'
    const HIDE = -99999
    const DIS = 6
    const TH = 24

    if (Vue.directive(NAME) !== void 0) {
      console.warn('已存在v-' + NAME + '指令!')
      return
    }

    let $tip = document.getElementsByClassName(CLASS)[0]

    if (!$tip) {
      $tip = document.createElement('div')
      $tip.className = CLASS
      $tip.innerHTML =
        '<div style="height: ' +
        TH +
        'px; line-height: ' +
        TH +
        'px;" class="' +
        BASEC +
        'text"></div><div class="' +
        BASEC +
        'arrow"></div>'
      document.body.appendChild($tip)
    }

    Vue.directive(NAME, {
      bind: (el, binding) => {
        let { value, modifiers } = binding
        let event = modifiers['click'] ? 'click' : 'mouseover'
        let active = () => {
          let d = 'auto',
            l = HIDE,
            t = HIDE
          DIR.map(v => {
            if (modifiers[v]) d = v
          })
          let text = $tip.getElementsByClassName(BASEC + 'text')[0]
          let arrow = $tip.getElementsByClassName(BASEC + 'arrow')[0]
          if (!text) return
          text.innerHTML = value
          let body = document.documentElement || document.body
          let bH = body.clientHeight,
            bW = body.clientWidth
          let client = el.getBoundingClientRect()
          let tW = text.offsetWidth
          let maxl = bW - tW,
            maxt = bH - 40
          if (d === 'auto') {
            d = client.top < 60 ? 'bottom' : 'top'
            let tipHalf = tW / 2 + 5
            if (
              client.left + client.width / 2 < tipHalf ||
              bW - client.left - client.width / 2 < tipHalf
            ) {
              d = client.left > tW + 20 ? 'left' : 'right'
            }
          }
          switch (d) {
            case 'top':
              l = Math.min(
                maxl,
                Math.max(0, client.left + (client.width - tW) / 2)
              )
              t = Math.min(maxt, Math.max(0, client.top - TH - DIS))
              break
            case 'bottom':
              l = Math.min(
                maxl,
                Math.max(0, client.left + (client.width - tW) / 2)
              )
              t = Math.min(maxt, Math.max(0, client.top + client.height + DIS))
              break
            case 'left':
              l = Math.max(0, client.left - tW - DIS)
              t = Math.max(0, client.top + (client.height - TH) / 2)
              break
            case 'right':
              l = Math.min(bW - tW, client.left + client.width + 6)
              t = Math.max(0, client.top + (client.height - TH) / 2)
              break
          }
          $tip.style.left = l + 'px'
          $tip.style.top = t + 'px'
          if (arrow) arrow.className = BASEC + 'arrow ' + d
        }
        let unActive = () => {
          $tip.style.top = HIDE + 'px'
          $tip.style.left = HIDE + 'px'
        }
        el.__eve__ = [
          { name: event, event: active },
          { name: HIDEEVENT, event: unActive }
        ]
        el.__eve__.map(v => el.addEventListener(v.name, v.event))
      },
      unbind: (el) => {
        if (!el.__eve__) return
        el.__eve__.map(v => el.removeEventListener(v.name, v.event))
        el.__eve__ = null
      }
    })
  }
}
