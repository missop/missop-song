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
2.2 






