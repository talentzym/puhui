<template>
  <div id="invite-view" class="plus-screen-view">
		<div class="invite-back" v-on:click="back()">
      <img src="../../assets/images/invite-friends-back.png">
		</div>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <img v-show="!isLogin" src="../../assets/images/invite-friends-bg-noLogin.png" class="inviteFriendsBg"/>
        <img v-show="isLogin" src="../../assets/images/invite-friends-bg.png" class="inviteFriendsBg"/>
        <div class="user-box" v-show="isLogin">
          <div class="user-box-top">
            <div class="user-head-photo">
              <img src="" alt="" class="head-photo"/>
              <span></span>
            </div>
            <div class="user-invite-infor">
              <router-link tag="dl" :to="{path: 'inviteList', query:{type: '1'}}">
                <dt class="phlc-yxfont phlc-red-normal-color invite-amount">0.00</dt>
                <dd>赚取的奖励(元)</dd>
              </router-link>
              <router-link tag="dl" :to="{path: 'inviteList', query:{type: '2'}}">
                <dt class="phlc-yxfont invite-total invite-total">0</dt>
                <dd>邀请人数(个)</dd>
              </router-link>
            </div>
          </div>
          <div class="user-box-bottom">再邀请X人，可多获得XX元红包哦~</div>
        </div>
      </div>
    </div>
    <div class="invite-friends-footer">
      <div v-on:click="windowOpen('qrcodeFlag')">面对面邀请</div>
      <div v-on:click="windowOpen('shareFlag')">分享邀请</div>
    </div>
    <div id="QRcode-window" v-show="qrcodeFlag">
      <p>扫码注册领{{ amount }}元新人礼包</p>
      <img src="../../assets/images/Invite-new-people.png" alt="" />
      <div id="qrcodeCanvas"></div>
      <div class="QRcode-close" v-on:click="windowClose('qrcodeFlag')"></div>
    </div>
    <div id="share-window" v-show="shareFlag" v-on:click="windowClose('shareFlag')">
      <img src="../../assets/images/rage.png"/>
      <p>请点击右上角将它发</p>
      <p>送给指定的朋友或者</p>
      <p>朋友圈</p>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import 'mescroll.js/mescroll.min.css'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
