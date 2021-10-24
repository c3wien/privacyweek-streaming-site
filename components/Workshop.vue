<template>
  <div class="box next-up mb-5">
    <span v-if="timeslot" class="is-size-6 color-grey">{{ timeslot }}</span>
    <h2 v-if="title" class="title is-4 is-font-weight-bold my-3">
      <span>{{ title }}</span>
      <span v-if="subtitle">{{ subtitle }}</span>
    </h2>
    <div v-if="speakers && speakers.length > 0" class="mb-2">
      <span
        v-for="speaker in speakers"
        :key="speaker.id"
        class="is-size-6 speaker"
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
    <p class="workshop-links">
      <CommonLink :href="pretalxLink">{{
        $t('currentlyPlaying.pretalxWorkshopLink')
      }}</CommonLink>
      <CommonLinkThatLooksLikeButton
        :href="videoChatURL"
        opens-in-new-tab
      >
        {{ $t('currentlyPlaying.gotoWorkshop') }}
      </CommonLinkThatLooksLikeButton>
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

.next-up {
  box-shadow: none;
  border: 1px solid $color-blue;
}

.workshop-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
