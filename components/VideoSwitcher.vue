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
    <div class="button-bar mt-5">
      <div class="video-track-selection">
        <button
          class="button ml-5 is-light is-rounded is-medium"
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

      <a
        class="button is-dark is-rounded current-workshops mr-5"
        href="#workshops"
        id="workshopButton"
      >
        {{ $t('currentlyPlaying.currentWorkshops') }}
      </a>
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

.button-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.video-track-selection {
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

a.button.current-workshops {
  background-color: $color-violet;
  font-weight: bold;
  transition: background-color 0.3s linear;
}
a.button.current-workshops:hover,
a.button.current-workshops:active {
  background-color: #622e6f;
}
</style>
