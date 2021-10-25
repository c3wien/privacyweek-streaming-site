<template>
  <footer class="footer mt-6">
    <div class="container is-three-fifths is-offset-one-fifth">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h3 class="title is-5 mb-3">
              {{ $t('footer.accessibilityTitle') }}
            </h3>
            <i18n path="footer.accessibilityText" tag="p">
              <CommonLink href="mailto:accessibility@privacyweek.at"
                >accessibility@privacyweek.at
              </CommonLink>
              <CommonLink
                href="https://github.com/c3wien/privacyweek-streaming-site/issues"
                >{{ $t('footer.contributionsLink') }}
              </CommonLink>
            </i18n>
            <i18n path="footer.chatAccessibilityText" tag="p">
              <CommonLink
                :href="
                  $i18n.locale === 'en'
                    ? 'https://projekte.c3w.at/pw21online_faq_chat_eng'
                    : 'https://projekte.c3w.at/pw21online_faq_chat'
                "
                >{{ $t('footer.chatFAQLink') }}
              </CommonLink>
            </i18n>
            <h3 class="title is-5 mb-3">
              {{ $t('footer.contributionsTitle') }}
            </h3>
            <i18n path="footer.contributionsText" tag="p">
              <CommonLink
                href="https://github.com/c3wien/privacyweek-streaming-site/"
                >{{ $t('footer.contributionsLink') }}
              </CommonLink>
            </i18n>
            <h3 class="title is-5 mb-3">{{ $t('footer.aboutC3W') }}</h3>
            <p>
              {{ $t('footer.c3wDescription1')
              }}<b>{{ $t('footer.c3wDescription2') }}</b
              >{{ $t('footer.c3wDescription3') }}<br />
            </p>
          </div>
          <div class="column is-3">
            <h3 class="title is-5 mb-3">{{ $t('footer.socialsTitle') }}</h3>
            <p>
              »
              <CommonLink href="https://c3w.at">{{
                $t('footer.c3w')
              }}</CommonLink
              ><br />
              » {{ $t('footer.mastodon') }}:
              <CommonLink href="https://chaos.social/@c3wien"
                >@c3wien@chaos.social</CommonLink
              ><br />
              » {{ $t('footer.twitter') }}
              <CommonLink href="https://twitter.com/C3Wien">@C3Wien</CommonLink
              ><br />
            </p>
          </div>
        </div>
        <hr />
        <div class="my-4">
          {{ $t('footer.license1') }}
          <CommonLink href="https://creativecommons.org/licenses/by-nc/4.0//"
            >CC BY NC 4.0</CommonLink
          >
          {{ $t('footer.license2') }}<br />
        </div>

        <div class="link-bar my-5">
          <div class="mr-3">
            <CommonLink href="https://privacyweek.at/datenschutzerklaerung/">{{
              $t('footer.privacyPolicy')
            }}</CommonLink>
          </div>
          <div class="mr-3">
            <CommonLink href="https://privacyweek.at/impressum/">{{
              $t('footer.imprint')
            }}</CommonLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.link-bar {
  display: flex;
  flex-flow: row wrap;
}
</style>
