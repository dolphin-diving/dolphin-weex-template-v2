<!--
* @description
* @fileName index.vue
* @author liangzw
* @date 2020/11/23 16:56:37
!-->
<template>
  <div class="app">
    <dof-minibar :left-button="leftButton" :title="deviceName" @dofMinibarRightButtonClicked="minibarRightButtonClick">
      <div slot="left">
        <image :src="leftButton" style="height: 55px;width: 55px;transform:translateX(-10px);"></image>
      </div>
      <div slot="right" class="right-img-wrapper">
        <image :src="rightButton" style="height: 32px;width: 32px;"></image>
      </div>
    </dof-minibar>
    <div class="app-container" :style="{ paddingBottom: fitBottomBar }">
      <scroller class="app-container-scroll-view">
        <div class="app-container-scroll-view-indicator"></div>
        <div class="app-container-scroll-view-action-panel">
          <dof-cell
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_temperature@3x.png"
            :title="$t('settingTemperature')"
            right-text="60℃"
            :icon-color="theme"
            :has-sub-bottom-border="true"
            :has-arrow="true"
            :cell-style="topBorderRadius"
            :disabled="false"
            @dofCellClicked="pickTempreture"
          ></dof-cell>
          <dof-cell
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_eco@3x.png"
            title="节能模式"
            desc="一键45℃，热量不浪费"
            :icon-color="theme"
            :has-sub-bottom-border="true"
            :has-arrow="false"
            :disabled="true"
            @dofCellClicked="cellClickedHandler"
          >
            <dof-switch
              slot="switch"
              :type="theme_mode"
              :checked="switchValue"
              :disabled="true"
              @dof-change="handleSwitchChange({ type: '开关切换' })"
            ></dof-switch>
          </dof-cell>
          <dof-cell
            title="E+增容"
            desc="增容加热技术，提供更多热水"
            :icon-color="theme"
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_e+@3x.png"
            :cell-style="bottomBorderRadius"
            :has-arrow="false"
            :disabled="false"
            @dofCellClicked="cellClickedHandler"
          >
            <dof-switch
              slot="switch"
              :type="theme_mode"
              :checked="switchValue"
              :disabled="false"
              @dof-change="handleSwitchChange({ type: '开关切换' })"
            ></dof-switch>
          </dof-cell>
        </div>
      </scroller>
      <div class="app-container-bottom-bar">
        <dof-button
          :text="$t('changeLanguage')"
          size="flexiable"
          pattern="text"
          @dofButtonClicked="changeLangHandler"
        ></dof-button>
        <dof-ipx-bar></dof-ipx-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { DofMinibar, DofButton, DofCell, DofSwitch, DofIpxBar, Utils } from 'dolphin-weex-ui'

export default {
  components: { DofMinibar, DofButton, DofCell, DofSwitch, DofIpxBar },
  data: () => ({
    deviceName: 'i18n',
    leftButton: './assets/image/header/back_black@2x.png',
    rightButton: './assets/image/header/refresh.png',
    theme: '#267aff',
    theme_mode: 'default',
    switchValue: true,
    langSet: ['zh_CN', 'en_US', 'ja_JP'],
    curInd: 0
  }),
  computed: {
    fitBottomBar() {
      return this.isIPhoneX ? '236px' : '130px'
    },
    topBorderRadius() {
      return {
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }
    },
    bottomBorderRadius() {
      return {
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px'
      }
    }
  },
  created() {
    this.isIphoneX = Utils.env.isIPhoneX()
  },
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    },
    pickTempreture() {},
    cellClickedHandler() {},
    handleSwitchChange() {},
    //多语言切换
    changeLangHandler() {
      this.curInd++
      this.$i18n.locale = this.langSet[this.curInd]
      if (this.curInd === 2) this.curInd = -1
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/common';
.app {
  background-color: $color_background;
  &-container {
    flex: 1; //兼容web端
    // border-width: 10px;
    &-scroll-view {
      flex: 1; //兼容web端
      background-color: $color_background;
      &-action-panel {
        padding: 0 32px;
        margin: 40px 0;
      }
    }
    &-bottom-bar {
      position: absolute;
      bottom: 0;
      background-color: $color_white;
    }
  }
}
</style>
