# vue-music

> Vue.js 打造高级实战——音乐 App

## 项目树
```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── prod.server.js
├── src
│   ├── App.vue
│   ├── api
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── base
│   │   ├── confirm
│   │   │   └── confirm.vue
│   │   ├── listview
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue
│   │   ├── no-result
│   │   │   ├── no-result.vue
│   │   │   ├── no-result@2x.png
│   │   │   └── no-result@3x.png
│   │   ├── progress-bar
│   │   │   └── progress-bar.vue
│   │   ├── progress-circle
│   │   │   └── progress-circle.vue
│   │   ├── scroll
│   │   │   └── scroll.vue
│   │   ├── search-box
│   │   │   └── search-box.vue
│   │   ├── search-list
│   │   │   └── search-list.vue
│   │   ├── slider
│   │   │   └── slider.vue
│   │   ├── song-list
│   │   │   ├── first@2x.png
│   │   │   ├── first@3x.png
│   │   │   ├── second@2x.png
│   │   │   ├── second@3x.png
│   │   │   ├── song-list.vue
│   │   │   ├── third@2x.png
│   │   │   └── third@3x.png
│   │   ├── switches
│   │   │   └── switches.vue
│   │   └── top-tip
│   │       └── top-tip.vue
│   ├── common
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── image
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── cache.js
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── jsonp.js
│   │   │   ├── mixin.js
│   │   │   ├── singer.js
│   │   │   ├── song.js
│   │   │   └── util.js
│   │   └── stylus
│   │       ├── base.styl
│   │       ├── icon.styl
│   │       ├── index.styl
│   │       ├── mixin.styl
│   │       ├── reset.styl
│   │       └── variable.styl
│   ├── components
│   │   ├── add-song
│   │   │   └── add-song.vue
│   │   ├── disc
│   │   │   └── disc.vue
│   │   ├── m-header
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list
│   │   │   └── music-list.vue
│   │   ├── player
│   │   │   └── player.vue
│   │   ├── playlist
│   │   │   └── playlist.vue
│   │   ├── rank
│   │   │   └── rank.vue
│   │   ├── recommend
│   │   │   └── recommend.vue
│   │   ├── search
│   │   │   └── search.vue
│   │   ├── singer
│   │   │   └── singer.vue
│   │   ├── singer-detail
│   │   │   └── singer-detail.vue
│   │   ├── suggest
│   │   │   └── suggest.vue
│   │   ├── tab
│   │   │   └── tab.vue
│   │   ├── top-list
│   │   │   └── top-list.vue
│   │   └── user-center
│   │       └── user-center.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── store
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
└── static
    ├── 1.png
    ├── 2.png
    ├── 3.png
    ├── 4.png
    └── 5.png

```
## 内容提要(2018.08.04)
### 第一节 推荐页
1.1 插件说明.md
* babel-runtime---语法转译
* fastclick---解决移动端点击300毫秒延迟
  *`fastclick.attach(document.body)`
* babel-polyfill---es6API的转译（补丁）
1.2 webpack优化之alias
```
function resolve (dir) {
  return path.join(__dirname,..,dir)
}
config.reslove={
  extendtions:["js","vue","json"],
  alias:{
    "componets":resolve("src/components")
  }
}
```
1.3 jsonp方法封装（Promise化）
* 处理输入的参数：把对象转化为&key=value的形式
  * forin遍历对象时首先要判断对象的键所对应的值是否存在
  * 地址栏的value需要用encodeURIComponent方法进行处理
* jsonp方法
  * 需要判断url中是否已经有?
1.4 网站接口数据抓取
* url:Request URL 请求地址
* params:QueryString params(最后一个是参数)
  * 有一部分是可以提取的不变的参数
  * 另外一部分是可变参数
* 有些接口是需要验证referer和host的，只有它们一致的时候才能成功获取数据
  * 利用代理伪装成qq服务器去请求接口(利用webpack中的express创建的服务器创建一个接口，前端再去请求,把header设置为qq)
  * 前端不再使用jsonp请求而改用axios，不需要跨域
  * 后端接口如果增加一个签名即可限制我们对他们接口的请求
