<template>
  <div>
    <div class="flex-container">
      <span v-if="timeslot" class="is-size-6 color-grey">
        LIVE | {{ timeslot }}</span
      >
      <AskTheSpeaker />
    </div>
<!--     <figure class="image is-48x48">
      <img src="~/assets/icons/winkekatze.png" alt="winkekatze" />
    </figure> -->
    <h2 v-if="title" class="title is-3 is-font-weight-bold mt-3">
      <span>{{ title }}</span>
      <span v-if="subtitle">{{ subtitle }}</span>
    </h2>
    <div v-if="speakers && speakers.length > 0" class="mb-2">
      <span
        v-for="speaker in speakers"
        :key="speaker.id"
        class="is-size-5 speaker"
      >
        <span v-if="speaker.name">{{ speaker.name }}</span>
      </span>
    </div>
    <hr />
    <p v-if="abstract" class="block is-italic">
      {{ abstract }}
    </p>
    <p v-if="description" class="block">
      {{ description }}
    </p>
    <p>
      <a v-bind:href="pretalxLink">{{ $t('currentlyPlaying.pretalxLink') }}</a>
    </p>
  </div>
</template>

<script>
import { lightFormat } from 'date-fns';
export default {
  props: {
    title: String,
    subtitle: String,
    startTime: Date,
    endTime: Date,
    speakers: Array, // [{ id, name}]
    abstract: String,
    description: String,
    pretalxLink: String,
  },
  computed: {
    timeslot: function () {
      const startDateTime = lightFormat(this.startTime, 'HH:mm');
      const endDateTime = lightFormat(this.endTime, 'HH:mm');

      return `${startDateTime} – ${endDateTime}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';
@import '~bulma/bulma';

.color-grey {
  color: $color-darkgrey;
}
.speaker:not(:last-child)::after {
  content: ', ';
}
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
