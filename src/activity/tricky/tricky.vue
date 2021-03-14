<template>
  <div id="newPeople-view" ref = 'trickyBox' class="plus-screen-view">
    <activityBack :src="backIcon"></activityBack>
    <div class="mask" v-show="maskFalg"></div>
    <div class="plus-screen-content mescroll">
    <div class="plus-screen-scroll">
        <div class="trickyBoxbot">
          <div class="time-div">
            <span class="time-span"></span>
          </div>
          <!--<div class="tricky-tip">小时候，愚人节的时候被人整了，会不开心;现在</br>长大了，没有人整，更不开心，孤独啊孤独~~</div>-->
          <div class="tricky-game" :style="{backgroundImage: 'url(' + coverImgUrl + ')', backgroundSize:'100%'}">
            <div class="tricky-game-tip">
              <p class="tricky-game-tip-p"><img src="./images/tricky10.png"></p>
              <div class="tricky-rule" @click="openActiveRule()">竞猜规则</div>
            </div>
            <div class="time-game-tip2">
              <p>整蛊大作战，有惊讶更有惊喜！</p>
              <p>谁是整蛊之王，888元现金红包花落谁家</p>
              <p>让我们拭目以待！</p>
            </div>
            <div class="tricky-game-clownbox">
              <ul class="tricky-game-clown-ul">
                <li class="tricky-game-clown-li" @click="lottery()">
                  <div id="tricky-game-clownbox-tip3" class=" clownIndex0" v-show="clownIndex0"></div>
                  <img :src="this.imgArr[0]" />
                </li>
                <li class="tricky-game-clown-li" @click="lottery()">
                  <div id="tricky-game-clownbox-tip3" v-show="clownIndex1"></div>
                  <img :src="this.imgArr[1]" />
                </li>
                <li class="tricky-game-clown-li" @click="lottery()">
                  <div id="tricky-game-clownbox-tip3" v-show="clownIndex2"></div>
                  <img :src="this.imgArr[2]" />
                </li>
              </ul>
            </div>
            <div class="logined" v-show="isLogin">
              <p class="logined2">剩余竞猜<span>{{num = num > 0 ? num : 0}}</span>次</p>
              <ul class="logined-ul">
                <li class="logined-li">
                  <p class="logined-li-p1">网银净充值</p>
                  <p class='logined-li-p2'>{{fmoney(amount)}}</p>
                  <p class='logined-li-p3'>可竞猜<span>{{accountNum = accountNum > 0 ? accountNum : 0}}</span>次</p>
                </li>
                <li class="logined-li">
                  <p class="logined-li-p1">出借总额</p>
                  <p class='logined-li-p2'>{{fmoney(investAmount)}}</p>
                  <p class='logined-li-p3'>可竞猜<span>{{investNum = investNum > 0 ? investNum : 0}}</span>次</p>
                </li>
                <li class="logined-li">
                  <p class="logined-li-p1">邀请好友</p>
                  <p class='logined-li-p2'>{{userCount}}</p>
                  <p class='logined-li-p3'>可竞猜<span>{{userCount}}</span>次</p>
                </li>
              </ul>
              <div class="customizedHistory" v-on:click="windowOpen('cardRedFalg')"><span>奖励列表</span><span class="customizedHistory-span"></span></div>
            </div>
          </div>
          <!--定制卡券-->
          <div class="tricky-active2">
            <p class="tricky-game-tip-p"><img src="./images/tricky13.png"></p>
            <div class="tricky-active2-status1" v-show="active2status1Falg">
              <div class="time-game-tip2">
                <p>随心输入数字可订制私人返现券，</p>
                <p>每日限订一张，今天您暂未订制哦〜</p>
                <p>最大可定制2000元</p>
              </div>
              <div class="tricky-input-box">
                <input type="number" v-model="inputNumber" onkeyup = "value = value.replace(/[^\d]/g,'')" class="tricky-input" placeholder="请输入金额" max="2000" v-on:input="inputVal" />
                <p class="tricky-input-text">出借满{{fmoney(Number(inputNumber)*200)}}元可用</p>
                <div class="goCustomized" @click="goCustomized()">立即定制</div>
              </div>
            </div>
            <div class="tricky-active2-status2" v-show="active2status2Falg">
              <div class="time-game-tip3">
                <p v-show="activeCardBtnFalg" style="line-height: 1.3rem;">今日定制的卡券已到账，快去使用吧〜</p>
                <div v-show="activeCardBtnFalg2" style="padding: .4rem .4rem 0; text-align: left;">今日定制已享用，要坚持做到每日一定，定制必用；明天再来哦~</div>
              </div>
              <div class="activeCardBox">
                <div class="activeCardBoxP"><span>￥</span><span>{{inputNumber2}}</span><span>返现券</span></div>
                <p class="activeCardBoxTip2">出借{{fmoney(Number(inputNumber2)*200)}}元可用</p>
                <p class="activeCardBoxTip3">有效期至：仅限今天</p>
                <div class="activeCardBox-date" v-show="activeCardBtnFalg2"></div>
                <!--<div class="activeCarduseBtn" v-show="activeCardBtnFalg">
                  <router-link tag="div" to="/project">立即使用</router-link>
                </div>-->
              </div>
            </div>
            <div class="customizedHistory" v-on:click="windowOpen('customizedListFalg')"><span>定制历史</span><span class="customizedHistory-span"></span></div>
          </div>
          <p class="tricky-bot">网贷有风险，出借需谨慎</p>
          <p class="botText1">© {{this.year}} 普惠理财(www.puhuilicai.com)</p>
          <p class="botText2">京ICP备14042685号</p>
        </div>
      </div>
    </div>
    <!--无礼物弹框-->
    <div class="no-gift" v-show='nogiftFalg'>
      <p class="mask-tip1">WO是假的，哈哈哈</p>
      <img src="./images/tricky19.png" class="tricky29"/>
      <p class="mask-tip2">{{jiaTip}}</p>
      <div class="no-gift-btn"  v-on:click='windowClose ("nogiftFalg")'>知道了</div>
    </div>
    <!--有礼物-->
    <div class="gift" v-show='giftFalg'>
      <p class="mask-tip1">WO是真的，送你</p>
      <div class="gift-imgBox" >
        <img :src="awardSrc" alt="" class="mask-img"/>
      </div>
      <p class="mask-tip3">{{ prizeObj.prizeName }}</p>
      <div class="gift-btn" v-on:click='windowClose ("giftFalg")'>知道了</div>
    </div>
    <!--定制列表-->
    <div class="customized-list-box" v-show="customizedListFalg">
      <div class="window-title">定制记录</div>
      <a href="javascript:void(0);" class="phlc-cursor-pointer window-close-button" v-on:click="windowClose('customizedListFalg')">
        <img src="../../assets/images/phlc-login-cha.png"/>
      </a>
      <div class="mescroll" id="mescroll3">
        <div class="content" id="scroll3">
          <ul class="customized-ul">
            <li class="" v-show="kongstatus1" style="width: 1.6rem;height: 2.22rem;display: flex;margin: 2rem auto;"><img src="./images/trickykong.png" style="width: 100%;height: 100%;"/></li>
            <p v-show="kongstatus1" style="font-size: .3rem;color: #363636FF;text-align: center; margin-top: .3rem;">咦，咋还没定制卡券</p>
            <li class="customized-li" v-show="!kongstatus1" v-for="(item, $index) in prizeListObj" v-bind:key="$index">
              <div class="customized-li-gift-imgBox" >
                <img src="./images/tricky24.png" class="mask-img"/>
              </div>
              <div class="customized-li-right">
                <p class="customized-li-right-p1">{{item.VOUCHERNAME}}</p>
                <p class="customized-li-right-p2">出借满{{item.QUTTMININVEST}}元，期限{{item.QUTTPROJECTDEADLINE}}天起，{{ new Date(item.INVALIDTIME).format('yyyy-MM-dd').replaceAll('-', '.') }}到期</p>
                <!--<div class="nowUser" v-show="!item.USESTATUS"><router-link tag="div" to="/project">立即使用</router-link></div>-->
              </div>
              <div class="VoucherUsed" v-show="item.USESTATUS"><img :src="item.USESTATUS=== 2 ? require('./images/trickyused.png') : require('./images/trickydated.png')"/></div>
            </li>
          </ul>
          <p class="nomore"  v-show="kongstatusno1">
            <span class="hengspan"></span><span class="zi">到底了没有更多了</span><span class="hengspan"></span>
          </p>
        </div>
      </div>
    </div>
    <!--卡券红包列表-->
    <div class="customized-list-box card-red-list" v-show="cardRedFalg">
      <nav>
        <swiper class="nav" :options="navOption" ref="navSwiper">
          <swiper-slide class="phlc-swiper-active" dataIndex = '0'>卡券列表({{recordData[0].list.length}})</swiper-slide>
          <swiper-slide dataIndex = '1'>红包列表({{recordData[1].list.length}})</swiper-slide>
        </swiper>
        <a href="javascript:void(0)" class="phlc-cursor-pointer window-close-button" v-on:click="windowClose('cardRedFalg')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </nav>
      <div>
        <swiper class="content-swiper height100" :options="contentOption" ref="contentSwiper">
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll0">
              <div class="content" id="scroll0" style="">
                <div class="" v-show="kongstatus2" style="width: 1.6rem;height: 2.22rem;display: flex;margin: 2rem auto;"><img src="./images/trickykong.png" style="width: 100%;height: 100%;"/></div>
                <p  v-show="kongstatus2" style="font-size: .3rem;color: #363636FF;text-align: center; margin-top: .3rem;">咦，暂未获得活动卡券</p>
                <dl class="award" v-show="!kongstatus2" v-for="(item, $index) in recordData[0].list" v-bind:key="$index">
                  <dt>
                    <img v-show="item.VOUCHERNAME.indexOf('元返现券') !== -1" :src="item.VOUCHERNAME.indexOf('元返现券') !== -1 ? require('./images/trickyC'+ item.VOUCHERNAME.split('元返现券')[0] + '.png') : ''"/>
                    <img v-show="item.VOUCHERNAME.indexOf('加息券') !== -1" :src="item.VOUCHERNAME.indexOf('加息券') !== -1 ? require('./images/trickyX'+ item.VOUCHERNAME.split('%加息券')[0] + '.png') : ''"/>
                  </dt>
                  <dd class="voucher">
                    <p>
                      <span class="fl">{{item.VOUCHERNAME}}</span>
                      <span class="fr">{{ new Date(item.CREATTIME).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') }}获得</span>
                    </p>
                    <p style="color:#363636FF;">出借{{item.QUTTMININVEST}}<i v-show="!item.QUTTMININVEST">-{{item.QUTTMAXINVEST}}</i>元，期限{{item.QUTTPROJECTDEADLINE}}天起，{{ new Date(item.INVALIDTIME).format('yyyy-MM-dd').replaceAll('-', '.') }}到期</p>
                  </dd>
                  <div class="VoucherUsed" v-show="item.USESTATUS"><img :src="item.USESTATUS=== 2 ? require('./images/trickyused.png') : require('./images/trickydated.png')"/></div>
                </dl>
                <p class="nomore"  v-show="kongstatusno2">
                  <span class="hengspan"></span><span class="zi">到底了没有更多了</span><span class="hengspan"></span>
                </p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll1">
              <div class="content" id="scroll1">
                <div class="" v-show="kongstatus3" style="width: 1.6rem;height: 2.22rem;display: flex;margin: 2rem auto;"><img src="./images/trickykong.png" style="width: 100%;height: 100%;"/></div>
                <p v-show="kongstatus3" style="font-size: .3rem;color: #363636FF;text-align: center; margin-top: .3rem;">咦，暂未获得现金红包</p>
                <dl v-show="!kongstatus3" class="award" v-for="(item, $index) in recordData[1].list" v-bind:key="$index">
                  <dt>
                    <img v-show="item.note.indexOf('红包') !== -1" :src="require('./images/trickyH'+ item.cariAmount + '.png')"/>
                  </dt>
                  <dd class="voucher clearfix">
                    <p style="height: 100%;">
                      <span class="fl" style="line-height: 1.2rem;">{{item.cariAmount}}元现金红包</span>
                      <span class="fr" style="line-height: 1.2rem;">{{ new Date(item.createTime).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') }}获得</span>
                    </p>
                  </dd>
                </dl>
                <p class="nomore"  v-show="kongstatusno3">
                  <span class="hengspan"></span><span class="zi">到底了没有更多了</span><span class="hengspan"></span>
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--活动1规则-->
    <div class="active-rule" v-show="activeRuleFalg">
      <p class="active-rule-tip1">猜小丑，赢大奖·竞猜规则</p>
      <p class="active-rule-tip2">完成以下任一项任务，可以获得“是真是假”竞猜机会！猜猜3个小丑中，哪个才是真小丑！猜中了就有礼物哦〜</p>
      <p class="active-rule-tip2">1、网银净充值累计满10000元即可获得1次竞猜机会，无次数限制;</p>
      <p class="active-rule-tip2">2、用户出借累计满10000元即可获得1次竞猜机会，无次数限制;</p>
      <p class="active-rule-tip2">3、邀请好友完成实名绑卡即可获得1次竞猜机会，若之前邀请注册未实名绑卡，现实名绑卡也可以获得1次竞猜机会，每日限10次。</p>
      <p class="active-rule-tip2">*注意哟猜中真小丑，可能触发的奖励有：<span>58元，88元返现券，1％，2％加息券，18元，88元，888元现金红包。</span></p>
      <p class="active-rule-tip2">一定要猜对哦〜要是一不留神猜错了，假小丑会......目测会有很不好的事情发生。</p>
      <div class="gift-btn" @click="windowClose('activeRuleFalg')">知道了</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import vueSeamlessScroll from 'vue-seamless-scroll'
import Vue from 'vue'
import activityBack from '@/components/activityBack'
import { Indicator } from 'mint-ui'
export default {
  data () {
    const _this = this
    return {
      aaa: '',
      timer: null,
      backIcon: require('./images/tricky20.png'),
      coverImgUrl: require('./images/tricky12.jpg'),
      clownIndex: 3,
      clownIndex0: true,
      kongstatusno1: false,
      kongstatusno2: false,
      kongstatusno3: false,
      amount: 0,
      jiaTip: '哈哈、增加出借金额才是王道！',
      accountNum: 0,
      year: '',
      maskFalg: false,
      userCount: 0,
      investAmount: 0,
      investNum: 0,
      num: -2,
      clownIndex1: false,
      clownIndex2: false,
      activeCardBtnFalg: false,
      activeCardBtnFalg2: true,
      inputNumber: '',
      inputNumber2: 0,
      awardSrc: undefined,
      nogiftFalg: false,
      giftFalg: false,
      userId: '',
      customizedListFalg: false,
      cardRedFalg: false,
      activeRuleFalg: false,
      active2status1Falg: true,
      active2status2Falg: false,
      loginedFalg: false,
      isLogin: false,
      prizeObj: {
        voucherDays: null,
        prizeName: '',
        quttProjectDeadline: null,
        voucherType: 0,
        prizeType: 0,
        quttMinInvest: null
      },
      prizeListObj: null,
      kongstatus1: false,
      kongstatus2: false,
      kongstatus3: false,
      recordData: [{
        typeName: '卡券列表',
        type: 3,
        index: 0,
        list: [],
        isDown: false,
        scroll: null,
        field: 'voucherList',
        totals: 0
      }, {
        typeName: '红包列表',
        type: 3,
        index: 1,
        list: [],
        isDown: false,
        scroll: null,
        field: 'goodsList',
        totals: 0
      }],
      imgArr: [require('./images/tricky6.png'), require('./images/tricky7.png'), require('./images/tricky8.png')],
      navOption: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          click (event) {
            $(event.target).attr('disabled', 'disabled')
            var index1 = $(event.target).attr('dataIndex')
            var index2 = _this.contentSwiper.activeIndex
            this.clickFalg = false
            if (Number(index1) === Number(index2)) {
              console.log('不')
            } else {
              $('.content').addClass('action')
              _this.contentSwiper.slideTo(_this.contentSwiper.activeIndex === 1 ? 0 : 1)
              // $(event.target).addClass('phlc-swiper-active')
              // console.log(this.activeIndex)
              // console.log('aaa' + _this.contentSwiper.activeIndex)
              $('.nav .swiper-slide').eq(_this.contentSwiper.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
              $('.phlc-close-header span').eq(this.activeIndex).addClass('color-e6382c').siblings().removeClass('color-e6382c')
            }
            setTimeout(function () {
              $(event.target).removeAttr('disabled')
              console.log('点击')
              $('.content').removeClass('action')
            }, 500)
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
    swiper,
    swiperSlide,
    vueSeamlessScroll,
    activityBack
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
    this.$_init()
    this.$_muiPlus()
  },
  mounted () {
    this.$_muiPlus()
    clearInterval(this.timer)
    this.clickfun()
    this.$_init()
    var date = new Date()
    this.year = date.getFullYear() // 获取当前年份
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        console.log(0.53 + plus.navigator.getStatusbarHeight() / 100)
        this.plus = plus
        Vue.prototype.plus = plus
        this.updateSerivces()
        mui.init({
          beforeback: () => {
            if (this.maskFalg) {
              this.maskFalg = false
              this.nogiftFalg = false
              this.giftFalg = false
              this.customizedListFalg = false
              this.cardRedFalg = false
              this.activeRuleFalg = false
              $('#body').parent().css('overflow-y', 'auto')
              return false
            } else {
              if (location.href.split('#')[1].indexOf('tricky') !== -1) {
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
    randomSort (arr) {
      var array = arr.slice()
      array.sort(function () {
        return 0.5 - Math.random()
      })
      return array
    },
    $_init () {
      var imgArr1 = [require('./images/tricky6.png'), require('./images/tricky7.png'), require('./images/tricky8.png')]
      var numberArr = this.randomSort([0, 1, 2])
      // console.log(this.randomSort([0, 1, 2]))
      var imgArr2 = []
      for (var i = 0; i < numberArr.length; i++) {
        imgArr2[i] = imgArr1[numberArr[i]]
      }
      this.imgArr = imgArr2
      var params = {
        activityId: 'prankActivity'
      }
      /* 获取当前用户信息 */
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getActivityDetail',
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
        if (res.data.code === 0) {
          this.isLogin = false
          this.coverImgUrl = require('./images/tricky12.jpg')
          console.log(res)
        }
        if (res.data.data.data.code === 1) {
          this.coverImgUrl = require('./images/tricky18.jpg')
          this.loginedFalg = true
          this.isLogin = true
          // console.log(res.data.data.data)
          this.amount = res.data.data.data.amount
          this.accountNum = res.data.data.data.accountNum
          this.userCount = res.data.data.data.userCount
          this.investAmount = res.data.data.data.investAmount
          this.investNum = res.data.data.data.investNum
          this.num = res.data.data.data.num
          // console.log(res.data.data.data.userId)
          this.userId = res.data.data.data.userId
          if (res.data.data.data.hasVoucher === 1) {
            this.active2status1Falg = false
            this.active2status2Falg = true
            this.inputNumber2 = res.data.data.data.voucher.nominalValue
            if (res.data.data.data.voucher.useStatus === 0) {
              this.activeCardBtnFalg = true
              this.activeCardBtnFalg2 = false
            } else {
              this.activeCardBtnFalg = false
              this.activeCardBtnFalg2 = true
            }
          } else {
            this.active2status1Falg = true
            this.active2status2Falg = false
          }
        } else {
          this.loginedFalg = false
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.isLogin = false
          this.coverImgUrl = require('./images/tricky12.jpg')
          // this.toLogin('/tricky')
          // this.$layer.toast('用户未登录！')
        }
      })
    },
    goCustomized () {
      /* 定制卡券 */
      console.log('定制')
      console.log('定制')
      var params = null
      if (this.userId) {
        params = {
          activityId: 'prankActivity',
          amount: this.inputNumber,
          userId: this.userId,
          isLogin: 1
        }
      } else {
        params = {
          activityId: 'prankActivity',
          amount: this.inputNumber,
          userId: this.userId,
          isLogin: 0
        }
      }
      /* 获取当前用户信息 */
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/getVoucherByAmount',
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
        console.log(res)
        this.inputNumber2 = this.inputNumber
        this.inputNumber = ''
        if (res.data.data.data.code === 1) {
          console.log(res)
        }  else if (res.data.data.data.code === 100001) {
          this.isLogin = false
          this.toLogin('/tricky')
        }else {
          this.active2status2Falg = false
          this.active2status1Falg = true
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
        this.$_init()
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('定制失败，请重新尝试！')
        }
      })
    },
    lottery () {
      var params = null
      if (this.userId) {
        params = {
          activityId: 'prankActivity',
          userId: this.userId,
          isLogin: 1
        }
      } else {
        params = {
          activityId: 'prankActivity',
          userId: this.userId,
          isLogin: 0
        }
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      // console.log(params)
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
        Indicator.close()
        console.log(res)
        if (res.data.data.data.code === 1) {
          this.prizeObj = res.data.data.data
          // console.log(this.prizeObj)
          if (this.prizeObj.prizeType === 1) {
            if (this.prizeObj.prizeName.indexOf('现金') !== -1) {
              // console.log(this.prizeObj['prizeName'].split('元现金红包')[0])
              if (this.prizeObj['prizeName'].split('元现金红包')[0] === '18') {
                this.awardSrc = require('./images/trickyH18.png')
                // console.log(this.awardSrc)
              } else if (this.prizeObj['prizeName'].split('元现金红包')[0] === '88') {
                this.awardSrc = require('./images/trickyH88.png')
              } else if (this.prizeObj['prizeName'].split('元现金红包')[0] === '888') {
                this.awardSrc = require('./images/trickyH888.png')
              }
            }
            this.windowOpen('giftFalg')
          } else if (this.prizeObj.prizeType === 3) {
            if (this.prizeObj['prizeName'].split('%加息券')[0] === '1') {
              this.awardSrc = require('./images/trickyX1.png')
            } else if (this.prizeObj['prizeName'].split('%加息券')[0] === '2') {
              this.awardSrc = require('./images/trickyX2.png')
            } else if (this.prizeObj['prizeName'].split('元返现券')[0] === '58') {
              this.awardSrc = require('./images/trickyC58.png')
            } else if (this.prizeObj['prizeName'].split('元返现券')[0] === '88') {
              this.awardSrc = require('./images/trickyC88.png')
            }
            this.windowOpen('giftFalg')
          }
          if (this.prizeObj.prizeName === '假小丑') {
            // 假小丑
            var imgArr = ['没猜中！哈哈哈！', '年轻人，还需多加修炼啊~', '逗你玩，换个姿势再试试！', '哈哈、增加出借金额才是王道！']
            this.jiaTip = imgArr[Math.floor((Math.random() * imgArr.length))]
            this.windowOpen('nogiftFalg')
          }
          
        } else if (res.data.data.data.code === 100001) {
          this.isLogin = false
          this.toLogin('/tricky')
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
        this.$_init()
      }).catch((err) => {
        Indicator.close()
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    stop(){
      console.log('aa')
      var mo = function(e){e.preventDefault()}
      document.body.style.overflow = 'hidden'
      document.body.addEventListener('touchmove', mo, false)
    },
    move(){
      var mo = function(e){e.preventDefault()}
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
    },
    openActiveRule () {
      this.activeRuleFalg = true
      this.maskFalg = true
      $('.plus-screen-scroll').parent().css('overflow-y', 'hidden')
    },
    windowOpen (flag) {
      $('.plus-screen-scroll').parent().css('overflow-y', 'hidden')
      if (flag === 'customizedListFalg') {
        this.getVoucherByAmountList()
        return
      }
      if (flag === 'cardRedFalg') {
        if (this.isLogin) {
          // this.recordData[0].scroll.triggerDownScroll()
          this.$_upCallback()
          this.getRed()
          return
        } else {
          this.toLogin('/tricky')
        }
      }
      this[flag] = true
      this.maskFalg = true
    },
    windowClose (flag) {
      /* eslint-disable */
     $('.plus-screen-scroll').parent().css('overflow-y', 'auto')
      /* eslint-disable */
      // console.log(flag)
      this[flag] = false
      this.maskFalg = false
    },
    inputVal (e) {
      if (e.target.value > 2000) {
        this.inputNumber = 2000
        this.$layer.toast('定制金额不得超过2000')
      }
    },
    clickfun () {
      this.timer = setInterval(() => {
        this.clownIndex = this.clownIndex + 1
        if (this.clownIndex % 3 === 0) {
          this.clownIndex0 = true
          this.clownIndex1 = false
          this.clownIndex2 = false
        } else if (this.clownIndex % 3 === 1) {
          this.clownIndex0 = false
          this.clownIndex1 = true
          this.clownIndex2 = false
        } else {
          this.clownIndex0 = false
          this.clownIndex1 = false
          this.clownIndex2 = true
        }
        // console.log('.clownIndex' + this.clownIndex % 3)
      }, 2000)
    },
    getVoucherByAmountList () {
      if (this.isLogin) {
        var params = null
        if (this.userId) {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 1,
            flag: 2
          }
        } else {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 0,
            flag: 2
          }
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        // console.log(params)
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/getVoucherByAmountList',
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
            _this.kongstatusno1 = true
            _this.maskFalg = true
            return JSON.parse(data)
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          // console.log(res)
          if (res.data.data.data.code === 1) {
            this.prizeListObj = res.data.data.data.custUserVoucherList
            if (this.prizeListObj.length > 0) {
              this.kongstatus1 = false
              this.kongstatusno1 = true
            } else {
              this.kongstatus1 = true
              this.kongstatusno1 = false
            }
            this.customizedListFalg = true
            // console.log(this.prizeListObj)
          } else if (res.data.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/tricky')
          } else {
            this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            this.kongstatus1 = true
            console.log(err)
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      } else {
        this.toLogin('/tricky')
      }
    },
    getRed () {
      if (this.isLogin) {
        var params = null
        if (this.userId) {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 1,
            page: 1,
            rows: 1000
          }
        } else {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 0,
            page: 1,
            rows: 1000
          }
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getRedpackInfoList',
          method: 'POST',
          params: params,
          data: {},
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            return _this.$qs.stringify(data)
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            _this.kongstatusno2 = true
            _this.maskFalg = true
            return JSON.parse(data)
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          // console.log(res)
          if (res.data.data.data.code === 1) {
            // console.log(res.data.data.data.redPackInfoList.list.length)
            if (res.data.data.data.redPackInfoList.list.length > 0) {
              this.kongstatus3 = false
              this.kongstatusno2 = true
            } else {
              this.kongstatus3 = true
              this.kongstatusno2 = false
            }
            this.cardRedFalg = true
            this.recordData[1].list = res.data.data.data.redPackInfoList.list
            // console.log(this.recordData[1].list)
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
        this.toLogin('/tricky')
      }
    },
    $_upCallback () {
      // console.log(this.userId)
      if (this.isLogin) {
        var params = null
        if (this.userId) {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 1,
            flag: 1
          }
        } else {
          params = {
            activityId: 'prankActivity',
            userId: this.userId,
            isLogin: 0,
            flag: 1
          }
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/getVoucherByAmountList',
          method: 'POST',
          params: params,
          data: {},
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            return _this.$qs.stringify(data)
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            _this.kongstatusno3 = true
            _this.maskFalg = true
            return JSON.parse(data)
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          // console.log(res)
          if (res.data.data.data.code === 1) {
            console.log(res.data.data.data.custUserVoucherList)
            if (res.data.data.data.custUserVoucherList.length > 0) {
              this.kongstatus2 = false
              this.kongstatusno3 = true
            } else {
              this.kongstatusno3 = false
              this.kongstatus2 = true
            }
            this.cardRedFalg = true
            this.recordData[0].list = res.data.data.data.custUserVoucherList
            // console.log(this.recordData[0].list)
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
        this.toLogin('/tricky')
      }
    }
  },
  distroyed: function () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
  #newPeople-view{
    transform: translate(0%);
    .action{
      touch-action: none;
    }
    .nomore{
      padding-bottom: .8rem;
      align-items: center;
      font-size: .23rem;
      color: #BBBBBBFF;
      display: flex;
      justify-content: center;
      text-align: center;
      margin-top: .2rem;
      .zi{
        margin-left: .3rem;
        margin-right: .3rem;
      }
      .hengspan{
        width:.88rem;
        height:.02rem;
        background:rgba(204,204,204,1);
      }
    }
    .botText2{
      font-size:.24rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color: #ffffff;
      line-height: 0.42rem;
      opacity: 0.67;
      text-align: center;
    }
    .botText1{
      font-size:.24rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color: #ffffff;
      line-height: 0.42rem;
      opacity: 0.67;
      text-align: center;
    }
    .plus-screen-content{
      top: 0;
      .plus-screen-scroll{
        padding: 0;
      }
    }
    .customized-ul li{
      position: relative;
    }
    .customized-ul li .VoucherUsed{
      top: .95rem;
    }
    .VoucherUsed{
      width: 1rem;
      height: 1rem !important;
      position: absolute;
      right: .4rem;
      top: .15rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .mask{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      background: rgba(0, 0, 0, .5);
      pointer-events: auto;
      width: 100%!important;
    }
    .height100{
      height: 7.9rem;
      overflow-y: auto;
    }
    .time-game-tip3{
      width: 5.18rem;
        height: 1.3rem;
        padding-top: .0rem;
        margin: .3rem auto 0;
        background:#8790e0;
        border:.02rem dashed rgba(255,255,255,0.12);
        border-radius:.08rem;
        -webkit-border-radius: .08rem;
        -moz-border-radius:.08rem;
        font-size: .24rem;
        color: #ffffff;
        text-align: center;
    }
    width:7.5rem;
    .active-rule{
      width: 7.5rem;
      height: 10.15rem;
      z-index: 1000;
      background: #ffffff;
      position: fixed;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%, 0);
      border-radius:.24rem .24rem 0px 0px;
      -webkit-border-radius:.24rem .24rem 0px 0px;
      -moz-border-radius:.24rem .24rem 0px 0px;
      .active-rule-tip1{
        text-align: center;
        font-size: .36rem;
        color: #252525FF;
        padding-top: .55rem;
        padding-bottom: .4rem;
        font-weight:bold;
      }
      .active-rule-tip2{
        line-height: .4rem;
        font-size: .24rem;
        padding: 0 .38rem;
        color: #252525FF;
        text-align: justify;
        margin-bottom: .3rem;
        span{
          color: #4F509BFF;
        }
      }
    }
    .card-red-list{
      nav{
        display: block;
        font-size: 0.3rem;
        color: #636363;
        text-align: center;
        .swiper-slide{
          padding: 0.6rem 0 .3rem;
        }
        .window-close-button{
          top: 0.6rem;
        }
      }
      .phlc-swiper-active{
        color: #4f509b !important;
        position: relative;
        &:after{
          content: "";
          display: block;
          width: 0.32rem;
          height: 0.04rem;
          background: #4f509b !important;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
      }
      dl.award{
      height: 1.21rem;
      margin: 0.27rem 0rem;
      display: flex;
      position: relative;
      box-sizing:border-box ;
      padding: 0 .4rem;
      dt{
        width:1.2rem;
        height:1.2rem;
        background:#7301DD1A;
        border:1px solid rgba(115, 1, 221, 0.1);
        text-align: center;
        align-items: center;
        img{
          margin: .3rem auto;
          width: .95rem;
          height: .58rem;
        }
      }
      dd {
        padding-left: 0.24rem;
        box-sizing: border-box;
        width: 5.49rem;
        &.integral{
          line-height: 1.21rem;
          font-size: 0.26rem;
          color: #252525;
        }
        &.voucher{
          font-size: 0.22rem;
          p{
            height: 50%;
            line-height: .6rem;
            font-size: 0.22rem;
            color: #636363;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span{
              &:first-child{
                font-size: 0.26rem;
                color: #252525;
                font-weight:bold;
                margin-bottom: 0.05rem;
              }
            }
          }
        }
      }
      >span{
        font-size: 0.22rem;
        color: #898989;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    }
    .nowUser{
      width:1.5rem;
      height:.56rem;
      border:1px solid rgba(79,80,155,1);
      opacity:0.8;
      border-radius:.28rem;
      -webkit-border-radius:.28rem;
      -moz-border-radius:.28rem;
      font-size: .24rem;
      text-align: center;
      line-height: .56rem;
      position: absolute;
      top: .8rem;
      right:.4rem;
    }
    .customized-li-right-p1{
      color: #252525FF;
      font-size: .26rem;
    }
    .customized-li-right-p2{
      color: #363636FF;
      font-size: .22rem;
      padding-top: .5rem;
    }
    .customized-li-right{
      padding-left: .24rem;
    }
    .customized-li-gift-imgBox{
      width:1.2rem;
      height:1.2rem;
      background:#7301DD1A;
      border:1px solid rgba(115, 1, 221, 0.1);
      text-align: center;
      align-items: center;
    }
    .customized-li{
      position: relative;
      display: flex;
      justify-content: flex-start;
      padding: .8rem 0 0 .4rem;
    }
    .window-title{
      color: #252525FF;
      font-size: .36rem;
      text-align: center;
      padding-top: .5rem;
      font-weight:bold;
    }
    .window-close-button{
      width: 1.2rem;
      height: 1.2rem;
      position: absolute;
      right: 0rem;
      top: 0rem !important; 
      cursor: pointer;
      z-index: 100;
        img{
          width: 0.3rem;
          height: .3rem;
          margin: 0.6rem .45rem;
        }
      }
    .customized-list-box{
      z-index: 10000;
      width: 7.5rem;
      height: 9.26rem;
      background: #ffffff;
      position: fixed;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%, 0);
      border-radius:.24rem .24rem 0px 0px;
      -webkit-border-radius:.24rem .24rem 0px 0px;
      -moz-border-radius:.24rem .24rem 0px 0px;
    }
    .gift-btn{
      width:2.4rem;
      height:.72rem;
      border:1px solid rgba(79,80,155,1);
      opacity:0.8;
      border-radius:.36rem;
      -webkit-border-radius: .36rem;
      -moz-border-radius: .36rem;
      margin: 1rem auto .6rem;
      font-size: .28rem;
      color: #4F509BFF;
      text-align: center;
      line-height: .78rem;
    }
    .mask-tip3{
      text-align: center;
      color: #252525FF;
      font-size: .26rem;
    }
    .mask-img{
      margin: .3rem auto;
      width: .95rem;
      height: .58rem;
    }
    .gift-imgBox{
      width:1.2rem;
      height:1.2rem;
      margin: 1rem auto  .36rem;
      background:#7301DD1A;
      border:1px solid rgba(115, 1, 221, 0.1);
      text-align: center;
      align-items: center;
    }
    .no-gift-btn{
      width:2.4rem;
      height:.72rem;
      border:1px solid rgba(79,80,155,1);
      opacity:0.8;
      border-radius:.36rem;
      -webkit-border-radius: .36rem;
      -moz-border-radius: .36rem;
      margin: 1rem auto .6rem;
      font-size: .28rem;
      color: #4F509BFF;
      text-align: center;
      line-height: .72rem;
    }
    .mask-tip2{
     color: #252525FF;
     font-size: .26rem;
     text-align: center;
     margin-top: .35rem;
    }
    .tricky29{
      display: block;
      width:1.74rem;
      height:2.07rem;
      margin: .31rem auto 0;
    }
    .mask-tip1{
      color: #363636FF;
      font-size: .36rem;
      text-align: center;
      padding-top: .56rem;
    }
    .no-gift,.gift{
      width: 5.8rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      background: #FFFFFF;
      border-radius:.1rem;
      -webkit-border-radius: .1rem;
      -moz-border-radius:.1rem;
    }
    .trickyBoxbot{
      padding-bottom: .83rem;
      background: url(images/tricky1.jpg) no-repeat;
      background-size: 100%;
      background-color: #4F509B;
      .time-div{
        padding-top: 3.84rem;
        .time-span{
          display: block;
          width: 3.05rem;
          height: .37rem;
          background: url(images/tricky2.png) no-repeat;
          background-size: 100%;
          margin: 0 auto;
          z-index: 10;
        }
      }
      .tricky-tip{
        width: 5.3rem;
        margin: 0 auto;
        padding: 0 .63rem;
        color: #404691;
        font-size: .2rem;
        padding-top: 1.9rem;
        line-height: .34rem;
        text-indent: 2em;
        white-space :nowrap;
        letter-spacing:-1px;
      }
      .tricky-game{
        width: 6.44rem;
        //height: 7.78rem;
        margin: 3.4rem auto 0;
        padding-top: .36rem;
        background: url(images/tricky18.jpg) no-repeat;
        background-size: 100%;
        box-shadow:0px .08rem .24rem 0px rgba(102,102,102,0.25);
        -webkit-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
        -moz-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
        border-radius:.08rem;
        -webkit-border-radius: .08rem;
        -moz-border-radius:.08rem;
        .tricky-game-tip{
          position:relative;
          .tricky-game-tip-p{
            width: 3.18rem;
            height: .44rem;
            margin: 0 auto;
            img{
              width: 3.18rem;
              height: .44rem;
            }
          }
          .tricky-rule{
            width:1.5rem;
            height:.49rem;
            background:rgba(100,109,195,1);
            border-top-left-radius:.25rem;
            border-bottom-left-radius:.25rem;
            -webkit-border-top-left-radius:.25rem;
            -moz-border-top-left-radius:.25rem;
            -webkit-border-bottom-left-radius:.25rem;
            -moz-border-bottom-left-radius:.25rem;
            font-size: .26rem;
            color: #FFFFFF;
            text-align: center;
            line-height: .49rem;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .time-game-tip2{
          width: 5.18rem;
          padding-top: .2rem;
          padding-bottom: .2rem;
          margin: .3rem auto 0;
          background:#8790e0;
          border:.02rem dashed rgba(255,255,255,0.12);
          border-radius:8px;
          font-size: .24rem;
          color: #ffffff;
          text-align: center;
          line-height: .36rem;
        }
        .tricky-game-clownbox{
          position: relative;
          min-height: 4.15rem;
          .tricky-game-clown-ul{
            margin-top: .95rem;
            display: flex;
            justify-content: center;
            .tricky-game-clown-li{
              z-index: 200;
              position: relative;
              margin-bottom: .45rem;
              &:nth-child(2){
                margin-left: .36rem;
                margin-right: .36rem;
              }
              width: 1.66rem;
              height: 2.6rem;
              #tricky-game-clownbox-tip3{
                position: absolute;
                top: -.5rem;
                right: -.1rem;
                width: .88rem;
                height:.75rem;
                background: url(images/tricky11.png) no-repeat;
                background-size: 100% 100%;
              }
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          .tricky-game-clownbox-bot{
            width: 6.44rem;
            height: 1.1rem;
            z-index: -1;
          }
        }
        .logined{
          width: 6.44rem;
          height: 3.74rem;
          position: relative;
          .logined2{
            font-size: .22rem;
            width: 100%;
            position: absolute;
            top: -.55rem;
            left: 0;
            color: #FFFFFF;
            text-align:center;
            span{
              font-size: .3rem;
              font-family:PingFangSC-Regular;
            }
          }
          .logined-ul{
            display: flex;
            justify-content: center;
            width: 5.93rem;
            padding: .35rem .26rem 0;
            .logined-li{
              &:nth-child(2){
                margin-left: .07rem;
                margin-right: .07rem;
              }
              width:1.93rem;
              height:2.15rem;
              background:rgba(102,111,184,1);
              border-radius:.08rem;
              -webkit-border-radius: .08rem;
              -moz-border-radius:.08rem;
              .logined-li-p1{
                padding-top: .27rem;
                padding-left: .18rem;
                font-size: .28rem;
                color: #ffffff;
              }
              .logined-li-p2{
                padding-top: .18rem;
                padding-left: .18rem;
                font-size: .24rem;
                color: #FFBB29;
              }
              .logined-li-p3{
                padding-top: .36rem;
                padding-left: .18rem;
                font-size: .24rem;
                color: #ffffff;
                span{
                  font-size: .3rem;
                }
              }
            }
          }
          .customizedHistory{
            margin-top: .39rem;
            display: flex;
            justify-content: center;
            font-size:.26rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(211,215,255,1);
            align-items: center;
            .customizedHistory-span{
              display: inline-block;
              width: .21rem;
              height:.19rem;
              background: url(images/tricky14.png) no-repeat;
              background-size: 100%;
              margin-left: .1rem;
              margin-top: .05rem;
            }
          }
        }
      }
    }
    .tricky-active2{
      width: 6.44rem;
      margin: .35rem auto 0;
      padding-top: .32rem;
      padding-bottom: .6rem;
      box-shadow:0px .08rem .24rem 0px rgba(102,102,102,0.25);
      -webkit-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
      -moz-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
      border-radius:.08rem;
      -webkit-border-radius: .08rem;
      -moz-border-radius:.08rem;
      background: #8891E2;
      .tricky-game-tip-p{
        width: 4.38rem;
        height: .46rem;
        margin: 0 auto;
        img{
          width: 4.38rem;
          height: .46rem;
        }
      }
      .activeCardBox{
        width: 5.2rem;
        height: 3.5rem;
        background: url(images/tricky22.png) no-repeat;
        background-size: 100% 100%;
        margin: .3rem auto 0;
        position: relative;
        .activeCardBoxP{
          padding-left: .24rem;
          padding-top: .47rem;
          height: 1.23rem;
          display:table-cell; 
          vertical-align:bottom;
          overflow: hidden;
          span{
            &:nth-child(1){
              font-size: .26rem;
              color:#FFFFFF;
            }
            &:nth-child(2){
              font-size:.8rem;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height:.36rem;
            }
            &:nth-child(3){
              font-family:PingFangSC-Regular;
              font-weight:400;
              font-size:.24rem;
              color:rgba(255,255,255,1);
              line-height:.36rem;
            }
          }
        }
        .activeCardBoxTip2{
          font-size: .2rem;
          padding-left: .24rem;
          padding-top: .1rem;
          color:rgba(255,255,255,1);
          opacity:0.67;
        }
        .activeCardBoxTip3{
          font-size:.2rem;
          padding-left: .24rem;
          padding-top: .7rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          opacity:0.67;
        }
        .activeCardBox-date{
          width: 1.62rem;
          height: 1.38rem;
          background: url(images/tricky23.png) no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 0rem;
          right: 0rem;
        }
        .activeCarduseBtn{
          width:1.9rem;
          height:.68rem;
          background:linear-gradient(180deg,rgba(255,159,8,1) 0%,rgba(255,138,8,1) 100%);
          box-shadow:0px .08rem 2.24rem 0px rgba(102,102,102,0.15);
          -webkit-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
          -moz-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
          border-radius:.08rem;
          -webkit-border-radius: .08rem;
          -moz-border-radius:.08rem;
          font-size:.26rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-align: center;
          line-height: .68rem;
          position: absolute;
          bottom: .18rem;
          right: .23rem;
        }
      }
      .time-game-tip2{
        width: 5.18rem;
        height: 1.3rem;
        padding-top: .2rem;
        margin: .3rem auto 0;
        background:#8790e0;
        border:.02rem dashed rgba(255,255,255,0.12);
        border-radius:.08rem;
        -webkit-border-radius: .08rem;
        -moz-border-radius:.08rem;
        font-size: .24rem;
        color: #ffffff;
        text-align: center;
        line-height: .36rem;
      }
      .tricky-input-box{
        width: 100%;
        .tricky-input{
          display: block;
          width:5.2rem;
          height:.8rem;
          border:.03rem solid rgba(226,210,255,1);
          box-shadow:0px 0px .12rem 0px rgba(178,138,255,0.36);
          border-radius:.08rem;
          -webkit-border-radius: .08rem;
          -moz-border-radius:.08rem;
          margin: 0.6rem auto 0;
          text-align: center;
          font-size: .26rem;
          color: #ffffff;
          background:rgba(136,145,226,1);
        }
        .tricky-input::-webkit-input-placeholder { /* WebKit browsers */
          font-size:.26rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .tricky-input::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-size:.26rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .tricky-input:-ms-input-placeholder { /* Internet Explorer 10+ */
          font-size:.26rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .tricky-input-text{
          font-size:.22rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:.34rem;
          opacity:0.67;
          text-align: center;
          margin-top: .2rem;
        }
        .goCustomized{
          width:5.2rem;
          height:.88rem;
          background:linear-gradient(180deg,rgba(255,159,8,1) 0%,rgba(255,138,8,1) 100%);
          box-shadow:0px .08rem .24rem 0px rgba(102,102,102,0.25);
          -webkit-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
          -moz-box-shadow: 0px .08rem .24rem 0px rgba(102,102,102,0.25);
          border-radius:.08rem;
          -webkit-border-radius: .08rem;
          -moz-border-radius:.08rem;
          margin: 0.36rem auto 0;
          font-size:.26rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:.88rem;
          text-align: center;
        }
      }
      .customizedHistory{
          margin-top: .39rem;
          display: flex;
          justify-content: center;
          font-size:.26rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(211,215,255,1);
          align-items: center;
          .customizedHistory-span{
            display: inline-block;
            width: .21rem;
            height:.19rem;
            background: url(images/tricky14.png) no-repeat;
            background-size: 100%;
            margin-left: .1rem;
            margin-top: .05rem;
          }
        }
    }
    .tricky-bot{
      font-size:.22rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:.42rem;
      opacity:0.67;
      text-align: center;
      margin-top: .47rem;
    }
  }
</style>
