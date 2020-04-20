<template>
  <div class="wrapper">
    <dof-minibar
      title="欢迎页"
      backgroundColor="transparent"
      textColor="#404040"
      @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
      @dofMinibarRightButtonClicked="minibarRightButtonClick"
    >
      <div slot="left">
        <image :src="leftButton" style="height: 55px;width: 55px;transform:translateX(-10px);"></image>
      </div>
      <div slot="right" class="right-img-wrapper">
        <image :src="rightButton" style="height: 32px;width: 32px;"></image>
      </div>
    </dof-minibar>
    <div class="main-container" :style="borderComp">
      <text class="word-text">hello,world</text>
    </div>
  </div>
</template>

<script>
import { DofCell2, DofMinibar } from 'dolphin-weex-ui'

export default {
  components: {
    DofMinibar,
    DofCell2
  },
  data() {
    return {
      leftButton: './assets/image/header/back_black@2x.png',
      rightButton: './assets/image/header/refresh.png'
    }
  },
  created() {},
  mounted() {},
  computed: {
    borderComp() {
      return {
        borderWidth: '2px'
      }
    }
  },
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/css/dolphinweex.scss';
.main-container {
  padding: 20px 15px;
  border-width: 1px;
  border-color: #267aff;
}
</style>
