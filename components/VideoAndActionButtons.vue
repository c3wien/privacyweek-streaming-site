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
        <div class="field">
          <label for="audioTrackSelection" class="label">
            {{ $t('videoPlayer.selectTrack') }}</label
          >
          <div class="control has-icons-left">
            <span class="select">
              <select
                id="audioTrackSelection"
                v-model="selectedTrack"
                class="track-select"
              >
                <option value="original">
                  {{ $t('videoPlayer.original') }}
                </option>
                <option value="translation">
                  {{ $t('videoPlayer.translation') }}
                </option>
              </select>
            </span>
            <span class="icon is-left">
              <img
                src="~/assets/icons/fontawesome/language-solid.svg"
                class="ml-2"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="interaction-buttons">
        <CommonLinkThatLooksLikeButton
          href="https://privacyweek.at/fragen"
          opens-in-new-tab
          additional-classes="mr-1 interaction-button"
        >
          {{ $t('currentlyPlaying.askTheSpeaker') }}
        </CommonLinkThatLooksLikeButton>
        <CommonLinkThatLooksLikeButton
          v-if="talkDiscussedInVideoChat"
          :href="videoChatURL"
          additional-classes="interaction-button"
          opens-in-new-tab
          >{{
            $t('currentlyPlaying.talkToSpeaker')
          }}</CommonLinkThatLooksLikeButton
        >
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
      if (pastAndPresentTalks.length === 0) {
        return null;
      }
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

.control.has-icons-left .input,
.control.has-icons-left .select select.track-select {
  padding-left: 3em;
}
.button-bar {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

@media screen and (max-width: $tablet) {
  .video-track-selection {
    margin-bottom: 1rem;
  }
  .interaction-button {
    margin: 0.25rem;
  }
}

@media screen and (min-width: $tablet) {
  .button-bar {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: space-between;
  }

  .interaction-buttons {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