```
apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
```
1.5 hasClass和addClass的封装
* hasClass 用正则表达式
* addClass split(' ').push().join(' ')
1.6 轮播图的宽度没有设置上去
* 原因分析：测试发现slider中的mounted比recommend获取到数据先执行，因此打印出来的slider只有2个元素
* 只要在wrapper上面加上一个v-if判断就可以了(注意是recommends.length)
`<div v-if="recommends.length" class="slider-wrapper">`
1.7 轮播图组件（通用base文件夹内）
* 初始化轮播图
* 轮播图scrollEnd事件设置当前的轮播图索引值
* 轮播图自动播放设置(计算索引值然后执行goToPage())
* 轮播拖动后图片会瞬间变化（此时应该清除定时器重新设置）
* 改变设备后图片宽度不正常（resize时重新计算width）
* 优化方案
  * keep-alive包裹router-view能有效进行缓存不会每次切换路由都重新请求接口:
  `<keep-alive>
           <router-view></router-view>
         </keep-alive>`
  * 在组件销毁时清除定时器
  ` destroy() {
           clearTimeout(this.timer)
         }`
1.8 scroll组件
* 主要结构：`<div><slot></slot></div>`
  * 插槽内容在父组件recommend中写，方法在scroll中写
  * better-scroll的初始化与更新
    * scroll组件中mounted初始化，然而此时图片不一定加载完毕，data也不一定加载出来
    * 图片加载完毕后更新(@load=fn)
    * data变化后更新(watch)
* 遇到的问题:(better-scroll的方法无法添加到组件上面)---原因是methods少了一个大括号
1.9 项目备忘录
* 常用组件需要传哪些参数

### 第二节 歌手页
2.1 歌手页面数据处理
* 数据结构改造：从平行结构改造为我门需要的数组嵌套的结构
  * [{},{},{}]=>[{a:{items:[]}}]
  * 按照某一个字段来作为属性遍历
```
     let key = item.Findex
     if (!result[key]) {
       result[key] = {
         title: key,
         items: []
       }
     }
```
  * 把对象拆分为多个数组，然后再合并为一个数组
    * 对象是无序的，要想按照一定的顺序渲染数据就必须自己将其转化为数组
2.2 右侧滚动列表与左侧滚动列表的联动
* 滚动左侧右侧高亮部分跟随切换
* 滚动右侧时高亮切换，左侧也跟随滚动
  * 滚动右侧列表时，高度数组是空的----刷新就好
* 标题栏字母固定顶部并跟随切换
  * fixedTitle计算属性去解决
  * diff属性=固定顶部的标题与下一个栏目标题顶部的距离=listHeight的下限-滚动的高度(注意这个应该是在scrollY中计算)
    * 如果diff小于标题高度，那么顶部的标题就被顶上去而消失，实现一个过渡
    * 滑动到顶部以上时，固定标题隐藏，用v-show来执行
    
### 第三节 歌手详情页
3.1 子路由配置以及路由参数、页面切换动画
```
子路由可以直接加参数，然后上面的页面覆盖下面的页面,加上reansition就可以有动画了
{
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
}
```
3.2 Global Event Bus(全局事件总线)
* 创建一个event bus然后发射出去($emit),这样其他组件都可以使用
* 如果有大量的数据、状态需要在多个组件中修改使用，那么只能使用vuex

3.3 vuex的mutation-types
* 这个文件是干什么用的========规定mutations的变量名========
使用的时候改用自己需要的变量名(needName)来使用...mapMutations({needName:mutation-type})
* getters=====返回state处理后的数据(相当于computed)

3.4 music-list组件
* 上方的歌手图片与标题，相对定位
* 下方时歌曲列表，下方滚动时：
  * 向下滚动时，歌手图片以顶部为中心点放大
  * 向上滚动时，整个元素向上移动，直到顶部留下44的高度（一个标题高度），
需要根据scrollY来设置图片高度以及层级
    * 向上滚动逐渐高斯模糊，利用高度差计算模糊度
* 提取SongList公共组件（多个页面会用到）

### 第四节 播放器组件
4.1 state设置
* 多个页面会用到的共同状态
* 根据页面的状态需求设置变量（播放列表、顺序播放列表、播放模式（顺序、倒序、随机）、播放或暂停等等）
* 根据state设置相应的getters、mutations，需要同时触发多个mutations的时候使用actions
4.2 v-if和v-show能够触发动画
4.3 动画钩子
* 入场动画
  * @before-enter----beforeEnter(el){}
  * @enter-----------enter(el,done){ done() }必须使用done来结束
  * @afterEnter------afterEnter(el){}
