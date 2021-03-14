<template>
 <div id="inviteFriends-view" class="plus-screen-view" ref="inviteFriends">
   <activityBack :src="backIcon"></activityBack>
   <div class="plus-screen-content mescroll">
     <div class="plus-screen-scroll">
       <div class="headImg"></div>
       <div class="userbox" v-show="isLogin">
         <div class="usermsg">
            <img src="" alt="" class="head-portrait">
            <div class="name-box">
              <span class="name"></span>
            </div>
          </div>
          <div class="userinvite-infor">
            <router-link tag="dl" :to="{path: 'inviteList', query:{type: '1'}}">
              <dt class="phlc-yxfont phlc-red-normal-color invite-amounts">0.00</dt>
              <dd class="getmoney">赚取的奖励(元)</dd>
            </router-link>
            <router-link tag="dl" :to="{path: 'inviteList', query:{type: '2'}}">
              <dt class="phlc-yxfont phlc-red-normal-color invite-totals">0</dt>
              <dd>邀请人数(个)</dd>
            </router-link>
          </div>
       </div>
       <div class="content-1" :class="isLogin === true ? '' : 'marginT'">
         <div class="cont-title">
           <span class="box">
              <i class="icon-l"></i>
              <span class="title-txt">1.有福同享</span>
              <i class="icon-r"></i>
            </span>
         </div>
         <div class="cont-txt">
           <p>邀请好友注册，好友可获得<span>688元</span>新人专享返现券；好友每使用一张返现券，邀请人可获得一张同等面值返现券，邀请人邀请一位好友最多获得<span>688元</span>返现券。</p>
         </div>
         <div class="cont-foot">
           <p>688元返现券包括18元、38元、78元、100元、166元、288元各一张。</p>
         </div>
         <div class="such" v-on:click="windowOpen('popup1Flag')">举个例子<i class="arrows"></i></div>
       </div>
       <div class="content-2">
         <div class="cont-title">
           <span class="box">
              <i class="icon-l"></i>
              <span class="title-txt">2.多多益善</span>
              <i class="icon-r"></i>
            </span>
         </div>
         <p class="cont-txt">在平台累积邀请有效好友达如下档位，邀请人可获得额外奖励。</p>
         <div class="cont-foot">
           <p>有效好友：被邀请用户累计出借直投项目≥10000元。</p>
           <p>档位介绍：满5人奖励50元返现券；满10人奖励100元返现券；满50人奖励200元返现券；满100人奖励500元返现券。</p>
         </div>
         <div class="such" v-on:click="windowOpen('popup2Flag')">举个例子<i class="arrows"></i></div>
       </div>
       <div class="content-3">
         <p>温馨提示：</p>
         <p>1、被邀请人注册时须使用邀请人提供的专属邀请链接，自行注册的邀请人将不能获得相关奖励。</p>
         <p>2、多多益善获得的返现券在活动结束后三个工作日内发放。</p>
         <p>3、以上限制的金额仅限于直投项目，不包括债权转让项目。</p>
       </div>
     </div>
   </div>
   <div class="invitefriends-footer">
      <div  v-on:click="share()" class="invite1">邀请好友理财</div>
      <div v-on:click="windowOpen('qrcodeFlag')" class="invite2">面对面邀请</div>
   </div>
   <div id="qrcode-window" v-show="qrcodeFlag">
     <p class="p3title">扫码注册领{{ amount }}元新人礼包</p>
     <div id="qrcodeCanvas" class="qrcode"></div>
     <p style="text-align: center;font-size: 16px;color: #333;margin-top:16px;">用微信扫描二维码领取</p>
     <img src="./images/close.png" alt="" class="closebtn" v-on:click="windowClose('qrcodeFlag')">
   </div>
   <div id="popup1-window" v-show="popup1Flag">
     <div class="phead1"></div>
     <div class="tipscontent">
        <p>1、你每天坚持分享邀请活动到朋友圈；</p>
        <p>2、每天有1人通过你分享的地址注册；</p>
        <p>3、Ta将获得688元新人礼包；</p>
        <p>4、在Ta们开通资金存管并选择卡券出借，分别使用了18元、38元、78元、100元、166元、288元各一张；</p>
        <p>5、你将获得18元、38元、78元、100元、166元、288元各一张，总计688元；</p>
      </div>
      <div class="knowbtnbox">
        <span class="knowbtn" v-on:click="windowClose('popup1Flag')">知道了</span>
      </div>
   </div>
   <div id="popup2-window" v-show="popup2Flag">
     <div class="phead2"></div>
     <div class="tipscontent">
        <p>1、你邀请了12位好友，有8位选择出借；</p>
        <p>2、每人累计出借均≥10000元；</p>
        <p>3、你将获得50元返现券1张；</p>
        <p>4、再有2位累计出借均满10000元，你可在获得100元返现券1张；</p>
        <p>5、依次类推，你可总共获得850元返现券。</p>
      </div>
      <div class="knowbtnbox">
        <span class="knowbtn" v-on:click="windowClose('popup2Flag')">知道了</span>
      </div>
   </div>
   <shareWindow></shareWindow>
 </div>
