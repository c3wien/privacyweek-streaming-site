<template>
  <div>
    <NuxtLink to="/" class="button is-rounded back mb-2">{{
      $t('artStream.back')
    }}</NuxtLink>

    <VideoViewer
      livestream-url="https://stream.privacyweek.at/hls/datasea/kunst.m3u8"
    />
    <div class="py-6">
      <h2 class="title is-3 is-font-weight-bold">
        <span>Däténméér</span>
        <span class="subtitle is-size-5">
          <span>{{ $t('artStream.by') }} Siegfried Kärcher</span>
        </span>
      </h2>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '~assets/scss/main.scss';
.back {
  font-weight: bold;
  transition: background-color 0.3s linear;
}

.back:focus,
.back:hover,
.back:active {
  background-color: $color-almost-white;
}
.back:focus {
  outline: 2px solid $color-turquoise;
}
</style>
