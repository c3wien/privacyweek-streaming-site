<template>
  <NuxtLink
    v-if="isNuxtLink"
    class="link"
    :class="additionalClasses"
    :to="href"
  >
    <slot></slot>
  </NuxtLink>
  <a v-else class="link" :class="additionalClasses" :href="href">
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
    isNuxtLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    additionalClasses: {
      type: String,
      required: false,
      default: '',
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
</style>
