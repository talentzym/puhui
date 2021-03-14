<template>
 <div class="plus-screen-view" id="mothersDay-view">
   <activityBack></activityBack>
   <div class="mask" v-show="maskFalg"></div>
   <div class="plus-screen-content mescroll">
     <div class="plus-screen-scroll">
       <div class="model-0">
         <p>慈母手中线，游子身上衣。临行密密缝，意恐</p>
         <p>迟迟归。谁言寸草心，报得三春晖？</p>
         <p>这个母亲节，让我们一起为爱创造惊喜吧！</p>
       </div>
       <div class="model-1">
         <div class="model-title">母亲节专属卡券<i class="title-bg"></i></div>
         <div class="model-label">每天上午10:30，限量领5.21、52.1、131.4和521元返现券</div>
         <p class="tips">单次只能领取一张，使用完后可领取第二张，数量有限先到先得，卡券不可转让哦~</p>
         <ul class="redbag-box">
           <li class="redbag" v-for="(item, index) in redbagList" v-bind:key="index" v-on:click="lottery('1', item.nominalValue, index)">
             <img :src="item.prizeAmount === 0 ? require('./images/redbag-'+index+'-null.png') : require('./images/redbag-'+index+'.png')" alt="" :class="'redbag' + index">
           </li>
         </ul>
         <div class="receive-record" v-on:click="windowOpen('activityOneRecordWindowFlag', 1)">领取记录<i class="icon-right"></i></div>
       </div>
       <div class="model-2">
         <div>
            <div class="model-title">网银净充领券<i class="title-bg t2"></i></div>
            <div class="model-label">网银净充值满额即获加息、返现券奖励。</div>
            <p class="Quota" v-if="isLogin">
              <span class="tips-s">网银净充值额</span>
              <span class="tips-l phlc-yxfont">{{ thisRank.DEALAMOUNT ? fmoney(thisRank.DEALAMOUNT, 2) : '0.00'}}</span>
            </p>
            <div class="submit-btn" v-on:click="lottery('2')">立即获取</div>
            <ul class="model2-record">
              <li class="receive-record edu" v-on:click="windowOpen('mothersDayRuleWindowFlag')">额度标准<i class="icon-right"></i></li>
              <li class="receive-record" v-on:click="windowOpen('activityOneRecordWindowFlag', 2)">获取记录<i class="icon-right"></i></li>
            </ul>
         </div>
         <div class="content-2">
            <div class="division-line">
              <i class="circular c1"></i>
              <i class="line"></i>
              <i class="circular c2"></i>
            </div>
            <div class="model-title rechargeList" style="padding-top:.8rem;"><i class="title-icon icon-left"></i>净充值榜单<i class="title-icon icon-right"></i></div>
            <div class="list-box">
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
                      <td v-if="thisRank.RN <= 3"><img :src="require('./images/no'+ thisRank.RN +'.png')" alt=""></td>
                      <td v-if="thisRank.RN > 3">{{thisRank.RN}}</td>
                      <td>{{ thisRank.userName }}</td>
                      <td class="phlc-yxfont">{{ fmoney(thisRank.DEALAMOUNT, 2) }}</td>
                    </tr>
                    <tr v-for="(item, $index) in rechargeRankList" v-bind:key="$index"  v-show="rechargeRankList.length">
                      <td v-if="$index <= 2"><img :src="require('./images/no'+ ($index + 1) +'.png')" alt=""></td>
                      <td v-if="$index > 2">{{ $index + 1 }}</td>
                      <td>{{ item.userName }}</td>
                      <td class="phlc-yxfont">{{ fmoney(item.DEALAMOUNT, 2) }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="list-no-data" v-show="!rechargeRankList.length">咦，暂无上榜用户~</div>
            </div>
            <div class="bottom-tips">
              <p>1、网银净充值的定义：活动期间内网银累计充值金额-活动期间内累计提现金额；</p>
              <p>2、榜单前三的用户且充值金额满100万元额外赠送价值2000元的周大福女士戒指一枚；</p>
              <p>3、获得卡券不可转让哦~</p>
            </div>
         </div>
       </div>
       <div class="caution">— 网贷有风险，出借需谨慎 —</div>
     </div>
   </div>
   <!--额度&奖励标准弹窗-->
   <div class="window-2" id="rules-window" v-show="mothersDayRuleWindowFlag">
     <div class="window-header">
        <div class="window-title">额度及奖励标准</div>
     </div>
     <div class="rules-content mescroll">
       <p>从每一档位2选1领取，卡券有效期均为7天哦~</p>
       <div class="rules-block">
         <h2 class="rules-title">满15000元档</h2>
         <p>奖励卡券：15元返现券 (5张)<br>使用条件：出借满5000元/期限90天以上</p>
         <p>奖励卡券：7.5‰的加息券 (5张)<br>使用条件：出借50万元内/期限180天内</p>
       </div>
       <div class="rules-block">
         <h2 class="rules-title">满50000元档</h2>
         <p>奖励卡券：50元返现券 (5张)<br>使用条件：出借满15000元/期限90天以上</p>
         <p>奖励卡券：10‰的加息券 (5张)<br>使用条件：出借50万元内/期限180天内</p>
       </div>
       <div class="rules-block">
         <h2 class="rules-title">满150000元档</h2>
         <p>奖励卡券：150元返现券 (5张)<br>使用条件：出借满40000元/期限90天以上</p>
         <p>奖励卡券：12‰的加息券 (5张)<br>使用条件：出借50万元内/期限180天内</p>
       </div>
       <div class="rules-block">
         <h2 class="rules-title">满200000元档</h2>
         <p>奖励卡券：1200元返现券 (5张)<br>使用条件：出借满300000元/期限90天以上</p>
         <p>奖励卡券：15‰的加息券 (5张)<br>使用条件：出借50万元内/期限180天内</p>
       </div>
     </div>
     <div class="know-btn" v-on:click="windowClose('mothersDayRuleWindowFlag')">知道了</div>
     <div class="window-close" v-on:click="windowClose('mothersDayRuleWindowFlag')">
       <img src="./images/close.png" alt="">
     </div>
   </div>
   <!--活动-1-领取奖品-弹窗-->
   <div class="window-1" v-show="surprisedWindowFlag">
     <div v-if="activityOnetype===2">
        <div class="head-img"></div>
        <div class="card-box far-alway">
          <div class="surprise-left">
            <span>{{rewardData.activityOneNominalValue}}</span>
            <span>返现券(元)</span>
          </div>
          <div class="surprise-right far-alway-1">
            <p>出借满{{rewardData.loanAmount}}元</p>
            <p>期限90天以上</p>
            <p>有效期至：仅限今天，快去使用</p>
          </div>
        </div>
     </div>
     <div v-if="activityOnetype===1" class="nothing">
       <img src="./images/over-icon.png" alt="">
       <p>10:30开始，来早唠</p>
     </div>
     <div v-if="activityOnetype===3" class="nothing">
       <img src="./images/no-icon.png" alt="">
       <p>没啦，明天早点到哦~</p>
     </div>
     <div class="know-btn" :class="!activityOnetype===2 ? 'overbtn' : ''" v-on:click="windowClose('surprisedWindowFlag')">知道了</div>
   </div>
   <!--活动-奖品记录-弹窗-->
   <div class="window" id="prize-window" v-show="activityOneRecordWindowFlag">
     <div class="window-header">
        <div class="window-title">领取记录(<span>{{listTotal}}</span>)</div>
     </div>
     <div class="mescroll" id="mescroll">
       <div class="prize-record" id="scroll">
        <div class="prize-box" v-for="(item, index) in activityOneList" v-bind:key="index" :class="item.USESTATUS !== 0 ? 'overdue' : ''">
            <div class="prize-left">
              <span class="phlc-yxfont">{{item.NOMINALVALUE}}</span>
              <span>{{item.AWARDNAME.indexOf('返现券') > 0 ? '返现券(元)' : '加息券(‰)'}}</span>
            </div>
            <div class="prize-right">
              <p>{{item.AWARDNAME.indexOf('返现券') > 0 ? '出借满' + item.QUTTMININVEST + '元' : '出借50万元内'}} /期限{{item.AWARDNAME.indexOf('返现券') > 0 ? '90天以上' : '180天内'}}</p>
              <p>{{ new Date(item.INVAILDTIME).format('yyyy-MM-dd').replaceAll('-', '.') }}到期</p>
              <p>{{ new Date(item.CREATETIME).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') }}获得</p>
            </div>
            <div class="over-icon" :class="item.USESTATUS === -1 ? 'expired' : 'used'" v-if="item.USESTATUS!==0"></div>
        </div>
      </div>
     </div>
     <div class="window-close" v-on:click="windowClose('activityOneRecordWindowFlag')">
       <img src="./images/close.png" alt="">
     </div>
   </div>
   <!--活动-2-获取奖励-弹窗-->
   <div class="window-1" v-show="activityTwoRecordWindowFlag">
     <div v-if="activityTwotype === 1">
        <div class="activity-2-head-img">
          <p class="activity-2-head-text">从每一档位2选1, &nbsp;可按需领取~</p>
        </div>
        <ul class="receive-box mescroll">
          <li v-for="(item, index) in cardList" v-bind:key="index">
            <p class="titles">{{item.title}} <span style="font-size:.24rem;color:#898989;">/ 2选1</span></p>
            <div class="card-box" v-for="(card, i) in item.list" v-bind:key="i" :class="card.over">
                <div class="surprise-left">
                  <span class="phlc-yxfont">{{card.nominalValue}}</span>
                  <span>{{card.cardName}}</span>
                </div>
                <div class="surprise-right far-alway-2">
                  <p>{{card.loanAmount}}</p>
                  <p>期限{{card.term}}</p>
                  <p>有效期7天，快去使用</p>
                </div>
                <div class="isCheck" @click="getReceive(card.nominalValue, card.type, card.amount, item.list, i)" v-if="card.status === 0">领取</div>
                <div class="isReceive" v-if="card.status !== 0">
                  <img :src="card.status === 1 ? require('./images/received-icon.png') : require('./images/void-icon.png')" alt="">
                </div>
            </div>
          </li>
        </ul>
        <div class="receive-btn" v-on:click="windowClose('activityTwoRecordWindowFlag')">知道了</div>
     </div>
     <div v-if="activityTwotype === 2" class="nothing">
       <img src="./images/over-icon.png" alt="">
       <p>{{windowText}}</p>
       <div class="know-btn overbtn" v-on:click="windowClose('activityTwoRecordWindowFlag')">知道了</div>
     </div>
   </div>
 </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import activityBack from '@/components/activityBack'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      mescrollIcon: require('./images/empty-icon.png'),
      windowText: '',
      isDown: false,
      maskFalg: false,
      windowType: 1,
      isShow: true,
      isReceive: false,
      isLogin: false,
      plus: undefined,
      redbagCount0: 10,
      redbagCount1: 50,
      redbagList: [
        {
          nominalValue: 521,
          prizeAmount: 0
        }, {
          nominalValue: 131.4,
          prizeAmount: 0
        }, {
          nominalValue: 52.1,
          prizeAmount: 0
        }, {
          nominalValue: 5.21,
          prizeAmount: 0
        }
      ],
      cardStatus: {
        status15type1: 0,
        status7spot5type2: 0,
        status50type1: 0,
        status10type2: 0,
        status150type1: 0,
        status12type2: 0,
        status1200type1: 0,
        status15type2: 0
      },
      cardList: [
        {
          title: '满15000元档',
          list: [
            {
              type: 3,
              nominalValue: 15,
              cardName: '返现券(元)',
              amount: 5,
              loanAmount: '出借满5000元',
              term: '90天以上',
              status: 0,
              isShow: false,
              over: ''
            }, {
              type: 2,
              nominalValue: 7.5,
              amount: 5,
              cardName: '加息券(‰)',
              loanAmount: '出借50万元内',
              term: '180天内',
              status: 0,
              isShow: false,
              over: ''
            }
          ]
        }, {
          title: '满50000元档',
          list: [
            {
              type: 3,
              nominalValue: 50,
              amount: 5,
              cardName: '返现券(元)',
              loanAmount: '出借满15000元',
              term: '90天以上',
              status: 0,
              isShow: false,
              over: ''
            }, {
              type: 2,
              nominalValue: 10,
              amount: 5,
              cardName: '加息券(‰)',
              loanAmount: '出借50万元内',
              term: '180天内',
              status: 0,
              isShow: false,
              over: ''
            }
          ]
        }, {
          title: '满150000元档',
          list: [
            {
              type: 3,
              nominalValue: 150,
              amount: 5,
              cardName: '返现券(元)',
              loanAmount: '出借满40000元',
              term: '90天以上',
              status: 0,
              isShow: false,
              over: ''
            }, {
              type: 2,
              nominalValue: 12,
              amount: 5,
              cardName: '加息券(‰)',
              loanAmount: '出借50万元内',
              term: '180天内',
              status: 0,
              isShow: false,
              over: ''
            }
          ]
        }, {
          title: '满200000元档',
          list: [
            {
              type: 3,
              nominalValue: 1200,
              cardName: '返现券(元)',
              amount: 5,
              loanAmount: '出借满300000元',
              term: '90天以上',
              status: 0,
              isShow: false,
              over: ''
            }, {
              type: 2,
              nominalValue: 15,
              cardName: '加息券(‰)',
              amount: 5,
              loanAmount: '出借50万元内',
              term: '180天内',
              status: 0,
              isShow: false,
              over: ''
            }
          ]
        }
      ],
      rewardData: {
        activityOneNominalValue: 0,
        loanAmount: 0
      },
      rewardData2: {
        nominalValue: 0,
        loanAmount: 0,
        voucherType: 0
      },
      rechargeWindowStatus: {
        file1: false,
        file2: false,
        file3: false,
        file4: false
      },
      mothersDayRuleWindowFlag: false,
      surprisedWindowFlag: false,
      activityOneRecordWindowFlag: false,
      activityOnetype: 2,
      activityOneList: [],
      listTotal: 0,
      activityTwoRecordWindowFlag: false,
      activityTwotype: 1,
      rechargeRankList: [],
      thisRank: {},
      activityTwoStatus: false,
      beginDate: '',
      endDate: ''
    }
  },
  activated () {
    this.$_muiPlus()
    this.$_init()
  },
  mounted () {
    this.$_muiPlus()
    this.$nextTick(this.$_init())
    this.mescroll = new MeScroll('mescroll', {
      down: {
        callback: this.$_downCallback,
        auto: true
      },
      up: {
        callback: this.$_upCallback,
        isBounce: false,
        noMoreSize: 1,
        htmlNodata: '<p class="upwarp-nodata">————— &nbsp;到底了，没有更多啦&nbsp; —————</p>',
        empty: {
          warpId: 'scroll',
          icon: this.mescrollIcon,
          tip: '咦，暂未获得奖励卡券',
          html: null,
          supportTap: false,
          btnClick: null
        }
      }
    })
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
            if (this.maskFalg) {
              this.maskFalg = false
              this.mothersDayRuleWindowFlag = false
              this.surprisedWindowFlag = false
              this.activityOneRecordWindowFlag = false
              this.activityTwoRecordWindowFlag = false
              return false
            } else {
              if (location.href.split('#')[1].indexOf('mothersDay') !== -1) {
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
    $_init () {
      var params = {
        activityId: 'rechargeByMothersDay2019'
      }
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
        // console.log(res)
        this.activityTwoStatus = res.data.data.data.code
        if (res.data.data.data.code === 1 || res.data.data.data.code === 100001) {
          this.rechargeRankList = res.data.data.data.dealList
          this.thisRank = res.data.data.data.code === 1 ? res.data.data.data.dealInfo : {}
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
        if (res.data.data.data.code === 1) {
          this.isLogin = true
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
      this.getActivityMsgMothersDay2019()
      this.getPrizeAmountByMothersDay2019()
      this.getCardStatus()
    },
    /* 获取活动一卡券剩余数量 */
    getPrizeAmountByMothersDay2019 () {
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getPrizeAmountByActivityId',
        method: 'GET',
        params: {
          activityId: 'mothersDay2019'
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          var prizeList = res.data.data.data.rewardPrizes
          prizeList.forEach((val, index, arr) => {
            // console.log(val)
            if (val.prizeLimit === 521) {
              this.redbagList[0].prizeAmount = val.prizeAmount
            } else if (val.prizeLimit === 131.4) {
              this.redbagList[1].prizeAmount = val.prizeAmount
            } else if (val.prizeLimit === 52.1) {
              this.redbagList[2].prizeAmount = val.prizeAmount
            } else if (val.prizeLimit === 5.21) {
              this.redbagList[3].prizeAmount = val.prizeAmount
            }
          })
        }
      })
    },
    /* 获取活动开始&结束时间 */
    getActivityMsgMothersDay2019 () {
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getActivityByActivityId',
        methods: 'GET',
        params: {
          activityId: 'mothersDay2019'
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
          this.beginDate = res.data.data.data.activityInfo.beginDate
          this.endDate = res.data.data.data.activityInfo.endDate
        }
      })
    },
    windowOpen (flag, type) {
      let _this = this
      if (flag === 'activityOneRecordWindowFlag') {
        this.windowType = type
        if (this.isLogin) {
          this.mescroll.triggerDownScroll()
        } else {
          this.toLogin('/mothersDay')
          return
        }
      }
      let _this_ = this
      this[flag] = true
      this.maskFalg = true
    },
    windowClose (flag) {
      this[flag] = false
      this.maskFalg = false
    },
    /* 领券 */
    lottery (type, val, index) {
      // console.log(this.isLogin)
      if (this.isLogin) {
        // console.log('到这里了')
        if (type === '1') { /* 活动一领取卡券 */
          var params = {
            activityId: 'mothersDay2019'
          }
          if (this.$route.query.userId && this.$route.query.isLogin) {
            params.userId = Math.floor(this.$route.query.userId)
            params.isLogin = Math.floor(this.$route.query.isLogin)
          }
          params.amount = 1
          params.voucherType = 3
          params.nominalValue = val
          this.rewardData.activityOneNominalValue = val
          // console.log(JSON.stringify(params))
          this.axios({
            url: this.HOST + '/activity-server/activityInfo/v1/getVoucherByMothersDay2019',
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
            // console.log(res)
            this.checkTime(this.beginDate, this.endDate, res.data.data.data, index) /* 放生产需修改开始时间 */
          })
        } else { /* 活动二领取卡券 */
          this.$_init ()
          if (this.activityTwoStatus === 1) {
            if (this.thisRank.DEALAMOUNT === undefined || this.thisRank.DEALAMOUNT < 15000) {
              this.activityTwotype = 2
              this.windowText = '暂无可获取奖励，加油哦'
              this.windowOpen('activityTwoRecordWindowFlag')
            } else {
              if (this.thisRank.DEALAMOUNT >= 15000 && this.thisRank.DEALAMOUNT < 50000) { /* 满足领取15元返现券or7.5‰加息券 */
                if (this.rechargeWindowStatus.file1) { /* 如果file1为true 已领 */
                  this.activityTwotype = 2
                  this.windowText = '暂无可获取奖励，加油哦'
                  this.windowOpen('activityTwoRecordWindowFlag')
                } else {
                  this.cardList = this.cardList.slice(0, 1)
                  this.activityTwotype = 1
                  this.getCardStatus()
                  this.windowOpen('activityTwoRecordWindowFlag')
                }
              } else if (this.thisRank.DEALAMOUNT >= 50000 && this.thisRank.DEALAMOUNT< 150000) {  /* 满足领取50元返现券or10‰加息券 */
                if (this.rechargeWindowStatus.file2) {
                  this.activityTwotype = 2
                  this.windowText = '暂无可获取奖励，加油哦'
                  this.windowOpen('activityTwoRecordWindowFlag')
                } else {
                  this.cardList = this.cardList.slice(0, 2)
                  this.activityTwotype = 1
                  this.getCardStatus()
                  this.windowOpen('activityTwoRecordWindowFlag')
                }
              } else if (this.thisRank.DEALAMOUNT >= 150000 && this.thisRank.DEALAMOUNT< 200000) {  /* 满足领取150元返现券or12‰加息券 */
                if (this.rechargeWindowStatus.file3) {
                  this.activityTwotype = 2
                  this.windowText = '暂无可获取奖励，加油哦'
                  this.windowOpen('activityTwoRecordWindowFlag')
                } else {
                  this.cardList = this.cardList.slice(0, 3)
                  this.activityTwotype = 1
                  this.getCardStatus()
                  this.windowOpen('activityTwoRecordWindowFlag')
                }
              } else if (this.thisRank.DEALAMOUNT >= 200000) {   /* 满足领取1200元返现券or15‰加息券 */
                if (this.rechargeWindowStatus.file4) {
                  this.activityTwotype = 2
                  this.windowText = '您已领取全部奖励哦'
                  this.windowOpen('activityTwoRecordWindowFlag')
                } else {
                  this.cardList = this.cardList.slice(0, 4)
                  this.activityTwotype = 1
                  this.getCardStatus()
                  this.windowOpen('activityTwoRecordWindowFlag')
                }
              }
            }
          }
        }
      } else {
        this.toLogin('/mothersDay')
      }
    },
    /* 活动-2-点击领取 */
    getReceive (val, type, count, arr, index) {
      var params = {
        activityId: 'rechargeByMothersDay2019'
      }
      params.amount = count
      params.voucherType = type
      params.nominalValue = val
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getVoucherByRecharge',
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          this.getCardStatus()
        }
      })
    },
     /* 领取记录 */
    $_downCallback () {
      this.isDown = true
      this.mescroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      if (this.windowType === 1) {
        var params = {
          activityId: 'mothersDay2019',
          page: page.num,
          rows: page.size,
          prizeType: 3
        }
      } else {
        var params = {
          activityId: 'rechargeByMothersDay2019',
          page: page.num,
          rows: page.size,
          prizeType: 3
        }
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          if (this.isDown) {
            this.activityOneList = []
            this.isDown = false
          }
          if (res.data.data.data.code === 1) {
            this.listTotal = res.data.data.data.prizeList.total
            this.activityOneList = this.activityOneList.concat(res.data.data.data.prizeList.list)
            this.$nextTick(() => {
              this.mescroll.endSuccess(this.activityOneList.length, res.data.data.data.prizeList.hasNextPage)
            })
            this.mescroll.endBySize(this.activityOneList.length, this.listTotal)
          }
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
    },
    getCardStatus () {
      var params = {
        activityId: 'rechargeByMothersDay2019',
        page: 1,
        rows: 25,
        prizeType: 3
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          var list = res.data.data.data.prizeList.list
          if (list !== []) {
            // console.log(list)
            list.forEach((val, index, arr) => {
                if (val.AWARDNAME === '15元返现券' || val.AWARDNAME === '7.5‰加息券') {
                  this.rechargeWindowStatus.file1 = true
                } else if (val.AWARDNAME === '50元返现券' || val.AWARDNAME === '10‰加息券') {
                  this.rechargeWindowStatus.file2 = true
                } else if (val.AWARDNAME === '150元返现券' || val.AWARDNAME === '12‰加息券') {
                  this.rechargeWindowStatus.file3 = true
                } else if (val.AWARDNAME === '1200元返现券' || val.AWARDNAME === '15‰加息券') {
                  this.rechargeWindowStatus.file4 = true
                }
                if (val.AWARDNAME === '15元返现券') {
                  this.cardStatus.status15type1 = 1
                  this.cardStatus.status7spot5type2 = 2
                  this.cardList[0].list[0].status = this.cardStatus.status15type1
                  this.cardList[0].list[1].status = this.cardStatus.status7spot5type2
                  this.cardList[0].list[1].over = 'over'
                } else if (val.AWARDNAME === '7.5‰加息券') {
                  this.cardStatus.status15type1 = 2
                  this.cardStatus.status7spot5type2 = 1
                  this.cardList[0].list[0].status = this.cardStatus.status15type1
                  this.cardList[0].list[1].status = this.cardStatus.status7spot5type2
                  this.cardList[0].list[0].over = 'over'
                } else if (val.AWARDNAME === '50元返现券') {
                  this.cardStatus.status50type1 = 1
                  this.cardStatus.status10type2 = 2
                  this.cardList[1].list[0].status = this.cardStatus.status50type1
                  this.cardList[1].list[1].status = this.cardStatus.status10type2
                  this.cardList[1].list[1].over = 'over'
                } else if (val.AWARDNAME === '10‰加息券') {
                  this.cardStatus.status50type1 = 2
                  this.cardStatus.status10type2 = 1
                  this.cardList[1].list[0].status = this.cardStatus.status50type1
                  this.cardList[1].list[1].status = this.cardStatus.status10type2
                  this.cardList[1].list[0].over = 'over'
                } else if (val.AWARDNAME === '150元返现券') {
                  this.cardStatus.status150type1 = 1
                  this.cardStatus.status12type2 = 2
                  this.cardList[2].list[0].status = this.cardStatus.status150type1
                  this.cardList[2].list[1].status = this.cardStatus.status12type2
                  this.cardList[2].list[1].over = 'over'
                } else if (val.AWARDNAME === '12‰加息券') {
                  this.cardStatus.status150type1 = 2
                  this.cardStatus.status12type2 = 1
                  this.cardList[2].list[0].status = this.cardStatus.status150type1
                  this.cardList[2].list[1].status = this.cardStatus.status12type2
                  this.cardList[2].list[0].over = 'over'
                } else if (val.AWARDNAME === '1200元返现券') {
                  this.cardStatus.status1200type1 = 1
                  this.cardStatus.status15type2 = 2
                  this.cardList[3].list[0].status = this.cardStatus.status1200type1
                  this.cardList[3].list[1].status = this.cardStatus.status15type2
                  this.cardList[3].list[1].over = 'over'
                } else if (val.AWARDNAME === '15‰加息券') {
                  this.cardStatus.status1200type1 = 2
                  this.cardStatus.status15type2 = 1
                  this.cardList[3].list[0].status = this.cardStatus.status1200type1
                  this.cardList[3].list[1].status = this.cardStatus.status15type2
                  this.cardList[3].list[0].over = 'over'
                }
            })
          } else {
            this.activityTwotype = 2
            this.windowOpen('activityTwoRecordWindowFlag')
          }
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    checkTime (time1, time2, arr, index) {   
      // console.log(arr.code) 
			var time = Date.parse(new Date())     
			if (time1 < time && time2 > time) {	
				var times = new Date()
				var hour = times.getHours()
        var min = times.getMinutes()
        var thisTime = hour + ':' + min
        this.time_range('10:29', '23:59', thisTime, arr, index)
      } else {
				this.$layer.toast(arr.msg)
			}		    	
		},
    time_range (beginTime, endTime, nowTime, arr, index) {
      // console.log(arr.code)
		  var strb = beginTime.split(':')
		  if (strb.length !== 2) {
		    return false
		  }
		  var stre = endTime.split(':')
		  if (stre.length !== 2) {
		    return false
		  }
		  var strn = nowTime.split(':')
		  if (strn.length !== 2) {
		    return false
		  }
		  var b = new Date()
		  var e = new Date()
		  var n = new Date()
		  b.setHours(strb[0])
		  b.setMinutes(strb[1])
		  e.setHours(stre[0])
		  e.setMinutes(stre[1])
		  n.setHours(strn[0])
		  n.setMinutes(strn[1])
		  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
		    if (arr.code === 1) {
          this.activityOnetype = 2
          this.windowOpen('surprisedWindowFlag')
          if (this.rewardData.activityOneNominalValue === 5.21) {
            this.rewardData.loanAmount = 1500
          } else if (this.rewardData.activityOneNominalValue === 52.1) {
            this.rewardData.loanAmount = 15000
          } else if (this.rewardData.activityOneNominalValue === 131.4) {
            this.rewardData.loanAmount = 36000
          } else if (this.rewardData.activityOneNominalValue === 521) {
            this.rewardData.loanAmount = 150000
          }
        } else if (arr.code === 100000 && arr.msg === '卡券已经领完咯~') {
          this.activityOnetype = 3
          this.windowOpen('surprisedWindowFlag')
          $('.redbag'+index).attr('src', require('./images/redbag-'+ index +'-null.png'))
        } else if (arr.code === 100001) {
          this.isLogin = false
          // this.toLogin('/mothersDay')
        } else {
          this.$layer.toast(arr.msg)
        }
		  } else {
		    this.activityOnetype = 1
        this.windowOpen('surprisedWindowFlag')
		  }
		}
  },
  components: {
    activityBack
  }
}
</script>

<style lang="less">
@import url('./css/mothersDay.less');
</style>
