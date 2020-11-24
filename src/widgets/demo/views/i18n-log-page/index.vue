<!--
* @description
* @fileName index.vue
* @author liangzw
* @date 2020/11/24 16:08:30
!-->
<template>
  <div class="app">
    <dof-minibar :left-button="leftButton" :title="$t('title')" @dofMinibarRightButtonClicked="minibarRightButtonClick">
      <div slot="left">
        <image :src="leftButton" style="height: 55px;width: 55px;transform:translateX(-10px);"></image>
      </div>
      <div slot="right" class="right-img-wrapper">
        <image :src="rightButton" style="height: 32px;width: 32px;"></image>
      </div>
    </dof-minibar>
    <div class="app-container">
      <div class="app-container-btn-wrapper">
        <dof-button :text="$t('changeLanguage')" @dofButtonClicked="changeLangHandler"></dof-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DofMinibar, DofButton } from 'dolphin-weex-ui'

export default {
  components: { DofMinibar, DofButton },
  data: () => ({
    leftButton: './assets/image/header/back_black@2x.png',
    rightButton: './assets/image/header/refresh.png',
    theme: '#267aff',
    langSet: ['zh_CN', 'en_US', 'ja_JP'],
    curInd: 0
  }),
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    },
    //多语言切换
    changeLangHandler() {
      this.curInd++
      this.$i18n.locale = this.langSet[this.curInd]
      this.$storage.setStorage('locale', this.langSet[this.curInd])
      if (this.curInd === 2) this.curInd = -1
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  &-container {
    &-btn-wrapper {
      align-items: center;
      margin: 32px 0 40px 0;
    }
  }
}
</style>
