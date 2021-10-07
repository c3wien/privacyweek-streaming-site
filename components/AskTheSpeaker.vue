<template>
  <a
    class="button is-dark is-rounded ask-a-question"
    href="https://privacyweek.at/fragen"
    target="_blank"
    rel="noopener"
  >
    {{ $t('currentlyPlaying.askTheSpeaker') }}
  </a>
</template>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

a.button.ask-a-question {
  background-color: $color-darkblue;
  font-weight: bold;
  transition: background-color 0.3s linear;
}
a.button.ask-a-question:hover,
a.button.ask-a-question:active {
  background-color: $color-blue;
}
</style>