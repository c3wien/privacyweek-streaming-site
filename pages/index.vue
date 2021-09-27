<template>
  <div>
    <div class="columns is-desktop">
      <div class="column is-three-quarters-desktop">
        <div class="card-image">
          <VideoSwitcher />
        </div>
      </div>
      <div class="column is-one-quarter-desktop">
        <Chat />
      </div>
    </div>
    <div class="columns is-desktop">
      <div class="card-content column is-three-quarters-desktop">
        <div class="px-2">
          <CurrentlyPlaying />
        </div>
      </div>
      <div class="column is-one-quarter-desktop">
        <Sidebar />
      </div>
    </div>
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
