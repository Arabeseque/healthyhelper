<script setup lang="ts">
onLaunch(() => {
  uni.loadFontFace({
    family: 'Nanum',
    source:
      'url("https://font-1305224645.cos.ap-nanjing.myqcloud.com/NanumMyeongjo-Regular.ttf")',
    global: true
  }),
    // uni.loadFontFace({
    //   family: 'Smile',
    //   source:
    //     'url("https://font-1305224645.cos.ap-nanjing.myqcloud.com/SmileySans-Oblique.ttf")',
    //   global: true
    // }),
    uni.loadFontFace({
      family: 'NoteSans',
      source:
        'url("https://font-1305224645.cos.ap-nanjing.myqcloud.com/NotoSansSC-VariableFont_wght.ttf")',
      global: true
    })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
:root {
  font-family: 'Nanum', 'NoteSans';
}

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
