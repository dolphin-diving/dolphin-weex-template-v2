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
        <div class="app-container-scroll-view-indicator">
          <dashboard title="hello"></dashboard>
        </div>
        <div class="app-container-scroll-view-action-panel">
          <dof-cell
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_temperature@3x.png"
            :title="$t('mode.temperature.settingTemperature')"
            :right-text="$t('mode.temperature.temperatureValue')"
            :icon-color="theme"
            :has-sub-bottom-border="true"
            :has-arrow="true"
            :cell-style="topBorderRadius"
            :disabled="false"
            @dofCellClicked="pickTempreture"
          ></dof-cell>
          <dof-cell
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_eco@3x.png"
            :title="$t('mode.energy.energyMode')"
            :desc="$t('mode.energy.description')"
            :icon-color="theme"
            :has-sub-bottom-border="true"
            :has-arrow="false"
            :disabled="false"
            :special="languageResponse"
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
          <dof-cell
            :title="$t('mode.capacity.capacityTitle')"
            :desc="$t('mode.capacity.description')"
            :icon-color="theme"
            avatar-icon="http://dolphin-weex-dev.msmartlife.cn/cdn/images/business/other/calorifier_icon_e+@3x.png"
            :cell-style="bottomBorderRadius"
            :has-arrow="false"
            :disabled="false"
            :special="languageResponse"
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
        <div class="app-container-scroll-view-widget">
          <dof-panel
            theme="primary"
            :btn-text="$t('log.more')"
            :list-data="panelData"
            @dofBottomBarClicked="checkLogHandler"
          ></dof-panel>
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
import { DofMinibar, DofButton, DofCell, DofSwitch, DofPanel, DofIpxBar, Utils } from 'dolphin-weex-ui'
import Dashboard from './dashboard.vue'
export default {
  components: { DofMinibar, DofButton, DofCell, DofSwitch, DofPanel, DofIpxBar, Dashboard },
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
    },
    languageResponse() {
      return this.$i18n.locale === 'zh_CN' ? false : true
    },
    panelData() {
      return [
        [
          {
            title: this.$t('log.block1.title'),
            value: '234',
            unit: this.$t('log.block1.unit')
          },
          {
            title: this.$t('log.block2.title'),
            value: '326',
            unit: this.$t('log.block2.unit')
          },
          {
            title: this.$t('log.block3.title'),
            value: '520',
            unit: this.$t('log.block3.unit')
          }
        ]
      ]
    }
  },
  created() {
    this.isIphoneX = Utils.env.isIPhoneX()
  },
  mounted() {},
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    },
    pickTempreture() {},
    cellClickedHandler() {},
    handleSwitchChange() {},
    checkLogHandler() {
      const LOG_URL = 'i18n-log-page.js'
      this.$bridge.push(LOG_URL)
    },
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
      padding-bottom: 64px;
      &-action-panel {
        padding: 0 32px;
        margin: 40px 0;
      }
      &-widget {
        padding: 0 32px;
        margin: 0 0 40px 0;
      }
    }
    &-bottom-bar {
      position: absolute;
      bottom: 0;
      background-color: $color_white;
      border-top-width: 2px;
      border-color: #f2f2f2;
    }
  }
}
</style>
