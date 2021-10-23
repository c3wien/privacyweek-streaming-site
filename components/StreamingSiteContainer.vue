<template>
  <MainLayout :talks="schedule" :workshops="workshops" :now="now" />
</template>

<script>
import { addMinutes, addHours, addSeconds } from 'date-fns';

export default {
  data() {
    return {
      now: this.currentDate(),
      schedule: null,
      workshops: null,
      updateTalkInfoIntervalId: '',
      refetchScheduleIntervalId: '',
    };
  },
  async fetch() {
    let res = await fetch(this.$config.scheduleLocation);
    res = await res.json();
    this.schedule = this.createSortedListOfItemsInRoom(
      res.schedule,
      this.$config.talksRoomNameInPretalx
    );
    this.workshops = this.createSortedListOfItemsInRoom(
      res.schedule,
      this.$config.workshopsRoomNameInPretalx
    );

    this.now = this.currentDate();
  },
  mounted() {
    // force refresh talk info display every minute, so that we can switch to break and
    // next talk at the correct time. also make sure we have a schedule
    this.updateTalkInfoIntervalId = setInterval(() => {
      this.now = this.$config.isDateTimeMocked
        ? addSeconds(this.now, 60)
        : this.currentDate();
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
      if (this.$config.isDateTimeMocked === false) {
        return new Date();
      }
      return new Date(2021, 9, 30, 14, 80);
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
