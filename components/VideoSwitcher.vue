// This component allows users to switch between the original and the translated stream
<template>
  <div>
    <!-- Note: this wrapping div is needed so that the if/else-rendered elements differ in structure and so
     vue actually removes and adds again the video player instead of just changing props -->
    <div v-if="selectedTrack === 'translation'">
      <VideoViewer
        livestreamUrl="https://stream.privacyweek.at/hls/trans/main_hd.m3u8"
      />
    </div>
    <VideoViewer
      v-else
      livestreamUrl="https://stream.privacyweek.at/hls/orig/main_hd.m3u8"
    />
    <div class="video-track-selection mt-5">
      <div class="is-size-7 ml-5">{{ $t('videoPlayer.selectTrack') }}</div>
      <button
        class="button is-light is-rounded is-medium"
        :class="selectedTrack === 'original' ? 'active' : 'not-active'"
        @click="switchTrack('original')"
      >
        {{ $t('videoPlayer.original') }}
      </button>
      <button
        class="button is-light is-rounded is-medium"
        :class="selectedTrack === 'translation' ? 'active' : 'not-active'"
        @click="switchTrack('translation')"
      >
        {{ $t('videoPlayer.translation') }}
      </button>
    </div>
  </div>
</template>


<script>
import 'video.js';
export default {
  data() {
    return {
      selectedTrack: 'original',
    };
  },
  methods: {
    switchTrack: function (track) {
      this.selectedTrack = track;
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
$big-play-button--line-height: 2.25em;
$big-play-button--width: 4.5em;
$primary-foreground-color: #fff;
$primary-background-color: $color-darkblue;

.video-track-selection {
  display: flex;
  align-items: center;
  .active {
    font-weight: bold;
  }
  .not-active {
    color: $color-darkgrey;
  }
  > button {
    text-decoration: none !important;
  }

  > *:first-child {
    margin-right: 1rem;
  }
}
</style>
