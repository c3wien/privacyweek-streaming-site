<template>
  <iframe
    class="iframe"
    :src="$config.chatClientURL"
  ></iframe>
</template>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.iframe {
  border: 1px solid $color-lightgrey;
  width: 100%;
  /* Default by libera.chat for the widget */
  height: 450px;
}

@include widescreen {
  .iframe {
    height: 100%;
  }
}
</style>