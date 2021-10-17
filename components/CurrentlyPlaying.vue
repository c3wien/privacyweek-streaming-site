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
      <h2 id="workshops" class="title is-3 is-font-weight-bold pt-5">
        {{ $t('currentlyPlaying.currentWorkshops') }}
      </h2>
      <hr />
      <div v-for="workshop in currentWorkshops" :key="workshop.id">
        <Workshop
          v-bind="workshop"
        ></Workshop>
      </div>
    </div>
  </div>
</template>

<script>
import { addMinutes, addHours, addSeconds } from 'date-fns';
import Workshop from './Workshop';

export default {
  components: { Workshop },
  data() {
    return {
      mockNow: true, // needed for debugging timing
      now: this.currentDate(),
      schedule: null,
      workshops: null,
      updateTalkInfoIntervalId: '',
      refetchScheduleIntervalId: '',
    };
  },
  async fetch() {
    let res = await fetch('/schedule.json');
    res = await res.json();
    this.schedule = this.prepareSchedule(res.schedule);
    this.workshops = this.prepareWorkshops(res.schedule);

    this.now = this.currentDate();

    // Update workshop button
    if (this.isWorkshopNow) {
      document.getElementById('workshopButton').classList.remove('is-hidden');
    } else {
      document.getElementById('workshopButton').classList.add('is-hidden');
    }
  },
  computed: {
    presentAndFutureTalks() {
      if (!this.schedule) return [];
      return this.schedule.filter((talk) => {
        return talk && talk.endTime > this.now;
      });
    },
    eventHasntStartedYet() {
      if (!this.schedule || !this.schedule[0]) return false;
      return this.schedule[0].startTime > this.now;
    },
    eventHasEnded() {
      if (!this.schedule || !this.schedule[this.schedule.length - 1])
        return false;
      const lastTalk = this.schedule[this.schedule.length - 1];
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

      // Update workshop button
      if (this.isWorkshopNow) {
        document.getElementById('workshopButton').classList.remove('is-hidden');
      } else {
        document.getElementById('workshopButton').classList.add('is-hidden');
      }
      if (!this.schedule && !this.$fetchState.pending) {
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
  beforeDestroy() {
    clearInterval(this.updateTalkInfoIntervalId);
    clearInterval(this.refetchScheduleIntervalId);
  },
  methods: {
    // helper function that returns mocked date
    // if mocking is enabled
    currentDate() {
      if (this.mockNow === false) {
        return new Date();
      }
      return new Date(2021, 9, 30, 15, 30);
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

    prepareSchedule(schedule) {
      const talksByDay = schedule.conference.days.map(
        (day) => day.rooms['Stream 1']
      );
      const flatSchedule = [].concat(...talksByDay);
      const talks = flatSchedule.map((talk) => this.shapeTalkData(talk));
      talks.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return talks;
    },
    prepareWorkshops(schedule) {
      const workshopsByDay = schedule.conference.days.map(
        (day) => day.rooms['Workshop 1']
      );
      const workshops2ByDay = schedule.conference.days.map(
        (day) => day.rooms['Workshop 2']
      );
      const flatWorkshopScheudle = []
        .concat(...workshopsByDay, ...workshops2ByDay)
        .filter(function (element) {
          return element !== undefined;
        });
      const workshops = flatWorkshopScheudle.map((talk) =>
        this.shapeTalkData(talk)
      );
      workshops.sort(function (a, b) {
        return a.startTime - b.startTime;
      });
      return workshops;
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
