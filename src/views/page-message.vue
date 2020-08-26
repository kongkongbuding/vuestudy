<template>
  <div class="messageBtn">
    <div class="btn" @click="success">success</div>
    <div class="btn" @click="error">error</div>
    <div class="btn" @click="warning">warning</div>
    <div class="btn" @click="info">info</div>
    <div class="btn" @click="alert">alert</div>
    <div class="btn" @click="confirm">confirm</div>
  </div>
</template>

<script>

export default {
  methods: {
    success: function () {
      this.$message.success('成功的显示一段文字!')
    },
    error: function () {
      this.$message.error('这个地方报错了 五秒后消失!', 5)
    },
    warning: function () {
      this.$message.warning('警告警告 你看不到我!', 5)
    },
    info: function () {
      this.$message.info('这只是一段普通的文字 不过很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长!', 10)
    },
    alert: function () {
      this.$alert('内容内容内容内容内容内容内容内容内容内容内容内容', '标题', () => {
        this.$message.info('关闭', 2)
      })
    },
    confirm: function () {
      this.$confirm({
        title: '标题',
        message: '内容',
        callback: () => this.$message.info('确定', 2),
        cancel: () => this.$message.info('取消', 2)
      })
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.messageBtn {
  text-align: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0;
  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
.btn {
  display: inline-block; height: 30px; width: 80px; background: #cecece; border-radius: 4px; margin: 20px; vertical-align: middle;
}
</style>