import QRCode from 'qrcodejs2'
export default{
  data () {
    return {
      isLogin: false,
      qrcodeFlag: false,
      shareFlag: false,
      amount: 0,
      wxConfig: {},
      logo: require('../../assets/images/logo.png')
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    windowOpen (flag) {
      if (this.isLogin) {
        this[flag] = true
        if (flag !== 'shareFlag') {
          this.$mask.show()
        }
      } else {
        this.toLogin('/invite')
      }
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    $_init () {
      this.axios({
        url: this.HOST + '/web-server/userInvite/v1/getUserInviteInfo',
        method: 'GET',
        params: {},
        data: {},
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
        }],
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }],
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.getAmount().then((res) => {
            this.amount = res
          })
          var inviteUrl = location.href.split('#/')[0] + '#/perShare' + '?inviteCode=' + res.data.data.inviteCode
          this.wxShare(inviteUrl)
          this.isLogin = true
          if (res.data.data.headPhoto) {
            $('.head-photo').attr('src', res.data.data.headPhoto.indexOf('focus_image/') === -1 ? res.data.data.headPhoto : this.imgHost + res.data.data.headPhoto)
          }
          $('.user-head-photo span').text('Hi，' + res.data.data.userName.slice(0, 3) + '***')
          $('.invite-amount').text(this.fmoney(res.data.data.inviteAmount, 2))
          $('.invite-total').text(res.data.data.inviteTotal)
          /* eslint-disable no-new */
          new QRCode('qrcodeCanvas', {
            width: $('#QRcode-window>img').width() * 0.48,
            height: $('#QRcode-window>img').width() * 0.48,
            text: inviteUrl
          })
          var str
          if (res.data.data.invite5000Total < 5) {
            str = '邀请' + (5 - res.data.data.invite5000Total) + '人，可获得50元红包哦~'
          } else if (res.data.data.inviteTotal < 10) {
            str = '再邀请' + (10 - res.data.data.invite5000Total) + '人，可多获得100元红包哦~'
          } else if (res.data.data.inviteTotal < 20) {
            str = '再邀请' + (20 - res.data.data.invite5000Total) + '人，可多获得200元红包哦~'
          } else {
            str = '确认过眼神，您就是合格的理财师！'
          }
          $('.user-box-bottom').text(str)
        } else if (res.data.data.code === 1111) {
          this.isLogin = false
        } else {
          this.$layer.toast(res.data.data.msg)
        }
      })
    },
    wxShare (url) {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/found/v1/shareWeiXin',
        method: 'post',
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          url: encodeURIComponent(location.href.split('#')[0])
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.wxConfig = res.data.data.data
          wx.config({
            debug: false,
            appId: this.wxConfig.appId,
            timestamp: this.wxConfig.timestamp,
            nonceStr: this.wxConfig.nonceStr,
            signature: this.wxConfig.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
            type: 'web'
          })
          wx.ready(function () {
            var shareData = {
              title: '来普惠理财，让你的钱包鼓起来',
              desc: '新网银行资金存管，注册领' + this.amount + '元卡券礼包！',
              link: url,
              imgUrl: 'https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'
            }
            wx.onMenuShareTimeline(shareData)
            wx.onMenuShareAppMessage(shareData)
          })
          wx.error(function (res) {
            console.log(JSON.stringify(res))
          })
        }
      })
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  }
}
</script>
<style lang="less">
#invite-view{
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .inviteFriendsBg{
    width: 100%;
  }
  .invite-back{
    position: absolute;
    left: .2rem;
    width: .88rem;
    height: .88rem;
    top: 0rem;
    z-index: 1000;
  }
  .invite-back img{
    width: 0.48rem;
    height:0.48rem;
    margin:0.2rem;
  }
  .invite-friends-content>div {
    position: relative;
  }
  .invite-friends-content>div>img {
    width: 100%
  }
  .invite-friends-footer {
    width: 100%;
    height: 1.4rem;
    padding: 0.25rem 0.2rem;
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    box-sizing: border-box;
    left: 0;
    bottom: 0rem;
    display: flex;
    justify-content: space-between;
  }
  .invite-friends-footer div {
    width: 3.43rem;
    height: 0.9rem;
    border-radius: 0.9rem;
    text-align: center;
    line-height: 0.9rem;
    color: #fff;
    font-size: 0.36rem;
    background: #6268fa;
  }
  .user-box {
    width: 6.7rem;
    height: 3.25rem;
    position: absolute;
    left: 0.4rem;
    top: 3.85rem;
  }
  .user-head-photo{
    position: relative;
  }
  .user-head-photo span{
    position: absolute;
    font-size: 0.28rem;
    left: 1.3rem;
    top: 0.4rem;
    color: #444;
  }
  .user-box-top {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.2rem 0.2rem 0 0;
    background: url(../../assets/images/invite-friends-icon.png) no-repeat 0.23rem 0.16rem;
    background-size: 0.16rem;
    background-color: #fff;
    padding: 0.1rem 0.5rem;
    box-sizing: border-box;
  }
  .user-box-bottom {
    width: 100%;
    height: 0.75rem;
    line-height: 0.75rem;
    background: #fdccca;
    color: #c53b35;
    padding-left: 0.5rem;
    font-size: 0.28rem;
    border-radius: 0 0 0.2rem 0.2rem;
    box-sizing: border-box;
  }
  .user-head-photo img {
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
  }
  .user-invite-infor {
    display: flex;
    justify-content: space-between;
    margin-top: 0.23rem;
    position: relative;
  }
  .user-invite-infor:after {
    content: "";
    display: block;
    width: 1px;
    height: 0.63rem;
    position: absolute;
    left: 50%;
    top: 0.1rem;
    background: #dcdcdc;
  }
  .user-invite-infor dl {
    width: 2.42rem;
    font-size: 0.36rem;
  }
  .user-invite-infor dl dd {
    color: #888;
    font-size: 0.28rem;
    position: relative;
    padding-top: 0.05rem;
  }
  .user-invite-infor dl dd:after {
    content: "";
    display: block;
    width: 0.14rem;
    height: 0.26rem;
    background: url(../../assets/images/phlc-icon-more.jpg) no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0;
    bottom: 0.08rem;
  }
  #QRcode-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    >p{
      font-size: 0.3rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 1.2rem;
      text-align: center;
    }
  }
  #QRcode-window>img {
    width: 6rem;
  }
  #qrcodeCanvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 2.88rem;
    height: 2.88rem;
  }
  .QRcode-close {
    width: 0.8rem;
    height: 0.8rem;
    background: url(../../assets/images/phlc-login-cha.png) no-repeat 0.24rem 0.24rem;
    background-color: #fff;
    border-radius: 50%;
    background-size: 0.32rem 0.32rem;
    position: absolute;
    left: 2.6rem;
    bottom: -1.6rem;
  }
  #share-window{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: .56rem;
    text-align: center;
    z-index: 1000;
    >img{
      display: inline-block;
      width: 2.3rem;
      margin-left: 5.2rem;
    }
  }
}
</style>
