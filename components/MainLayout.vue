<template>
  <div>
    <WorkshopBanner
      v-if="isWorkshopNow || isAWorkshopUpcoming"
      :is-workshop-now="isWorkshopNow"
      :is-a-workshop-upcoming="isAWorkshopUpcoming"
      :current-workshops="currentWorkshops"
      :workshops-that-start-soon="workshopsThatStartSoon"
    />
    <VideoAndChat
      :talks="talks"
      :workshops="workshops"
      :now="now"
      :current-talk="currentTalk"
    />
    <div class="columns is-desktop">
      <div class="card-content column is-three-quarters-desktop">
        <div class="px-2">
          <CurrentlyPlaying
            :talks="talks"
            :workshops="workshops"
            :now="now"
            :present-and-future-talks="presentAndFutureTalks"
            :event-hasnt-started-yet="eventHasntStartedYet"
            :event-has-ended="eventHasEnded"
            :event-is-live="eventIsLive"
            :event-has-break="eventHasBreak"
            :current-talk="currentTalk"
            :current-workshops="currentWorkshops"
            :is-workshop-now="isWorkshopNow"
            :workshops-that-start-soon="workshopsThatStartSoon"
            :is-a-workshop-upcoming="isAWorkshopUpcoming"
            :talk-in-progress="talkInProgress"
            :upcoming-talk="upcomingTalk"
          />
        </div>
      </div>
      <div class="column is-one-quarter-desktop">
        <Sidebar />
      </div>
    </div>
  </div>
</template>
<script>
import addMinutes from 'date-fns/addMinutes';
export default {
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
      if (!this.talks || !this.talks[this.talks.length - 1]) return false;
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
        return talk.endTime > this.now && talk.startTime <= this.now;
      });
    },
    workshopsThatStartSoon() {
      if (!this.workshops) return [];
      return this.workshops.filter((workshop) => {
        return (
          workshop.startTime > this.now &&
          workshop.startTime < addMinutes(this.now, 30)
        );
      });
    },
    isWorkshopNow() {
      return this.currentWorkshops.length > 0;
    },
    isAWorkshopUpcoming() {
      return this.workshopsThatStartSoon.length > 0;
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
