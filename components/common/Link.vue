<template>
  <a class="link" :href="href">
    <slot></slot>
  </a>
</template>
<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.link {
  color: $color-accessible-turquoise;
}
.link:hover,
.link:active,
.link:focus {
  text-decoration: underline;
}
.link:focus {
  outline: 2px solid $color-accessible-turquoise;
  outline-offset: 3px;
}
.link:focus:not(:focus-visible) {
  outline: none;
}
</style>
