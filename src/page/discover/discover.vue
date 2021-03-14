<template>
	<div id="discover-view" class="plus-screen-view">
    <header class="page-header">发现</header>
    <div class="plus-screen-content">
      <div class="mescroll" id="mescroll">
        <div class="plus-screen-scroll">
          <swiper v-if="bannerList.length >= 1" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in bannerList" v-bind:key="item.id">
              <a href="javascript:void(0)" v-on:click="focusLink(item.focusLink)">
                <img :src="imgHost + item.imagePath"/>
              </a>
            </swiper-slide>
            <div class="swiper-pagination clearfix" slot ="pagination" v-bind:style="{width: 20 + (bannerList.length - 1) * 13 + 'px'}"></div>
          </swiper>
          <ul class="discover-classify">
            <router-link to="inviteFriends" tag="li">
              <img src="../../assets/images/discover-invite-friends.png" alt="" />
              <p>邀请好友</p>
            </router-link>
            <router-link to="signIn" tag="li">
              <img src="../../assets/images/discover-sign-in.png" alt="" />
              <p>签到</p>
              <span class="user-sign">未签到</span>
            </router-link>
            <li v-on:click="windowOpen('flag')">
              <img src="../../assets/images/discover-wait.png" alt="" />
              <p>敬请期待</p>
            </li>
          </ul>
          <div v-for="item in list" v-bind:key="item.id" class="daodao-box-content">
            <p class = "recommend-black"></p>
            <p class="recommend-topD clearfix">
              <span class="recommend-top-l fl"></span>
              <span class="recommend-top-r fl">{{ item.field }}</span>
              <router-link tag="span" :to="{ path: '/specialColumn', query: {type: item.fieldMark, title: item.field}}" class="recommend-top-r fr recommend-top-more">更多</router-link>
            </p>
            <router-link tag="dl" :to="{path: '/daodaoDetail', query:{id: cont.id, title: item.field}}" v-for="cont in item.data" v-bind:key="cont.id">
              <dt><p>{{ cont.total }}</p>
              <span>{{ timeDifference(cont.createTime) }}</span>
              </dt>
              <dd><img :src="imgHost + cont.filePath" :onerror="errorImg"/></dd>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="maskBox" v-show="flag">
      <div class="Img">
        <img src="../../assets/images/phlc-discover-no.png" />
        <p class="phlc-first-black-color">更多好玩实用活动，制作中...</p>
      </div>
      <div class="btn" v-on:click="windowClose('flag')">知道了</div>
    </div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'mescroll.js/mescroll.min.css'
