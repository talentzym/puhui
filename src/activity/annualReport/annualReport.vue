<template>
  <div id="annual-report-view" class="plus-screen-view">
    <wxheader :title="'我的2018'"></wxheader>
    <activityBack></activityBack>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
          <swiper-slide class="swiper-no-swiping">
            <div v-on:click="query()" class="query"><!-- 立即开启 --></div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">我们的小确幸</p>
            <div class="text-top">
              <p>遇见你，真好！</p>
              <p>截止2018.12.31</p>
              <p>我们已结伴前行<span>{{ Math.round((1546271999000 -  data.custInfo.createTime) / 24 / 60 / 60 / 1000) }}</span>天</p>
              <p>还记得<span>{{ new Date(data.custInfo.createTime).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.')}}</span></p>
              <p>这一刻，我们相识，值得纪念。</p>
            </div>
            <div class="text-bottom">
              <p>感谢你选择普惠理财，</p>
              <p>为你超棒的决定喝彩！</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">约定的信心</p>
            <div class="text-top">
              <p>2018年度共还款<span>{{ data.repaymentMap.countRepayment }}</span>个项目</p>
              <p>有<span>{{ data.repaymentMap.aheadPro }}</span>个项目提前还款</p>
              <p>累计提前<span>{{ data.repaymentMap.aheadDay }}</span>天</p>
              <p>其中您出借的占了<span>{{ data.repaymentMap.bidPercent * 100 }}%</span></p>
              <p>提前回款，周期短、年化高资金更自由。</p>
            </div>
            <div class="text-bottom">
              <p>2018年4月</p>
              <p>网贷行业监管机构</p>
              <p>突然宣布网贷平台备案延期一年</p>
              <p>但普惠在安全道路上从未延期</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">充值报告</p>
            <div class="text-top">
              <p>2018年度您成功充值<span>{{ data.rechargeMap.countRecharge }}</span>次</p>
              <p>共<span>{{ fmoney(data.rechargeMap.countRechargeAmount, 2) }}</span>元</p>
              <p v-show="data.rechargeMap.countRecharge"><span>{{ new Date(data.rechargeMap.minChargeDate).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') }}</span>来的最早</p>
              <p v-show="data.rechargeMap.countRecharge"><span>{{ new Date(data.rechargeMap.maxChargeDate).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') }}</span>睡的最晚</p>
              <p v-show="data.rechargeMap.countRecharge">您使用<span>{{ data.rechargeMap.custBankName === '中国邮政储蓄银行' ? '邮政储蓄银行' : data.rechargeMap.custBankName }}</span>(尾号<span>{{ data.rechargeMap.custBankNo }}</span>)交易最多</p>
              <p v-show="!data.rechargeMap.countRecharge">不尝试，何来所得</p>
              <p>{{ data.rechargeMap.countRecharge ? '普小二推测您的私房钱应该不在这里' : '普小二不知您的私房钱放在哪里？' }}</p>
              <p>对了，用私房钱理财更有好运哦</p>
            </div>
            <div class="text-bottom">
              <p>为满足你的使用</p>
              <p>平台已接入易宝、快钱等支付渠道</p>
              <p>共支持17家银行</p>
              <p>你充值的手续费平台一直在垫付！</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">提现报告</p>
            <div class="text-top">
              <p>2018年度您成功提现<span>{{ data.withdrawMap.countWithdraw }}</span>次</p>
              <p>共<span>{{ fmoney(data.withdrawMap.countWithdrawAmount, 2) }}</span>元</p>
              <p v-show="data.withdrawMap.countWithdraw">相信你只是选择在远方小歇~</p>
              <p>免费提现<span>{{ fmoney(data.withdrawMap.freeWithdrawAmount, 2) }}</span>元</p>
              <p>付费提现<span>{{ fmoney(data.withdrawMap.feeWithdrawAmount, 2) }}</span>元</p>
              <p>支出<span>{{ fmoney(data.withdrawMap.withdrawFee, 2) }}</span>元手续费</p>
            </div>
            <div class="text-bottom">
              <p>充值未出借资金，提现时</p>
              <p>收取提现金额5‰的手续费。</p>
              <p>给您带来不便，普小二也很内疚〜</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">出借项目报告</p>
            <div class="text-top">
              <p>2018年度您成功出借<span>{{ data.bidMap.countBidByUser }}</span>笔</p>
              <p>累计<span>{{ fmoney(data.bidMap.countBidAmount, 2) }}</span>元</p>
              <p>平均单笔<span>{{ fmoney(data.bidMap.avgBidAmount, 2) }}</span>元</p>
              <p>{{ data.bidMap.countBidByUser ? '还算满意吧！' : '时间久了，还记怎么出借不？'}}</p>
              <p v-show="data.bidMap.countBidByUser"><span>{{ data.bidMap.countBidPro }}</span>个项目，都有您的足迹</p>
              <p v-show="data.bidMap.countBidByUser">普小二了解到您更中意<span>“{{ data.bidMap.moreBidType }}”</span>类项目</p>
              <p v-show="data.bidMap.countBidByUser">占出借项目的<span>{{ data.bidMap.moreTypePercent * 100}}%</span></p>
              <p v-show="!data.bidMap.countBidByUser">普小二了解你只差一次出借</p>
              <p v-show="!data.bidMap.countBidByUser">要好好把握哦〜</p>
            </div>
            <div class="text-bottom">
              <p>核心保，零供保，承信保是主要的3大项目;</p>
              <p>专注于中小微企业应收账款</p>
              <p>大型国企，央企，上市公司的应付账款</p>
              <p>为核心资产的互联网金融信息服务</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">出借回报报告</p>
            <div class="text-top">
              <p>你已入账回报<span>{{ fmoney(data.returnMap.countIncome, 2) }}</span>元</p>
              <p>剩余待收回报<span>{{ fmoney(data.returnMap.countNotIncome, 2) }}</span>元</p>
              <p>{{ data.returnMap.countIncome || data.returnMap.countNotIncome ? '曾经的选择没有错！' : '坚持投资很重要哦！' }}</p>
              <p>使用<span>{{ data.returnMap.cashVoucher }}</span>张返现券，<span>{{ data.returnMap.rateVoucher }}</span>张加息券</p>
              <p>累计回报<span>{{ fmoney(data.returnMap.voucherReturnAmount, 2) }}</span>元</p>
              <p><span>{{ fmoney(data.returnMap.voucherReturnAmount, 2) }}</span>元已到账</p>
              <p><span>{{ fmoney(data.returnMap.voucherNotIncomeAmount, 2) }}</span>元在路上</p>
              <p>{{ data.returnMap.countIncome || data.returnMap.countNotIncome ? '这点巨额收益，坚持就一直会有！' : '没有收获的一年，有木有感觉很冷？' }}</p>
            </div>
            <div class="text-bottom">
              <p>{{ data.returnMap.countInvaildVoucher }}张卡券被您浪费</p>
              <p>不用的卡券可以转让，别忘记。</p>
              <p>换成积分也是一种收益，不是吗？</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">邀请好友</p>
            <div class="text-top">
              <p>2018年您成功邀请<span>{{ data.inviteMap.countInvite }}</span>位好友</p>
              <p>共赚取<span>{{ fmoney(data.inviteMap.inviteAmount, 2) }}</span>元</p>
              <p>真可谓一个人的快乐是要分享的。</p>
              <p>基友、闺蜜就是“利用再利用”</p>
              <p>啊哦</p>
              <p>朋友圈才是赚钱好地方！</p>
            </div>
            <div class="text-bottom">
              <p>举栗：你邀请了5位好友</p>
              <p>每位朋友出借金额≥10万元</p>
              <p>你将获得奖励1800.00</p>
              <p>合不合适你说了算！</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <p class="report-title">这一年，你本该更好</p>
            <div class="text-top">
              <p>据普小二对你全年的出借行为分析</p>
              <p>今日开卦，精准预测</p>
              <p>你每月再新出借满<span>{{ fmoney(data.resultMap.bidByMouth ? data.resultMap.bidByMouth : 10000, 2) }}</span>元</p>
              <p>全年获得收益<span>{{ data.resultMap.returnByYear ? fmoney(data.resultMap.returnByYear, 2) : '≈1200.00' }}</span>元</p>
              <p>美好生活尽在预测之中~</p>
              <p>对不起，普小二又现实了</p>
              <p>爱生活惠理财就好</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <img src="./images/top-icon.png" class="top-button" v-show="iconFlag"/>
    <div class="result" v-on:click="windowOpen('windowFlag')">
      <img src="./images/circle-icon.png" />
    </div>
    <div class="result-window" v-show="windowFlag">
      <p class="result-title">{{ resultTitle(data.custInfo.firstBidDate) }}</p>
      <img :src="(data.custInfo.headPhoto && data.custInfo.headPhoto.indexOf('focus_image/') !== -1 ? imgHost + data.custInfo.headPhoto : data.custInfo.headPhoto)" alt="" class="head-portrait"/>
      <p class="real-name">{{ data.custInfo.realName + (data.custInfo.sex === '1' ? '先生' : '女士') }}</p>
      <p class="window-label">恭喜您获得 <span>{{ resultTitle(data.custInfo.firstBidDate) }}</span> 称号</p>
      <div class="reset-button" v-on:click="reset()">重新查看</div>
      <div class="window-close" v-on:click="windowClose('windowFlag')"></div>
      <img :src="titleIcon" alt="" class="title-icon"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import wxheader from '@/components/header'
import activityBack from '@/components/activityBack'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    const _this = this
    return {
      windowFlag: false,
      titleIcon: null,
      data: {
        custInfo: {},
        repaymentMap: {},
        rechargeMap: {},
        withdrawMap: {},
        bidMap: {},
        returnMap: {},
        resultMap: {},
        inviteMap: {}
      },
      iconFlag: false,
      swiperOption: {
        direction: 'vertical',
        on: {
          transitionEnd () {
            if (this.activeIndex === 8) {
              $('.result').show()
            } else {
              $('.result').hide()
            }
            if (this.activeIndex) {
              _this.iconFlag = this.activeIndex !== 8
            } else {
              _this.iconFlag = _this.data.custInfo.realName
            }
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    wxheader,
    activityBack
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    query () {
      if (this.data.code === 1) {
        this.mySwiper.slideTo(1)
      } else {
        var params = {}
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        this.axios({
          url: this.HOST + '/activity-server/2018YearSummary/v1/joinUsInfo',
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
          if (res.data.data.code === 1) {
            this.data = res.data.data
            this.titleIcon = require('./images/ic_hz_' + (this.data.custInfo.firstBidDate ? this.data.custInfo.firstBidDate : 'null') + '.png')
            this.mySwiper.slideTo(1)
            $('.swiper-no-swiping').removeClass('swiper-no-swiping')
          } else {
            this.$layer.toast(res.data.data.msg ? res.data.data.msg : '查询失败，请重新尝试')
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
            this.$layer.toast('查询失败，请重新尝试')
          }
        })
      }
    },
    resultTitle (year) {
      if (year === '2018') {
        return '投资新秀'
      } else if (year === '2017') {
        return '投资勇士'
      } else if (year === '2016') {
        return '投资精英'
      } else if (year === '2015') {
        return '投资大师'
      } else if (year === '2014') {
        return '投资宗师'
      } else {
        return '投资鲜肉'
      }
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    reset () {
      $('.result').hide()
      this.mySwiper.slideTo(0, 0)
      this.windowClose('windowFlag')
    }
  },
  mounted () {
    /* eslint-disable */
   var _this = this
    mui.plusReady(() => {
      $('.activity-back').hide()
      $('header').show()
      $('.plus-screen-content').css('top', '0.88rem')
      _this.mySwiper.update()
      Vue.prototype.plus = plus
      mui.init({
        beforeback: () => {
          if (Vue.prototype.isMask) {
            this.$mask.hide()
            this.windowFlag = false
            return false
          } else {
            if (location.href.split('#')[1].indexOf('annualReport') !== -1) {
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
  }
}
</script>

<style lang="less">
#annual-report-view{
  header{
    display: none;
  }
  .plus-screen-content{
    top: 0;
    overflow: hidden;
    &:after{
      content: "";
      width: 7.56rem;
      height: 2.91rem;
      display: block;
      background: url(./images/typewriter.png) no-repeat 0% 100%;
      background-size: 100%;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      z-index: 100;
    }
  }
  .plus-screen-scroll{
    background: url(./images/bg.png);
    background-size: 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0 0.65rem 0 0.65rem ;
    position: relative;
  }
  .mySwiper{
    position: absolute;
    left: 0.65rem;
    right: 0.65rem;
    top: 0;
    bottom: 2.3rem;
    background: url(./images/paper.png) no-repeat;
    background-size: 100% 100%;
    .swiper-slide{
      background-size: 6.08rem;
      background-position: 0 100%;
      background-repeat: no-repeat;
      padding: 0.32rem 0.1rem 0 0.56rem;
      box-sizing: border-box;
      &:nth-child(1){
        background: url(./images/cover-bg.png) no-repeat 0 0.32rem, url(./images/paper-bg-01.png) no-repeat 0 100%;
        background-size: 6.08rem;
        position: relative;
      }
      &:nth-child(2){
        background-image: url(./images/paper-bg-02.png);
      }
      &:nth-child(3){
        background-image: url(./images/paper-bg-03.png);
      }
      &:nth-child(4){
        background-image: url(./images/paper-bg-04.png);
      }
      &:nth-child(5){
        background-image: url(./images/paper-bg-05.png);
      }
      &:nth-child(6){
        background-image: url(./images/paper-bg-06.png);
      }
      &:nth-child(7){
        background-image: url(./images/paper-bg-07.png);
      }
      &:nth-child(8){
        background-image: url(./images/paper-bg-08.png);
      }
      &:nth-child(9){
        background-image: url(./images/paper-bg-09.png);
      }
    }
  }
  .query{
    width: 3.2rem;
    height: 0.72rem;
    border-radius: 0.36rem;
    position: absolute;
    top: 8.51rem;
    left: 1.51rem;
  }
  .report-title{
    font-size: 0.5rem;
    height: 0.96rem;
    color: #252525;
    line-height: 0.96rem;
    font-weight: 600;
  }
  .text-top{
    p{
      font-size: 0.28rem;
      height: 0.54rem;
      line-height: 0.54rem;
      span{
        color: #e24031;
      }
    }
  }
  .text-bottom{
    padding-top: 0.24rem;
    position: absolute;
    left: 0.56rem;
    bottom: 1.7rem;
    p{
      font-size: 0.24rem;
      color: #464646;
      line-height: 0.36rem;
    }
    &:before{
      content: "";
      display: block;
      width: 2rem;
      height: 1px;
      background: rgb( 54, 54, 54);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .top-button{
    width: 0.6rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.55rem;
    z-index: 1000;
  }
  .result{
    width: 1rem;
    position: absolute;
    z-index: 100;
    left: 3.25rem;
    bottom: 0.5rem;
    display: none;
    >img{
      width: 100%;
    }
    &:after{
      content: "查看我的年度称号";
      font-size: 0.26rem;
      color: #d9513e;
      text-align: center;
      line-height: 0.86rem;
      display: block;
      width: 2.8rem;
      height: 1.03rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -1.03rem;
      background: url(./images/chat-icon.png) no-repeat;
      background-size: 100%;
    }
  }
  .result-window{
    width: 5.6rem;
    height: 8.1rem;
    background: url(./images/result-bg.png) no-repeat;
    background-color: #fef2ec;
    background-size: 100%;
    position: absolute;
    left: 0.95rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    padding-top:0.01rem ;
    text-align: center;
    .result-title{
      font-size: 0.46rem;
      height: 0.46rem;
      line-height: 0.46rem;
      color: #ffe3b8;
      margin-top: 3.2rem;
    }
    .head-portrait{
      width: 1.06rem;
      height: 1.06rem;
      border-radius: 50%;
      margin: 0.55rem auto 0.1rem auto;
    }
    .real-name, .window-label{
      font-size: 0.28rem;
      color: #252525;
      height: 0.5rem;
      line-height: 0.5rem;
      span{
        color: #eb3535;
      }
    }
    .reset-button{
      font-size: 0.26rem;
      color: #999999;
      margin-top: 0.7rem;
    }
    .window-close{
      width: 0.6rem;
      height: 0.6rem;
      background: url(../../assets/images/weclome-cha.png) no-repeat;
      background-size: 100%;
      position: absolute;
      left: 50%;
      bottom: -1rem;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
    }
    .title-icon{
      width: 2.5rem;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
