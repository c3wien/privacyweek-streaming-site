<template>
  <div>
    <div class="above-video mb-2">
      <NuxtLink to="/" class="button is-rounded back">{{
        $t('artStream.back')
      }}</NuxtLink>
      <article class="message is-warning">
        <div class="message-body warning">
          {{ $t('artStream.flashingLights') }}
        </div>
      </article>
    </div>
    <VideoViewer
      livestream-url="https://stream.privacyweek.at/hls/datasea/kunst.m3u8"
      stream-image="/stream-images/art-stream.jpg"
    />
    <div class="py-6">
      <h2 class="title is-3 is-font-weight-bold">
        <span>Däténméér</span>
        <span class="subtitle is-size-5">
          <span>{{ $t('artStream.by') }} Siegfried Kärcher</span>
        </span>
      </h2>
      <hr />
      <div class="content">
        <p class="is-italic">
          {{ $t('artStream.description1') }}
        </p>
        <p>
          {{ $t('artStream.description2') }}
        </p>
        <p>
          {{ $t('artStream.description3') }}
        </p>
        <p>
          {{ $t('artStream.description4') }}
        </p>
        <p>
          {{ $t('artStream.description5') }}
        </p>
        <p>
          {{ $t('artStream.description6') }}
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.above-video {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: space-between;
}

.message-body.warning {
  padding: 0.5em 1.5em;
}

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
