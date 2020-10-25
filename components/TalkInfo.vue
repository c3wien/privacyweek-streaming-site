<template>
  <div>
    <span v-if="timeslot" class="is-size-6 color-grey">{{ timeslot }}</span>
    <h2 v-if="title" class="title is-3 is-font-weight-bold mt-3">
      <span>{{ title }}</span>
      <span v-if="subtitle">{{ subtitle }}</span>
    </h2>
    <div v-if="speakers && speakers.length > 0" class="mb-2">
      <div
        v-for="speaker in speakers"
        :key="speaker.id"
        class="is-size-5 speaker"
      >
        <span v-if="speaker.name">{{ speaker.name }}</span>
      </div>
    </div>
    <hr />
    <p v-if="abstract" class="block is-italic">
      {{ abstract }}
    </p>
    <p v-if="description" class="block">
      {{ description }}
    </p>
    <p v-if="timeslot">{{ timeslot }}</p>
    <p>
      <a v-bind:href="pretalxLink">{{ $t('currentlyPlaying.pretalxLink') }}</a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    date: Object,
    duration: Object, // { hours, minutes}
    speakers: Array, // [{ id, name}]
    abstract: String,
    description: String,
    pretalxLink: String,
  },
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
.color-grey {
  color: $color-darkgrey;
}
.speaker:not(:last-child)::after {
  content: ', ';
}
</style>