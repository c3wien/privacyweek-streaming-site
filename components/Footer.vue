<template>
  <footer class="footer mt-6">
      <div class="container is-three-fifths is-offset-one-fifth has-text-grey">
          <div class="content">
            <div class="columns">
              <div class="column is-3">
                <p>
                  » <a href="https://c3w.at">{{ $t('footer.c3w') }}</a><br />
                  » {{ $t('footer.mastodon') }}: <a href="https://chaos.social/@c3wien">@c3wien@chaos.social</a><br />
                  » {{ $t('footer.twitter') }} <a href="https://twitter.com/C3Wien">@C3Wien</a><br />
                  {{ $t('footer.license1') }} <a href="https://creativecommons.org/licenses/by-nc/4.0//">CC BY NC 4.0</a> {{ $t('footer.license2') }}<br />
                </p>
              </div>
              <div class="column has-text-centered">
                <p>
                {{ $t('footer.c3wDescription1') }}<b>{{ $t('footer.c3wDescription2') }}</b>{{ $t('footer.c3wDescription3') }}<br />
                    <a href="https://privacyweek.at/datenschutzerklaerung/">{{ $t('footer.privacyPolicy') }}</a>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dot" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <a href="https://privacyweek.at/impressum/">{{ $t('footer.imprint') }}</a>
                </p>
              </div>
            </div>
          </div>
      </div>
  </footer>
</template>
