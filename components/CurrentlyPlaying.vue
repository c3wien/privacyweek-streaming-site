<template>
  <div>
    <div
      v-if="talkInProgress && currentTalk && currentTalk.title"
      class="content"
    >
      <TalkInfo v-bind="currentTalk" />
    </div>
    <div v-else class="content">
      <h2 class="title is-3 is-font-weight-bold mt-3">
        <span v-if="eventHasntStartedYet">{{
          $t('currentlyPlaying.notStarted')
        }}</span>
        <span v-else-if="eventHasEnded">{{
          $t('currentlyPlaying.hasEnded')
        }}</span>
        <span v-else>{{ $t('currentlyPlaying.onBreak.title') }}</span>
      </h2>
    </div>
    <NextUp v-if="upcomingTalk" v-bind="upcomingTalk" />

    <div v-if="isWorkshopNow">
      <h2 id="workshops" class="title is-3 is-font-weight-bold pt-5">
        {{ $t('currentlyPlaying.currentWorkshops') }}
      </h2>
      <hr />
      <div v-for="workshop in currentWorkshops" :key="workshop.id">
        <Workshop v-bind="workshop"></Workshop>
      </div>
    </div>
  </div>
</template>

<script>
import Workshop from './Workshop';

export default {
  components: { Workshop },
  props: {
    talks: Array,
    workshops: Array,
    now: Date,
    presentAndFutureTalks: {
      type: Array,
      required: true,
    },
    eventHasntStartedYet: Boolean,
    eventHasEnded: Boolean,
    eventIsLive: Boolean,
    eventHasBreak: Boolean,
    currentTalk: {
      type: Object,
      required: false,
      default: null,
    },
    currentWorkshops: {
      type: Array,
      required: true,
    },
    isWorkshopNow: Boolean,
    talkInProgress: Boolean,
    upcomingTalk: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: flex-end;
}
</style>