import MeScroll from 'mescroll.js'
import $ from 'jquery'
export default {
  name: 'discover',
  data () {
    return {
      flag: false,
      errorImg: 'this.src="' + require('../../assets/images/img-default.png') + '"',
      bannerList: [],
      custUserId: null,
      swiperOption: {
        autoplay: {
          disableOnInteraction: false,
          delay: 30000
        },
        loop: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      list: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  activated () {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll()
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('mescroll', {
        down: {
          callback: this.$_downCallback,
          auto: true
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          auto: false,
          noMoreSize: 1,
          onScroll: function (mescroll, y, isUp) {
            if (y) {
              $('header').addClass('header-shadow')
            } else {
              $('header').removeClass('header-shadow')
            }
          }
        }
      })
    },
    $_downCallback () {
      this.axios({
        url: this.HOST + '/web-server/found/v1/getBannerList',
        method: 'GET',
        params: {
          sourceFlag: 'weixin'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.custUserId = res.data.data.custUserId
          this.bannerList = res.data.data.bannerList
        } else {
          this.custUserId = null
        }
        this.mescroll.endSuccess()
      }).catch((err) => {
        if (err) {
          this.custUserId = null
        }
      })
      this.axios({
        url: this.HOST + '/web-server/found/v1/getUsreSign',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1' && res.data.data.isUsreSign) {
          $('.user-sign').text(res.data.data.days > 1 ? '连续' + res.data.data.days + '天' : '已签到')
        } else {
          $('.user-sign').text('未签到')
        }
        this.mescroll.endSuccess()
      })
      this.axios({
        url: this.HOST + '/web-server/found/v2/getDiscoveryColumnList',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.list = []
          this.dealData(res.data.data.contFields)
        }
        this.mescroll.endSuccess()
      })
    },
    $_upCallback () {
      this.mescroll.endErr()
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    dealData (contFields) {
      for (let i in contFields) {
        this.axios({
          url: this.HOST + '/web-server/found/v2/getDiscoveryArticleListByField',
          method: 'GET',
          params: {
            page: 1,
            rows: 3,
            field: contFields[i].FIELDSIGN
          },
          data: {},
          timeout: this.axiosTimeout
        }).then((res) => {
          if (res.data.data.code === 1) {
            this.list.push({
              id: contFields[i].ID,
              field: contFields[i].NAME,
              fieldMark: contFields[i].FIELDSIGN,
              data: res.data.data.talkAboutList.list
            })
          }
        })
      }
    },
    focusLink (url) {
      if (url !== '#') {
        var isLogin = this.custUserId ? 1 : 0
        var userId = this.custUserId ? this.custUserId : 0
        window.open(url + '?isLogin=' + isLogin + '&userId=' + userId, '_blank')
      }
    }
  }
}
</script>

<style lang="less">
#discover-view{
  .page-header {
    width: 7.5rem;
    background-color: #ffffff;
    z-index: 100;
    position: fixed;
    top: 0;
    padding: 0.15rem .2rem 0 .4rem;
    height: .88rem;
    font-weight: bold;
    font-size: 0.42rem;
    box-sizing: border-box;
  }
  .plus-screen-content{
    bottom: 1rem;
    background: transparent;
    .plus-screen-scroll{
      padding: 0.4rem 0 0 0;
      background: #fff;
    }
  }
  .swiper-container {
    height: 100%;
  }
  .swiper-container .swiper-slide{
    padding: 0 0.4rem;
    box-sizing: border-box;
    a{
      width: 100%;
      height:100%;
    }
    img{
      height: 3.1rem;
      border-radius: .2rem;
      -webkit-border-radius: .2rem;
      -moz-border-radius: .2rem;
    }
  }
  .daodao-box-content dd img,
  .swiper-container img{
    width: 100%;
  }
  .discover-classify {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    margin: 0 0.4rem;
    padding-bottom:.5rem ;
    padding-top: .4rem;
    box-sizing: border-box;
    li {
      width: 2rem;
      padding: 0.27rem;
      position: relative;
      box-sizing: border-box;
      img {
        width: 0.82rem;
        margin: 0 auto;
      }
      p {
        margin-top: 0.15rem;
        font-size: 0.28rem;
        color: #444;
      }
      span{
        padding: 0.08rem 0.1rem;
        border: 1px solid #fff;
        border-radius: 0.3rem 0.3rem 0.3rem 0;
        background: #e6382c;
        text-align: center;
        font-size: 0.16rem;
        line-height: 0.16rem;
        color: #fff;
        position: absolute;
        top: 0.23rem;
        left: 0.96rem;
      }
    }
  }
  .daodao-box {
    width: 100%;
  }
  .daodao-box-title {
    font-size: 0.36rem;
    font-weight: bold;
    padding-left: 0.05rem;
  }
  .daodao-box-content dl {
    display: flex;
    padding: 0.5rem .4rem;;
    border-bottom: 1px solid #eee;
  }
  .daodao-box-content dt {
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
  .daodao-box-content dd {
    width: 2.4rem;
    height: 1.6rem;
    overflow: hidden;
    border-radius: 0.05rem;
  }
  .swiper-pagination{
    left: 50%;
    transform: translateX(-50%);
  }
  .swiper-pagination-bullet-active {
    width:12px !important;
    height:5px !important;
    opacity:1 !important;
    background:rgba(255,255,255,1);
    border-radius:2.5px;
    -webkit-border-radius:2.5px;
    -moz-border-radius:2.5px;
  }
  .swiper-pagination-bullet {
    width:5px;
    height:5px;
    background:rgba(255,255,255,1);
    opacity:0.3;
    border-radius:2.5px;
    -webkit-border-radius:2.5px;
    -moz-border-radius:2.5px;
    float: left;
  }
  .daodaojuzhen{
    display: inline-block;
    width: .08rem;
    height: .28rem;
    border-radius: .02rem;
    -webkit-border-radius:.02rem;
    -moz-border-radius:.02rem;
    background: #e6382c;
    margin-top: .15rem;
    margin-right: .1rem;
  }
  .phlc-card-voucher-nav{
    width:7.5rem;
    height: .94rem;
    background:rgba(255,255,255,1);
    font-size: .32rem;
    text-align: center;
    border-bottom: 1px solid #EEEEEE ;
  }
  .swiper-container1{
    margin: 0 .4rem;
  }
  .phlc-swiper-active1{
    color: #E6382C;
  }
  .position-relative{
    position: relative;
  }
  .swiperHeng{
    display: inline-block;
    width:.4rem;
    height:.06rem;
    border-radius: .03rem;
    -webkit-border-radius: .03rem;
    -moz-border-radius:.03rem;
    position: absolute;
    bottom: .1rem;
    left: 50%;
    margin-left: -.2rem;
    text-align: center;
  }
  .swiperHengRed{
    background:rgba(230,56,44,1);
  }
  .swiper-slide-txt{
    line-height: .94rem;
  }
  .daodao-box-content{
    width:7.5rem;
    overflow: hidden;
  }
  .swiper-wrapper3 .swiper-slide{
    min-height: 30px;
  }
  .recommend-topD {
    padding: 0 .4rem;
    line-height: .94rem;
    border-bottom: 1px solid #eeeeee;
    .recommend-top-l {
      width: .06rem;
      height: .28rem;
      border-radius: .06rem;
      -webkit-border-radius: .06rem;
      -moz-border-radius: .06rem;
      background-color: #E6382C;
      margin-top: .33rem;
      margin-right: .12rem;
    }
    .recommend-top-r {
      font-size: .32rem;
      color: #222222;
    }
    .recommend-top-more {
      font-size: .26rem;
      color: #888888;
    }
  }
  .maskBox{
    z-index: 1005;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    width: 6rem !important;
    height: 6.2rem !important;
    border-radius: .24rem;
    -webkit-border-radius: .24rem;
    -moz-border-radius: .24rem;
    font-size:.3rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
    line-height:44px;
    text-align: center;
    transform: translate(-50%, -50%);
    Img{
      width: 4rem;
      height: 2.18rem;
      margin: .96rem auto .52rem;
    }
    .btn{
      width:3.2rem !important;
      height:.8rem !important;
      border-radius: .4rem;
      -webkit-border-radius: .4rem;
      -moz-border-radius: .4rem;
      background:rgba(230,56,44,1);
      margin: 0 auto 0;
      font-size:.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:.8rem;
    }
  }
  #lightBack {
    display: none;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1001;
    -moz-opacity: 0.4;
    opacity: .40;
    filter: alpha(opacity=40);
  }
  .recommend-black{
    width: 7.5rem;
    height: .2rem;
    background:rgba(248,248,249,1);
  }
}
</style>
