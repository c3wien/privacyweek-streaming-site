<template>
  <div>
    <NavBar />
    <section class="hero is-info is-medium is-bold">
      <div class="hero-body">
      </div>
    </section>
    <div class="container body-content">
      <div class="columns">
        <div class="column is-2">
          <Menu />
        </div>
        <div class="column">
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import '~assets/scss/main.scss';
@import '~assets/scss/instaAlbum.scss';
@import '~bulma/bulma';

@media screen and (max-width: $tablet - 1) {
  .column .columns {
    padding-right: 0 !important;
    margin-right: 0 !important;
  }
}

@media screen and (min-width: $tablet) {
  .body-content {
    padding: 1rem;
  }
}

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
}
</style>
