<template>
  <div class="columns is-desktop">
    <div :class="{column: true, 'is-9-widescreen': !isChatExpanded }">
      <div class="card-image">
        <VideoSwitcher />
      </div>
    </div>
    <div :class="{column: true, 'is-3-widescreen': !isChatExpanded }">
      <Chat
        v-on:expand-chat="isChatExpanded = true"
        v-on:shrink-chat="isChatExpanded = false"
        :isConsentAreaOpen="isChatExpanded"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isChatExpanded: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/main.scss';

  @include until-widescreen {
    .columns {
      display: block
    }
  }
</style>
