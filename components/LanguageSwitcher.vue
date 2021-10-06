<template>
  <div>
    <button
      v-for="locale in $i18n.locales"
      :key="locale.code"
      class="button is-inverted is-white mb-2 my-button"
      :class="$i18n.locale === locale.code ? 'active' : ''"
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