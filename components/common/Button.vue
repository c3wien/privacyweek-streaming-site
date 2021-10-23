<template>
  <button :class="classNames" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    classNames() {
      let classNames = 'button pw-button is-rounded';
      if (this.size) {
        classNames += ` is-${this.size}`;
      }
      if (this.color) {
        classNames += ` is-${this.color}`
      }
      return classNames;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.pw-button {
  font-weight: bold;
  transition: background-color 0.3s linear;
}

.is-blue {
  background-color: $color-darkblue;
}
.is-blue:hover,
.is-blue:focus,
.is-blue:active {
  background-color: $color-blue;
}
</style>