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
    <div class="text-wrapper">
      <div class="show-welcome margin-top-40 margin-bottom-40">
        <text> {{ $t('message') }}</text>
        <text> {{ $t('fruit.name') }}</text>
        <text> {{ $t('fruit.count') }}</text>
      </div>
    </div>
    <div class="button-wrapper">
      <dof-button :text="language" type="primary" @dofButtonClicked="changleLocale"></dof-button>
    </div>
  </div>
</template>

<script>
import { DofButton } from 'dolphin-weex-ui'
import lang from '../../assets/lang/i18n-demo.json'

export default {
  components: {
    DofButton
  },
  data() {
    return {
      leftButton: './assets/image/header/back_black@2x.png',
      rightButton: './assets/image/header/refresh.png',
      i18nData: lang
    }
  },
  created() {},
  mounted() {},
  computed: {
    language() {
      return `切换语言: ${this.locale === 'en_US' ? '英文' : '中文'}  ${this.locale}`
    }
  },
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    },
    changleLocale() {
      let lang = this.locale === 'zh_CN' ? 'en_US' : 'zh_CN'
      this.$storage.setStorage('locale', lang, () => {
        this.locale = lang
      })
    }
  }
}
</script>
<style scoped>
.margin-top-40 {
  margin-top: 40px;
}
.margin-bottom-40 {
  margin-bottom: 40px;
}
.text-wrapper {
  width: 750px;
  height: 200px;
  position: relative;
}
.button-wrapper {
  width: 750px;
  height: 700px;
  align-items: center;
}
.lottie {
  width: 750px;
  height: 550px;
}
.logo {
  position: absolute;
  top: 385px;
  left: 375px;
  transform: translateX(-50%);
}
.logo-text {
  color: #0092d7;
  font-size: 50px;
}
.tip-text {
  color: #9a9a9a;
}
</style>
