<template>
  <div>
    <BackgroundImage />
    <section class="hero">
      <div class="hero-body pb-2">
        <div class="container">
          <div class="page-title">
            <NuxtLink class="pw-link" to="/">
              <h1 class="title is-1 has-text-white">{{ $t('main.title') }}</h1>
              <h2 class="subtitle has-text-white">{{ $t('main.subTitle') }}</h2>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <div class="container body-content">
      <div class="language-switcher"><LanguageSwitcher /></div>
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    const locale = this.$i18n.locale;
    let localeIso = this.$i18n.locales.find((item) => item.code === locale);
    localeIso = localeIso && localeIso.iso ? localeIso.iso : 'de-AT';
    return {
      htmlAttrs: {
        lang: localeIso,
      },
    };
  },
};
</script>


<style lang="scss">
@import '~assets/scss/main.scss';

body {
  overflow-x: hidden;
}

.language-switcher {
  display: flex;
  flex-flow: row-reverse wrap;
}

.page-title {
  display: inline-block;
}

.pw-link:focus,
.pw-link:hover,
.pw-link:active {
  background-color: $color-almost-white;
}
.pw-link:focus {
  outline: 1px solid $color-turquoise;
}

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
