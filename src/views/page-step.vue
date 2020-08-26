<template>
  <div class="box">
    <c-step :steps="steps" :step="step" height="70" width="800" :click="select" />
  </div>
</template>

<script>
// import Step from 'cll-vue-components/lib/step'
export default {
  data () {
    return {
      steps: [
        { name: '步骤一' },
        { name: '步骤二' },
        { name: '步骤三' },
        { name: '步骤四' },
        { name: '步骤五' }
      ],
      step: 2
    }
  },
  components: {
    // Step
  },
  methods: {
    select: function (v) {
      this.step = v
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.box {
  height: 1000px; width: 2000px; padding: 100px;
}
</style>
