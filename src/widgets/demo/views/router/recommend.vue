<template>
  <div class="center container-box">
    <div>
      <text>路由：推荐 (recommend)ssss</text>
    </div>
    <dof-button type="primary" text="返回上一级" @dofButtonClicked="jumpTo"></dof-button>
  </div>
</template>

<style lang="scss" src="src/css/dolphinweex.scss"></style>
<style scoped>
.container-box {
  background-color: #f9f9f9;
  flex: 1;
}
</style>
<script>
const globalEvent = weex.requireModule('globalEvent')
import { DofButton } from 'dolphin-weex-ui'

module.exports = {
  components: {
    DofButton
  },
  data() {
    return {}
  },
  methods: {
    jumpTo() {
      this.$router.go(-1)
    }
  }
}
</script>
