<template>
  <div class = "you-too">
    插槽 slot
    <slot name = "a"></slot>
    <slot></slot>
    <slot name = "b"></slot>
  </div>
</template>

<script>
export default {
  name: 'slotTemplate',
  data () {
    return {

    }
  },
  created () {
    this.$emit('slotCreated')
  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {

  }
}
</script>
