<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
      </div>
      <div class="slider-wrapper">
        <Slider>
          <a v-for="item in sliders" :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </Slider>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import getRecommend from '@/api/recommend'
  import {ERR_OK} from '@/api/config'
  import Slider from '@/base/slider/slider'

  export default {
    data() {
      return {
        sliders: {
          type: Array,
          required: true
        }
      }
    },
    created() {
      this.getdata()
    },
    methods: {
      getdata() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.slider
            console.log(this.sliders)
          } else {
            console.log('failure')
          }
        })
      }
    },
    components: {
      Slider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
