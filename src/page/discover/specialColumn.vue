<template>
  <div id="specialColumn-view" class="plus-screen-view">
    <wxheader :isToggle="true"></wxheader>
    <img v-if=" type === 'talkAbout'" src="../../assets/images/phlc-puyou.png"/>
    <img v-if=" type === 'netLoan'" src="../../assets/images/phlc-wangdai.png"/>
    <img v-if=" type === 'bossToSay'" src="../../assets/images/phlc-lishuwen.png"/>
    <div class="plus-screen-content">
      <div class="mescroll" id="myMescroll">
        <div class="plus-screen-scroll" id="specialColumn-scroll">
          <router-link tag="dl" :to="{path: '/daodaoDetail', query:{id: item.id, title: title}}" v-for="item in data" v-bind:key="item.id">
            <dt><p>{{ item.total }}</p>
            <span>{{ timeDifference(item.createTime) }}</span>
            </dt>
            <dd><img :src="imgHost + item.filePath" :onerror="errorImg"/></dd>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default{
  data () {
    return {
      type: this.$route.query.type,
      title: this.$route.query.title,
      isDown: false,
      errorImg: 'this.src="' + require('../../assets/images/img-default.png') + '"',
      icon: require('../../assets/images/request-convert.png'),
      data: []
    }
  },
  components: {
    wxheader
  },
  created () {
    document.title = this.$route.query.title
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('myMescroll', {
        down: {
          callback: this.$_downCallback
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          auto: false,
          noMoreSize: 1,
          empty: {
            warpId: 'specialColumn-scroll',
            icon: this.icon,
            tip: '暂无更多数据',
            btntext: '',
            btnClick: null,
            supportTap: false
          }
        }
      })
    },
    $_downCallback () {
      this.isDown = true
      this.mescroll.resetUpScroll()
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/found/v2/getDiscoveryArticleListByField',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          field: this.type
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (this.isDown) {
            this.data = []
            this.isDown = false
            this.mescroll.endSuccess()
          }
          this.data = this.data.concat(res.data.data.talkAboutList.list)
          this.mescroll.endBySize(this.data.length, res.data.data.talkAboutList.total)
        }
      })
    }
  }
}
</script>

<style lang="less">
#specialColumn-view{
  >img{
    width: 100%;
  }
  .plus-screen-content{
    top: 2.84rem;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  dl {
    display: flex;
    padding: 0.5rem .4rem;;
    border-bottom: 1px solid #eee;
    dt {
      flex-grow: 1;
      padding-right: 0.4rem;
      width: 4.5rem;
      position: relative;
      p{
        font-size: 0.3rem;
        color: #222;
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span {
        color: #999;
        font-size: 0.24rem;
        position: absolute;
        left: 0;
        bottom: 0.1rem;
      }
    }
    dd {
      width: 2.4rem;
      height: 1.6rem;
      overflow: hidden;
      border-radius: 0.05rem;
      img{
        width: 100%;
      }
    }
  }
}
</style>
