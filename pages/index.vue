<template>
  <div class="card">
    <div class="card-image">
      <VideoViewer />
    </div>
    <div class="card-content">
      <CurrentlyPlaying />
    </div>
  <!-- <Colors  /> -->
  </div>
</template>

<script>
export default {
  target: 'static',
  head() {
    return {
      title: 'PrivacyWeek | Livestream Portal',
    };
  },
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
@import '~bulma/bulma';

@media screen and (min-width: $tablet) {
  .card {
    border-radius: 6px;
  }
}
</style>
