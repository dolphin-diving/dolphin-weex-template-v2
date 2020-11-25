<template>
  <div class="app">
    <div class="app-title">
      <text class="app-title-text">{{ $t('dashboard.title') }}</text>
    </div>
    <div class="app-value">
      <text class="app-value-text">{{ $t('dashboard.value') }}</text>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'XXX'
    }
  },
  data: () => ({
    name: 'hello'
  }),
  methods: {}
}
</script>

<style lang="scss" scoped>
.app {
  min-height: 500px;
  padding: 80px 0;
  // justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #267aff, rgba(77, 122, 255, 0.1));
  &-title {
    padding: 20px 0;
    &-text {
      color: #ffffff;
      font-size: 24px;
      letter-spacing: 0;
    }
  }
  &-value {
    &-text {
      color: #ffffff;
      font-size: 96px;
      letter-spacing: 0;
    }
  }
}
</style>
