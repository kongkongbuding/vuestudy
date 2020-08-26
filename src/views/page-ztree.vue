<template>
  <div>
    <div class='boxing'>
      <c-ztree :clickEvent="clickEvent" :selectEvent="selectEvent" :d="d" :int="int" select="true" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      d: [],
      int: 0
    }
  },
  mounted: function () {
    this.$ajax.get('http://192.168.118.226:50027/WebApi/api/v1.1/basic/data?key=js_s_eventtype&departid=1')
      .then(ret => {
        this.d = ret.data.data
        this.int++
      })
      .catch(ret => console.log(ret))
  },
  methods: {
    clickEvent: function (v) {
      console.log(v)
    },
    selectEvent: function (v) {
      console.log(v)
    }
  }
}
</script>

<style type='text/less' lang='less' scoped>
.boxing {
  width: 300px;
  height: 300px;
  border: 3px solid #aaa;
  margin: 80px;
  overflow: auto;
}
</style>
