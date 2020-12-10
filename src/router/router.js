import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/h',
      component: resolve => require(['@/components/HelloWorld.vue'], resolve)
    },
    {
      path: '/f',
      component: resolve => require(['@/components/b.vue'], resolve)
    },
    {
      path: '/keepalive1',
      component: res => {
        require(['@/components/keepalive1.vue'], res)
      },
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/keepalive2',
      name: 'keepalive2',
      component: res => require(['@/components/keepalive2.vue'], res),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/keepalive3',
      name: 'keepalive3',
      component: res => require(['@/components/keepalive2.vue'], res),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/table',
      name: '表格',
      component: res => require(['@/views/page-table.vue'], res)
    },
    {
      path: '/img',
      name: '雷达图&包括|图片|播放轴&可分开单独使用',
      component: res => require(['@/views/page-img.vue'], res)
    },
    {
      path: '/easyImg',
      name: '图片轮播',
      component: res => require(['@/views/page-easyImg.vue'], res)
    },
    {
      path: '/map',
      name: '概化图&点线面等',
      component: res => require(['@/views/page-map.vue'], res)
    },
    {
      path: '/drag',
      name: '拖拽',
      component: res => require(['@/views/page-drag.vue'], res)
    },
    {
      path: '/tooltip',
      name: 'tooltip',
      component: res => require(['@/views/page-tooltip.vue'], res)
    },
    {
      path: '/loading',
      name: 'loading',
      component: res => require(['@/views/page-loading.vue'], res)
    },
    {
      path: '/canvas',
      name: 'canvas 绘制动画',
      component: res => require(['@/views/page-canvas.vue'], res)
    },
    {
      path: '/ztree',
      name: 'page-ztree',
      component: res => require(['@/views/page-ztree.vue'], res)
    },
    {
      path: '/datepicker',
      name: 'page-date-picker',
      component: res => require(['@/views/page-date-picker.vue'], res)
    },
    {
      path: '/calendar',
      name: 'page-calendar',
      component: res => require(['@/views/page-calendar.vue'], res)
    },
    {
      path: '/t/:id',
      component: resolve => require(['@/components/HelloWorld.vue'], resolve),
      props: {
        msg: 'hello'
      },
      children: [
        {
          path: 't',
          components: {
            default: resolve => require(['@/components/a.vue'], resolve),
            a: resolve => require(['@/components/b.vue'], resolve),
            b: resolve => require(['@/components/c.vue'], resolve)
          }
        }
      ],
      beforeEnter: (to, from, next) => {
        to && from && next()
      },
      meta: {
        keepAlive: false,
        requiresAuth: true
      }
    },
    {
      path: '/nodejs',
      name: 'nodejs',
      component: res => require(['@/views/nodejs/index.vue'], res),
      props: {
        msg: 'nodejs_study'
      },
      children: [
        {
          path: 'login',
          components: {
            login: resolve => require(['@/views/nodejs/login.vue'], resolve)
          }
        },
        {
          path: 'register',
          components: {
            register: resolve => require(['@/views/nodejs/register.vue'], resolve)
          }
        },
        {
          path: 'main',
          components: {
            main: resolve => require(['@/views/nodejs/main.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/audio',
      name: 'audio',
      component: res => require(['@/views/audio/main.vue'], res)
    },
    {
      path: '/algorithm',
      name: 'algorithm',
      component: res => require(['@/views/algorithm/v1.vue'], res)
    },
    {
      path: '/three',
      name: 'three',
      component: res => require(['@/views/three.vue'], res)
    },
    {
      path: '/colorpicker',
      name: 'colorpicker',
      component: res => require(['@/views/page-color-picker.vue'], res)
    },
    {
      path: '/upload',
      name: 'upload',
      component: res => require(['@/views/page-upload.vue'], res)
    },
    {
      path: '/download',
      name: 'page-download',
      component: res => require(['@/views/page-download.vue'], res)
    },
    {
      path: '/badge',
      name: '徽标',
      component: res => require(['@/views/page-badge.vue'], res)
    },
    {
      path: '/message',
      name: '提示信息',
      component: res => require(['@/views/page-message.vue'], res)
    },
    {
      path: '/step',
      name: 'page-step',
      component: res => require(['@/views/page-step.vue'], res)
    },
    {
      path: '/pagination',
      name: 'page-pagination',
      component: res => require(['@/views/page-pagination.vue'], res)
    },
    {
      path: '/navtree',
      name: 'page-nav-tree',
      component: res => require(['@/views/page-nav-tree.vue'], res)
    },
    {
      path: '/player',
      name: 'page-player',
      component: res => require(['@/views/page-player.vue'], res)
    },
    {
      path: '/button',
      name: 'page-button',
      component: res => require(['@/views/page-button.vue'], res)
    },
    {
      path: '/wordcloud',
      name: 'page-wordcloud',
      component: res => require(['@/views/wordcloud.vue'], res)
    },
    {
      path: '/bubble',
      name: 'page-bubble',
      component: res => require(['@/views/bubble.vue'], res)
    }
  ]
})
