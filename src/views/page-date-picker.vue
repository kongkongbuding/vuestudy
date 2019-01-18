<template>
  <div class="datePanel">
    <div class="range">
      <date-picker type="range" startDate="2018/12/31 12:12:13" endDate="2019/01/14 12:13:14" format="yyyy/MM/dd HH:mm:ss" :quickSelection='quickSelection' :change='timeChange' />
    </div>
    <div class="dateTime">
      <date-picker startDate="2018年12月30日 13:14" format="yyyy年MM月dd日 HH:mm" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'pagepicker',
  data () {
    return {
      quickSelection: [
        {
          name: '一小时', value: { HH: -1 }
        },
        {
          name: '三小时', value: { HH: -3 }
        },
        {
          name: '一天', value: { dd: -1 }
        },
        {
          name: '一周', value: { dd: -7 }
        },
        {
          name: '三个月', value: { MM: -3 }
        },
        {
          name: '两年', value: { yyyy: -2 }
        },
        {
          name: '任意', value: { dd: -1, HH: -2, mm: 20 }
        },
        {
          name: '自定义',
          value: function () {
            return '2018/03/03 03:03:03'
          }
        }
      ]
    }
  },
  methods: {
    timeChange: function (v) {
      console.log(v)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.datePanel {
  width: 100%; height: 100%; background: #cecece;
  .range { height: 28px; width: 363px; margin: 0 auto;}
  .dateTime { width: 170px; float: right; margin-right: 10px;}
}
</style>
