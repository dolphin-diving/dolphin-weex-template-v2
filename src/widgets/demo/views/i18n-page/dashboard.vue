<template>
  <div class="app">
    <text>{{ $t('dashboard.title') }}</text>
    <text>{{ $t('dashboard.value') }}</text>
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

<style lang="scss" scoped></style>
