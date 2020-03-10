<template>
  <div class="app-wrapper">
    <dof-minibar
      title="插件"
      backgroundColor="transparent"
      textColor="#000000"
      :middle-text-style="headerStyle"
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
    <div class="center margin-top-80">
      <dof-image src="/assets/image/logo.png" width="150px" height="150px"></dof-image>
      <text class="h2">{{ title }}</text>
      <text class="h4 margin-top-40 margin-bottom-20">{{ subTitle }}</text>
      <dof-button
        class="margin-top-80"
        text="打印测试($toast)"
        type="primary"
        size="big"
        @dofButtonClicked="toast"
      ></dof-button>
      <dof-button
        class="margin-top-80"
        text="打印测试($alert)"
        type="primary"
        size="big"
        @dofButtonClicked="alert"
      ></dof-button>
      <dof-button
        class="margin-top-80"
        text="路由示例($router)"
        type="primary"
        size="big"
        @dofButtonClicked="skip"
      ></dof-button>
      <dof-button
        class="margin-top-80"
        text="i18n示例"
        type="primary"
        size="big"
        @dofButtonClicked="jumpTo('i18n-demo')"
      >
      </dof-button>
      <dof-button
        class="margin-top-80"
        text="快速查看"
        type="primary"
        size="big"
        @dofButtonClicked="jumpTo('welcome')"
      ></dof-button>
    </div>
    <div class="footer">
      <text class="copyright">&copy;Midea IOT software</text>
    </div>
  </div>
</template>
<script>
import { DofMinibar, DofImage, DofButton } from 'dolphin-weex-ui'

const globalEvent = weex.requireModule('globalEvent')

module.exports = {
  components: {
    DofMinibar,
    DofButton,
    DofImage
  },
  data: () => ({
    name: 'home',
    title: 'Dolphin Weex',
    subTitle: '',
    leftButton: './assets/image/header/back_black@2x.png',
    rightButton: './assets/image/header/refresh.png',
    headerStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontWeight: '900',
      fontSize: '28px',
      letterSpacing: 0
    }
  }),
  mounted() {
    this.subTitle = 'Midea 模版项目'
  },
  methods: {
    jumpTo(url) {
      this.$push(`${url}.js`)
    },
    minibarRightButtonClick() {
      this.$native.reload()
    },
    toast() {
      this.$toast(this.$baseURL)
      this.$native.hapticFeedback()
    },
    alert() {
      this.$alert('world')
    },
    skip() {
      this.$push('index.router.js')
    }
  }
}
</script>
// <style lang="scss" src="src/css/dolphinweex.scss"></style>

<style scoped>
.footer {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
.copyright {
  font-size: 20px;
  color: #464c5b;
}
.margin-top-80 {
  margin-top: 80px;
}
.margin-top-40 {
  margin-top: 40px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>
