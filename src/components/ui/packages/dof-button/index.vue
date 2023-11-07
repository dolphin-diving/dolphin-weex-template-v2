<!-- modified by liuhr7 on 19/12/28. -->

<template>
  <div
    v-if="visible"
    :class="[
      'dof-btn',
      isHighlight && !disabled && `dof-btn-highlight-${type}-${pattern}`
    ]"
    :style="mrBtnStyle"
    @click="onClicked"
    :accessible="true"
    :aria-label="text"
  >

    <midea-apng-view
      :src="loadingGif"
      class="loading-image"
      resize="contain"
      v-if="loading"
      quality="original"
      :auto="true"
      :loop="true"
    ></midea-apng-view>
    <text
      :class="[
        'btn-text',
        isHighlight &&
          !disabled &&
          pattern === 'text' &&
          `dof-text-highlight-${type}`
      ]"
      :style="mrTextStyle"
      @click="onTextClicked"
    >{{ loading  && size == 'small' ? '' : text }}</text>
  </div>
</template>

<script>
const BLACK_LOADING_ICON =
  'http://dolphin-weex-dev.msmartlife.cn/cdn/images/common/loading_icon_gray_18px.png'
const WHITE_LOADING_ICON ='http://dolphin-weex-dev.msmartlife.cn/cdn/images/common/loading_icon_white_18px.png'
import {
  STYLE_MAP,
  TEXT_STYLE_MAP,
  BUTTON_STYLE_MAP,
  TEXT_FONTSIZE_STYLE_MAP
} from './type'

export default {
  data() {
    return {
      visible: true
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '确认'
    },
    size: {
      type: String,
      default: 'full'
    },
    type: {
      type: String,
      default: 'primary'
    },
    pattern: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isHighlight: {
      type: Boolean,
      default: true
    },
    btnStyle: Object,
    textStyle: Object,
    disabledStyle: Object
  },
  computed: {
    mrBtnStyle() {
      const { type, pattern, disabled, btnStyle, size, disabledStyle } = this
      let mrBtnStyle = Object.assign(STYLE_MAP[type][pattern], BUTTON_STYLE_MAP[size])

      try {
        const theme = this.$theme.getTheme()
        if (theme && STYLE_MAP[type].hasOwnProperty(theme)) {
          mrBtnStyle = Object.assign(STYLE_MAP[type][theme], BUTTON_STYLE_MAP[size], theme == 'colmo' ? { borderRadius: '0px' }: {})
        }
      } catch (error) {
        //
      }

      mrBtnStyle = Object.assign(mrBtnStyle, btnStyle)

      let disabledInStyle = { opacity: 0.3 }
      if (type === 'white') {
        disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
      }
      if (disabled) {
        mrBtnStyle = Object.assign(disabledInStyle, disabledStyle)
      }

      return mrBtnStyle
    },
    mrTextStyle() {
      const { type, pattern, disabled, textStyle, size } = this
      const mrTextStyle = Object.assign(TEXT_STYLE_MAP[type][pattern], textStyle, TEXT_FONTSIZE_STYLE_MAP[size])
      return mrTextStyle
    },
    loadingGif() {
      const { pattern } = this
      if (pattern === 'default') {
        return WHITE_LOADING_ICON
      } else {
        return BLACK_LOADING_ICON
      }
    },
    theme() {
      try {
        return this.$theme.getTheme()
      } catch (error) {
        return ''
      }
    }
  },
  watch: {
    theme() {
      if (weex.config.env.platform != 'iOS') {
        this.visible = false
        setTimeout(() => (this.visible = true))
      }
    }
  },
  methods: {
    onClicked(e) {
      const { type, pattern, disabled } = this
      disabled
        ? null
        : this.$emit('dofButtonClicked', { e, type, pattern, disabled })
    },
    onTextClicked(e) {
      const { type, pattern, disabled } = this
      disabled
        ? null
        : this.$emit('dofButtonClicked', { e, type, pattern, disabled })
    }
  }
}
</script>

<style scoped>
.loading-image {
  height: 32px;
  width: 32px;
}
.dof-btn {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border-radius: 12px; */
  opacity: 1;
}

.dof-btn-highlight-primary-default:active {
  background-color: #226de5;
}

.dof-btn-highlight-primary-base:active {
  background-color: #d1d8e5;
}
.dof-btn-highlight-primary-plain:active {
  background-color: rgba(38, 122, 255, 0.1);
}
.dof-btn-highlight-purple-default:active {
  background-color: #8a54e3;
}
.dof-btn-highlight-purple-base:active {
  background-color: #d5cee5;
}
.dof-btn-highlight-purple-plain:active {
  background-color: rgba(153, 94, 252, 0.1);
}

.dof-btn-highlight-slate-default:active {
  background-color: #5b69e6;
}

.dof-btn-highlight-slate-base:active {
  background-color: #ced0e5;
}
.dof-btn-highlight-slate-plain:active {
  background-color: rgba(101, 117, 255, 0.1);
}

.dof-btn-highlight-aqua-default:active {
  background-color: #24afe6;
}

.dof-btn-highlight-aqua-base:active {
  background-color: #cedee5;
}
.dof-btn-highlight-aqua-plain:active {
  background-color: rgba(41, 195, 255, 0.1);
}

.dof-btn-highlight-turquoise-default:active {
  background-color: #00b7a5;
}

.dof-btn-highlight-turquoise-base:active {
  background-color: #cee5e3;
}
.dof-btn-highlight-turquoise-plain:active {
  background-color: rgba(0, 203, 184, 0.1);
}

.dof-btn-highlight-yellow-default:active {
  background-color: #e5980e;
}

.dof-btn-highlight-yellow-base:active {
  background-color: #e5dbc9;
}
.dof-btn-highlight-yellow-plain:active {
  background-color: rgba(255, 170, 16, 0.1);
}

.dof-btn-highlight-orange-default:active {
  background-color: #e67521;
}

.dof-btn-highlight-orange-base:active {
  background-color: #e5d7ce;
}
.dof-btn-highlight-orange-plain:active {
  background-color: rgba(255, 130, 37, 0.1);
}

.dof-btn-highlight-tomato-default:active {
  background-color: #e65f44;
}
.dof-btn-highlight-tomato-base:active {
  background-color: #e6d3cf;
}
.dof-btn-highlight-tomato-plain:active {
  background-color: rgba(255, 106, 76, 0.1);
}

.dof-btn-highlight-gray-default:active {
  background-color: #6f798b;
}
.dof-btn-highlight-gray-base:active {
  background-color: #b9c1ce;
}
.dof-btn-highlight-gray-plain:active {
  background-color: rgba(124, 135, 155, 0.1);
}

.btn-text {
  font-family: PingFangSC-Medium;
  text-overflow: ellipsis;
  lines: 1;
  color: #ffffff;
  margin-left: 10px;
}
.dof-text-highlight-primary:active {
  color: #5b69e6;
}
.dof-text-highlight-purple:active {
  color: #8a54e3;
}
.dof-text-highlight-slate:active {
  color: #5b69e6;
}
.dof-text-highlight-aqua:active {
  color: #24afe6;
}
.dof-text-highlight-turquoise:active {
  color: #00b7a5;
}
.dof-text-highlight-yellow:active {
  color: #e5980e;
}
.dof-text-highlight-orange:active {
  color: #e67521;
}
.dof-text-highlight-tomatot:active {
  color: #e65f44;
}
.dof-text-highlight-gray:active {
  color: #6f798b;
}
</style>

<style>
@media screen and (weex-theme: colmo) {
  .dof-btn-highlight-primary-default:active {
    background-color: #7c3925;
  }
}
</style>
