<template>
  <div>
    <VideoAndChat />
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
