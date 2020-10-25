<template>
  <div>
    <div v-for="n in 10" class="color" />
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';
.color {
  width: 3rem;
  height: 3rem;
}
.color:nth-child(1) {
    background: $color-darkblue;
}
.color:nth-child(2) {
    background: $color-darkgrey;
}.color:nth-child(3) {
    background: $color-blue;
}.color:nth-child(4) {
    background: $color-yellow;
}.color:nth-child(5) {
    background: $color-lightgrey;
}.color:nth-child(6) {
    background: $color-violet;
}.color:nth-child(7) {
    background: $color-lightblue;
}
</style>