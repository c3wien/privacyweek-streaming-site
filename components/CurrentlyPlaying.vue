<template>
  <div v-if="currentTalk.title" class="content">
    <!-- test for i18n: -->
    <!--     <h2>{{ $t("break") }}</h2> -->
    <strong>{{ currentTalk.title }}</strong>
    <em>{{ currentTalk.subtitle }}</em>
    <br />by
    <strong>{{ currentTalk.persons[0].public_name }}</strong>
    <p>{{ currentTalk.abstract }}</p>
    <p>{{ currentTalk.description }}</p>
    <p><a v-bind:href="currentTalk.url">Link zum Pretalx</a></p>
  </div>
  <div v-else>Not live</div>
</template>

<script>
import { isWithinInterval, addMinutes, addHours, addDays } from 'date-fns';
// import schedule from "../schedule.json";

export default {
  data: function () {
    return {
      schedule: null,
      intervalId: '',
      currentTalk: null,
      now: null,
    };
  },
  created: function () {
    /** todo: instead of fetching directly read this from a local file that is
     * kept up-to-date by server
     */
    fetch('https://fahrplan.privacyweek.at/pw20/schedule/export/schedule.json')
      .then((response) => response.json())
      .then((data) => (this.schedule = data.schedule));
    this.updateInfo();
    this.intervalId = setInterval(() => {
      this.updateInfo();
    }, 10000);
  },
  beforeDestroy: function () {
    clearInterval(this.intervalId);
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
  methods: {
    updateInfo: function () {
      this.now = this.mockNow();
      this.currentTalk = this.findCurrentTalk();
      console.log('info updated');
      console.log('now', this.now);
      console.log('talk', this.currentTalk);
    },
    mockNow: function () {
      // const now = new Date();
      // todo: remove this
      // mock the current date to be during pw
      let now = addDays(new Date(), 5);
      now = addHours(now, 20);
      now = addMinutes(now, 10);
      return now;
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
     * duration in the format "HH:mm"
     * returns Date object
     */
    calculateEndTime: function (startDate, duration) {
      const parsedDuration = this.splitDuration(duration);
      let endTime = addHours(startDate, parsedDuration.hours);
      return addMinutes(endTime, parsedDuration.minutes);
    },
    findCurrentTalk: function () {
      if (!this.schedule) return 'not found';
      const days = this.schedule.conference.days;
      let talkFound = false;
      let talk;
      for (let day = 0; day < days.length; day++) {
        const talksOfTheDay = days[day].rooms['Lecture Hall 1'];
        const startFirstTalkOfTheDay =
          talksOfTheDay && talksOfTheDay[0]
            ? new Date(talksOfTheDay[0].date)
            : null;
        const endLastTalkOfTheDay =
          talksOfTheDay && talksOfTheDay[talksOfTheDay.length - 1]
            ? this.calculateEndTime(
                new Date(talksOfTheDay[talksOfTheDay.length - 1].date),
                talksOfTheDay[talksOfTheDay.length - 1].duration
              )
            : null;
        if (
          isWithinInterval(this.mockNow(), {
            start: startFirstTalkOfTheDay,
            end: endLastTalkOfTheDay,
          })
        ) {
          // we know we are on the right day and within the time where talks are held (except for breaks)
          // now we find the right talk, if we can't find it, it means it is break now
          for (
            let talkIndex = 0;
            talkIndex < talksOfTheDay.length;
            talkIndex++
          ) {
            const currentTalk = talksOfTheDay[talkIndex];
            if (
              isWithinInterval(this.mockNow(), {
                start: new Date(currentTalk.date),
                end: this.calculateEndTime(
                  new Date(currentTalk.date),
                  currentTalk.duration
                ),
              })
            ) {
              // we got the right talk
              console.log('talk found');
              return currentTalk;
            }
          }
          // we are on the right day, but didn't find a talk -> break?
          return 'on break';
        }
      }
      // we searched through all days and couldn't find the talk. event not in progress?
      return 'event over/not started yet';
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
</style>