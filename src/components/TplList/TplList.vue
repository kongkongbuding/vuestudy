<template>
    <div v-bind:class="'tplList ' + theme">
      <div v-for="item in dataList" v-bind:key="item.id" className = 'list' v-on:click="listClick(item)">
        <div v-if="config.img !== null" class = 'img_wrap'><img v-bind:src="item[config.img.key]" /></div>
        <div v-bind:class="'text_wrap_' + (config.img == null ? 'all' : 'part')">
          <div v-if="config.title !== null" class='textLine' v-bind:style="config.title.style">{{item[config.title.key]}}</div>
          <div v-if="config.time !== null" class='textLine' v-bind:style="config.time.style">{{item[config.time.key]}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TplList',
  props: ['data', 'config'],
  data () {
    return {
      theme: 'default',
      tpl: ''
    }
  },
  computed: {
    dataList: function () {
      let d = []
      let listLen = this.data.length
      for (let i = 0; i < listLen; i++) {
        d.push(this.data[i])
      }
      return d
    }
  },
  components: {

  },
  methods: {
    listClick: function (item) {
      this.$emit('listClick', item)
    }
  },
  beforeMount () {
    if (this._props.theme !== undefined) this.theme = this._props.theme
    if (this._props.config !== undefined) this.config = Object.assign(this.config, this._props.config)
  }
}
</script>

<style scoped>
  @import './css/TplList.css';
</style>
