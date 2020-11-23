<template>
  <div class="app">
    <text>{{ title }}</text>
    <text>{{ $t('airContainer.name') }}</text>
    <text>{{ $t('airContainer.detail.size') }}</text>
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
