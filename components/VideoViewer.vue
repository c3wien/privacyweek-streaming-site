<template>
  <div class="video-js-container">
    <video class="video-js vjs-big-play-centered"
      id="videojs-container"
      controls
      NOautoplay
      preload="auto"
      poster="/stream-images/stream_poster.jpg"
      data-setup="{}">
      <source src="/hls/orig/main_hd.m3u8" type="application/x-mpegURL" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a
        >
      </p>
    </video>
  </div>
</template>


<script>
import "video.js";
export default {}
</script>

<style lang="scss">
@import '~assets/scss/main.scss';
$big-play-button--line-height: 2.25em;
$big-play-button--width: 4.5em;
$primary-foreground-color: #fff;
$primary-background-color: $color-darkblue;
@import "video.js/src/css/video-js.scss";


.video-js-container {
    padding-top: 56.25%; /* 16:9 */
    width: 100%;
    position: relative;
}
.video-js-container .video-js {
    height: 100% !important;
    width: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
