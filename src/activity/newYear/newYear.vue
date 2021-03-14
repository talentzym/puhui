<template>
  <div id="newYear-view" class="plus-screen-view">
		<activityBack :src="backIcon"></activityBack>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="model sign-in-model">
          <div class="model-title">
            <img src="./images/title-model1.png"/>
          </div>
          <div class="model-label">
            <p>自律的人生会开挂，早睡早起有钱拿</p>
            <p>新的一年坚持自律人生</p>
            <p>让我们每天早晨5点到9点之间签到</p>
            <p>开启宝箱，获得更多提“钱”的机会</p>
          </div>
          <div class="sign-in-box">
            <p class="sign-in-status" v-show="isLogin && isOpen && data.serial !== 0 && data.serial !== 22 && (thisDayIndex !== 21 && !data.signedList[21].status)">已连续签到<span>{{ data.serial }}</span>天，再坚持<span>{{ data.serial >= 15 ? 22 - data.serial : 5 - data.serial % 5 }}</span>天可开奖</p>
<!--            <p class="sign-in-status" v-show="">&nbsp;</p>-->
            <p class="sign-in-status" v-show="!isLogin || !isOpen || data.serial === 0 || data.serial === 22 || !(thisDayIndex !== 21 && !data.signedList[21].status)">{{ data.serial === 22 ? '连续签到22天，恭喜您获得全勤奖' : '&nbsp;' }}</p>
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item, $index) in data.signedList" v-bind:key="item.id">
                <!-- 未签到 -->
                <img v-show=" !item.status && !item.isFive && $index > thisDayIndex" src="./images/sign-in-default.png"/>
                <img v-show=" !item.status && item.isFive && $index > thisDayIndex" src="./images/sign-in-default-five.png"/>
                <img v-show=" !item.status && !item.isFive && $index < thisDayIndex" src="./images/sign-in-repair.png" v-on:click="signIn(item.id)"/>
                <img v-show=" !item.status && item.isFive && $index < thisDayIndex" src="./images/sign-in-repair-five.png" v-on:click="signIn(item.id)"/>
                <img v-show=" !item.status && !item.isFive && $index === thisDayIndex" src="./images/sign-in-now-false.png"/>
                <img v-show=" !item.status && item.isFive && $index === thisDayIndex" src="./images/sign-in-now-false-five.png"/>
                <!-- 已签到 -->
                <img v-show=" item.status && !item.isFive && $index < thisDayIndex" src="./images/sign-in-yes-default.png"/>
                <img v-show=" item.status && item.isFive && $index < thisDayIndex" src="./images/sign-in-yes-five.png"/>
                <img v-show=" item.status && !item.isFive && $index === thisDayIndex" src="./images/sign-in-now-true.png"/>
                <img v-show=" item.status && item.isFive && $index === thisDayIndex" src="./images/sign-in-now-true-five.png"/>
                <p>{{ item.day }}</p>
              </swiper-slide>
            </swiper>
            <p class="signatureNum">{{ isLogin && isOpen ? '您可补签' + data.signatureNum + '次' : '&nbsp;' }}</p>
            <div class="sign-button" v-on:click="signIn()"></div>
          </div>
          <div class="button-box">
            <div class="button-default" v-on:click="referRecord()">获奖记录</div>
            <div class="button-default" v-on:click="windowOpen('ParticipateWindowFlag')">参与奖励</div>
          </div>
          <div class="model-information">
            <h4>补签神助：</h4>
            <p>坚持签到了好多天，有一天忘记签到了怎么办？之前的辛苦就这样白费了吗......</p>
            <p>没关系！这都不是事儿〜我们还有【补签特权】来帮你哦〜只要在活动期间，断档次日单笔出借满2000元，即可享有一次补签特权！每位用户领取补签特权上限为5次。</p>
            <h4>活动提示：</h4>
            <p>过年就是放纵么？清晨一签，早睡早起，助你形成健康生活习惯。</p>
          </div>
        </div>
        <div class="model share-model">
          <div class="model-title">
            <img src="./images/title-model2.png"/>
          </div>
          <div class="model-label">
            <p>最大的快乐是分享，过年一起来投资。</p>
          </div>
          <div class="button-box" v-show="!isLogin || !isOpen">
            <div class="button-default" v-on:click="share()">分享</div>
          </div>
          <div class="share-login" v-show="isLogin && isOpen">
            <ul class="user-infor">
              <li v-on:click="windowOpen('finishWindowFlag')">
                <p><span>{{ fmoney(data.getAmount, 2) }}</span> 元</p>
                <p>已收入囊中</p>
              </li>
              <li v-on:click="windowOpen('roadWindowFlag')">
                <p><span>{{ fmoney(data.getTheWayAmount, 2) }}</span> 元</p>
                <p>在路上奖励</p>
              </li>
            </ul>
            <p>Hi，{{ data.userName }}</p>
            <div class="share-button" v-on:click="share()">分享</div>
          </div>
          <div class="model-information">
            <h4>规则：</h4>
            <p>1.&nbsp;您分享的活动，平台老用户可领取不等面额返现券， </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;领取人使用后您将获得同等面值的红包;</p>
            <p>2.&nbsp;您分享的活动，平台新用户可领取不等面额红包，领</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;取人兑换后您将获得同等面值的红包；</p>
            <p>3.&nbsp;领取的分享红包若未被使用，领取人不得再次领取红</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;包或返现券；</p>
            <p>4.&nbsp;您当天累计获得的红包会在下一日发至您的账户，记</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;得兑换。</p>
          </div>
        </div>
        <div class="model recharge-model">
          <div class="model-title">
            <img src="./images/title-model3.png"/>
          </div>
          <div class="model-label">
            <p>网银充值大返利，金猪元宝任你拿</p>
            <p v-show="isLogin && isOpen">净充值金额：<span style="color: #d63138;">{{ fmoney(data.amount, 2) }}元</span></p>
          </div>
          <div class="button-box">
            <div class="button-default" v-on:click="windowOpen('rechargeWindowFlag')">榜单</div>
            <div class="button-default" v-on:click="doCopy()">复制链接</div>
          </div>
          <router-link tag="p" to="/addressList" v-show="isLogin && isOpen" class="addressList">收货地址</router-link>
          <div class="model-information">
            <h4>提示：</h4>
            <p>1.&nbsp;活动期间，在电脑端网银累计净充值满1万即送万二 </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;现金红包，活动奖励在下一个工作日安排发放。</p>
            <p>2.&nbsp;电脑端网银充值最多的十名用户且充值金额最低满20</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;万元即额外赠送价值1000元的足金元宝金猪吊坠。</p>
            <p>3.&nbsp;累计净充值=活动期间内累计充值金额-累计提现金</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;额。</p>
            <p>4.&nbsp;活动奖励于活动结束后七个工作日内统一发放哦，请</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;大家不要着急，等等就来哈。</p>
          </div>
        </div>
        <p class="bottom-infor">网贷有风险，出借需谨慎</p>
        <img src="./images/fan-bottom.png" class="bottom-fan"/>
      </div>
    </div>
    <!--签到5/10/15/全勤 中奖弹窗-->
    <div class="window" id="award-window" v-show="awardWindowFlag">
      <div class="window-header">
        <div class="window-title">自律宝箱开奖啦</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('awardWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <dl class="award">
        <dt><img src="./images/award-integral.png"/></dt>
        <dd class="integral">{{ awardData.integral }}积分</dd>
      </dl>
      <dl class="award">
        <dt><img :src="awardVoucherIcon"/></dt>
        <dd class="voucher">
          <p>{{ awardData.voucher }}元返现券*5</p>
          <p>出借满{{ awardData.bidAmount }}，期限{{ awardData.deadLine }}天起可用</p>
          <p>有效期10天</p>
        </dd>
      </dl>
      <div class="award-window-button" v-on:click=" windowClose('awardWindowFlag')">知道了</div>
    </div>
    <!--净充值排行榜弹窗-->
    <div class="window" id="recharge-window" v-show="rechargeWindowFlag">
      <div class="window-header">
        <div class="window-title">净充值榜单</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('rechargeWindowFlag')">
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
                <td>净充值额&nbsp;&nbsp;(元)</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, $index) in data.rechargeRankList" v-bind:key="item.userId">
                <td>{{ $index + 1 }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ fmoney(item.amount, 2) }}</td>
              </tr>
            </tbody>
          </table>
          <p class="no-more">到底了，没有更多啦</p>
        </div>
      </div>
    </div>
    <!--参与奖励弹窗-->
    <div class="window" id="participat-window" v-show="ParticipateWindowFlag">
      <div class="window-header">
        <div class="window-title">参与奖励</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('ParticipateWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div class="window-content">
        <div class="window-scroll">
          <dl class="award">
            <dt><img src="./images/award-voucher-10.png"/></dt>
            <dd class="voucher">
              <p>连续签到5天</p>
              <p>10元返现券*5，200积分</p>
              <p>出借满5000，期限60天以上，有效期10天</p>
            </dd>
          </dl>
          <dl class="award">
            <dt><img src="./images/award-voucher-20.png"/></dt>
            <dd class="voucher">
              <p>连续签到10天</p>
              <p>20元返现券*5，300积分</p>
              <p>出借满6000，期限60天以上，有效期10天</p>
            </dd>
          </dl>
          <dl class="award">
            <dt><img src="./images/award-voucher-50.png"/></dt>
            <dd class="voucher">
              <p>连续签到15天</p>
              <p>50元返现券*5，450积分</p>
              <p>出借满10000，期限90天以上，有效期10天</p>
            </dd>
          </dl>
          <dl class="award">
            <dt><img src="./images/award-voucher-100.png"/></dt>
            <dd class="voucher">
              <p>全勤</p>
              <p>100元返现券*5，700积分</p>
              <p>出借满16000，期限90天以上，有效期10天</p>
            </dd>
          </dl>
          <p class="no-more">到底了，没有更多啦</p>
        </div>
      </div>
    </div>
    <!--获奖记录弹窗-->
    <div class="window" id="record-window" v-show="recordWindowFlag">
      <div class="window-header">
        <div class="window-title">获奖记录</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('recordWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div class="window-content">
        <div class="window-scroll">
          <div v-show="recordData && recordData.length">
            <dl class="award" v-for="(item, $index) in recordData" v-bind:key="$index">
              <dt>
                <img v-show="item.type === 1" :src=" item.type === 1 ? require('./images/award-voucher-'+ item.nominalValue + '.png') : ''"/>
                <img v-show="item.type === 2" src="./images/award-integral.png" />
              </dt>
              <dd class="voucher">
                <p>{{ item.nominalValue }}{{ item.type === 1 ? '元返现券' : '积分' }}</p>
                <p>{{ item.type === 1 ? '出借满' + item.quttMinInvest + '元，期限'+ item.quttProjectDeadline + '天起可用' : '' }}</p>
                <p>{{ item.createTime }}获得</p>
              </dd>
              <!--<router-link tag="div" to="/project" v-show="item.type === 1 && overdue(item.createTime)" class="record-button">立即使用</router-link>-->
              <div v-show="item.type === 1 && !overdue(item.createTime)" class="record-button record-button-overdue">已过期</div>
            </dl>
            <p class="no-more">到底了，没有更多啦</p>
          </div>
          <div v-show="!recordData || !recordData.length" class="empty-box">
            <img src="./images/empty-icon.png"/>
            <p>咦，暂未获得奖励</p>
          </div>
        </div>
      </div>
    </div>
    <!--已收入囊中弹窗-->
    <div class="window" id="finish-window" v-show="finishWindowFlag">
      <div class="window-header">
        <div class="window-title">已收入囊中</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('finishWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div class="window-content">
        <div class="window-scroll">
          <div v-show="finishData.length">
            <ul>
              <li v-for="(item, $index) in finishData" v-bind:key="$index">
                <p>{{ item.mobile }}</p>
                <p>{{ item.createTime }}</p>
                <span><span>{{ item.amountValue }}</span>元</span>
              </li>
            </ul>
            <p class="no-more">到底了，没有更多啦</p>
          </div>
          <div v-show="!finishData.length" class="empty-box">
            <img src="./images/empty-icon.png"/>
            <p>咦，暂未获得奖励</p>
          </div>
        </div>
      </div>
    </div>
     <!--在路上奖励弹窗-->
    <div class="window" id="road-window" v-show="roadWindowFlag">
      <div class="window-header">
        <div class="window-title">在路上奖励</div>
        <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('roadWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div class="window-content">
        <div class="window-scroll">
          <div v-show="roadData.length">
            <ul>
              <li v-for="(item, $index) in roadData" v-bind:key="$index">
                <p>{{ item.mobile }}</p>
                <p>{{ item.createTime }}</p>
                <span><span>{{ item.amountValue }}</span>元</span>
              </li>
            </ul>
            <p class="no-more">到底了，没有更多啦</p>
          </div>
          <div v-show="!roadData.length" class="empty-box">
            <img src="./images/empty-icon.png"/>
            <p>咦，暂未获得奖励</p>
          </div>
        </div>
      </div>
    </div>
    <!--签到时间提示弹窗-->
    <div id="timeWindow" v-show="timeWindowFlag">
     <p>签到时间为每日5:00 - 9:00</p>
     <div v-on:click="windowClose('timeWindowFlag')">知道了</div>
    </div>
    <shareWindow></shareWindow>
  </div>
</template>

<script>
import Vue from 'vue'
import activityBack from '@/components/activityBack'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Indicator } from 'mint-ui'
import 'mescroll.js/mescroll.min.css'
import $ from 'jquery'
import shareWindow from '@/components/shareWindow'
import VueClipboard from 'vue-clipboard2'
export default{
  data () {
    return {
      awardVoucherIcon: require('./images/award-voucher-10.png'),
      rechargeWindowFlag: false,
      ParticipateWindowFlag: false,
      recordWindowFlag: false,
      roadWindowFlag: false,
      finishWindowFlag: false,
      awardWindowFlag: false,
      timeWindowFlag: false,
      backIcon: require('./images/back-icon.png'),
      thisDayIndex: -1,
      isOpen: true,
      data: {
        today: new Date().getDate(),
        signedList: [{
          id: 1,
          day: 22,
          status: 0
        }, {
          id: 2,
          day: 23,
          status: 0
        }, {
          id: 3,
          day: 24,
          status: 0
        }, {
          id: 4,
          day: 25,
          status: 0
        }, {
          id: 5,
          day: 26,
          status: 0
        }, {
          id: 6,
          day: 27,
          status: 0
        }, {
          id: 7,
          day: 28,
          status: 0
        }, {
          id: 8,
          day: 29,
          status: 0
        }, {
          id: 9,
          day: 30,
          status: 0
        }, {
          id: 10,
          day: 31,
          status: 0
        }, {
          id: 11,
          day: 1,
          status: 0
        }, {
          id: 12,
          day: 2,
          status: 0
        }, {
          id: 13,
          day: 3,
          status: 0
        }, {
          id: 14,
          day: 4,
          status: 0
        }, {
          id: 15,
          day: 5,
          status: 0
        }, {
          id: 16,
          day: 6,
          status: 0
        }, {
          id: 17,
          day: 7,
          status: 0
        }, {
          id: 18,
          day: 8,
          status: 0
        }, {
          id: 19,
          day: 9,
          status: 0
        }, {
          id: 20,
          day: 10,
          status: 0
        }, {
          id: 21,
          day: 11,
          status: 0
        }, {
          id: 22,
          day: 12,
          status: 0
        }]
      },
      swiperOption: {
        slidesPerView: 7,
        slidesPerGroup: 1,
        grabCursor: true,
        cancelable: false
      },
      isLogin: false,
      awardData: {},
      recordData: [],
      finishData: [],
      roadData: [],
      plus: undefined
    }
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    activityBack,
    swiper,
    swiperSlide,
    VueClipboard,
    shareWindow
  },
  methods: {
    $_init () {
      var params = {
        activityId: '2019NewYear'
      }
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
        if (res.data.data.data.code === 1) {
          this.isLogin = true
          this.isOpen = true
          this.data = res.data.data.data
          this.shareConfig()
          this.dayIndex()
        } else if (res.data.data.data.code === 100003) {
          this.data.rechargeRankList = res.data.data.data.rechargeRankList
          this.isLogin = false
        } else if (res.data.data.data.code === 100002) {
          this.isOpen = false
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
    dayIndex () {
      var num = 0
      for (var i = 0; i < this.data.signedList.length; i++) {
        if (this.data.today === this.data.signedList[i].day) {
          this.thisDayIndex = i
          this.mySwiper.slideTo(this.thisDayIndex, 0)
        }
      }
      for (var l = 0; l < this.data.signedList.length; l++) {
        num++
        if (this.data.signedList[l].status || l >= this.thisDayIndex) {
          if (num < 20) {
            this.data.signedList[l].isFive = num !== 0 && num % 5 === 0
          } else {
            this.data.signedList[l].isFive = num === 22
          }
        } else {
          if ((num + 1) % 5 === 0 && num !== 20) {
            this.data.signedList[l].isFive = true
          }
          num = 0
        }
      }
    },
    signIn (signedId) {
      if (this.isLogin && this.isOpen) {
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/signed',
          method: 'post',
          params: {},
          data: {
            activityId: '2019NewYear',
            signedId: !signedId ? this.data.signedList[this.thisDayIndex].id : signedId
          },
          timeout: this.axiosTimeout,
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
          }]
        }).then((res) => {
          if (res.data.data.data.code === 1) {
            this.$layer.toast('签到成功！')
            this.$_init()
            if ((res.data.data.data.serial < 20 && res.data.data.data.serial % 5 === 0) || res.data.data.data.serial === 22) {
              if (res.data.data.data.serial === 5) {
                this.awardData.integral = 200
                this.awardData.voucher = 10
                this.awardData.bidAmount = 5000
                this.awardData.deadline = 60
              } else if (res.data.data.data.serial === 10) {
                this.awardData.integral = 300
                this.awardData.voucher = 20
                this.awardData.bidAmount = 6000
                this.awardData.deadline = 60
              } else if (res.data.data.data.serial === 15) {
                this.awardData.integral = 450
                this.awardData.voucher = 50
                this.awardData.bidAmount = 10000
                this.awardData.deadline = 90
              } else if (res.data.data.data.serial === 22) {
                this.awardData.integral = 700
                this.awardData.voucher = 100
                this.awardData.bidAmount = 16000
                this.awardData.deadline = 90
              }
              this.awardVoucherIcon = require('./images/award-voucher-' + this.awardData.voucher + '.png')
              this.windowOpen('awardWindowFlag')
            }
          } else if (res.data.data.data.code === 100001) {
            this.toLogin('/newYear')
          } else if (res.data.data.data.code === 100006) {
            this.windowOpen('timeWindowFlag')
          } else {
            this.$layer.toast(res.data.data.data.msg)
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('操作失败，请重新尝试！')
          }
        })
      } else {
        if (!this.isOpen) {
          this.$layer.toast('不在活动时间范围内！')
        } else {
          this.toLogin('/newYear')
        }
      }
    },
    doCopy () {
      var _this = this
      this.$copyText('https://www.puhuilicai.com/').then(function (e) {
        _this.$layer.toast('复制成功！')
      }, function (e) {
        _this.$layer.toast('复制失败！')
      })
    },
    windowOpen (flag) {
      if (flag === 'finishWindowFlag' || flag === 'roadWindowFlag') {
        this.inviteAward(flag)
      } else {
        this[flag] = true
        this.$mask.show()
      }
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    referRecord () {
      if (this.isLogin && this.isOpen) {
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getSignedRanking',
          method: 'GET',
          params: {
            activityId: '2019NewYear'
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
          if (res.data.data.code === 1) {
            this.recordData = res.data.data.data.prizelist
            this.windowOpen('recordWindowFlag')
          } else if (res.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/newYear')
          } else {
            this.$layer.toast(res.data.data.msg ? res.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      } else {
        if (!this.isOpen) {
          this.$layer.toast('不在活动时间范围内！')
        } else {
          this.toLogin('/newYear')
        }
      }
    },
    overdue (creatTime) {
      var invalidDate = new Date(this.getDay(10, new Date(creatTime).getTime()).replaceAll('-', '/') + ' 23:59:59').getTime()
      var nowDate = new Date().getTime()
      if (nowDate >= invalidDate) {
        return false
      } else {
        return true
      }
    },
    share () {
      if (this.isLogin && this.isOpen) {
        /* eslint-disable */
        if (this.plus) {
        /* eslint-disable */
          this.appShare(true)
        } else {
          $('#share-window').show()
        }
      } else {
        if (!this.isOpen) {
          this.$layer.toast('不在活动时间范围内！')
        } else {
          this.toLogin('/newYear')
        }
      }
    },
    inviteAward (type) {
      if (this.isLogin) {
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/listHistoryByRedPack',
          method: 'GET',
          params: {
            activityId: '2019NewYear',
            type: type === 'finishWindowFlag' ? 1 : 2
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
            this[type === 'finishWindowFlag' ? 'finishData' : 'roadData'] = res.data.data.data.result
            this[type] = true
            this.$mask.show()
          } else if (res.data.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/newYear')
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
        this.toLogin('/newYear')
      }
    },
    shareConfig () {
      /* eslint-disable */
      if (this.plus) {
      /* eslint-disable */
        this.shareObj = {
          href: location.href.split('#')[0] + '#/activityShare?inviteCold=' + this.data.inviteCold + '&redWarsFlag=' + this.data.redWarsFlag,
          title: '#普惠理财·金猪贺岁#和我一起瓜分红包返现券',
          content: '免费领10300元礼包',
          thumbs: ['https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'],
          type: 'web'
        }
      } else {
        this.wxShare({
          title: '#普惠理财·金猪贺岁#和我一起瓜分红包返现券',
          desc: '免费领10300元礼包',
          url: location.href.split('#')[0] + '#/activityShare?inviteCold=' + this.data.inviteCold + '&redWarsFlag=' + this.data.redWarsFlag
        })
      }
    }
  },
  mounted () {
    /* eslint-disable */
    mui.plusReady(() => {
      this.plus = plus
      Vue.prototype.plus = plus
      this.updateSerivces()
      mui.init({
        beforeback: () => {
          if (Vue.prototype.isMask) {
            this.$mask.hide()
            this.rechargeWindowFlag = false
            this.ParticipateWindowFlag = false
            this.recordWindowFlag = false
            this.roadWindowFlag = false
            this.timeWindowFlag = false
            this.finishWindowFlag = false
            this.awardWindowFlag = false
            return false
          } else {
            if (location.href.split('#')[1].indexOf('newYear') !== -1) {
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
    this.$nextTick(this.$_init())
  }
}
</script>

<style lang="less">
@import url('./css/newYear.less');
#newYear-view{
  .share-login{
    width: 100%;
    height: 3.3rem;
    margin: 0.4rem 0 0.35rem 0;
    background: url(./images/share-bg.png) no-repeat 0 0;
    background-size: 100%;
    .user-infor{
      display: flex;
      width: 5.6rem;
      height: 1.52rem;
      margin: 0 auto;
      padding-top: 0.2rem;
      box-sizing: border-box;
      li{
        width: 50%;
        padding-left: 0.4rem;
        p{
          color: #90460a;
          font-size: 0.22rem;
          span{
            color: #6d3507;
            font-size: 0.48rem;
          }
          &:last-child{
            padding-top: 0.08rem;
            background: url(./images/address-icon.png) no-repeat 1.3rem 0.15rem;
            background-size: 0.1rem;
          }
        }
      }
    }
    > p {
      text-align: center;
      font-size: 0.26rem;
      color: #6d3507;
      margin: 0.15rem 0 0.2rem 0;
    }
    .share-button{
      width: 4rem;
      height: 0.7rem;
      text-align: center;
      line-height: 0.7rem;
      background: #fceab9;
      border-radius: 0.35rem;
      margin: 0 auto;
      font-size: 0.28rem;
      color: #90460a;
    }
  }
  #finish-window, #road-window{
    ul{
      font-size: 0.3rem;
      li{
        height: 0.8rem;
        position: relative;
        margin: 0.6rem 0;
        p:first-child{
          color: #252525;
        }
        p:nth-child(2){
          font-size: 0.24rem;
          color: #898989;
          margin-top: 0.1rem;
        }
        >span{
          position: absolute;
          color: #222;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        >span span{
          font-size: 0.56rem;
        }
      }
    }
    &#finish-window span{
      color: #f05531;
    }
  }
  .empty-box{
    img{
      margin: 1.5rem auto 0.45rem auto;
      width: 1.6rem;
    }
    p{
      text-align: center;
      font-size: 0.3rem;
      color: #363636;
    }
  }
  #timeWindow{
    width: 5.8rem;
    height: 3.4rem;
    padding: 0.75rem 0;
    box-sizing: border-box;
    border-radius: 0.1rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    p{
      font-size: 0.3rem;
      color: #363636;
      line-height: 0.4rem;
      text-align: center;
    }
    div{
      width: 2.4rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      border-radius: 0.35rem;
      margin: 0.7rem auto 0 auto;
      font-size: 0.28rem;
      color: #e64f2c;
      border: 1px solid #e64f2c;
    }
  }
}
</style>
