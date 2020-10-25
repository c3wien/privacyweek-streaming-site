<template>
  <div
    v-if="talkInProgress && currentTalk && currentTalk.title"
    class="content"
  >
    <TalkInfo v-bind="currentTalk" />
  </div>
  <div v-else>Not live</div>
</template>

<script>
import { isWithinInterval, addMinutes, addHours, addDays } from 'date-fns';

export default {
  data: function () {
    return {
      schedule: null,
      updateTalkInfoIntervalId: '',
      refetchScheduleIntervalId: '',
      now: null,
      talkInProgress: false,
      break: false,
      currentTalk: {
        title: '',
        subtitle: '',
        timeslot: '',
        speakers: [],
        abstract: '',
        description: '',
        pretalxLink: '',
      },
      upcomingTalk: {
        title: '',
        subtitle: '',
        timeslot: '',
        speakers: [],
        abstract: '',
        description: '',
        pretalxLink: '',
      },
    };
  },
  computed: {
    eventIsInProgress: function () {
      const eventBegin = new Date(schedule.conference.days[0].day_start);
      const eventEnd = new Date(
        schedule.conference.days[days.length - 1].day_start
      );
      return isWithinInterval(new Date(), {
        start: eventBegin,
        end: eventEnd,
      });
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
        this.updateInfo();
      });

    this.updateTalkInfoIntervalId = setInterval(() => {
      this.updateInfo();
    }, 10000);
    // todo increase this to 60 secs
  },
  beforeDestroy: function () {
    clearInterval(this.updateTalkInfoIntervalId);
  },
  methods: {
    updateInfo: function () {
      this.now = this.mockNow();
      this.findCurrentlyRunningTalk();
      console.log('info updated');
      console.log('now', this.now);
      console.log('talk', this.currentTalk);
    },
    mockNow: function () {
      // const now = new Date();
      // todo: remove this
      // mock the current date to be during pw
      let now = addDays(new Date(), 3);
      now = addHours(now, 20);
      now = addMinutes(now, 10);
      // return now;
      // return new Date(2020, 10, 27, 20, 10); // event not started/over ...?
      return new Date(2020, 9, 26, 18, 10);
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
    findCurrentlyRunningTalk: function () {
      if (!this.schedule) return;
      const presentAndFutureTalks = this.schedule.filter((talk) => {
        const endTime = this.calculateEndTime(talk.date, talk.duration);
        return endTime > this.now;
      });
      const closestTalk = presentAndFutureTalks[0];
      if (presentAndFutureTalks.length === 0) {
        // event is over
      } else if (
        presentAndFutureTalks.length === this.schedule.length &&
        closestTalk.date > this.now
      ) {
        // event hasnt started yet
      } else if (
        isWithinInterval(this.now, {
          start: closestTalk.date,
          end: this.calculateEndTime(closestTalk.date, closestTalk.duration),
        })
      ) {
        // closest talk is currently running
        this.currentTalk = closestTalk;
        this.talkInProgress = true;
        this.break = false;
        this.upcomingTalk = presentAndFutureTalks[1];
      } else {
        // we are on break and closest talk is upcoming
        this.currentTalk = {
          title: '',
          subtitle: '',
          date: null,
          duration: {
            hours: 0,
            minutes: 0,
          },
          speakers: [],
          abstract: '',
          description: '',
          pretalxLink: '',
        };
        this.talkInProgress = false;
        this.break = true;
        this.upcomingTalk = this.shapeTalkData(closestTalk);
      }
    },

    shapeTalkData: function (rawTalk) {
      return {
        title: rawTalk.title || '',
        subtitle: rawTalk.subtitle || '',
        date: rawTalk.date ? new Date(rawTalk.date) : null,
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
    },

    prepareSchedule: function (schedule) {
      const talksByDay = schedule.conference.days.map(
        (day) => day.rooms['Lecture Hall 1']
      );
      const flatSchedule = [].concat(...talksByDay);
      const talks = flatSchedule.map(talk => (this.shapeTalkData(talk)));
      talks.sort(function (a, b) {
        return a.date - b.date;
      });
      return talks;
    },
  },
};
</script>

