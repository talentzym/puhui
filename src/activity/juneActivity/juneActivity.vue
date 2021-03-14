<template>
 <div class="plus-screen-view" id="juneActivity-view">
   <activityBack :src="backIcon"></activityBack>
   <div class="mask" v-show="maskFalg"></div>
   <div class="plus-screen-content mescroll">
     <div class="plus-screen-scroll">
       <p class="activity-time">活动时间：<span class="specific-time">6月3-6月23</span></p>
       <div class="content-1">
         <p class="p1">六月，花开正艳，花香更浓。一树花开，邂逅她盈盈的笑语，十指相扣，与她共同演绎这一季的浪漫。</p>
         <p class="p2">普惠理财，情怀不老，为爱加分，与您共沐六月的雨，伴您共赏这最艳的花……六月的加息，我在等你，你在哪里~</p>
       </div>
       <div class="model content-2" style="margin-top:.6rem;">
         <p class="activity-title title1"><span class="phlc-yxfont" style="padding-right:0.1rem;">01</span>领加息券</p>
         <div class="body-main">
           <!-- 未登录状态 start -->
           <div class="noLogin" v-if="!isLogin">
              <div class="empty-status">
                <img :src="require('./images/empty_icon.png')" alt="">
                <p>暂无卡券可领取</p>
              </div>
              <div class="logout-status">
                <div class="login-btn" v-on:click="toLogin('/juneActivity')">登录查看</div>
                <ul class="model-record">
                    <li class="receive-record" v-on:click="windowOpen('ruleWindowFlag')">领券规则<i class="icon-right"></i></li>
                    <li class="receive-record" v-on:click="windowOpen('activityOneWindowFlag')">领券记录<i class="icon-right"></i></li>
                </ul>
              </div>
           </div>
           <!-- 已登录 start -->
           <div class="logined" v-if="isLogin">
             <div class="card-status">
                <!-- 无任何领取 -->
                <div class="empty-status" v-if="!hasActivityOneCard">
                  <div class="empty-img"></div>
                  <img :src="require('./images/empty_icon.png')" alt="">
                  <p>暂无卡券可领取</p>
                </div>
                <!-- 有领取 -->
                <div class="hasCard-status" v-if="hasActivityOneCard" style="margin-top:.86rem;">
                  <div class="card-top clearfix">
                    <span class="card-name phlc-yxfont fl"><em>{{ nominalValue }}‰</em>加息券</span>
                    <span class="due-time fr" v-if="isReceive">{{ new Date(dueTimebyActivityOne).format('yyyy.MM.dd') }} 到期</span>
                    <span class="receive-btn fr" v-on:click="getInfoByActivityOne()" v-if="!isReceive">领取</span>
                  </div>
                  <p class="card-bottom">出借0-50万元，期限0天起，有效期5天</p>
                </div>
                <ul class="model-record">
                    <li class="receive-record" v-on:click="windowOpen('ruleWindowFlag')">领券规则<i class="icon-right"></i></li>
                    <li class="receive-record" v-on:click="windowOpen('activityOneWindowFlag')">领券记录<i class="icon-right"></i></li>
                </ul>
             </div>
             <div class="cardmsg-foot" style="position: relative;">
               <div class="msg-box">
                 <p class="msg-text-1 marT-43 phlc-yxfont">账户总额：{{ fmoney(totalAmount, 2) }} 元</p>
                 <p class="msg-text-2 marT-15" v-if="totalAmount <= 3000000">充值<span class="has-Bold phlc-yxfont">{{ fmoney(rechargeAmount, 2) }}</span>元，可领<span class="has-red"><span class="has-Bold phlc-yxfont">{{ facevalue }}‰</span>加息券<span class="has-Bold phlc-yxfont">{{ nextGetNum }}</span>张</span>哦~</p>
                 <p class="msg-text-2 marT-15" v-if="totalAmount > 3000000">您已领取了所有奖励哦~</p>
               </div>
               <div class="btn-box" style="position: absolute;right: .2rem;">
                 <div class="s-btn" v-on:click="goRecharge()">充值</div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="model content-3">
         <p class="activity-title title2"><span class="phlc-yxfont" style="padding-right:0.1rem;">02</span>邀壕友,领加息</p>
         <div class="tips-text">活动期间每邀请一位好友注册投资满2000元，可领取一张1%加息券。多邀请多得哟~</div>
         <div class="body-main">
           <!-- 未登录状态 start -->
           <div class="noLogin" v-if="!isLogin">
              <div class="empty-status">
                <img :src="require('./images/empty_icon.png')" alt="">
                <p>暂无卡券可领取</p>
              </div>
              <div class="logout-status">
                <div class="login-btn" v-on:click="toLogin('/juneActivity')">立即邀请</div>
                <ul class="model2-record">
                    <li class="receive-record" v-on:click="windowOpen('activityTwoWindowFlag')">领券记录<i class="icon-right"></i></li>
                </ul>
              </div>
           </div>
           <!-- 已登录 start -->
           <div class="logined" v-if="isLogin">
              <div class="card-status">
                  <!-- 无任何领取 -->
                  <div class="empty-status" v-if="!hasActivityTwoCard">
                    <div class="empty-img"></div>
                    <img :src="require('./images/empty_icon.png')" alt="">
                    <p>暂无卡券可领取</p>
                  </div>
                  <!-- 有领取 -->
                  <div class="hasCard-status" v-if="hasActivityTwoCard" style="margin-top:.5rem;">
                      <div class="card-top clearfix">
                        <span class="card-name phlc-yxfont fl"><em>1%</em>加息券</span>
                        <span class="due-time fr" v-if="isReceiveTwo">{{ new Date(dueTimebyActivityTwo).format('yyyy.MM.dd') }} 到期</span>
                        <span class="receive-btn fr" v-if="!isReceiveTwo" v-on:click="getInfoByActivityTwo()">领取</span>
                      </div>
                      <p class="card-bottom phlc-yxfont">出借0-50万元，期限0天起，有效期5天</p>
                  </div>
                  <ul class="model2-record">
                      <li class="receive-record" v-on:click="windowOpen('activityTwoWindowFlag')">领券记录<i class="icon-right"></i></li>
                  </ul>
              </div>
              <div class="cardmsg-foot">
                <div class="msg-box">
                  <p class="msg-text-1 marT-43 phlc-yxfont">已邀请{{ countInviteUser }}位，{{ countInviteBidUser }}位出借满2000元</p>
                  <p class="msg-text-2 marT-15">再邀请
                    <span class="has-Bold phlc-yxfont">1 </span>位，可领
                    <span class="has-red"><span class="has-Bold phlc-yxfont">1%</span>加息券</span>哦~</p>
                </div>
                <div class="btn-box">
                  <div class="s-btn" v-on:click="share()">邀请</div>
                </div>
              </div>
           </div>
         </div>
       </div>
       <p class="foot-text">网贷有风险，出借需谨慎</p>
     </div>
   </div>
   <!-- 活动规则弹窗 -->
   <div class="window" id="recharge-window" v-if="ruleWindowFlag">
     <div class="window-header">
        <div class="window-title text-align-center">领券规则</div>
     </div>
     <div class="window-close-button" v-on:click="windowClose('ruleWindowFlag')">
       <img src="../mothersDay/images/close.png" alt="">
     </div>
     <div class="window-content">
        <div class="p-box">
          <p>1、活动期间，用户根据账户总额可领取相应卡券，每个档可领取5张，有效期5天，出借金额0-50万元(含)可使用；</p>
        </div>
        <div class="p-box" style="margin-bottom:1rem;">
          <p>2、一次可领取一张，领取的卡券失效或使用后可领取下一张。</p>
        </div>
        <div class="know-button" v-on:click="windowClose('ruleWindowFlag')">知道了</div>
     </div>
   </div>
   <!-- 活动二领券记录 -->
   <div class="window" v-if="activityTwoWindowFlag">
     <div class="window-header">
        <div class="window-title">邀壕友·领券记录·{{  voucherListbyActivityTwo.length ? voucherListbyActivityTwo.length : 0  }}张</div>
     </div>
     <div class="window-close-button" v-on:click="windowClose('activityTwoWindowFlag')">
       <img src="../mothersDay/images/close.png" alt="">
     </div>
     <div class="window-content">
        <div class="activityTwoList card-list marT-58 mescroll" v-if="voucherListbyActivityTwo.length">
          <div class="card-item" v-for="(item, index) in voucherListbyActivityTwo" v-bind:key="index">
              <span class="ticket">福利券</span>
              <span class="status-img" :class="item.useStatus === 0 ? '' : item.useStatus === 2 || item.useStatus === 3 ? 'used' : 'expired'"></span>
              <div class="card-top clearfix">
                <span class="card-name phlc-yxfont fl"><em>1%</em>加息券</span>
                <span class="get-time fr">{{ new Date(item.creatTime).format('yyyy.MM.dd HH:mm:ss') }} 获得</span>
              </div>
              <p class="card-bottom">出借0-50万元，期限0天起，有效期5天</p>
          </div>
          <p class="no-more">———— &nbsp;&nbsp;到底了，没有更多啦&nbsp;&nbsp; ————</p>
        </div>
        <div class="empty-status" v-if="!voucherListbyActivityTwo.length" style="margin-bottom:1.5rem;">
          <img :src="require('./images/empty_icon.png')" alt="">
          <p>暂无领券记录</p>
        </div>
        <div class="know-button" v-on:click="windowClose('activityTwoWindowFlag')">知道了</div>
     </div>
   </div>
   <!-- 活动一领券记录 -->
   <div class="window" v-if="activityOneWindowFlag">
     <div class="window-header">
        <div class="window-title">领券记录·{{ totalOne ? totalOne : 0 }}张</div>
        <div class="window-tips">每个档共可领取5张，达标后可按需领取~</div>
     </div>
     <div class="window-close-button" v-on:click="windowClose('activityOneWindowFlag')">
       <img src="../mothersDay/images/close.png" alt="">
     </div>
     <div class="window-content far">
        <ul class="activityOneList mescroll" v-if="voucherListbyActivityOne.length">
          <li class="card-list" v-for="(item, index) in voucherListbyActivityOne" :key="index">
            <span class="files">{{ item.files }}<i class="line-bottom"></i></span>
            <ol>
              <li class="card-item" v-for="(v, i) in item.list" :key="i">
                <span class="ticket">福利券</span>
                <span class="status-img" :class="v.useStatus === 0 ? '' : v.useStatus === 2 || v.useStatus === 3 ? 'used' : 'expired'"></span>
                <div class="card-top clearfix">
                  <span class="card-name phlc-yxfont fl"><em>{{ v.nominalValue }}‰</em>加息券</span>
                  <span class="get-time fr">{{ new Date(v.creatTime).format('yyyy.MM.dd HH:mm:ss') }} 获得</span>
                </div>
                <p class="card-bottom">出借0-50万元，期限0天起，有效期5天</p>
              </li>
            </ol>
          </li>
          <p class="no-more">———— &nbsp;&nbsp;到底了，没有更多啦&nbsp;&nbsp; ————</p>
        </ul>
        <div class="empty-status" v-if="!voucherListbyActivityOne.length" style="margin-bottom:1.5rem;">
          <img :src="require('./images/empty_icon.png')" alt="">
          <p>暂无领券记录</p>
        </div>
        <div class="know-button" v-on:click="windowClose('activityOneWindowFlag')">知道了</div>
     </div>
   </div>
   <!-- 充值提示窗口 -->
   <div class="tips-window" v-if="tipsWindowFlag">
     <p class="t-text" style="margin-bottom:.5rem;">受设备和技术的影响，平台活动是统一在WAP端开发，建议您关闭该活动页面，<span>前往“我的”页面进行充值</span>。</p>
     <p class="t-text">感谢您的谅解！</p>
     <div class="know-button" v-on:click="windowClose('tipsWindowFlag')">知道了</div>
   </div>
   <div class="mask-box" id="mask-box" v-if="aflag">
			<div class="mask-box-top clearfix">
				<span class="new-tip-top-left fl"><img src="../../assets/images/new-tip-top-left.png" class=""/></span>
				<span class="new-tip-top-center fl"></span>
				<span class="new-tip-top-right fr"><img src="../../assets/images/new-tip-top-right.png" class=""/></span>
			</div>
			<div class="mask-cont">
				<p class="mask-cont-tip">普惠理财携手新网银行</p>
				<p class="mask-cont-img"><img src="../../assets/images/new-tip-tip.png" /></p>
				<p class="mask-cont-b">2017.07.12已正式上线</p>
				<p class="mask-now-up phlc-red-normal phlc-cursor-pointer" id="now-up" @click="upgrade()">立即升级</p>
				<div class="mask-cha phlc-cursor-pointer" id="mask-close-layer" @click="windowClose('aflag')"><img src="../../assets/images/newtipcha.png" /></div>
			</div>
   </div>
   <shareWindow></shareWindow>
 </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import activityBack from '@/components/activityBack'
