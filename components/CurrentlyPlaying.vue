<template>
  <div>
    <div
      v-if="talkInProgress && currentTalk && currentTalk.title"
      class="content"
    >
      <TalkInfo v-bind="currentTalk" />
    </div>
    <div v-else class="content">
      <div class="flex-container">
        <AskTheSpeaker />
      </div>
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
      <h2 class="title is-3 is-font-weight-bold pt-5" id="workshops">
        {{$t('currentlyPlaying.currentWorkshops')}}
      </h2>
      <hr />
      <div v-for="workshop in currentWorkshops" :key="workshop.id">
        <Workshop v-bind="workshop" v-bind:bbbURL="getWorkshopBBBLink(workshop.id)"></Workshop>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addMinutes,
  addHours,
  addSeconds,
} from 'date-fns';
import Workshop from "./Workshop";

export default {
  components: {Workshop},
  data: function () {
    return {
      mockNow: false, // needed for debugging timing
      now: this.currentDate(),
      schedule: null,
      workshops: null,
      workshopMap: [],
      updateTalkInfoIntervalId: '',
      refetchScheduleIntervalId: '',
    };
  },
  computed: {
    presentAndFutureTalks: function () {
      if (!this.schedule) return [];
      return this.schedule.filter((talk) => {
        return talk.endTime > this.now;
      });
    },
    eventHasntStartedYet: function () {
      if (!this.schedule || !this.schedule[0]) return false;
      return this.schedule[0].startTime > this.now;
    },
    eventHasEnded: function () {
      if (!this.schedule || !this.schedule[this.schedule.length - 1])
        return false;
      const lastTalk = this.schedule[this.schedule.length - 1];
      return lastTalk.endTime < this.now;
    },
    eventIsLive: function () {
      return !this.eventHasntStartedYet && !this.eventHasEnded;
    },
    eventHasBreak: function () {
      return (
        this.eventIsLive &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[0] &&
        this.presentAndFutureTalks[0].startTime > this.now
      );
    },
    currentTalk: function () {
      return this.eventIsLive &&
        !this.eventHasBreak &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[0]
        ? this.presentAndFutureTalks[0]
        : null;
    },
    currentWorkshops: function () {
      if (!this.workshops) return [];
      return this.workshops.filter((talk) => {
        return talk.endTime > this.now && talk.startTime < this.now;
      });
    },
    isWorkshopNow: function () {
      return this.currentWorkshops.length > 0;
    },
    talkInProgress: function () {
      return !!this.currentTalk;
    },
    upcomingTalk: function () {
      if (
        this.eventIsLive &&
        this.talkInProgress &&
        this.presentAndFutureTalks &&
        this.presentAndFutureTalks[1]
      ) {
        return this.presentAndFutureTalks[1];
      } else if (
        this.eventIsLive &&
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
  mounted() {
    // force refresh talk info display every minute, so that we can switch to break and
    // next talk at the correct time. also make sure we have a schedule
    this.updateTalkInfoIntervalId = setInterval(() => {
      this.now = this.mockNow ? addSeconds(this.now, 60) : this.currentDate();
      if (!this.schedule && !$fetchState.pending) {
        this.$fetch();
      }
    }, 60000);
    // refetch schedule every 15 minute in case something changed
    this.refetchScheduleIntervalId = setInterval(() => {
      this.$fetch();
    }, 900000);

    // make initial fetch
    this.$fetch();
  },
  async fetch() {
    let res = await fetch(
      'https://stream.privacyweek.at/schedule.json'
    );
    res = await res.json();
    this.schedule = this.prepareSchedule(res.schedule);
    this.workshops = this.prepareWorkshops(res.schedule);

    res = await fetch(
      '/workshops.json'
    );
    this.workshopMap = await res.json();

    this.now = this.currentDate();

    if(this.isWorkshopNow) {
      document.getElementById('workshopButton').classList.remove('is-hidden');
    } else {
      document.getElementById('workshopButton').classList.add('is-hidden');
    }
  },
  beforeDestroy: function () {
    clearInterval(this.updateTalkInfoIntervalId);
    clearInterval(this.refetchScheduleIntervalId);
  },
  methods: {
    // helper function that returns mocked date
    // if mocking is enabled
    currentDate: function () {
      if (this.mockNow === false) {
        return new Date();
      }
      return new Date(2020, 9, 27, 18, 30);
    },
    /**
     * duration in the format "HH:mm"
     * returns object { hours: number, minutes: number}
     */
    splitDuration: function (duration) {
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
    calculateEndTime: function (startDate, duration) {
      let endTime = addHours(startDate, duration.hours);
      return addMinutes(endTime, duration.minutes);
    },

    shapeTalkData: function (rawTalk) {
      if (!rawTalk) return;
      const talk = {
        id: rawTalk.id,
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

    prepareSchedule: function (schedule) {
      const talksByDay = schedule.conference.days.map(
        (day) => day.rooms['Lecture Hall 1'] || day.rooms['Saal 1']
      );
      const flatSchedule = [].concat(...talksByDay);
      const talks = flatSchedule.map((talk) => this.shapeTalkData(talk));
      talks.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return talks;
    },
    prepareWorkshops: function (schedule) {
      const workshopsByDay = schedule.conference.days.map(
        (day) => day.rooms['Workshop'] || day.rooms['Workshopraum']
      );
      const workshops2ByDay = schedule.conference.days.map(
        (day) => day.rooms['Workshop 2'] || day.rooms['Workshopraum 2']
      );
      const flatWorkshopScheudle = [].concat(...workshopsByDay, ...workshops2ByDay).filter(function (element) {
        return element !== undefined;
      });
      const workshops = flatWorkshopScheudle.map((talk) => this.shapeTalkData(talk));
      workshops.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return workshops;
    },
    getWorkshopBBBLink: function (id) {
      return this.workshopMap[id] ? this.workshopMap[id] : "";
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
