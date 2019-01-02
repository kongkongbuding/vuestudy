<template>
  <div class="user">
    <div>{{time}}</div>
    <div>
      {{tm}}
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
      ajax: false
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
          console.log(result)
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
