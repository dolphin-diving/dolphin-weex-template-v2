<template>
  <div class="wrapper">
    <dof-minibar
      :title="$t('title')"
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
    <div class="lottie-wrapper">
      <div class="show-welcome margin-top-40 margin-bottom-40">
        <text> {{ welcome }}</text>
      </div>
      <div class="text-wrapper" v-if="!isLottieShow">
        <div class="show-welcome word">
          <text> {{ word }}</text>
        </div>
      </div>
      <midea-lottie-view
        v-if="isLottieShow"
        ref="lottieView"
        class="lottie"
        :data="lottieData"
        :loop="true"
      ></midea-lottie-view>
      <div class="logo">
        <text class="logo-text">DolphinWeex</text>
      </div>
    </div>
    <div class="show-welcome margin-top-40">
      <text class="tip-text" :style="{ paddingLeft: '30px' }">{{ $t('cli.name') }}</text>
      <text class="tip-text">{{ $t('cli.step1') }}</text>
      <text class="tip-text">{{ $t('cli.step2') }}</text>
      <text class="tip-text">{{ $t('cli.step3') }}</text>
    </div>
  </div>
</template>

<script>
import { DofCell2, DofMinibar } from 'dolphin-weex-ui'
const lottieModule = weex.requireModule('lottieModule')
import circle from '../../assets/lottie/circle.json'
import egg from '../../assets/lottie/color-egg.json'
import lang from '../../assets/lang/welcome.json'

export default {
  components: {
    DofMinibar
  },
  data() {
    return {
      leftButton: './assets/image/header/back_black@2x.png',
      rightButton: './assets/image/header/refresh.png',
      word: this.$t('welcome.world'),
      lottieData: '',
      isLottieShow: false
    }
  },
  created() {},
  mounted() {
    this.lottieData = JSON.stringify(circle)
    setTimeout(() => {
      this.isLottieShow = true
    }, 1200)
  },
  computed: {
    welcome() {
      return this.isLottieShow ? this.$t('welcome.status1') : this.$t('welcome.status2')
    }
  },
  methods: {
    minibarRightButtonClick() {
      this.$reload()
    }
  }
}
</script>
<style scoped>
.show-welcome {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
}
.word {
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 50px;
}
.margin-top-40 {
  margin-top: 40px;
}
.margin-bottom-40 {
  margin-bottom: 40px;
}
.lottie-wrapper {
  width: 750px;
  height: 700px;
  position: relative;
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
