<template>
  <div class="wrapper" :class="name">
    <dof-minibar title="一键换肤使用示例" background-color="transparent" :text-color="titleColor"
      :left-button="leftImageSrc"></dof-minibar>

    <scroller class="scroller">
      <div class="center">
        <div class="margin-top-40 margin-bottom-30">
          <text class="label margin-bottom-30">获取当前主题</text>
          <dof-button text="执行 getTheme" size="big" @dofButtonClicked="handleClick"></dof-button>
        </div>
        <text class="label">代码</text>
        <div class="card margin-bottom-30">
          <div class="cell">
            <text class="label">this.$theme.getTheme()</text>
          </div>
        </div>
        <template v-if="clicked">
          <text class="label">输出</text>
          <div class="card">
            <div class="cell">
              <text class="label">{{ val }}</text>
            </div>
          </div>
        </template>
      </div>
      <div class="center">
        <div class="margin-top-40 margin-bottom-30">
          <text class="label margin-bottom-30">切换到 dark 主题</text>
          <dof-button text="执行 setTheme('dark')" size="big" @dofButtonClicked="$theme.setTheme('dark')"></dof-button>
        </div>
        <text class="label">代码</text>
        <div class="card">
          <div class="cell">
            <text class="label">this.$theme.setTheme('dark')</text>
          </div>
        </div>
      </div>

      <div class="center">
        <div class="margin-top-80 margin-bottom-30">
          <text class="label margin-bottom-30">切换到 colmo 主题</text>
          <dof-button text="执行 setTheme('colmo')" size="big" @dofButtonClicked="$theme.setTheme('colmo')"></dof-button>
        </div>
        <text class="label">代码</text>
        <div class="card">
          <div class="cell">
            <text class="label">this.$theme.setTheme('colmo')</text>
          </div>
        </div>
      </div>

      <div class="center">
        <div class="margin-top-80 margin-bottom-30">
          <text class="label margin-bottom-30">不使用主题</text>
          <dof-button text="执行 setTheme('')" size="big" @dofButtonClicked="$theme.setTheme('')"></dof-button>
        </div>
        <text class="label">代码</text>
        <div class="card">
          <div class="cell">
            <text class="label">this.$theme.setTheme('')</text>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="margin-top-40 margin-bottom-30">
          <text class="label margin-bottom-30">监听当前页面主题，返回配置项对应值</text>
          <dof-button text="执行 watchTheme" size="big" @dofButtonClicked="handleClick"></dof-button>
        </div>
        <text class="label">代码</text>
        <div class="card margin-bottom-30">
          <div class="cell2">
            <text class="label">{{ `this.$theme.watchTheme({
              dark: '#ffffff',
              colmo: '#B35336',
              default: '#267aff'
              })` }}</text>
          </div>
        </div>
        <template v-if="clicked">
          <text class="label">输出</text>
          <div class="card">
            <div class="cell">
              <text class="label">{{ val }}</text>
            </div>
          </div>
        </template>
      </div>
    </scroller>

    <set-theme></set-theme>
  </div>
</template>

<script>
import { DofButton } from 'src/components/ui'
import { DofMinibar } from 'dolphin-weex-ui'
import SetTheme from '../../components/set-theme.vue'

