<template>
  <div class="CalendarPanel">
    <date-picker-calendar :marks='marks' color='#ffffff' backgroundColor='#26374f' size='16' rowHeight='50' :int='int' :change='change' :year='year' :month='month' :day='day' />
    <div style="height: 20px;"></div>
    <date-picker-calendar :marks='marks' size='16' rowHeight='50' :int='int' :change='change' :year='year' :month='month' :day='day' />
  </div>
</template>

<script>

export default {
  data () {
    return {
      year: '2019',
      month: '1',
      day: '3',
      int: 1,
      marks: [
        '2019/01/08',
        '2019/01/09',
        '2019/01/10',
        '2019/01/26',
        '2019/02/05',
        '2019/02/08'
      ]
    }
  },
  mounted: function () {
    this.int++
  },
  methods: {
    change: function (v) {
      console.log(v)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.CalendarPanel {
  width: 100%; height: 400px;
}
</style>
