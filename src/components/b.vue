<template>
  <div class="user">
    <div>{{time}}</div>
    <div>
      {{tm}}
    </div>
    <div style="height: 20px; width: 150px; border: 1px">
      <!-- <el-button>默认按钮</el-button> -->
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'bTemplate',
  props: {

  },
  data () {
    return {
      s: this.$store.state,
      time: moment().format('YYYY/MM/DD HH:mm:ss'),
      tm: '',
      ajax: false,
      value1: ''
    }
  },
  methods: {
    initAjax: function () {
      this.getTime()
    },
    getTime: function () {
      this.$ajax.get('time', {
        params: {
          a: 1
        }
      })
        .then(result => {
          this.tm = result.data.data
        })
        .catch(result => console.log(result))
    }
  },
  computed: {},
  mounted: function () {
    this.initAjax()
  }
}
</script>
