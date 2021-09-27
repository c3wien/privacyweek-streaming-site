<template>
  <section class="box my-2">
    <iframe
      src="https://web.libera.chat/?nick=Guest#privacyweek21"
      class="chat"
    ></iframe>
  </section>
</template>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.chat {
  border: 1px solid $color-lightgrey;
  width: 100%;
  /* Default by libera.chat for the widget */
  height: 450px;
}

</style>