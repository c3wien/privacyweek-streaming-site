<template>
  <div class="columns is-desktop">
    <div :class="{ column: true, 'is-9-widescreen': !isChatExpanded }">
      <div class="card-image">
        <VideoSwitcher />
      </div>
    </div>
    <div :class="{ column: true, 'is-3-widescreen': !isChatExpanded }">
      <Chat
        :is-consent-area-open="isChatExpanded"
        @expand-chat="isChatExpanded = true"
        @shrink-chat="isChatExpanded = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatExpanded: false,
    };
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