</template>

<script>
import activityBack from '@/components/activityBack'
import shareWindow from '@/components/shareWindow'
import Vue from 'vue'
import 'mescroll.js/mescroll.min.css'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      backIcon: require('../../assets/images/invite-friends-back.png'),
      isLogin: false,
      inviteCold: '',
      inviteUrl: '',
      qrcodeFlag: false,
      popup1Flag: false,
      popup2Flag: false,
      amount: ''
    }
  },
  activated () {
    this.$_muiPlus()
    this.$_init()
  },
  mounted () {
    this.$_muiPlus()
    this.$nextTick(this.$_init())
  },
  components: {
    activityBack,
    shareWindow
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        Vue.prototype.plus = plus
        this.updateSerivces()
        if (this.plus.os.name === 'Android') {
          $('.invitefriends-footer').css('bottom', (0.23 + plus.navigator.getStatusbarHeight() / 100) +'rem')
        } else {
          $('.invitefriends-footer').css('bottom', (0.18 + plus.navigator.getStatusbarHeight() / 100) +'rem')
        }
        mui.init({
          beforeback: () => {
            if (Vue.prototype.isMask) {
              this.$mask.hide()
              this.qrcodeFlag = false
              this.popup1Flag = false
              this.popup2Flag = false
              return false
            } else {
              if (location.href.indexOf('inviteFriends') !== -1) {
                // console.log(2)
                var view = this.plus.webview.currentWebview().id
                this.plus.webview.close(view)
              } else {
                // console.log(3)
                this.$router.back(-1)
                return false
              }
            }
          }
        })
      })
      /* eslint-disable */
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
      var params = {}
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/web-server/userInvite/v1/getUserInviteInfo',
        method: 'GET',
        params: params,
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
        console.log(res)
        if (res.data.data.code === 1) {
          this.getAmount().then((res) => {
            this.amount = res
          })
          this.inviteCode = res.data.data.inviteCode
          console.log(location.href)
          this.inviteUrl = location.href.split('content')[0] + 'content/perShare?inviteCode=' + res.data.data.inviteCode
          console.log(this.inviteUrl)
          // this.inviteUrl = res.data.data.inviteUrl
          this.shareConfig(this.inviteUrl)
          this.isLogin = true
          if (res.data.data.headPhoto) {
            $('.head-portrait').attr('src', res.data.data.headPhoto.indexOf('focus_image/') === -1 ? res.data.data.headPhoto : this.HOST + '/web-server/' + res.data.data.headPhoto)
          } else {
            $('.head-portrait').attr('src', '../../assets/images/default-avatar.png')
          }
          /* eslint-disable no-new */
          new QRCode('qrcodeCanvas', {
            width: $('#qrcode-window>.qrcode').width(),
            height: $('#qrcode-window>.qrcode').width(),
            text: this.inviteUrl
          })
          $('.name').text(res.data.data.userName)
          $('.invite-amounts').text(this.fmoney(res.data.data.inviteAmount, 2))
          $('.invite-totals').text(res.data.data.inviteTotal)
        } else if (res.data.data.code === 1111) {
          this.isLogin = false
        } else {
          this.$layer.toast(res.data.data.msg)
        }
      })
    },
    share () {
      if (this.isLogin) {
        /* eslint-disable */
        if (this.plus) {
        /* eslint-disable */
          this.shareConfig(this.inviteUrl)
          this.appShare(true)
        } else {
          $('#share-window').show()
        }
      } else {
        this.toLogin('/inviteFriends')
      }
    },
    shareConfig (inviteUrl) {
      console.log(inviteUrl)
      /* eslint-disable */
      if (this.plus) {
      /* eslint-disable */
        this.shareObj = {
          href: inviteUrl,
          // href: location.href.split('#')[0] + '#/perShare?inviteCold=' + this.inviteCold,
          title: '来普惠理财，让你的钱包鼓起来',
          content: '新网银行资金存管，注册领688元卡券礼包！',
          thumbs: ['https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'],
          type: 'web'
        }
      } else {
        this.wxShare({
          title: '来普惠理财，让你的钱包鼓起来',
          desc: '新网银行资金存管，注册领688元卡券礼包！',
          // url: location.href.split('#')[0] + '#/perShare?inviteCold=' + this.inviteCold,
          url: inviteUrl
        })
      }
    }
  }
}
</script>

