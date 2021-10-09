<template>
  <div class="columns is-desktop">
    <div class="column is-9-widescreen" >
      <div class="card-image">
        <VideoSwitcher />
      </div>
    </div>
    <div class="column is-3-widescreen">
      <Chat />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

@include until-widescreen {
  .columns {
    display: block;
  }
}
</style>