export default {
  components: {
    SetTheme,
    DofMinibar,
    DofButton
  },
  data() {
    return {
      val: '',
      clicked: false
    }
  },
  created() { },
  mounted() { },
  computed: {
    leftImageSrc() {
      let white =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAABxyNlsAAABu0lEQVR4nO3csUrkYBSG4W+sBCvBwmsQC2E7t7C19C4s7AXbbWxkL0DvYfu9AO/Ae9DCTsHOz8LIDhJ1JvlPzjrnfWCYkMAk5+WfNIFIAAAAAAAAAAAAAObNMk9uO+JndyWdddvnkm5ms9Qxc9hu/flp+8H/3NneyJ4zRXDYNz+y50wxQVhWblDYh+5Y9pg5pghL3MCwxA0MS9zAsMQNDEvcwLDEDQxL3MCwxA0MS9zAsMQNDEvcwLDEDQxL3MCwxA0MWz3ufmTYynE3bd9Ghs2Mu5Z25lcnkrbf7XuUdCjpevrLaSs77l7PviOtQFgpP+5dz75TSetTX8jKsX1g+7nnnvvX9vp3v+em6ob/3RO3aeCSuuFnti8jA5c0FyA0cEnvIoQFLqknREjgkj6I0TxwSZ8EaRq4pC+iNAtc0gJhmgQuacGVNzpwSYv+rccGLmmJuKMCl7Rk3MGBSxoQd1DgkgbGXTpwSSPiLhW4pJFxFw5cUoO4XwX+Q9zYwDtZ82U/oGzFko4lXfUce5r4Wv4PDVfu/Aq+8OtDz2fbvzJvC6v4SgBJ2uq+7yWp5CsBAAAAAAAAAAAAMNQLjezTfhzS8wEAAAAASUVORK5CYII='
      let black =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAAEGz+n6AAAABGdBTUEAALGPC/xhBQAAAmhJREFUeAHt3L9Kw1AUx3H/DYKT4ODgIjiJm5sODr6Wk7P4ADq7ibsP4XPorrN6f+CBUJLbk+YcvNFvIKTtvfnl5JOkTZvQtbXmh3Nvhe6OZ95E6/dsD7zT0TMce5P/fL8v7xpO77jhXVStn7sMCxk9g83IdFjgZLhptRa9mYRuqdGBm47CVeFBGY8cfVfqogWMfjMbs6T0BYwphr4ItCjwsKyorWUdetp15H30vD7pJYW+T0romfmfh0pEBKMHz/nNfUldKdxTzR3hfUypLH0L5DUEEEAAgQgB+yanj83TiMCsjG6h4SdlkUVTaKSmsmYjqmJ1IGlseh9VoTbclgdWdOqvI7bAqKmdeap4Co9SreUgXtPJaLspoZ8ZwWQigAACCCCAAAIIIPCLArooGH7bQ8b66Gu9fVvOyA/L7BaqH1CaHSg0etMgimgR4KiP2A1mczBdlbW1T6b0Te+5G6Omv99pfOk8bvahyWq63WyVP4WtlykFZ24lhDN1lY0wwgsCs98lFtanvacS1uWm6/ZKoyIEEEAAAQQQQAABBBBAAAEEEEAAAQQQQGCeArpg273S/Fae78xzVdqpehHVLomCO2EbDaFq702/7WBC3U3PCmrC5gEV1ASBhEj2VFATBBIi2VNBTRBIiNwtma9ltJN+m3KeGoD92AN7GZBLRBG4KKNuwrI91qb6j4vmbz0uNTY/6C637l9ZGLCmIAdtPpCDIGsxINd0gtpADoKsxYBc0wlqAzkIshYDck0nqA3kIMhaTA35qTYjbX6BIeRDfwQ9PQJ7pZNGBgQQQAABBBBAAAEEEEBgPgLfEdQVq63gy98AAAAASUVORK5CYII='
      try {
        return this.$theme.watchTheme({
          dark: white,
          colmo: white,
          default: black
        })
      } catch (error) {
        return black
      }
    },
    titleColor() {
      try {
        return this.$theme.watchTheme({
          dark: '#ffffff',
          colmo: '#ffffff',
          default: '#333333'
        })
      } catch (error) {
        return ''
      }
    }
  },
  methods: {
    handleClick() {
      this.val = this.$theme.getTheme()
      this.clicked = true
    }
  }
}
</script>

<style scoped lang="scss">
@import 'index.scss';
@import 'dark.scss';
@import 'colmo.scss';
</style>
