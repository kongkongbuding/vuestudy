<template>
  <div class="user">
    <div>{{time}}</div>
    <div>{{tm}}</div>
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
      tm: ''
    }
  },
  methods: {},
  computed: {},
  mounted: function () {
    this.$ajax.get('/webapi/api/v1/jointduty/s-sysdate').then(result => {
      this.tm = result.data.data
    }
    ).catch(result => console.log(result))
  }
}
</script>
