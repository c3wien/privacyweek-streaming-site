<template>
  <button
      class="button is-rounded is-small"
      @click="$emit('click')"
    >
     <slot></slot>
    </button>
</template>
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