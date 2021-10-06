<template>
    <div class="background-image"></div>
</template>

<style lang="scss">
@import '~assets/scss/main.scss';

.background-image::before {
    content: "";
  position: absolute;
  height: 400px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url(~assets/images/pw21-datenmeer.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: brightness(50%)
}
</style>