<template>
  <aside class="box">
    <!-- <img src="~/assets/images/Logo_480x64px.png" width="100%" alt="#PrivacyWeek"> -->
    <h3 class="title is-4">{{ $t('sidebar.title') }}</h3>
    <hr />

    <div class="block">
      <h4 class="is-size-5 mb-1 has-text-weight-bold">
        <CommonLink href="https://privacyweek.at">privacyweek.at</CommonLink>
      </h4>
      <p>{{ $t('sidebar.pwHome') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://fahrplan.privacyweek.at">{{
          $t('sidebar.scheduleLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.scheduleText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://privacyweek.at/pausengespraeche">{{
          $t('sidebar.bbbAfterTalkLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.bbbAfterTalkText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://privacyweek.at/coffee">{{
          $t('sidebar.coffeeLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.coffeeText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://privacyweek.at/feedback">{{
          $t('sidebar.feedbackLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.feedbackText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://streaming.media.ccc.de/pw20/">{{
          $t('sidebar.vocStreamLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.vocStreamText') }}</p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://streaming.media.ccc.de/pw20/relive">{{
          $t('sidebar.reliveLink')
        }}</CommonLink>
      </h4>
      <p>
        {{ $t('sidebar.reliveText') }}
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://projekte.c3w.at/pw20online_faq_publikum">{{
          $t('sidebar.qaLink')
        }}</CommonLink>
      </h4>
      <p>
        {{ $t('sidebar.qaText') }}
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">
        <CommonLink href="https://privacyweek.at/infodesk">{{
          $t('sidebar.infodeskLink')
        }}</CommonLink>
      </h4>
      <p>{{ $t('sidebar.infodeskText') }}</p>
    </div>
  </aside>
</template>