import shareWindow from '@/components/shareWindow'
import 'mescroll.js/mescroll.min.css'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      maskFalg: false,
      plus: undefined,
      inviteUrl: '', // 邀请链接
      windowflag: '',
      backIcon: require('./images/back.png'),
      isLogin: false,
      isReceive: false,
      isReceiveTwo: false,
      bindingState: 0, // 用户绑定情况
      dueTimebyActivityOne: 0,
      dueTimebyActivityTwo: 0,
      hasActivityOneCard: false,
      hasActivityTwoCard: false,
      ruleWindowFlag: false,
      activityOneWindowFlag: false,
      tipsWindowFlag: false,
      activityTwoWindowFlag: false,
      aflag: false,
      activityOneRuleId: '',
      activityTwoRuleId: '',
      totalOne: 0,
      totalTwo: 0,
      isNotUseVoucher: false,
      notUseVoucher: {},
      voucherListbyActivityOne: [], // 活动一领取记录
      voucherListbyActivityTwo: [], // 活动二领取记录
      facevalue: 0, // 下一档可领取面值
      rechargeAmount: 0, // 再充值金额
      gradeAmount: 0, // 档次金额
      countInviteUser: 0, // 邀请总人数
      countInviteBidUser: 0, // 邀请出借2000的总人数
      nominalValue: 0, // 卡券面值
      totalAmount: 0, // 账户总额
      canGetNum: 0, // 可获得卡券数量
      nextGetNum: 0, // 下一档可领取卡券数量
      canGetRuleId: 0, // 可获得卡券ruleId
      nextGetRuleId: 0
    }
  },
  activated () {
    this.$_muiPlus()
    this.$_init()
  },
  mounted () {
    this.$_muiPlus()
    this.$_init()
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.fun, false)
    }
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        this.plus = plus
        Vue.prototype.plus = plus
        this.updateSerivces()
        mui.init({
          beforeback: () => {
            if (this.maskFalg) {
              this.maskFalg = false
              this.ruleWindowFlag = false
              this.tipsWindowFlag = false
              this.activityOneWindowFlag = false
              this.activityTwoWindowFlag = false
              this.aflag = false
              return false
            } else {
              if (location.href.split('#')[1].indexOf('juneActivity') !== -1) {
                var view = this.plus.webview.currentWebview().id
                this.plus.webview.close(view)
              } else {
                this.$router.back(-1)
                return false
              }
            }
          }
        })
      })
      /* eslint-disable */
    },
    $_init () {
      this.getUserMsg()
      this.getCustUserPrompt()
      this.getUserInvitationMsg()
      this.getVoucherListActivityOne()
      this.getVoucherListActivityTwo()
    },
    fun(){
      this.windowClose(this.windowflag)
    },
    windowOpen (flag) {
      this.windowflag = flag
      $('body').css('overflow', 'hidden')
      if (this.isLogin) {
        this[flag] = true
        this.maskFalg = true
      } else {
        if (flag === 'ruleWindowFlag') {
          this[flag] = true
          this.maskFalg = true
        } else {
          this.toLogin('/juneActivity')
        }
      }
    },
    windowClose (flag) {
      $('body').css('overflow', 'auto')
      this[flag] = false
      this.maskFalg = false
    },
    /* 获取用户信息 */
    getUserMsg () {
      var params = {
        activityId: 'juneActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getJuneneInfoByActivityId',
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          this.isLogin = true
          this.totalAmount = res.data.data.data.totalAmount
          this.canGetNum = res.data.data.data.canGetNum
          this.nextGetNum = res.data.data.data.nextGetNum
          this.canGetRuleId = res.data.data.data.canGetRuleId
          this.nextGetRuleId = res.data.data.data.nextGetRuleId
          this.nominalValue = res.data.data.data.nominalValue
          if (this.canGetRuleId && this.canGetNum !== 0) {
            this.hasActivityOneCard = true
            this.isReceive = false
            if (res.data.data.data.notUseVoucher !== null) {
              this.isNotUseVoucher = true
              if (res.data.data.data.notUseVoucher.nominalValue !== res.data.data.data.nominalValue) {
                this.isReceive = false
                this.notUseVoucher = res.data.data.data.notUseVoucher
              } else {
                this.isReceive = true
                this.notUseVoucher = res.data.data.data.notUseVoucher
                this.dueTimebyActivityOne = res.data.data.data.notUseVoucher.invalidTime
              }
            }
          } else {
            if (res.data.data.data.notUseVoucher !== null) {
              this.hasActivityOneCard = true
              this.isNotUseVoucher = true
              if (res.data.data.data.notUseVoucher.nominalValue !== res.data.data.data.nominalValue) {
                this.isReceive = false
                this.notUseVoucher = res.data.data.data.notUseVoucher
              } else {
                this.isReceive = true
                this.notUseVoucher = res.data.data.data.notUseVoucher
                this.dueTimebyActivityOne = res.data.data.data.notUseVoucher.invalidTime
              }
            } else {
              this.hasActivityOneCard = false
            }
          }
          
          if (this.nextGetRuleId) {
            if (this.nextGetRuleId === 201906030120) {
              this.gradeAmount = 3000000.01
              this.facevalue = 12
            } else if (this.nextGetRuleId === 201906030110) {
              this.gradeAmount = 1000000.01
              this.facevalue = 11
            } else if (this.nextGetRuleId === 201906030100) {
              this.gradeAmount = 500000.01
              this.facevalue = 10
            } else if (this.nextGetRuleId === 201906030075) {
              this.gradeAmount = 200000.01
              this.facevalue = 7.5
            } else if (this.nextGetRuleId === 201906030050)  {
              this.gradeAmount = 1
              this.facevalue = 5
            }
          }
          this.rechargeAmount = this.gradeAmount - this.totalAmount
        } else if (res.data.data.data.code === 100002) { /* 不在活动范围内 */
          this.isLogin = true
          this.$layer.toast(res.data.data.data.msg)
        } else { /* 暂未登录 */
          this.isLogin = false
          this.$layer.toast(res.data.data.data.msg)
        }
      })
    },
    /* 获取用户邀请信息 */
    getUserInvitationMsg () {
      var params = {
        activityId: 'juneActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getInviteInfoByAcitivity',
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          this.isLogin = true
          this.inviteUrl = location.href.split('#/')[0] + '#/perShare?inviteCode=' + res.data.data.data.inviteNo
          // console.log(this.inviteUrl)
          this.countInviteUser = res.data.data.data.countInviteUser
          this.countInviteBidUser = res.data.data.data.countInviteBidUser
          if (res.data.data.data.notUseVoucher !== null) { // 有未使用的卡券
            this.hasActivityTwoCard = true
            this.isReceiveTwo = true
            this.dueTimebyActivityTwo = res.data.data.data.notUseVoucher.invalidTime
          } else{ // 没有未使用的卡券
            this.isReceiveTwo = false
            if (res.data.data.data.canGetNum !== 0) { // 且有可以领取的的卡券
              this.hasActivityTwoCard = true
            } else {
              this.hasActivityTwoCard = false
            }
          }
        } else if (res.data.data.data.code === 100002) { /* 不在活动范围内 */
          this.isLogin = true
          this.$layer.toast(res.data.data.data.msg)
        } else { /* 暂未登录 */
          this.isLogin = false
          this.$layer.toast(res.data.data.data.msg)
        }
      })
    },
    /* 用户领取活动一卡券 */
    getInfoByActivityOne () {
      if (this.isNotUseVoucher) {
        var txt = '你有'+ this.notUseVoucher.nominalValue +'‰加息券未使用，使用后可领取哦~'
        this.$layer.toast(txt)
      } else {
        var params = {
          activityId: 'juneActivity2019'
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        params.ruleId = this.canGetRuleId
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getJuneneVoucherByRuleId',
          method: 'POST',
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
          if (res.data.data.data.code === 1) {
            this.$layer.toast('领取成功！')
            this.$_init ()
          }
        })
      }
    },
    /* 用户领取活动二卡券 */
    getInfoByActivityTwo () {
      var params = {
        activityId: 'juneActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      params.ruleId = '201906030000'
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getJuneneVoucherInviteByRuleId',
        method: 'POST',
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
        if (res.data.data.data.code === 1) {
          this.$layer.toast('领取成功！')
          this.$_init ()
        }
      })
    },
    /* 用户活动一领取记录 */
    getVoucherListActivityOne () {
      var params = {
        activityId: 'juneActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getJuneneVoucherListActivityOne',
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          this.totalOne = res.data.data.data.voucherList.length
          this.voucherListbyActivityOne = res.data.data.data.voucherList
          this.voucherListbyActivityOne = this.changeList(this.voucherListbyActivityOne)
          this.voucherListbyActivityOne.forEach((val, index, arr) => {
            if (val.files === '5') {
              val.files = '1-20万元档'
            } else if (val.files === '7.5') {
              val.files = '20-50万元档'
            } else if (val.files === '10') {
              val.files = '50-100万元档'
            } else if (val.files === '11') {
              val.files = '100-300万元档'
            } else if (val.files === '12') {
              val.files = '300万元以上'
            }
          })
        }
      })
    },
    /* 用户活动二领取记录 */
    getVoucherListActivityTwo () {
      var params = {
        activityId: 'juneActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getJuneneVoucherListActivityTwo',
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
        if (res.data.data.data.code === 1) {
          this.voucherListbyActivityTwo = res.data.data.data.voucherList
        }
      })
    },
    changeList (arr) {
      var b = {}
      var newArr = []
      arr.forEach(v => {
        !b[v.nominalValue] ? (b[v.nominalValue] = [v]) : b[v.nominalValue].push(v)
      })
      var i = 0
      var x = ''
      for (var o in b) {
        newArr[i] = {
          'files': o,
          'list': b[o]
        }
        i++
      }
      newArr.sort(this.compare('files'))
      return newArr
    },
    compare (property) {
      return (a, b) => {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    getCustUserPrompt () { /* 获取充值提示信息 */
      this.axios({
        url: this.HOST + '/web-server/account/v1/getCustUserPrompt',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (res.data.data.msg === 1) { /* 所有都绑定了 */
            this.bindingState = 5
          } else {
            if (res.data.data.msg === 'AUTH_ACTIVE_USER') { /* 未激活存管 */
              this.bindingState = 0
            } else if (res.data.data.msg === 'AUTH_PHONE') { /* 未绑定手机 */
              this.bindingState = 1
            } else if (res.data.data.msg === 'AUTH_BANK') { /* 未开通存管 */
              this.bindingState = 2
            } else if (res.data.data.msg === 'AUTH_BANK_CARD') { /* 未绑定银行卡 */
              this.bindingState = 3
            } else if (res.data.data.msg === 'AUTH_EMAIL') { /* 未绑定邮箱 */
              this.bindingState = 4
            }
          }
        }
      })
    },
    goRecharge () { /* 去充值 */
      if (this.plus) {
        this.windowOpen('tipsWindowFlag')
      } else {
        if (this.bindingState === 0) { /* 未激活存管 */
          this.windowOpen('aflag')
        } else if (this.bindingState === 1) { /* 未绑定手机 */
          this.imgUrl = require('../../assets/images/project-tel-window-bg.png')
          this.$layer.dialog({
            content: '<div class="phlc-layer">' +
              '<img src="' + this.imgUrl + '" style="width:1.82rem;margin:0 auto;"/>' +
              '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未绑定手机号</div>' +
              '</div>',
            btn: ['再看看', '立即绑定']
          }).then((res) => {
            if (res === 1) {
              this.$router.push({
                path: '/bindPhoneNumber',
                query: {
                  type: '3',
                  title: '绑定手机号'
                }
              })
            }
          })
        } else if (this.bindingState === 2) { /* 未开通存管 */
          this.imgUrl = require('../../assets/images/project-bankcunguan-window-bg.png')
          this.$layer.dialog({
            content: '<div class="phlc-layer">' +
              '<img src="' + this.imgUrl + '" style="width:1.82rem;margin:0 auto;"/>' +
              '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未完成实名认证</div>' +
              '</div>',
            btn: ['再看看', '立即认证']
          }).then((res) => {
            if (res === 1) {
              this.$router.push('/dredgeDepository')
            }
          })
        } else if (this.bindingState === 3) { /* 未绑定银行卡 */
          this.imgUrl = require('../../assets/images/project-newbank-window-bg.png')
          this.$layer.dialog({
            content: '<div class="phlc-layer">' +
              '<img src="' + this.imgUrl + '" style="width:1.82rem;margin:0 auto;"/>' +
              '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未绑定银行卡</div>' +
              '</div>',
            btn: ['立即绑定', '再看看']
          }).then((res) => {
            if (res === 0) {
              this.$router.push('/bindBankCard')
            }
          })
        } else if (this.bindingState === 4 || this.bindingState === 5) {
          this.$router.push('/recharge')
        }
      }
    },
    upgrade () { /* 去升级 */ 
      this.axios({
        url: this.HOST + '/web-server/registerRequest/v1/activePlatuser',
        method: 'POST',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        this.$router.push({
          path: '/mutual/yeepay',
          query: {
            data: res.data.data,
            title: '银行存管激活'
          }
        })
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
        this.toLogin('/juneActivity')
      }
    },
    shareConfig (inviteUrl) {
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
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  components: {
    activityBack,
    shareWindow
  }
}
</script>

<style lang="less">
@import url('./css/juneActivity.less');
</style>
