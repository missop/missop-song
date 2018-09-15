<template>
  <scroll class="listview"
          :data="groupList"
          ref="listview"
          :probeType="probeType"
          :listenScroll="listenScroll"
          @scroll="scroll">
    <ul>
      <li
        v-for="group in groupList"
        class="list-group"
        ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item"
              @click="showDetail(item)">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(shortcut,index) in shortcutList" class="item"
            :data-index="index"
            :class="{'current':currentIndex==index}">
          {{shortcut}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!groupList.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {data} from 'common/js/dom'
  import Loading from 'base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    props: {
      groupList: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.groupList.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.groupList[this.currentIndex] ? this.groupList[this.currentIndex].title : ''
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.listHeight = []
    },
    methods: {
      refresh() {
        this.$refs.listview.refresh()
      },
      onShortcutTouchStart(e) {
        let _index = data(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.begin = _index
        this._scrollTo(_index)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let _index = parseInt(this.touch.begin) + delta
        this._scrollTo(_index)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        // index为null时直接退出
        if (!index && index !== 0) {
          return
        }
        // 划到上边界以外以及下边界
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      showDetail(group) {
        this.$emit('select', group)
      }
    },
    watch: {
      groupList() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 滚动到顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let topHeight = listHeight[i]
          let bottomHeight = listHeight[i + 1]
          if (-newY < bottomHeight && -newY >= topHeight) {
            this.currentIndex = i
            this.diff = bottomHeight + newY
            return
          }
        }
        // 滚动到了底部
        this.currentIndex = listHeight.length - 2
      },
      diff(newDiff) {
        let fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
