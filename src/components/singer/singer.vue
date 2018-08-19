<template>
  <div class="singer">
    <listview :groupList="singers"
              @select="toDetail"></listview>
    <router-view/>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_ITEM_LEN = 10

  export default {
    data() {
      return {
        singers: []
      }
    },
    mounted() {
      setTimeout(() => {
        this._getSingerList()
      }, 20)
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this.normalizeSingerList(res.data.list)
          }
        })
      },
      normalizeSingerList: function (list) {
        let result = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          // 添加热门歌曲
          if (index < HOT_ITEM_LEN) {
            result.hot.items.push(
              new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              })
            )
          }
          // 添加以字母为属性的歌曲
          let key = item.Findex
          if (!result[key]) {
            result[key] = {
              title: key,
              items: []
            }
          }
          result[key].items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        })
        // 把对象转化为数组
        let hot = []
        let ret = []
        for (let key in result) {
          let val = result[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // ret按照字母排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret)
      },
      toDetail(item) {
        this.setSinger(item)
        this.$router.push(`/singer/${item.id}`)
      }
    },
    components: {
      listview
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
