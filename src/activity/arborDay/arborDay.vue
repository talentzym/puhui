<template>
  <div class="plus-screen-view" id="arborDay-view">
    <activityBack :src="backIcon"></activityBack>
    <router-link class="address" to="/addressList" tag="a" v-show="isLogin" href="javascript:void(0);">
      <img src="./images/address-icon.png"/>
    </router-link>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <div class="model model1">
          <div class="model-title sapling">种植小树，收集祝福</div>
          <div class="model-label">
            <p>天街小雨润如酥，草色遥看近却无。</p>
            <p>最是一年春好处，绝胜烟柳满皇都。 </p>
            <p>新年伊始，一起植树收祝福吧！</p>
          </div>
          <vue-seamless-scroll v-show="newUserData.length" class="modal1-box newUser-state" :class-option="scrollOption" :data="newUserData">
            <div class="">
              <p v-for="(item, $index) in newUserData" v-bind:key="$index">{{ item ? item.userPhone + '&nbsp;&nbsp;' + timeDifference(item.sendTime) + '植树1次' : '' }}</p>
            </div>
          </vue-seamless-scroll>
          <div class="button-box">
            <img src="./images/rule-icon.png" v-on:click="windowOpen('arborRuleWindowFlag')"/>
            <img src="./images/list-icon.png" v-on:click="windowOpen('recordWindowFlag')"/>
            <img src="./images/award-icon.png" v-on:click="windowOpen('arborListWindowFlag')"/>
          </div>
          <div class="arbor-bg">
            <img :src="thisUserData && thisUserData.usedNumImg ?thisUserData.usedNumImg : './images/arbor-0.png'" v-show="isLogin"/>
            <img src="./images/arbor-0.png" v-show="!isLogin"/>
          </div>
          <div class="arbor-box">
            <div class="arbor-box-button" v-on:click="lottery()">植树啦</div>
            <p v-show="isLogin">剩余可植树<span class="color-f87d12">{{ thisUserData.plantTreeNum > 0 ? thisUserData.plantTreeNum : 0 }}</span>次</p>
            <p v-show="!isLogin">登录查看植树次数</p>
            <div class="arbor-infor" v-show="isLogin">
              <div>
                <p>出借总额：</p>
                <p class="color-f87d12">{{ fmoney(thisUserData.loanAmount, 2) }}元</p>
                <p>可植树{{ Math.floor(thisUserData.loanAmount / 10000) }}次</p>
                <p class="arbor-infor-special">多出借,多植树<span>无上限哦~</span></p>
              </div>
              <div>
                <p>分享活动：</p>
                <p class="color-f87d12">{{ thisUserData.shareNum }}次</p>
                <p>可植树{{ thisUserData.shareNum > 3 ? 3 : thisUserData.shareNum }}次</p>
                <div v-on:click="share()">立即分享</div>
              </div>
              <div>
                <p>可用积分：</p>
                <p class="color-f87d12">{{ thisUserData.allIntegral }}</p>
                <p>可植树{{ Math.floor(thisUserData.allIntegral / 800) }}次</p>
                <router-link tag="div" to="/myPoints">查看</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="model">
          <div class="model-title">网银净充，谁与争锋</div>
          <div class="model-label">
            <p>净充榜，谁是王者？终极对决！</p>
            <p>入围TOP 5，够胆挑战吗？</p>
          </div>
          <div class="challenge" v-on:click="doCopy()">立即挑战</div>
          <p class="rule" v-on:click="windowOpen('rechargeRuleWindowFlag')">
            <span>活动规则
              <img src="./images/more-icon.png"/>
            </span>
          </p>
          <div class="list-box">
            <p class="list-box-title">净充值榜单</p>
            <table class="list-has-data">
              <thead>
                <tr>
                  <td>排名</td>
                  <td>用户名</td>
                  <td>净充值额(元)</td>
                </tr>
              </thead>
              <tbody>
                <tr v-show="thisRank.USERID">
                  <td v-bind:class="{'award-3': thisRank.RN <= 3}">{{ thisRank.RN }}</td>
                  <td>{{ thisRank.userName }}</td>
                  <td class="phlc-yxfont">{{ fmoney(thisRank.DEALAMOUNT, 2) }}</td>
                </tr>
                <tr v-for="(item, $index) in rechargeRankList" v-bind:key="$index"  v-show="rechargeRankList.length">
                  <td v-bind:class="{'award-3': $index < 3}">{{ $index + 1 }}</td>
                  <td>{{ item.userName }}</td>
                  <td class="phlc-yxfont">{{ fmoney(item.DEALAMOUNT, 2) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="list-no-data" v-show="!rechargeRankList.length">咦，暂无上榜用户~</div>
          </div>
        </div>
        <p>网贷有风险，出借需谨慎</p>
      </div>
    </div>
    <!--植树·活动规则弹窗-->
    <div class="window" id="arbor-window" v-show="arborRuleWindowFlag">
      <div class="window-header">
        <div class="window-title text-align-center">植树·活动规则</div>
      </div>
      <div class="window-content ">
        <div class="p-box">
          <p>1、活动期间，通过以下3种方式均可获得植树次数：</p>
          <p>a.出借金额每满10000元可获得一次，无上限哟；</p>
          <p>b.每次分享活动给好友或朋友圈可获得一次，<span>累计可获得三次</span>；</p>
          <p>c.消耗800积分可兑换一次，兑换无上限；</p>
        </div>
        <div class="p-box">
          <p>2、每次植树成功会有惊喜奖励，<span>礼品</span>：188元返现券、108元返现券、68元返现券、666积分、百草味坚果礼盒、10英寸微软 Surface Go 二合一平板电脑！！！够不够劲儿~爆发吧你的小宇宙~</p>
        </div>
        <div class="p-box">
          <p>3、返现券奖励自获得之日起7日有效；实物奖励将在活动结束后<span>7个工作日内</span>进行发货，如有需要可向客服人员询问物流进度</p>
        </div>
        <div class="p-box">
          <p>4、活动结束后按照植树榜，出借金额≥100万，且排在前三名的可获得植树达人并领取奖品~</p>
        </div>
        <div class="p-box">
          <p>植树达人奖：<span>微软（Microsoft）Surface Go 二合一平板电脑</span> </p>
        </div>
        <div class="know-button" v-on:click="windowClose('arborRuleWindowFlag')">知道了</div>
      </div>
    </div>
    <!--净充·活动规则弹窗-->
    <div class="window" id="recharge-window" v-show="rechargeRuleWindowFlag">
      <div class="window-header">
        <div class="window-title text-align-center">净充·活动规则</div>
      </div>
      <div class="window-content ">
        <div class="p-box">
          <p>1、活动期间内，在PC端网银累计净充值满1万元送<span>万二现金红包</span>，活动奖励次日发放。</p>
        </div>
        <div class="p-box">
          <p>2、PC端网银充值排名前5名用户且充值金额满50万元额外赠送价值2399元的<span>科沃斯扫地机器人</span>。</p>
        </div>
        <div class="p-box">
          <p>3、累计净充值=累计充值金额-累计提现金额。</p>
        </div>
        <div class="p-box">
          <p>4、实物奖励于活动结束后<span>七个工作日内</span>统一发放哦，请不要着急，好礼在路上呢。</p>
        </div>
        <div class="know-button" v-on:click="windowClose('rechargeRuleWindowFlag')">知道了</div>
      </div>
    </div>
    <!--植树·榜单弹窗-->
    <div class="window" id="arborListwindow" v-show="arborListWindowFlag">
      <div class="window-header">
        <div class="window-title">植树榜单</div>
        <a href="javascript:void(0);" class="phlc-cursor-pointer" v-on:click="windowClose('arborListWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div class="window-content">
        <div class="window-scroll">
          <table>
            <thead>
              <tr>
                <td>排名</td>
                <td>用户名</td>
                <td>出借总额&nbsp;&nbsp;(元)</td>
              </tr>
            </thead>
            <tbody>
              <tr class="login-tr" v-show="!isLogin">
                <td>请登录查看</td>
                <td>您的排名</td>
                <td>
                  <div class="login-button" v-on:click="toLogin('/encore')">登录</div>
                </td>
              </tr>
              <tr class="thisUser" v-show="arborListRank && arborListRank.USERID && isLogin">
                <td v-bind:class="{'award-3': arborListRank && arborListRank.RN <= 3}">{{ arborListRank && arborListRank.RN ? arborListRank.RN : '未排名'}}</td>
                <td>{{ arborListRank && arborListRank.userName ? arborListRank.userName : '' }}</td>
                <td class="phlc-yxfont">{{ fmoney(arborListRank && arborListRank.DEALAMOUNT ? arborListRank.DEALAMOUNT : 0, 2) }}</td>
              </tr>
              <tr v-for="(item, $index) in arborList" v-bind:key="$index" v-show="arborList.length">
                <td v-bind:class="{'award-3': item && item.RN <= 3}">{{ item.RN }}</td>
                <td>{{ item && item.userName ? item.userName : ''}}</td>
                <td>{{ fmoney(item && item.DEALAMOUNT ? item.DEALAMOUNT : 0, 2) }}</td>
              </tr>
            </tbody>
          </table>
          <p class="no-more" v-show="arborList.length">到底了，没有更多啦</p>
          <p class="list-no-data" v-show="!arborList.length">咦，暂无上榜用户~</p>
        </div>
      </div>
    </div>
    <!--植树·抽奖弹窗-->
    <div id="awardWindow" v-show="awardWindowFlag">
      <p class="award-window-title">植树节开奖啦</p>
      <img :src="awardSrc" alt="" class="awardImg"/>
      <p class="prizeName">{{ prizeObj.prizeName }}</p>
      <p v-show="prizeObj.prizeType === 3">出借满{{ prizeObj.quttMinInvest ? prizeObj.quttMinInvest : 0 }}元，期限{{ prizeObj.quttProjectDeadline ? prizeObj.quttProjectDeadline : 0 }}天起可用<br />有效期7天</p>
      <router-link tag="p" to="/addressList" v-show="prizeObj.prizeType === 2">收货地址
        <img src="../../assets/images/phlc-icon-right.png"/>
      </router-link>
      <div v-show="prizeObj.prizeType !== 2" v-on:click="windowClose('awardWindowFlag')">知道了</div>
      <div v-show="prizeObj.prizeType === 2" v-on:click="postAddress()">知道了</div>
    </div>
    <!-- 植树·奖励列表弹窗 -->
    <div class="window" id="recordWindow" v-show="recordWindowFlag">
      <nav>
        <swiper class="nav" :options="navOption" ref="navSwiper">
          <swiper-slide class="phlc-swiper-active">积分卡券({{ recordData[0].totals }})</swiper-slide>
          <swiper-slide>实物奖励({{ recordData[1].totals }})</swiper-slide>
        </swiper>
        <a href="javascript:void(0)" class="phlc-cursor-pointer window-close-button" v-on:click="windowClose('recordWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </nav>
      <div>
        <swiper class="content-swiper height100" :options="contentOption" ref="contentSwiper">
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll0">
              <div class="content" id="scroll0">
                <dl class="award" v-for="(item, $index) in recordData[0].list" v-bind:key="$index">
                  <dt>
                    <img v-show="item.AWARDNAME.indexOf('返现券') !== -1" :src="item.AWARDNAME.indexOf('返现券') !== -1 ? require('./images/award-'+ item.NOMINALVALUE + '.png') : ''"/>
                    <img v-show="item.AWARDNAME.indexOf('积分') !== -1" src="./images/award-integral.png" />
                  </dt>
                  <dd class="voucher">
                    <p>{{ item.AWARDNAME}}</p>
                    <p>{{ item.AWARDNAME.indexOf('返现券') !== -1 ? '出借满' + item.QUTTMININVEST + '元，期限0天起可用，有效期7天' : '&nbsp;' }}</p>
                    <p>{{ new Date(item.CREATETIME).format('yyyy-MM-dd').replaceAll('-', '.') }}获得</p>
                  </dd>
                  <div v-show="item.AWARDNAME.indexOf('返现券') !== -1 && item.USESTATUS !== 0" class="disabled-button">{{ item.USESTATUS === -1 ? '已过期' : '已使用'}}</div>
                </dl>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll1">
              <div class="content" id="scroll1">
                <dl class="award" v-for="(item, $index) in recordData[1].list" v-bind:key="$index">
                  <dt>
                    <img :src="item.AWARDNAME.indexOf('电脑') !== -1 ? require('./images/award-computer.png') : require('./images/award-gift.png')"/>
                  </dt>
                  <dd class="voucher">
                    <p>{{ item.AWARDNAME }}</p>
                    <p>{{ item.RECEIVER ? item.RECEIVER + '&nbsp;' + item. RECEIVERMOBILE + '&nbsp;' + item.RECEIVERADDRESS : '&nbsp;'}}</p>
                    <p>{{ new Date(item.CREATETIME).format('yyyy-MM-dd').replaceAll('-', '.') }}获得</p>
                  </dd>
                </dl>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 植树·积分植树提示弹窗 -->
    <div id="importWindow" v-show="importWindowFlag">
      <p>确定消耗800积分植树？</p>
      <div>
        <div v-on:click="windowClose('importWindowFlag')">再看看</div>
        <div v-on:click="lottery()">确定</div>
      </div>
    </div>
    <shareWindow></shareWindow>
  </div>
</template>

<script>
import activityBack from '@/components/activityBack'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
import VueClipboard from 'vue-clipboard2'
import shareWindow from '@/components/shareWindow'
import $ from 'jquery'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { Indicator } from 'mint-ui'
export default{
  data () {
    const _this = this
    return {
      mescrollIcon: require('../newYear/images/empty-icon.png'),
      backIcon: require('./images/back-icon.png'),
      isLogin: false,
      plus: undefined,
      newUserData: [],
      thisUserData: {
        allIntegral: 0,
        loanAmount: 0,
        plantTreeNum: 0,
        shareNum: 0
      },
      arborRuleWindowFlag: false,
      rechargeRuleWindowFlag: false,
      arborListWindowFlag: false,
      awardWindowFlag: false,
      recordWindowFlag: false,
      importWindowFlag: false,
      rechargeRankList: [],
      thisRank: {},
      arborList: [],
      arborListRank: {},
      awardSrc: undefined,
      prizeObj: {
        voucherDays: null,
        prizeName: '',
        quttProjectDeadline: null,
        voucherType: 0,
        prizeType: 0,
        quttMinInvest: null
      },
      recordData: [{
        typeName: '积分卡券',
        type: 3,
        index: 0,
        list: [],
        isDown: false,
        scroll: null,
        field: 'voucherList',
        totals: 0
      }, {
        typeName: '实物奖励',
        type: 2,
        index: 1,
        list: [],
        isDown: false,
        scroll: null,
        field: 'goodsList',
        totals: 0
      }],
      scrollOption: {
        hoverStop: false,
        openTouch: false,
        limitMoveNum: 4,
        step: 0.25
      },
      navOption: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          click (event) {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.contentSwiper.slideTo(_this.contentSwiper.activeIndex === 1 ? 0 : 1)
            $('.phlc-close-header span').eq(this.activeIndex).addClass('color-e6382c').siblings().removeClass('color-e6382c')
          }
        }
      },
      contentOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionStart () {
            _this.navSwiper.slideTo(this.activeIndex === 1 ? 0 : 1)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      }
    }
  },
  components: {
    activityBack,
    VueClipboard,
    swiper,
    swiperSlide,
    shareWindow,
    vueSeamlessScroll
  },
  computed: {
    navSwiper () {
      return this.$refs.navSwiper.swiper
    },
    contentSwiper () {
      return this.$refs.contentSwiper.swiper
    }
  },
  activated () {
    this.$_muiPlus()
    this.$_init()
    if (this.awardWindowFlag) {
      $('body').append('<div class="mask-plugins" style="height: 667px; width: 375px;"></div>')
    }
  },
  mounted () {
    this.$_muiPlus()
    for (var i in this.recordData) {
      this.recordData[i].scroll = new MeScroll('mescroll' + i, {
        down: {
          callback: this.$_downCallback,
          auto: false
        },
        up: {
          callback: this.$_upCallback,
          auto: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          noMoreSize: 1,
          empty: {
            warpId: 'scroll' + i,
            icon: this.mescrollIcon,
            tip: '咦，暂未获得奖品哦~',
            btntext: '',
            btnClick: null,
            supportTap: false
          }
        }
      })
    }
    this.$nextTick(this.$_init())
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        console.log(0.53 + plus.navigator.getStatusbarHeight() / 100)
        $('.plus-screen-scroll').css('padding', '5.7rem 0 '+ (0.53 + plus.navigator.getStatusbarHeight() / 100) +'rem 0')
        this.plus = plus
        Vue.prototype.plus = plus
        this.updateSerivces()
        mui.init({
          beforeback: () => {
            if (Vue.prototype.isMask) {
              console.log(1)
              if (this.awardWindowFlag) {
                this.postAddress()
                return false
              }
              this.$mask.hide()
              this.arborRuleWindowFlag = false
              this.rechargeRuleWindowFlag = false
              this.arborListWindowFlag = false
              this.awardWindowFlag = false
              this.recordWindowFlag = false
              this.importWindowFlag = false
              return false
            } else {
              if (location.href.split('#')[1].indexOf('arborDay') !== -1) {
                console.log(2)
                var view = this.plus.webview.currentWebview().id
                this.plus.webview.close(view)
              } else {
                console.log(3)
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
      var params = {
        activityId: 'plantTree2019'
      }
      /* 获取最新植树用户信息 */
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getNewTreeUser',
        method: 'GET',
        params: {
          activityId: 'plantTree2019',
          listSize: 10
        },
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
          this.newUserData = res.data.data.data.plantList
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
      /* 获取当前用户植树信息 */
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getPlantTreeInfo',
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
        this.thisUserData = res.data.data.data.data ? res.data.data.data.data : {
          allIntegral: 0,
          loanAmount: 0,
          plantTreeNum: 0,
          shareNum: 0
        }
        if (res.data.data.data.code === 1) {
          this.shareConfig()
          this.isLogin = true
          this.thisUserData.usedNumImg = require('./images/arbor-' + (this.thisUserData.usedNum > 10 ? 10 : this.thisUserData.usedNum) + '.png')
        } else if (res.data.data.data.code === 100001) {
          this.isLogin = false
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
      params.dealType = 1
      params.listLength = 5
      /* 获取净充值榜单信息 */
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getRankList',
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
        if (res.data.data.data.code === 1 || res.data.data.data.code === 100001) {
          this.rechargeRankList = res.data.data.data.dealList
          this.thisRank = res.data.data.data.code === 1 ? res.data.data.data.dealInfo : {}
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    /* 获取植树榜单信息 */
    getArborList () {
      var params = {
        activityId: 'plantTree2019',
        dealType: 3,
        listLength: 5
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getRankList',
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
        if (res.data.data.data.code === 1 || res.data.data.data.code === 100001) {
          this.arborList = res.data.data.data.dealList
          this.arborListRank = res.data.data.data.code === 1 ? res.data.data.data.dealInfo : {}
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    windowOpen (flag) {
      if (flag === 'arborListWindowFlag') {
        this.getArborList()
      }
      if (flag === 'recordWindowFlag'){
        if (this.isLogin) {
          for(var i in this.recordData) {
            this.recordData[i].scroll.triggerDownScroll()
          }
        } else {
          this.toLogin('/arborDay')
          return
        }
      }
      this[flag] = true
      this.$mask.show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    /* 复制 */
    doCopy () {
      var _this = this
      this.$copyText('https://www.puhuilicai.com/').then(function (e) {
        _this.$layer.toast('网址复制成功，快去操作哦~ ！')
      }, function (e) {
        _this.$layer.toast('操作失败，请重新尝试！')
      })
    },
    /* 开奖 */
    lottery () {
      if (this.isLogin) {
        if (!this.importWindowFlag) {
          if (this.thisUserData.plantTreeNum <= Math.floor(this.thisUserData.allIntegral / 800)) {
            this.windowOpen('importWindowFlag')
            return
          }
        } else {
          this.windowClose('importWindowFlag')
        }
        var params = {
          activityId: 'plantTree2019'
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/luckDraw',
          method: 'POST',
          params: {},
          data: params,
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            return _this.$qs.stringify(data)
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            return JSON.parse(data)
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          this.$_init()
          if (res.data.data.data.code === 1) {
            this.prizeObj = res.data.data.data
            switch (this.prizeObj.prizeType) {
              case 0:
                this.awardSrc = require('./images/award-integral.png')
                break
              case 2:
                if (this.prizeObj.prizeName.indexOf('电脑') !== -1) {
                  this.awardSrc = require('./images/award-computer.png')
                } else if (this.prizeObj.prizeName.indexOf('礼盒') !== -1) {
                  this.awardSrc = require('./images/award-gift.png')
                }
                break
              case 3:
                if (this.prizeObj.prizeName.split('元返现券')[0] === '68') {
                  this.awardSrc = require('./images/award-68.png')
                }else if (this.prizeObj['prizeName'].split('元返现券')[0] === '108') {
                  this.awardSrc = require('./images/award-108.png')
                }else if (this.prizeObj['prizeName'].split('元返现券')[0] === '188') {
                  this.awardSrc = require('./images/award-188.png')
                }
                break
            }
            this.windowOpen('awardWindowFlag')
          } else if (res.data.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/arborDay')
          } else {
            this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      } else {
        this.toLogin('/arborDay')
      }
    },
    $_downCallback (mescroll) {
      if (this.isLogin) {
        let pageData = this.recordData[mescroll.optUp.empty.warpId.split("scroll")[1]]
        pageData.isDown = true
        pageData.scroll.resetUpScroll(true)
      } else {
        this.toLogin('/arborDay')
      }
    },
    $_upCallback (page, mescroll) {
      if (this.isLogin) {
        let pageData = this.recordData[mescroll.optUp.empty.warpId.split("scroll")[1]]
        var params = {
          activityId: 'plantTree2019',
          page: page.num,
          rows: page.size,
          prizeType: pageData.type
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getPrizeList',
          method: 'GET',
          params: params,
          data: {},
          timeout: this.axiosTimeout
        }).then((res) => {
          if (res.data.data.data.code === 1) {
            if (pageData.isDown) {
              pageData.list = []
              pageData.isDown = false
              pageData.totals = res.data.data.data.prizeList.total
              pageData.scroll.endSuccess()
              mescroll.scrollTo(0,0)
            }
            pageData.list = pageData.list.concat(res.data.data.data.prizeList.list)
            pageData.scroll.endByPage(pageData.list.length, Math.ceil(pageData.totals / page.size))
          } else if (res.data.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/arborDay')
          } else {
            this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      } else {
        this.toLogin('/arborDay')
      }
    },
    share () {
      if (this.isLogin) {
        /* eslint-disable */
        if (this.plus) {
        /* eslint-disable */
          this.appShare(true)
        } else {
          $('#share-window').show()
        }
      } else {
        this.toLogin('/arborDay')
      }
    },
    shareConfig () {
      /* eslint-disable */
      if (this.plus) {
      /* eslint-disable */
        this.shareObj = {
          href: 'http://www.puhuilicai.com/toInviteRegister.htm?inviteCode=' + this.thisUserData.inviteCold,
          title: '来普惠理财，让你的钱包鼓起来',
          content: '新网银行资金存管，注册领10300元卡券礼包！',
          thumbs: ['https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'],
          type: 'web',
          callback: () => {
            this.shareCallback()
          }
        }
      } else {
        this.wxShare({
          title: '来普惠理财，让你的钱包鼓起来',
          desc: '新网银行资金存管，注册领10300元卡券礼包！',
          url: 'http://www.puhuilicai.com/toInviteRegister.htm?inviteCode=' + this.thisUserData.inviteCold,
          callback: () => {
            this.shareCallback()
          }
        })
      }
    },
    shareCallback () {
      console.log(this.isLogin)
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/addShareInfo',
        method: 'POST',
        params: {},
        data: {
          activityId: 'plantTree2019',
          shareUrl: 'http://www.puhuilicai.com/toInviteRegister.htm?inviteCode=' + this.thisUserData.inviteCold,
          isLogin: this.isLogin ? 1 : 0,
          userId: Math.floor(this.$route.query.userId)
        },
        transformRequest: [(data, headers) => {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return this.$qs.stringify(data)
        }],
        transformResponse: [(data, headers) => {
          Indicator.close()
          return JSON.parse(data)
        }],
        timeout: this.axiosTimeout
      }).then((res) => {
        this.$_init()
        console.log(JSON.stringify(res))
        if (res.data.data.data.code === 1) {
          
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      })
    },
    postAddress () {
      this.axios({
        url: this.HOST + '/activity-server/integral/v1/getActivityAddress',
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
          var data = res.data.data.address
          if (data.length) {
            this.axios({
              url: this.HOST + '/activity-server/activityInfo/v1/saveAddrForActivity',
              method: 'POST',
              params: {},
              data: {
                activityId: 'plantTree2019',
                isLogin: this.isLogin ? 1 : 0,
                receiver: data[0].receiver,
                receiverMobile: data[0].receiverMobile,
                receiverAddress: data[0].receiverCity + data[0].receiverArea + data[0].receiverAddress,
                rawardRecordId: this.prizeObj.prizeId,
                userId: this.$route.query.userId ? Math.floor(this.$route.query.userId) : ''
              },
              transformRequest: [(data, headers) => {
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                })
                return this.$qs.stringify(data)
              }],
              transformResponse: [(data, headers) => {
                Indicator.close()
                return JSON.parse(data)
              }],
              timeout: this.axiosTimeout
            }).then((res) => {
              if (res.data.data.data.code === 1) {
                this.windowClose('awardWindowFlag')
              } else {
                this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
              }
            })
          } else {
            this.$layer.toast('请填写收货地址！')
          }
        } else if (res.data.data.code === 1111) {
          this.toLogin('/arborDay')
        } else {
          this.$layer.toast('查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url('./css/arborDay.less');
</style>