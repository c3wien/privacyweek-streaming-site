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
  },
  computed: {
    presentAndFutureTalks() {
      if (!this.talks) return [];
      return this.talks.filter((talk) => {
        return talk && talk.endTime > this.now;
      });
    },
    eventHasntStartedYet() {
      if (!this.talks || !this.talks[0]) return false;
      return this.talks[0].startTime > this.now;
    },
    eventHasEnded() {
      if (!this.talks || !this.talks[this.talks.length - 1])
        return false;
      const lastTalk = this.talks[this.talks.length - 1];
      return lastTalk.endTime < this.now;
    },
    eventIsLive() {
      return !this.eventHasntStartedYet && !this.eventHasEnded;
    },
    eventHasBreak() {
      return (
        this.eventIsLive &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[0] &&
        this.presentAndFutureTalks[0].startTime > this.now
      );
    },
    currentTalk() {
      return this.eventIsLive &&
        !this.eventHasBreak &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[0]
        ? this.presentAndFutureTalks[0]
        : null;
    },
    currentWorkshops() {
      if (!this.workshops) return [];
      return this.workshops.filter((talk) => {
        return talk.endTime > this.now && talk.startTime < this.now;
      });
    },
    isWorkshopNow() {
      return this.currentWorkshops.length > 0;
    },
    talkInProgress() {
      return !!this.currentTalk;
    },
    upcomingTalk() {
      if (
        this.eventIsLive &&
        this.talkInProgress &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[1]
      ) {
        return this.presentAndFutureTalks[1];
      } else if (
        !this.talkInProgress &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[0]
      ) {
        return this.presentAndFutureTalks[0];
      } else {
        return null;
      }
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
