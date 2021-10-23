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
import { addMinutes, addHours } from 'date-fns';
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
  methods: {
    // helper function that returns mocked date
    // if mocking is enabled
    currentDate() {
      if (this.$config.isDateTimeMocked === false) {
        return new Date();
      }
      return new Date(2021, 9, 30, 14, 70);
    },
    /**
     * duration in the format "HH:mm"
     * returns object { hours: number, minutes: number}
     */
    splitDuration(duration) {
      const split = duration.split(':');
      return {
        hours: split[0],
        minutes: split[1],
      };
    },

    /**
     * startDate - Date object
     * duration in the format {hours, minutes}
     * returns Date object
     */
    calculateEndTime(startDate, duration) {
      const endTime = addHours(startDate, duration.hours);
      return addMinutes(endTime, duration.minutes);
    },

    shapeTalkData(rawTalk) {
      if (!rawTalk) return;
      const talk = {
        id: rawTalk.id,
        slug: rawTalk.slug || '',
        title: rawTalk.title || '',
        subtitle: rawTalk.subtitle || '',
        startTime: rawTalk.date ? new Date(rawTalk.date) : null,
        duration: rawTalk.duration
          ? this.splitDuration(rawTalk.duration)
          : null,
        speakers: rawTalk.persons
          ? rawTalk.persons.map((person) => ({
              id: person.id || 0,
              name: person.public_name || '',
            }))
          : null,
        abstract: rawTalk.abstract || '',
        description: rawTalk.description || '',
        pretalxLink: rawTalk.url || '',
      };
      talk.endTime = this.calculateEndTime(talk.startTime, talk.duration);
      return talk;
    },

    createSortedListOfItemsInRoom(schedule, room) {
      const itemsByDay = schedule.conference.days
        .flatMap((day) => day.rooms[room])
        .filter((item) => item !== undefined);

      const itemsInRoom = itemsByDay.map((item) => this.shapeTalkData(item));
      itemsInRoom.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return itemsInRoom;
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
