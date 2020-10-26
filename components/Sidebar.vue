<template>
  <aside class="box">
    <!-- <img src="~/assets/images/Logo_480x64px.png" width="100%" alt="#PrivacyWeek"> -->
    <h3 class="title is-4">{{ $t('sidebar.title') }}</h3>
    <hr>

    <div class="block">
      <h4 class="is-size-5 mb-1 has-text-weight-bold">
        <a href="https://privacyweek.at">privacyweek.at</a>
      </h4>
      <p>{{ $t('sidebar.pwHome') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <a href="https://fahrplan.privacyweek.at">{{ $t('sidebar.scheduleLink') }}</a>
      </h4>
      <p>{{ $t('sidebar.scheduleText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <a href="https://streaming.media.ccc.de/pw20/">{{ $t('sidebar.vocStreamLink') }}</a>
      </h4>
      <p>{{ $t('sidebar.vocStreamText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <a href="https://streaming.media.ccc.de/pw20/relive">{{ $t('sidebar.reliveLink') }}</a>
      </h4>
      <p>
        {{ $t('sidebar.reliveText') }}
      </p>
    </div>
    <div class="block">
      <h4 class="title is-5 mb-1">
        <a href="https://projekte.c3w.at/pw20online_faq_publikum">{{ $t('sidebar.qaLink') }}</a>
      </h4>
      <p>
        {{ $t('sidebar.qaText') }}
      </p>
    </div>
  </aside>
</template>

<style lang="scss">
@import '~assets/scss/main.scss';
@import '~bulma/bulma';
</style>
