<template>
  <div
    v-if="talkInProgress && currentTalk && currentTalk.title"
    class="content"
  >
    <TalkInfo v-bind="currentTalk" />
  </div>
  <div v-else class="content">
    <h2 class="title is-3 is-font-weight-bold mt-3">
      <span v-if="eventHasntStartedYet">{{ $t('currentlyPlaying.notStarted') }}</span>
      <span v-else-if="eventHasEnded">{{ $t('currentlyPlaying.hasEnded') }}</span>
      <span v-else>{{ $t('currentlyPlaying.onBreak') }}</span>
    </h2>
  </div>
</template>

<script>
import {
  isWithinInterval,
  addMinutes,
  addHours,
  addDays,
  addSeconds,
} from 'date-fns';

export default {
  data: function () {
    return {
      mockNow: true, // needed for debugging only
      now: this.currentDate(),
      schedule: null,
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
        : {};
    },
    talkInProgress: function () {
      return !!this.currentTalk;
    },
  },
  created: function () {
    // todo: regularly refetch the schedule
    // todo: there are better lifecycle methods for doing this
    fetch('https://fahrplan.privacyweek.at/pw20/schedule/export/schedule.json')
      .then((response) => response.json())
      .then((data) => {
        this.schedule = this.prepareSchedule(data.schedule);
      })
      .then(() => {
        this.now = this.currentDate();
      });

    this.updateTalkInfoIntervalId = setInterval(() => {
      this.now = this.mockNow ? addSeconds(this.now, 10) : currentDate();
    }, 10000);
    // todo increase this to 60 secs
  },
  beforeDestroy: function () {
    clearInterval(this.updateTalkInfoIntervalId);
  },
  methods: {
    // helper function that returns mocked date
    // if mocking is enabled
    currentDate: function () {
      if (this.mockNow === false) {
        return new Date();
      }
      return new Date(2020, 9, 27, 18, 10);
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
        (day) => day.rooms['Lecture Hall 1']
      );
      const flatSchedule = [].concat(...talksByDay);
      const talks = flatSchedule.map((talk) => this.shapeTalkData(talk));
      talks.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return talks;
    },
  },
};
</script>

