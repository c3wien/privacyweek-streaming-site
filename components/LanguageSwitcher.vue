<template>
  <div>
    <button
      v-for="locale in this.$i18n.locales"
      class="button is-inverted is-white mb-2 my-button"
      :class="$i18n.locale === locale.code ? 'active' : ''"
      :key="locale.code"
      @click="changeLanguage(locale.code)"
    >
      {{ locale.name }}
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';

.active {
    text-decoration: underline;
}
.my-button {
    background: none !important;
    font-weight: bold;
}
</style>