<style lang="less">
#inviteFriends-view{
  .plus-screen-content{
    top: 0;
    background: #FFEFD9;
    .plus-screen-scroll{
      padding: 0;
    }
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
  .headImg{
    width: 100%;
    height: 5.84rem;
    background: url(./images/headImg.png) no-repeat;
    background-size: 100% 100%;
  }
  .userbox{
    width:6.86rem;
    height:3.4rem;
    background:rgba(255,255,255,1);
    box-shadow:0 .02rem .16rem 0 rgba(129,8,0,0.16);
    border-radius:.08rem;
    margin: 0 auto;
    margin-top: -1.2rem;
    .usermsg{
      width: 6.22rem;
      padding: .25rem 0;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
      .head-portrait{
        display: inline-block;
        width:.6rem;
        height: .6rem;
        border-radius: 50%;
        background-color: #eee;
      }
      .name-box{
        display: inline-block;
        height: .6rem;
        margin-left: .05rem;
        position: relative;
        .name{
          font-size: .3rem;
          position: absolute;
          bottom: .15rem;
        }
      }
    }
    .userinvite-infor {
      display: flex;
      justify-content: space-between;
      margin-top: 0.4rem;
      position: relative;
    }
    .userinvite-infor:after {
      content: "";
      display: block;
      width: 1px;
      height: 1rem;
      position: absolute;
      left: 50%;
      top: 0.1rem;
      background: #dcdcdc;
    }
    .userinvite-infor dl {
      padding-left: .6rem;
      width: 2.42rem;
      font-size: 0.36rem;
    }
    .userinvite-infor dl dt{
      font-size: .56rem;
    }
    .userinvite-infor dl dd {
      color: #464646;
      font-size: 0.28rem;
      position: relative;
      padding-top: 0.05rem;
    }
    .userinvite-infor dl dd:after {
      content: "";
      display: block;
      width: 0.14rem;
      height: 0.26rem;
      background: url(../../assets/images/phlc-icon-more.jpg) no-repeat;
      background-size: 100%;
      position: absolute;
      right: .35rem;
      bottom: 0.4rem;
    }
    .userinvite-infor dl .getmoney:after {
      content: "";
      display: block;
      width: 0.14rem;
      height: 0.26rem;
      background: url(../../assets/images/phlc-icon-more.jpg) no-repeat;
      background-size: 100%;
      position: absolute;
      right: .1rem;
      bottom: 0.4rem;
    }
  }
  .content-1{
    width:6.86rem;
    height:5.56rem;
    background:rgba(255,255,255,1);
    box-shadow:0 .02rem .16rem 0 rgba(129,8,0,0.16);
    border-radius:.08rem;
    margin: 0 auto;
    margin-top: .24rem;
    .cont-title{
      width: 6.12rem;
      height: 1.23rem;
      background: url(./images/bg1.png) no-repeat;
      background-size: 100% 100%;
      margin-left: .6rem;
      text-align: center;
      .box{
        display: inline-block;
        text-align: center;
        margin-left: -.3rem;
        padding-top: .5rem;
        .icon-l{
          display: inline-block;
          width: .94rem;
          height: .16rem;
          background:url(./images/icon-left.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon-r{
          display: inline-block;
          width: .94rem;
          height: .16rem;
          background:url(./images/icon-right.png) no-repeat;
          background-size: 100% 100%;
        }
        .title-txt{
          font-size:.36rem;
          font-weight: bold;
          font-style: italic;
          color:#222222;
          margin: 0 .2rem;
        }
      }
    }
    .cont-txt{
      width: 5.88rem;
      margin: 0 auto;
      margin-top: .2rem;
      p{
        font-size: .28rem;
        color: #333;
        line-height: 1.6;
        text-align: justify;
        span{
          color: #E6433C;
        }
      }
    }
    .cont-foot{
      width:5.90rem;
      height:1.24rem;
      background:rgba(255,250,245,1);
      margin: 0 auto;
      margin-top: .1rem;
      p{
        font-size: .26rem;
        color: #E07C3E;
        padding: .29rem 0 0 .25rem;
        line-height: 1.6;
      }
    }
  }
  .marginT{
    margin-top: -1.2rem!important;
  }
  .content-2{
    width:6.86rem;
    height:5.96rem;
    background:rgba(255,255,255,1);
    box-shadow:0 .02rem .16rem 0 rgba(129,8,0,0.16);
    border-radius:.08rem;
    margin: 0 auto;
    margin-top: .24rem;
    .cont-title{
      width: 6.12rem;
      height: 1.23rem;
      background: url(./images/bg2.png) no-repeat;
      background-size: 100% 100%;
      margin-left: .6rem;
      text-align: center;
      .box{
        display: inline-block;
        text-align: center;
        margin-left: -.3rem;
        padding-top: .5rem;
        .icon-l{
          display: inline-block;
          width: .94rem;
          height: .16rem;
          background:url(./images/icon-left.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon-r{
          display: inline-block;
          width: .94rem;
          height: .16rem;
          background:url(./images/icon-right.png) no-repeat;
          background-size: 100% 100%;
        }
        .title-txt{
          font-size:.36rem;
          font-weight: bold;
          font-style: italic;
          color:#222222;
          margin: 0 .2rem;
        }
      }
    }
    .cont-txt{
      width: 5.88rem;
      margin: 0 auto;
      font-size: .28rem;
      color: #333;
      margin-top: .2rem;
      margin-bottom: .3rem;
    }
    .cont-foot{
      width:5.90rem;
      height:2.48rem;
      background:rgba(255,250,245,1);
      margin: 0 auto;
      p{
        padding:0.2rem .26rem 0 .24rem;
        font-size: .26rem;
        color: #E07C3E;
        text-align: justify;
      }
    }
  }
  .content-3{
    width: 6.52rem;
    margin:0 auto;
    margin-top: .61rem;
    margin-bottom: 1.62rem;
    p{
      font-size: .26rem;
      color: #E18851;
      text-align: justify;
    }
  }
  .such{
    text-align: center;
    font-size:.26rem;
    font-weight:400;
    color:rgba(34,34,34,1);
    margin-top:.3rem;
    .arrows:after {
      content: '';
      display: inline-block;
      width: .14rem;
      height: .14rem;
      border-top: .01rem solid #656565;
      border-right: .01rem solid #656565;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      margin-left: .05rem;
    }
  }
  .invitefriends-footer {
    width: 100%;
    height: .98rem;
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    box-sizing: border-box;
    left: 0;
    bottom: 0rem;
    display: flex;
    justify-content: space-between;
  }
  .invitefriends-footer div {
    width: 3.75rem;
    height: 0.98rem;
    text-align: center;
    line-height: 0.98rem;
    color: #fff;
    font-size: 0.32rem;
  }
  .invitefriends-footer .invite1{
    background: #464646;
  }
  .invitefriends-footer .invite2{
    background:linear-gradient(90deg,rgba(255,105,83,1),rgba(255,65,62,1));
  }
  #popup1-window{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width:6.22rem;
    height:7.42rem;
    background:rgba(255,255,255,1);
    border-radius:.08rem;
    .phead1{
      width: 6.22rem;
      height: 2.12rem;
      background:url(./images/popup1.png) no-repeat;
      background-size: 100% 100%;
      margin-top:-.4rem;
    }
  }
  .tipscontent{
    width: 5.25rem;
    margin: 0 auto;
    margin-top: .4rem;
    p{
      font-size: .26rem;
      color: #333333;
      margin-bottom: .1rem;
      line-height: 1.6;
    }
  }
  .knowbtnbox{
    text-align: center;
    margin-top: .3rem;
  }
  .knowbtn{
    display: inline-block;
    width:5.26rem;
    height:.80rem;
    background:linear-gradient(90deg,rgba(255,105,83,1),rgba(255,65,62,1));
    border-radius:.06rem;
    text-align: center;
    color: #fff;
    line-height: .8rem;
    font-size: .32rem;
  }
  #popup2-window{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width:6.22rem;
    height:6.64rem;
    background:rgba(255,255,255,1);
    border-radius:.08rem;
    .phead2{
      width: 6.22rem;
      height: 2.12rem;
      background:url(./images/popup2.png) no-repeat;
      background-size: 100% 100%;
      margin-top:-.4rem;
    }
  }
  #qrcode-window{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width:5.9rem;
    height:6.92rem;
    background:url(./images/qrcodebg.png) no-repeat;
    background-size: 100% 100%;
    .p3title{
      text-align: center;
      font-size: .34rem;
      margin-top: .47rem;
    }
    .qrcode{
      width:3.60rem;
      height:3.60rem;
      margin: 0 auto;
      margin-top: 1.29rem;
    }
    .closebtn{
      width: .64rem;
      height: 1.28rem;
      margin: 0 auto;
      margin-top: .2rem;
    }
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
