<template>
  <transition name="slide">
    <music-list :bgImage="bgImage"
                :songs="songs"
                :title="title"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach(item => {
          let {musicData} = item
          if (musicData.songid && musicData.albumid) {
            // getSongDetail(musicData.songmid).then(res => {
            //   if (res.code === ERR_OK) {
            //     const svkey = res.data.items
            //     const songVkey = svkey[0].vkey
            //     const newSong = createSong(musicData, songVkey)
            //     ret.push(newSong)
            //   }
            // })
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    computed: {
      ...mapGetters(['singer']),
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
