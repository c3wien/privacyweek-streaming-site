<template>
  <a
    class="button is-rounded is-dark is-blue"
    :class="additionalClasses"
    :href="href"
    :title="opensInNewTab ? $t('general.opensInNewTab') : ''"
    :target="opensInNewTab ? '_blank' : ''"
    :rel="opensInNewTab ? 'noopener noreferrer' : ''"
  >
    <img
      v-if="opensInNewTab"
      src="~/assets/icons/fontawesome/up-right-from-square-solid.svg"
      :alt="$t('general.opensInNewTab')"
      width="12"
      height="12"
      class="mr-2"
    />
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
    opensInNewTab: {
      type: Boolean,
      required: false,
      default: false,
    },
    additionalClasses: {
      type: String,
      required: false,
      default: '',
    }
  },
};
</script>
<style lang="scss" scoped>
@import '~assets/scss/main.scss';


.is-blue {
  background-color: $color-darkblue;
  font-weight: bold;
  transition: background-color 0.3s linear;
}
.is-blue:hover,
.is-blue:focus,
.is-blue:active {
  background-color: $color-blue;
}
</style>
