<template lang="pug">
  div.container
    div.sub-contact
      p.title Contact Me
    div.contact-container
      div.contact
        p.title Contact Info
        div.icon
          img(src="./email.png")
          p rehellinen@foxmail.com

</template>

<script>
export default {
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .container
    display: flex
    flex-direction: column
    .sub-contact
      background-color: $theme-color
      height: 50px
      display: flex
      align-items: center
      padding: 0 10%
      .title
        color: $border-one
        font-size: $big-font-size
        letter-spacing: 1px
        font-weight: bold
    .contact-container
      width: 100%
      background-color: #f3f3f3
      .contact
        display: flex
        flex-direction: column
        align-items: center
        height: 80px
        margin: 30px 0
        .title
          color: $main-font-color
          font-size: $biggest-font-size
          font-weight: bold
          margin-bottom: 10px
          margin-left: 0
        p
          color: $minor-font-color
          font-size: $small-font-size
          margin-left: 10px
        .icon
          display: flex
          align-items: center
          margin-top: 5px
          img
            height: 25px
            width: 25px

  .de
</style>
