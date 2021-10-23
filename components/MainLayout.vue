<template>
  <div>
    <VideoAndChat :talks="talks" :workshops="workshops" :now="now" />
    <div class="columns is-desktop">
      <div class="card-content column is-three-quarters-desktop">
        <div class="px-2">
          <CurrentlyPlaying :talks="talks" :workshops="workshops" :now="now" />
        </div>
      </div>
      <div class="column is-one-quarter-desktop">
        <Sidebar />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    talks: Array,
    workshops: Array,
    now: Date,
  },
};
</script>