* 出场动画
 * @before-leave----beforeLeave(el){}
 * @leave-----------leave(el,done){ done() }必须使用done来结束
 * @afterLeave------afterLeave(el){}
* 执行done的方法
 * `this.$refs.cdWrapper.addEventListener('transitionend', done)`
4.4 create-keyframe-animation插件用js创建keyframes动画
* 注册动画:animations.registerAnimation({options})
  * 选项说明
  * name:'move'(对应keyframes的动画名)
  * 具体动画参数(对应csskeyframes那一部分)
  ```
    {
      0: {
        transform: `translate3d(${x},${y},0) scale(${scale})`
      },
      60: {
        transform: 'translate3d(0,0,0) scale(1.1)'
      },
      100: {
        transform: 'translate3d(0,0,0) scale(1)'
      }
    }
    ```
  * `presets: { duration: 400, easing: 'linear'}`(对应animation中对动画的设置)
* 执行动画:animations.runAnimation(this.$refs.cdWrapper, 'move', done)
4.5 v-show和v-if
* v-if 条件渲染:直到条件满足时才渲染（有一个watch的过程）
* v-show 切换display
* 两者比较：
  * 整块组件建议使用v-if
  * 暂时性隐藏则使用v-show
4.6 改变播放模式
* 改变播放模式无非就是改变播放列表(playList)和播放完之后的状态
  * random:乱序播放列表----产生一个随机数，遍历歌曲列表，将随机数索引与当前歌曲交换
    * 注意要拷贝一份，否则会改变原歌曲列表
  * loop:播放完成之后直接归0重新播放
4.7 乱序情况下播放指定歌曲
4.8 javascript运算符
* +:可以将后面的转化为数值，同Number()
  * 例如时间--时间戳：+new Date()
* |0:取整
* !!:转化为布尔值
4.9 歌词获取
* 由于不能直接访问，所以只能通过后端代理的方式解决，同上
* axios请求本地后台接口，设置format为json（希望直接拿到json而不是jsonp的callback），
返回一个promise对象
* 歌词是歌曲的一部分，所以在Song类中获取歌词,在player中调用之后发现返回结果如下：<br>
`"MusicJsonCallback({我们想要的东西})"`
  * 这就需要在服务端进行数据的处理了,先正则匹配到对象然后再对歌词进行base64解码
* 歌词解析插件(lyricParser)借助scroll组件实现歌词滚动
  * new Lyric(lyric,callback)
  * callback({lineNum,txt})
4.10 cd与歌词切换
* currentShow:记录当前是cd还是歌词
* touchStart:记录初始位置
* touchMove:记录位移值（以下是注意点）
  * 第一次move时不执行，所以需要一个变量在start中初始化
  * Y值变化比X大也不执行
  * 根据currentShow判断歌词距离原位置left值：0||-window.innerWidth
  * 计算歌词的偏移值:小于0且大于负的一屏的宽度
  * 相应的transform和opacity的设置
* touchend:位移值超过10%时直接移动
  * 需要在move中计算并记录下来
4.11 歌曲切换与歌词联动
* 点击下一首或者上一首歌曲时，歌词没有从头开始
  * 切换后原歌词对象没有清除掉，导致多个定时器叠加
* 停止播放歌词不停止滚动
* 循环播放时点击下一首，歌词还在原来的位置
  * 歌词重置：this.currentLyric.seek(0)
* 拖动滑块，歌词也能滚动到对应位置
4.12 异常情况的优化
* 如果没有从接口获取到歌词-----清理数据
* 微信从后台切换到前台时歌词不能播放-----设置延时1000ms而不使用nextTick
4.13 mini-player占据了高度遮住了scroll的最后一部分内容
* 定义minxin（其实类似一个Vue组件，继承后覆盖其方法）----playListmixin
  * 使用mixin 组件中的属性mixins: [playlistMixin]
4.* 错误集合
* 从歌手页面进入歌曲播放页面报错：Cannot read property 'play' of undefined"
在nextTick中再次取值就不会是undefined了
* 连续点击下一页，会报错：需要当前歌曲加载完毕之后才允许点击下一页
<br>onReady变量来控制歌曲的加载 
* Computed property "disableCls" was assigned to but it has no setter.
<br>在方法中定义了同样的变量，注意计算属性不能在方法中修改
* 歌曲页面：Uncaught TypeError: Cannot read property 'scrollToElement' of undefined
* TypeError: Cannot read property '_c' of undefined
<br>router.js里面把component写成了components











