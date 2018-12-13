import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/views/tz/notice-fnd.vue'], resolve)
    },
    {
      path: '/test',
      component: resolve =>
        require(['@/components/PhotoPreview/PhotoPreview.vue'], resolve)
    },
    {
      path: '/test1',
      component: resolve =>
        require(['@/views/test.vue'], resolve)
    },
    {
      path: '/f',
      component: resolve => require(['@/components/a.vue'], resolve)
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
    }
  ]
})
