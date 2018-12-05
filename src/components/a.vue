<template>
  <div class="user">
    <div>路由的id:{{ $route.params.id }}</div>
    <div>
      <span>绑定指令</span>|
      <span v-once>我只构建一次</span>|
      <span v-text="d"></span>|
      <span v-html="e"></span>|
      <span v-if="a % 2">a 为奇数 </span>
      <span v-else>a 为偶数</span>|
      <span
        v-for="(v, i) in f"
        :key="i + 'f'"
      >{{v.a}}:{{i}}、</span>|
      <span
        v-for="(v, i) in ff"
        :key="i + 'ff'"
      >{{v}}:{{i}}、</span>|
      <span
        v-for="(v, i) in fff"
        :key="i + 'fff'"
      >{{v.a}}:{{i}}、</span>|
      <span v-pre>跳过 {{a}}</span>|
      <span
        v-bind:todo="g"
        :style="{fontSize: '12px'}"
      >dom 属性绑定{{g}}</span>|
      <span style="font-size: 12px">inject 注入 {{foo}}</span>|
    </div>
    <router-link :to="{ path: '/main/test/test1'}">路由跳转</router-link>
    <div>stroe: {{s.index}} stroe.b:{{s.b.d}}</div>
    <div @click="changeText">点击改变字符串: {{text | capitalize}} 过滤器</div>
    <div>计算属性:{{maxh}}</div>
    <div @click="addIndex">绑定store计算属性，点击commit触发stroe 的 action {{this.$store.getters.indexTodo}}</div>
    <div @click="dispatchIndex">stroe事件派发</div>
    <div
      @click="watchEvent"
      ref="a"
    >数据监听{{a}}</div>
    <div>
      <span>自定义指令</span>
      <input
        v-focus
        v-model="c"
      />
    </div>
    <div @click="show = !show">
      显示隐藏
      <span v-show='show'>{{show}}</span>|
      <transition
        name="fade"
        @after-enter="afterEnter"
      >
        <span
          v-show="show"
          ref='liner'
        >加点渐变</span>
      </transition>
    </div>
    <you-too
      v-bind="$attrs"
      v-on:slotCreated="slotCreated"
    >
      <p>slot default</p>
      <p slot="a">slot 7654321</p>
      <p>slot default2</p>
      <div slot="b">slot 1234567</div>
    </you-too>
  </div>
</template>

<script>
import k from '../utils/index'
import YouToo from './d.vue'
export default {
  name: 'aTemplate',
  components: {
    YouToo
  },
  props: {

  },
  data () {
    return {
      s: this.$store.state,
      text: 'aeiou',
      show: true,
      h: 3,
      a: 1,
      b: { a: 1 },
      c: 1,
      d: 'v-text',
      e: '<span style = "color: red">2</span>',
      f: new Array(10).fill({ a: 1 }),
      ff: { a: 1, b: 2, c: 3, d: 4 },
      fff: k.randomString(10),
      g: 'todo'
    }
  },
  inject: ['foo'],
  methods: {
    changeText: function () {
      k.setImmediate(function () { console.log('setImmediate') })
      this.text += k.randomString(1)
    },
    addIndex: function () {
      this.s.index++
      this.$store.commit('自增', 2)
    },
    dispatchIndex: function () {
      this.$store.dispatch('todo')
    },
    afterEnter: function () {
      let liner = this.$refs.liner
      let html = this.$refs.liner.innerHTML
      html += k.randomString(1)
      liner.innerHTML = html
    },
    slotCreated: function () {
      // console.log('插槽插入成功')
    },
    watchEvent: function () {
      this.a++
      this.b.a++
      console.log(this.$refs.a.innerHTML)
      this.$nextTick(function () {
        console.log(this.$refs.a.innerHTML)
      })
    }
  },
  computed: {
    maxh: function () {
      return this.h * 2
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    b: {
      handler: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      deep: true
    }
  },
  beforeCreate: function () {
    // console.log('实例初始化前调用')
  },
  created: function () {
    this.$on('hello', () => console.log('hello'))
    this.$once('once', () => console.log('once'))
    this.$off('hello')
    this.$emit('once')
    // console.log('实例初始化完成调用')
  },
  beforeMount: function () {
    // console.log('挂载到页面前调用')
  },
  mounted: function () {
    // console.log('挂载到页面完成调用')
    console.log(this)
    // console.log(this.$parent)  //父
    // console.log(this.$children)  //子
    // console.log(this.$root)  // 根
    // console.log(this.$refs)  // 获取元素
    // console.log(this.$store)  // store
    // console.log(this.$attrs)  // 父标签上的属性
    // console.log(this._props)  // props
  },
  beforeUpdate: function () {
    // console.log('更新前调用')
  },
  updated: function () {
    // console.log('更新完成调用')
  },
  activated: function () {
    // console.log('keep-alive组件激活时调用')
  },
  deactivated: function () {
    // console.log('keep-alive组件停用时调用')
  },
  beforeDestroy: function () {
    // console.log('销毁之间调用')
  },
  destroyed: function () {
    // console.log('实例销毁后调用')
  },
  errorCaptured: function () {
    // console.log('异常发生处理')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
