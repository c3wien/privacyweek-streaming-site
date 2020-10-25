<template>
  <div>
    <BackgroundImage />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-white">{{ $t('main.title') }}</h1>
          <h2 class="subtitle has-text-white">{{ $t('main.subTitle') }}</h2>
        </div>
      </div>
    </section>
    <div class="container body-content">
      <div class="columns is-desktop">
        <div class="column is-three-quarters-desktop">
          <Nuxt />
        </div>
        <div class="column is-one-quarter-desktop">
          <Sidebar />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import '~assets/scss/main.scss';
@import '~bulma/bulma';

/* @media screen and (max-width: $tablet - 1) {
  .column .columns {
    padding-right: 0 !important;
    margin-right: 0 !important;
  }
}
*/

@media screen and (min-width: $tablet) and (max-width: $desktop) {
  .body-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
/*
.hero-body {
  display: none;
}

@media screen and (min-width: $desktop) {
  .body-content {
    margin-top: -250px !important;
    padding: 1rem;
    background: white;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
  .hero-body {
      display: inherit;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      background-image: url(~assets/images/Key_Visual_PA_Strasse_RGB_oB_oT_1920.jpg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      height: 300px;
  }
} */
</style>
