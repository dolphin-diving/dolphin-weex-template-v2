<template>
  <div v-if="visible" class="wrapper">
    <div class="outside">
      <div class="outside-button" @click="showPopup">
        <text class="outside-button-text">一键换肤</text>
      </div>
    </div>

    <dof-popup
      pos="bottom"
      :popupColor="popupColor"
      :show="popupVisible"
      :height="height"
      :width="750"
      @dofPopupOverlayClicked="onClose"
    >
      <div class="top-bar">
        <text class="top-bar-title">一键换肤</text>
      </div>
      <div class="card">
        <div class="cell">
          <text class="name">深色模式</text>
          <div>
            <dof-switch :checked="theme == 'dark'" @dof-change="switchTheme('dark')"></dof-switch>
          </div>
        </div>
        <div class="cell bdt">
          <text class="name">COLMO模式</text>
          <div>
            <dof-switch :checked="theme == 'colmo'" @dof-change="switchTheme('colmo')"></dof-switch>
          </div>
        </div>
      </div>
    </dof-popup>
  </div>
</template>

<script>
import { DofPopup } from 'dolphin-weex-ui'
import { DofSwitch } from 'src/components/ui'

export default {
  components: { DofPopup, DofSwitch },

  data() {
    return {
      visible: true,
      popupVisible: false
    }
  },

  computed: {
    height() {
      let tmp = 104 + 300
      return tmp
    },
    theme() {
      try {
        return this.$theme.getTheme()
      } catch (error) {
        return ''
      }
    },
    popupColor() {
      try {
        return this.$theme.watchTheme({
          dark: '#232323',
          colmo: '#1C1E21',
          default: '#f9f9f9'
        })
      } catch (error) {
        return '#f9f9f9'
      }
    }
  },

  methods: {
    showPopup() {
      this.popupVisible = true
    },
    onClose() {
      this.popupVisible = false
    },
    switchTheme(name) {
      if (name && this.theme == name) name = ''
      this.$theme.setTheme(name)
    }
  },

  created() {}
}
</script>

<style scoped>
.flex-row {
  flex-direction: row;
}
.flex-row-center {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.flex-row-fs {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.flex-row-fe {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.flex-row-sb {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.flex-column-center {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper {
}
.outside {
  position: fixed;
  bottom: 130px;
  right: 0px;
}
.outside-button {
  width: 168px;
  height: 64px;
  padding-left: 12px;
  border-top-left-radius: 64px;
  border-bottom-left-radius: 64px;
  background-color: #267aff;
  box-shadow: 0 -1px 12px 0 rgba(0, 0, 0, 0.05);
  opacity: 0.8;
  align-items: center;
  justify-content: center;
}
.outside-button:active {
  opacity: 0.75;
}
.outside-button-text {
  color: #fff;
  font-size: 28px;
}
.top-bar {
  height: 104px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.top-bar-title {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
}
.card {
  background-color: #fff;
  width: 686px;
  padding-left: 32px;
  border-radius: 32px;
  margin-top: 20px;
  margin-left: 32px;
}
.cell {
  padding-right: 32px;
  height: 110px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.bdt {
  border-top-width: 1px;
  border-color: #f1f1f1;
}
.name {
  font-size: 32px;
  font-weight: bold;
  color: #000;
}
</style>

<style scoped lang="scss">
@import '../../../css/_dark';
@media screen and (weex-theme: dark) {
  .outside-button {
    background-color: $color_primary;
  }
  .card {
    background-color: $color_background_secondary;
  }
  .bdt {
    border-color: $color_border_base;
  }
  .name {
    color: $color_text_primary;
  }
  .top-bar-title {
    color: $color_text_primary;
  }
}
</style>

<style scoped lang="scss">
@import '../../../css/_colmo';
@media screen and (weex-theme: colmo) {
  .outside-button {
    background-color: $color_primary;
  }
  .card {
    background-color: $color_background_secondary;
  }
  .bdt {
    border-color: $color_border_base;
  }
  .name {
    color: $color_text_primary;
  }
  .top-bar-title {
    color: $color_text_primary;
  }
}
</style>
