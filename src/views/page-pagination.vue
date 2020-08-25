<template>
  <div class="box">
    <pagination :textAlign='textAlign' :pageSize='pageSize' :current='current' :total='total' :change='change' />
  </div>
</template>

<script>
import pagination from 'cll-vue-components/lib/pagination'
export default {
  data () {
    return {
      current: 1,
      total: 0,
      pageSize: 10,
      textAlign: 'right'
    }
  },
  components: {
    pagination
  },
  methods: {
    change: function (v) {
      console.log(v)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.box {
  width: 900px; border: 1px solid #cecece; margin: 100px;
}
</style>
