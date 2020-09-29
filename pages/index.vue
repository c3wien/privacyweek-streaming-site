<template>
  <div class="card">
      <div class="header">
          <div class="media">
              <div class="media-left">
                  <figure class="image is-48x48">
                      <img src="~/assets/icons/winkekatze.png" alt="winkekatze">
                  </figure>
              </div>
              <div class="media-content">
                  <p class="title is-4">{{ this.$config.EventName }}</p>
                  <p class="subtitle is-6">{{ this.$config.EventLiveStreamTitle }}</p>
              </div>
          </div>
      </div>
      <div class="card-image">
        <VideoViewer />
      </div>
      <div class="card-content">
          <div class="level is-mobile">
              <div class="level-left">
                  <div class="level-item has-text-centered">
                      <a href="">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                      </a>
                  </div>
                  <div class="level-item has-text-centered">
                      <div>
                          <a href="">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="content">
              <p>
                  <strong>„Gegen dagegen ist dafür. Ein Vorschlag für eine schöne Welt für alle Menschen und was Hacker dazu beitragen können.“</strong><br /> by <strong>Christian Swertz</strong>
              </p>
Die Welt schöner zu machen ist nicht schwierig. Fünf Maßnahmen  genügen: <br />
<br />
1. Es wird kaum noch Kohle und Erdöl verbrannt.<br />
2. Es werden kaum noch chemische Stoffe in die Umwelt eingebracht.<br />
3. Die Grundversorgung aller Menschen mit materiellen Gütern ist sichergestellt.<br />
4. Alle Menschen haben gleichen Zugang zu Gesundheit, Bildung und Recht.<br />
5. Österreich ist ein Bundesstaat im Weltstaat.<br />
<br />
Die Umsetzung der Maßnahmen erfordert passende Systeme. Im Vortrag wird ein Vorschlag für Designprinzipien unterbreitet...
          </div>
      </div>
      <div class="card-footer">
          <div class="columns is-mobile">
              <div class="column is-11">
                  <div class="field">
                      <div class="control">
                          <input class="input is-medium" type="text" placeholder="Publikumsfrage stellen . . .">
                      </div>
                  </div>
              </div>
              <div class="column has-text-centered is-1">
                  <button class="button">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                      </svg>
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  target: 'static'
}
</script>

<style lang="scss">
</style>
