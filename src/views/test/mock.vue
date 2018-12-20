<template>
  <div v-on:click="handleClick">hello world</div>
</template>

<script>
export default {
  name: '',
  props: {

  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    handleClick: function () {
      // this.$ajax.test().then(res => console.log(res))
      // this.$ajax.test({
      //   method: 'get'
      // })
      this.$ajax.test1()
    }
  }
}
</script>
<style scoped>

</style>
