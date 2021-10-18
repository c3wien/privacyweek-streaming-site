<template>
  <div>
    <div class="flex-container">
      <span v-if="timeslot" class="is-size-6 color-grey">
        LIVE | {{ timeslot }}</span
      >
      <AskTheSpeaker />
    </div>
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
      <CommonLink :href="pretalxLink">{{
        $t('currentlyPlaying.pretalxLink')
      }}</CommonLink>
    </p>
    <p>
      <CommonLink :href="videoChatURL">{{
        $t('currentlyPlaying.videoChatLink')
      }}</CommonLink>
    </p>
  </div>
</template>

<script>
import { lightFormat } from 'date-fns';
import createSlugForVideoChat from '~/mixins/createSlugForVideoChat.js';

export default {
  mixins: [createSlugForVideoChat],
  props: {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    speakers: {
      type: Array, // [{ id, name}]
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pretalxLink: {
      type: String,
      required: true,
    },
  },
  computed: {
    timeslot() {
      const startDateTime = lightFormat(this.startTime, 'HH:mm');
      const endDateTime = lightFormat(this.endTime, 'HH:mm');
      return `${startDateTime} – ${endDateTime}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

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
