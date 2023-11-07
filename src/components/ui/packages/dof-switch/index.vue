<template>
  <div class="dof-switch-wrapper">
    <midea-apng-view
      :src="loadingSrc"
      class="dof-switch-loading"
      resize="contain"
      v-if="loading"
      quality="original"
      :auto="true"
      :loop="true"
    ></midea-apng-view>
    <div
      v-else
      ref="switch"
      @click="changeHandler"
      :class="[type === 'white' ? 'switch-white' : 'switch', checked && switchActiveClass]"
      :style="mrSwitchStyle"
    >
      <div ref="switchDot" :style="dotStyle" :class="[type === 'white' ? 'switch-white-dot' : 'switch-dot']"></div>
    </div>
  </div>
</template>

<style scoped>
.dof-switch-wrapper {
  width: 96px;
  height: 48px;

  align-items: center;
  justify-content: center;
}

.dof-switch-loading {
  width: 32px;
  height: 32px;
}

.switch {
  width: 96px;
  height: 48px;
  border-style: solid;
  border-color: #8a8a8f;
  background-color: #ffffff;
  border-width: 4px;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.switch-white {
  width: 96px;
  height: 48px;
  border-style: solid;
  border-color: #ffffff;
  background-color: #000000;
  border-width: 4px;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
}
.switch-active-default {
  border-width: 0px;
  background-color: #267aff;
}
.switch-active-purple {
  border-width: 0px;
  background-color: #995efc;
}
.switch-active-slate {
  border-width: 0px;
  background-color: #6575ff;
}
.switch-active-aqua {
  border-width: 0px;
  background-color: #29c3ff;
}
.switch-active-turquoise {
  border-width: 0px;
  background-color: #00cbb8;
}
.switch-active-tomato {
  border-width: 0px;
  background-color: #fe674a;
}
.switch-active-orange {
  border-width: 0px;
  background-color: #ff8225;
}
.switch-active-yellow {
  border-width: 0px;
  background-color: #ffaa10;
}
.switch-active-gray {
  border-width: 0px;
  background-color: #7c879b;
}
.switch-active-white {
  border-width: 0px;
  background-color: #ffffff;
}
.switch-disabled {
  opacity: 0.3;
}
.switch-dot {
  border-radius: 8px;
  width: 16px;
  height: 16px;
  position: relative;
  left: 12px;
  transition-property: all;
  transition-duration: 5s;
  background-color: transparent;
}
.switch-white-dot {
  border-radius: 8px;
  width: 16px;
  height: 16px;
  position: relative;
  left: 12px;
  transition-property: all;
  transition-duration: 5s;
  background-color: transparent;
}
</style>

<style scoped>
@media screen and (weex-theme: dark) {
  .switch {
    background-color: transparent;
  }
  .switch-active-default {
    background-color: #267aff;
  }
}
</style>

<style scoped>
@media screen and (weex-theme: colmo) {
  .switch {
    border-width: 2px;
    border-color: #71717A;
    background-color: transparent;
  }
  .switch-active-default {
    border-color: #B35336;
    background-color: transparent;
  }
}
</style>

<script>
// 带switch按钮的cell
const animation = weex.requireModule('animation')
function throttle(fn, interval = 200) {
  var last
  var timer
  return function() {
    var that = this
    var args = arguments
    var now = +new Date()
    if (last && now - last > interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(that, args)
      }, interval)
    } else {
      last = now
      fn.apply(that, args)
    }
  }
}
module.exports = {
  props: {
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isLightLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loadingSrc() {
      return this.isLightLoading
        ? 'http://dolphin-weex-dev.msmartlife.cn/static/component/loading/image/loading-white.png'
        : 'http://dolphin-weex-dev.msmartlife.cn/static/component/loading/image/loading-gray.png'
    },
    switchActiveClass() {
      const { type } = this
      return `switch-active-${type}`
    },
    mrSwitchStyle() {
      return this.disabled ? { opacity: 0.3 } : { opacity: 1 }
    },
    dotStyle() {
      let { checked, type } = this
      if (type !== 'white') {
        if (checked === true) {
          try {
            return {
              backgroundColor: this.$theme.watchTheme({
                colmo: '#B35336',
                default: '#ffffff'
              })
            }
          } catch (error) {
            return {
              backgroundColor: '#ffffff'
            }
          }
        } else {
          return {
            backgroundColor: '#8a8a8f'
          }
        }
      } else {
        if (checked === true) {
          return {
            backgroundColor: '#000000'
          }
        } else {
          return {
            backgroundColor: '#ffffff'
          }
        }
      }
    }
  },
  data: () => ({}),
  mounted() {
    this.$theme && this.$theme.registerModule('dolphinWeexUi', this)
    if (this.checked) {
      let dotColor = this.type === 'white' ? '#000000' : '#ffffff'
      try {
        dotColor = this.$theme.watchTheme({
          colmo: '#B35336',
          default: dotColor
        })
      } catch (error) {
        
      }
      animation.transition(this.$refs.switchDot, {
        styles: {
          backgroundColor: dotColor,
          transform: 'translateX(52px) scale(2.25)'
        },
        duration: 0
      })
    }
  },
  methods: {
    changeHandler: throttle(function() {
      const { disabled } = this
      if (!disabled) {
        this.$emit('dofChange')
      }
    }, 300)
  },
  watch: {
    checked(newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        let dotColor = this.type === 'white' ? '#000000' : '#ffffff'
        try {
          dotColor = this.$theme.watchTheme({
            colmo: '#B35336',
            default: dotColor
          })
        } catch (error) {
          
        }
        animation.transition(this.$refs.switchDot, {
          styles: {
            backgroundColor: dotColor
          },
          duration: 0,
          delay: 10
        })
        animation.transition(this.$refs.switchDot, {
          styles: {
            transform: 'translateX(52px) scale(2.25)'
          },
          duration: 300,
          timingFunction: 'ease-out'
        })
      } else if (newVal === false && oldVal === true) {
        const dotColor = this.type === 'white' ? '#ffffff' : '#8A8A8F'

        animation.transition(this.$refs.switchDot, {
          styles: {
            backgroundColor: dotColor
          },
          duration: 0,
          delay: 10
        })
        animation.transition(this.$refs.switchDot, {
          styles: {
            backgroundColor: dotColor,
            transform: 'translateX(0px) scale(1)'
          },
          duration: 300,
          timingFunction: 'ease-out'
        })
      }
    }
  }
}
</script>
