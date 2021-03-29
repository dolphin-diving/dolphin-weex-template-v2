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
      <image class="logo" src="./assets/image/logo.png"></image>
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
        text="快速查看"
        type="primary"
        size="big"
        @dofButtonClicked="jumpTo"
      ></dof-button>
    </div>
    <div class="footer">
      <text class="copyright">&copy;Midea IOT software</text>
    </div>
  </div>
</template>
<script>
import { DofMinibar, DofButton } from 'dolphin-weex-ui'

const globalEvent = weex.requireModule('globalEvent')

module.exports = {
  components: {
    DofMinibar,
    DofButton
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
    jumpTo() {
      let url = 'welcome.js'
      this.$push(url)
    },
    minibarLeftButtonClick() {},
    minibarRightButtonClick() {
      this.$reload()
    },
    async toast() {
      this.$toast('hello, dolphinWeex')
      this.$bridge.hapticFeedback()
    },
    async alert() {
      // let url = '/v1/iot/open/skill/delegate' // 美居云云对接第三方接口地址，查阅美居云端的接口文档获取地址即可
      // let params = {
      //   plugin_version: '5.12.0.2_20191111', //插件的版本，根据实际情况自定义，app版本和日期组合
      //   namespace: 'ApplianceState', //查询：ApplianceState，控制： ApplianceControl
      //   payload: {
      //     applianceCode: '-10032' //xxx为设备的deviceId,通过getDeviceInfo接口获取
      //   }
      // }
      // let res = await this.$bridge.sendCloudRequest(url, params)
      let res = await this.$bridge.getDeviceInfo()
      this.$alert(res)
    }
  }
}
</script>
// <style lang="scss" src="src/css/dolphinweex.scss"></style>

<style scoped>
.logo {
  width: 150px;
  height: 150px;
}
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
