<template>
  <!-- <img src="~/assets/images/Logo_480x64px.png" alt="#PrivacyWeek"> -->
  <!--   <p class="title is-4">{{ this.$config.EventName }}</p>
                  <p class="subtitle is-6">{{ this.$config.EventLiveStreamTitle }}</p>-->
  <div class="card">
    <!--       <div class="card-content">
          <div class="media">
              <div class="media-left">
                  <figure class="image is-48x48">
                       <img src="~/assets/icons/winkekatze.png" alt="winkekatze">
                  </figure>
              </div>
              <div class="media-content">
                  <h3 class="title is-4">Jetzt live</h3>
                <p class="subtitle is-6">lorem ipsum</p>
              </div>
          </div>
      </div> -->
    <div class="card-image">
      <VideoViewer />
    </div>
    <div class="card-content">
      <CurrentlyPlaying />
    </div>
    <div class="card-footer">
      <div class="columns is-mobile">
        <div class="column is-11">
          <div class="field">
            <div class="control">
              <input
                class="input is-medium"
                type="text"
                placeholder="Publikumsfrage stellen . . ."
              />
            </div>
          </div>
        </div>
        <div class="column has-text-centered is-1">
          <button class="button">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  <!-- <Colors  /> -->
  </div>
</template>

<script>
export default {
  target: 'static',
};
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
@import '~bulma/bulma';

@media screen and (min-width: $tablet) {
  .card {
    border-radius: 6px;
  }
}
</style>
