<template>
  <div class="flex-column">
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
    <div class="panel">
      <!--<text class='link' :style="{'color:active': 'black'}" @click='linkTo("/")'>tab1</text>-->
      <text class="link" :style="{ 'color:active': 'black' }" @click="linkTo('/')">首页</text>
      <text class="link" :style="{ 'color:active': 'black' }" @click="linkTo(`/focus/${id}`)">关注</text>
      <text class="link" :style="{ 'color:active': 'black' }" @click="linkTo('/recommend')">推荐</text>
    </div>
    <div class="span1" style="height: 750px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" src="src/css/dolphinweex.scss"></style>
<style scoped>
.panel {
  flex-direction: row;
  height: 100px;
  border-bottom-width: 1px;
  border-color: #eeeeee;
  justify-content: space-between;
}
.link {
  line-height: 100px;
  text-align: center;
  flex: 1;
  color: #00b4ff;
}
</style>

<script>
const globalEvent = weex.requireModule('globalEvent')
module.exports = {
  data: function() {
    return {
      leftButton: './assets/image/header/back_black@2x.png',
      rightButton: './assets/image/header/refresh.png',
      id: 'weex router'
    }
  },
  methods: {
    back() {
      this.$pop()
    },
    linkTo(path) {
      //点击后改变路由
      this.$router.push({
        path: path
      })
    },
    minibarRightButtonClick() {
      this.$reload()
    }
  },
  components: {},
  watch: {
    $route(to, from) {
      this.$alert(to.path)
    }
  },
  mounted: function() {
    // this.$alert(this.$route)
    globalEvent.addEventListener('androidback', e => {
      this.$pop()
    })
  }
}
</script>
