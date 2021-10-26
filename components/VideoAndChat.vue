<template>
  <div class="columns is-desktop">
    <div class="column is-9-widescreen">
      <div class="">
        <VideoAndActionButtons
          :talks="talks"
          :workshops="workshops"
          :now="now"
          :current-talk="currentTalk"
        />
      </div>
    </div>
    <div class="column is-3-widescreen">
      <Chat />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    talks: Array,
    workshops: Array,
    now: Date,
    currentTalk: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

@include until-widescreen {
  .columns {
    display: block;
  }
}
</style>
