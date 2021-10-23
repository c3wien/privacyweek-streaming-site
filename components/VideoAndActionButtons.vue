// This component allows users to switch between the original and the translated stream
<template>
  <div>
    <!-- Note: this wrapping div is needed so that the if/else-rendered elements differ in structure and so
     vue actually removes and adds again the video player instead of just changing props -->
    <div v-if="selectedTrack === 'translation'">
      <VideoViewer
        livestream-url="https://stream.privacyweek.at/hls/trans/main_hd.m3u8"
      />
    </div>
    <VideoViewer
      v-else
      livestream-url="https://stream.privacyweek.at/hls/orig/main_hd.m3u8"
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
      <div class="interaction-buttons m-2">
        <a
          class="button is-rounded is-dark is-blue m-1"
          href="https://privacyweek.at/fragen"
          target="_blank"
          rel="noopener"
        >
          {{ $t('currentlyPlaying.askTheSpeaker') }}
        </a>
        <a :href="videoChatURL" class="button is-rounded is-dark is-blue m-1">{{
          $t('currentlyPlaying.talkToSpeaker')
        }}</a>
      </div>
    </div>
  </div>
</template>


<script>
import 'video.js';
import { addMinutes } from 'date-fns';
// provides computed videoChatURL
import createSlugForVideoChat from '~/mixins/createSlugForVideoChat.js';

export default {
  mixins: [createSlugForVideoChat],
  props: {
    talks: Array,
    workshops: Array,
    now: Date,
  },
  data() {
    return {
      selectedTrack: 'original',
    };
  },
  computed: {
    // in the first 15min of a talk, the link should still link to the previous talk's room, so that
    // people still have a chance to join it e.g. in case there was no break between the talks.
    // this only works if there are no talks shorter than 15min, otherwise it needs to be changed
    talkDiscussedInVideoChat() {
      if (!this.talks) return null;
      const pastAndPresentTalks = this.talks.filter(
        (talk) => talk && addMinutes(talk.startTime, 15) < this.now
      );
      return pastAndPresentTalks[pastAndPresentTalks.length - 1];
    },
    slug() {
      return this.talkDiscussedInVideoChat && this.talkDiscussedInVideoChat.slug
        ? this.talkDiscussedInVideoChat.slug
        : '';
    },
  },
  methods: {
    switchTrack(track) {
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

.interaction-buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
}

a.button.is-blue {
  background-color: $color-darkblue;
  font-weight: bold;
  transition: background-color 0.3s linear;
}
a.button.is-blue:hover,
a.button.is-blue:focus,
a.button.is-blue:active {
  background-color: $color-blue;
}
</style>
