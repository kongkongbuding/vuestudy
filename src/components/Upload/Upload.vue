<template>
  <div class="wrapper">
    <form action="uploading" method="POST" enctype="multipart/form-data">
      <input type="file" name="imgFile" multiple>
      <input type="submit" value="提交">
    </form>
  </div>
</template>

<script>
export default {
  name: 'StrongUpload',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>

</style>
