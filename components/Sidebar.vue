<template>
  <div>
    <aside class="box">
      <h3 class="title is-4">{{ $t('sidebar.resourceSection') }}</h3>
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
          <CommonLink href="https://projekte.c3w.at/pw21online_faq_publikum">{{
            $t('sidebar.qaLink')
          }}</CommonLink>
        </h4>
        <p>
          {{ $t('sidebar.qaText') }}
        </p>
      </div>
    </aside>

    <aside class="box">
      <h3 class="title is-4">{{ $t('sidebar.exploreSection') }}</h3>
      <hr />

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://privacyweek.at/art/">{{
            $t('sidebar.artLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.artText') }}</p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://world.privacyweek.at/">{{
            $t('sidebar.workAdventureLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.workAdventureText') }}</p>
      </div>
    </aside>

    <aside class="box">
      <h3 class="title is-4">{{ $t('sidebar.contactSection') }}</h3>
      <hr />

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://privacyweek.at/infodesk">{{
            $t('sidebar.infodeskLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.infodeskText') }}</p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://privacyweek.at/support/">{{
            $t('sidebar.donateLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.donateText') }}</p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://greentees.at/c3w-privacyweek/">{{
            $t('sidebar.merchLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.merchText') }}</p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://privacyweek.at/feedback">{{
            $t('sidebar.feedbackLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.feedbackText') }}</p>
      </div>
    </aside>

    <aside class="box">
      <h3 class="title is-4">
        {{ $t('sidebar.alternativesSection') }}
      </h3>
      <hr />

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://streaming.media.ccc.de/pw21/">{{
            $t('sidebar.vocStreamLink')
          }}</CommonLink>
        </h4>
        <p>{{ $t('sidebar.vocStreamText') }}</p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">
          <CommonLink href="https://streaming.media.ccc.de/pw21/relive">{{
            $t('sidebar.reliveLink')
          }}</CommonLink>
        </h4>
        <p>
          {{ $t('sidebar.reliveText') }}
        </p>
      </div>
    </aside>
  </div>
</template>
