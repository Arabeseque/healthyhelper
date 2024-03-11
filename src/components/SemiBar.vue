<script setup lang="ts">
// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
import ProgressBar from 'progressbar.js'
import { SVG } from '@svgdotjs/svg.js'

const pointsProgress = ref()

const sportsPoints = 0.3

let svgPath = ref<Element>()

let sports = new ProgressBar.Path(svgPath.value!, {
  easing: 'easeInOut',
  duration: 1000
})

sports.set(0)
sports.animate(sportsPoints)
</script>

<template>
  <div ref="pointsProgress" class="semicircle">
    <svg
      class="svgBar"
      width="100%"
      height="100%"
      viewBox="-5 -5 110 63"
      xmlns="http://www.w3.org/2000/svg">
      <path
        id="placeholder"
        d="M 50,50 m -47,0 a 47,47 0 1 1 94,0"
        stroke="#eeeeee"
        stroke-width="15"
        stroke-linecap="round"
        fill-opacity="0"></path>

      <path
        ref="svgPath"
        d="M 50,50 m -47,0 a 47,47 0 1 1 94,0"
        stroke="#113D6B"
        stroke-linecap="round"
        stroke-width="15"
        fill-opacity="0"></path>
    </svg>
  </div>
  <div>test</div>
</template>

<style>
.semicircle {
  position: relative;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.svgBar {
  height: 100%;
  max-width: 568px;
  width: 100%;
  display: block;
}
</style>
