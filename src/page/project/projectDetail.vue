<template>
  <div id="projectDetail-view" class="plus-screen-view">
    <wxheader :title=" data.proName ? data.proName.split('：')[0] : ''" :label="data.proName ? data.proName.split('：')[1] : ''"></wxheader>
    <div class="plus-screen-content">
      <div class="mescroll" id="projectDetail-mescroll">
        <div class="plus-screen-scroll">
          <div class="borrowing-information">
            <div class="interest phlc-yxfont">
              {{ data.addRate ? data.ratePre : data.rate}}
              <span v-show="data.addRate">
                + {{ data.addRate }}
              </span>
            </div>
            <p>借款利率(%)</p>
            <swiper :options="msgSwiperOption" ref="msgSwiper">
              <swiper-slide>
                <p class="borrowing-balance">{{ this.fmoney(data.financeAmount,2) }}</p>
                <p>借款金额(元)</p>
                <span class="proshu"></span>
              </swiper-slide>
              <swiper-slide>
                <div v-on:click="windowOpen('timeWindowFlag')">
                  <p>
                    <span class="life-of-loan">{{ data.deadLine }}</span><img src="../../assets/images/project-detail-question.png"/>
                  </p>
                  <p>借款期限(天)</p>
                  <span class="proshu"></span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <p class="mode-of-repayment text-hidden">{{ data.calWay }}</p>
                <p>还款方式</p>
                <span class="proshu"></span>
              </swiper-slide>
              <swiper-slide>
                <div v-on:click="windowOpen('ratingWindowFlag')">
                  <p>
                    <span class="project-star">{{ data.proLevel }}</span><img src="../../assets/images/project-detail-question.png"/>
                  </p>
                  <p>项目评级</p>
                  <span class="proshu"></span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <p class="source-of-repayment text-hidden">{{ data.repaymentSource }}</p>
                <p>第一还款源</p>
              </swiper-slide>
            </swiper>
          </div>
          <div class="project-status" v-bind:class=" data.parlars ">
            <p class="bid-amount">{{ data.status === 3 || data.status === 4 ? "剩余可出借金额 " + fmoney(data.bidAmount,2) : "计息结束日 ：" + data.interestEndDate}}</p>
            <div class="process">{{ data.loanProgress }}</div>
          </div>
          <div class="project-detail-form">
            <div class="form-action" data-index="0">
              <label>可用余额(元)：
                <span class="availableAmount">{{ fmoney(data.availableAmount, 2) }}</span>
              </label>
              <div class="prepaid-phone-immediately phlc-cursor-pointer" v-on:click="goRecharge()">立即充值</div>
            </div>
            <div class="form-action" data-index="1">
              <label>出借金额(元)：
                <form class="input-group">
                  <div class="input-row">
                    <input type="text" style="font-size: 0.3rem;" class="phlc-cursor-pointer" placeholder="请填写出借金额" v-model="paymentAmount" id="loan-amount" v-on:input="inputOnInput()" v-on:blur="inputBlur()" v-on:focus="inpurOnFocus()"/>
                  </div>
                </form>
              </label>
              <div class="phlc-cursor-pointer" v-show="data.availableAmount" v-on:click="allMade()" id="button-all-mode">余额全投</div>
            </div>
            <div class="form-action" data-index="2">
              <label>出借金额(元)：
                <span class="money-show">{{ data.status > 3 && data.loginStatus === 2 ? fmoney( data.userCountBidAmount,2) : fmoney( 10000,2) }}</span>
              </label>
            </div>
            <div class="form-action" data-index="3">
              <label>优惠卡券(张)：
                <span class="voucher-count" v-show=" !activeVoucher ">{{ voucherData && voucherData.unavailableUserVouchers ? voucherData.userVouchers.length : 0  }}张可用</span>
                <span class="voucher-count" v-show=" activeVoucher ">{{ activeVoucherName }}
                </span>
              </label>
              <div class="phlc-cursor-pointer" v-on:click="windowOpen('voucherWindowFlag')" id="button-select-voucher">选择</div>
            </div>
            <div class="form-action" data-index="4">
              <label>到期回报(元)：
                <span class="profit phlc-red-normal-color">{{ paymentAmount ? fmoney(delcommafy(paymentAmount) * data.rate / 100 * data.deadLine / 360) : '0.00'}}</span><span class="phlc-red-normal-color" v-show="activeVoucher && activeVoucher !== -1">+{{ activeVoucher && activeVoucher !== -1 ? selectVoucherAmount : ''}}</span>
              </label>
            </div>
            <div class="form-action" data-index="5">
              <label>标的回报(元)：
                <span class="totalProfit">{{ fmoney(data.totalProfit, 2) }}</span>
              </label>
            </div>
            <div class="form-action" data-index="6">
              <label>募集时间(天)：
                <span class="raiseDate">{{ Math.round(data.raiseDate / 24 * 100) / 100 + '(' + data.raiseDate  + '小时)' }}</span>
              </label>
            </div>
            <div class="form-action" data-index="7">
              <label>试算回报(元)：
                <span class="porofit-show">{{ fmoney(10000 * data.rate / 100 * data.deadLine / 360) }}</span>
              </label>
            </div>
            <router-link :to="{path: '/register'}" v-show=" data.loginStatus === 0 ">
              <img src="../../assets/images/phlc-project-new-user.png">
            </router-link>
          </div>
          <div class="submit-button" v-on:click="toLend()">{{ data.status > 3 ? '更多出借项目' : '我要出借'}}</div>
          <div class="agreement">
            <p class="agreementTip1 phlc-third-black-color">
              <input type="checkbox" :checked="ableFlag" v-on:click="ableFlag = !ableFlag" class="acceptInput"/>网贷有风险，出借需谨慎。我已阅读并同意
              <a class="agreementTip2" :href="imgHost + fileData.riskContract" target="_blank">《出借人风险提示制度》</a>
              <a class="lendTip agreementTip2" :href="imgHost + fileData.claimContract" target="_blank">《出借项目协议范本》</a>
            </p>
          </div>
          <h2>项目介绍</h2>
          <swiper :options="detailSwiperOption" ref="detailSwiper" id="project-content-swiper">
            <swiper-slide class="swiper-slide project-detail-bg" data-swiper="0">
                <h3>项目信息</h3>
                <div class="project-detail-box phlc-cursor-pointer">
                </div>
            </swiper-slide>
            <swiper-slide :to="{path: '/projectDetailMsg'}" class="swiper-slide risk-control-information-bg" data-swiper="2">
              <h3>风控信息</h3>
              <div class="risk-control-information-box phlc-cursor-pointer">
              </div>
            </swiper-slide>
            <swiper-slide :to="{path: '/projectDetailMsg'}" class="swiper-slide relevant-document-bg" data-swiper="1">
              <h3>相关文件</h3>
              <div class="relevant-document-box phlc-cursor-pointer">
              </div>
            </swiper-slide>
            <swiper-slide :to="{path: '/projectDetailMsg'}" class="swiper-slide reimbursement-documents-bg" data-swiper="3">
              <h3>还款计划</h3>
              <div class="reimbursement-documents-box phlc-cursor-pointer">
              </div>
            </swiper-slide>
            <swiper-slide :to="{path: '/projectDetailMsg'}" class="swiper-slide lend-the-record-bg" data-swiper="4">
              <h3>出借记录</h3>
              <div class="lend-the-record-box phlc-cursor-pointer">
              </div>
            </swiper-slide>
            <swiper-slide :to="{path: '/projectDetailMsg'}" class="swiper-slide lend-the-reward-bg" data-swiper="5">
              <h3>出借奖励</h3>
              <div class="lend-the-reward-box phlc-cursor-pointer">
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!--项目评级弹窗-->
    <div id="project-rating-window" class="project-msg-window" v-show="ratingWindowFlag">
      <div class="project-msg-window-title">项目评级说明</div>
      <div class="project-msg-window-content">
        <dl v-show="data.proLevel && data.proLevel.indexOf('A') !== -1">
          <dt><img src="../../assets/images/project-rating-A.jpg" class="project-rating-img"></dt>
          <dd>
            <h3>项目评级：<span class="project-rating-star">{{ data.proLevel }}</span></h3>
            <p class="project-rating-msg">低风险项目, 出借本金和回报稳定</p>
          </dd>
        </dl>
        <dl v-show="data.proLevel && data.proLevel.indexOf('B') !== -1">
          <dt><img src="../../assets/images/project-rating-B.jpg" class="project-rating-img"></dt>
          <dd>
            <h3>项目评级：<span class="project-rating-star">{{ data.proLevel }}</span></h3>
            <p class="project-rating-msg">中低风险项目，出借本金相对稳定，回报可能有轻微波动</p>
          </dd>
        </dl>
        <dl v-show="data.proLevel && data.proLevel.indexOf('C') !== -1">
          <dt><img src="../../assets/images/project-rating-C.jpg" class="project-rating-img"></dt>
          <dd>
            <h3>项目评级：<span class="project-rating-star">{{ data.proLevel }}</span></h3>
            <p class="project-rating-msg">高风险项目，出借本金、回报可能有一定幅度的波动</p>
          </dd>
        </dl>
        <button v-on:click="windowClose('ratingWindowFlag')">知道了</button>
      </div>
    </div>
    <!--借款期限弹窗-->
    <div id="project-time-window" class="project-msg-window" v-show="timeWindowFlag">
      <div class="project-msg-window-title">借款期限说明</div>
      <div class="project-msg-window-content">
        <dl>
          <dt><img src="../../assets/images/project-time-top.jpg"/></dt>
          <dd>
            <p>募集期<span class="project-time-time">{{ data.status === "3" ? "预计为" + Math.ceil(data.raiseDate/24) : '为' + Math.ceil(data.raiseDate/24) }}</span>天, 募满放款计息</p>
            <h3 class="project-time-predict">{{ data.endDate ? data.endDate.split(' ')[0] : '' }}</h3>
          </dd>
        </dl>
        <dl>
          <dt><img src="../../assets/images/project-time-over.jpg"/></dt>
          <dd>
            <p>计息结束日</p>
            <h3 class="project-time-overTime">{{ data.interestEndDate ? data.interestEndDate.split(' ')[0] : ''}}</h3>
          </dd>
        </dl>
        <p>具体日期以实际为准, 目前公示日期仅供参考</p>
        <button v-on:click="windowClose('timeWindowFlag')">知道了</button>
      </div>
    </div>
    <!--选择卡券滑块-->
    <div class="select-voucher-model" v-show=" voucherWindowFlag ">
      <nav class="phlc-card-voucher-nav header-box-shadow">
        <swiper class="nav" :options="voucherNavSwiperOption" ref="voucherNavSwiper">
          <swiper-slide class="phlc-swiper-active">可用卡券({{ voucherData && voucherData.unavailableUserVouchers ? voucherData.userVouchers.length : 0 }})</swiper-slide>
          <swiper-slide>不可用卡券({{ voucherData && voucherData.unavailableUserVouchers ? voucherData.unavailableUserVouchers.length : 0 }})</swiper-slide>
        </swiper>
        <a href="avascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('voucherWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </nav>
      <div class="phlc-card-voucher-content mui-scroll-wrapper">
        <swiper class="content-swiper height100" :options="voucherContentSwiperOption" ref="voucherContentSwiper">
          <swiper-slide class="height100">
            <div class="height100 mescroll" id="refreshContainer0">
              <div class="content active-voucher-box" style="padding-bottom: 0.4rem;">
                <section v-on:click="voucherActive(-1)" class="no-voucher">有钱任性，不需要额外收益<div class="circle"></div></section>
                <section v-on:click="voucherActive($index)" v-for="(item, $index) in voucherData.userVouchers" v-bind:key="item.id" class="voucher">
                  <div class="section-top">
                    <p>
                      <span>{{ item.voucherType === 3 || item.voucherType === 1? '¥' : '' }}
                        <b>{{ item.voucherType === 2 ? item.nominalValue + '‰' : item.nominalValue }}</b>
                      </span>{{ voucher(item.voucherType) }}
                    </p>
                    <p>{{ cardMsg(item) }}</p>
                    <!--{{ item.useStatus === 4 ? '<div class="section-exchange-ing-bg">'+ countdown(item.modifyTime) +'</div>' : '' }}-->
                  </div>
                  <div class="section-bottom">
                                                            有效期：{{ new Date(item.invalidTime).format("yyyy-MM-dd").replaceAll("-", ".") }}到期
                    <div class="circle"></div>
                  </div>
                  <div v-show="new Date().getTime() <= new Date(getDay(3, item.creatTime) + ' 00:00:00').getTime() && item.useStatus === 0 " class="section-right section-right-new">新到 </div>
                  <div v-show="new Date().getTime() >= new Date(getDay(-3, item.invalidTime) + ' 00:00:00').getTime() && item.useStatus === 0 " class="section-right section-right-old">即将到期 </div>
                  <div class="section-left">{{ item.voucherOri }}</div>
                </section>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="height100">
            <div class="height100 mescroll" id="refreshContainer1">
              <div class="content">
                <section v-for="item in voucherData.unavailableUserVouchers" v-bind:key="item.id">
                  <div class="section-top">
                    <p>
                      <span>{{ item.voucherType === 3 || item.voucherType === 1? '¥' : '' }}
                        <b>{{ item.voucherType === 2 ? item.nominalValue + '‰' : item.nominalValue }}</b>
                      </span>{{ voucher(item.voucherType) }}
                    </p>
                    <p>{{ cardMsg(item) }}</p>
                    <!--<div class="section-exchange-ing-bg" v-show=" item.useStatus === 4 ">countdown(item.modifyTime)</div>-->
                  </div>
                  <div class="section-bottom">
                                                            有效期：{{ new Date(item.invalidTime).format("yyyy-MM-dd").replaceAll("-", ".") }}到期
                  </div>
                  <div v-show="new Date().getTime() <= new Date(getDay(3, item.creatTime) + ' 00:00:00').getTime() && item.useStatus === 0 " class="section-right section-right-new">新到 </div>
                  <div v-show="new Date().getTime() >= new Date(getDay(-3, item.invalidTime) + ' 00:00:00').getTime() && item.useStatus === 0 " class="section-right section-right-old">即将到期 </div>
                  <div class="section-left">{{ item.voucherOri }}</div>
                </section>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="voucher-list-footer">
        <label>卡券收益(元)：
          <span class="voucher-list-money">{{ selectVoucherAmount }}</span>
        </label>
        <button v-on:click="confirmVoucher()">确认</button>
      </div>
    </div>
    <!--绑定弹窗-->
    <div id="binding-window" v-show=" bindWindowFlag ">
      <h1 class="binding-window-title">先完成以下步骤哦
        <a href="avascript:void(0)" class="phlc-cursor-pointer" v-on:click=" windowClose('bindWindowFlag') ">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </h1>
      <div class="binding-window-content">
        <dl class="binding-phone">
          <dt><img src="../../assets/images/binding-phone.jpg"/></dt>
          <dd>
            <h3>绑定手机号</h3>
            <p>请绑定常用手机号</p>
            <div v-on:click="bind('/bindPhoneNumber', $event)">去绑定</div>
          </dd>
        </dl>
        <dl class="binding-id-number">
          <dt><img src="../../assets/images/binding-id-number.jpg"/></dt>
          <dd>
            <h3>实名认证</h3>
            <p>请实名认证，认证后不可修改</p>
            <div v-on:click="bind('dredgeDepository', $event)">去认证</div>
          </dd>
        </dl>
        <dl class="binding-upgrate">
          <dt><img src="../../assets/images/binding-upgrate.jpg"/></dt>
          <dd>
            <h3>新网银行存管</h3>
            <p>银行存管已上线，快去升级</p>
            <div v-on:click="bind('去升级', $event)">去升级</div>
          </dd>
        </dl>
        <dl class="binding-bank">
          <dt><img src="../../assets/images/binding-bank.jpg"/></dt>
          <dd>
            <h3>绑定银行卡</h3>
            <p>请绑定支持快捷充值的银行卡</p>
            <div v-on:click="bind('/bindBankCard', $event)">去绑定</div>
          </dd>
        </dl>
        <dl class="binding-top-up">
          <dt><img src="../../assets/images/binding-top-up.jpg"/></dt>
          <dd>
            <h3>账号充值</h3>
            <p>可用余额0.00元，怎么出借？</p>
            <div v-on:click="bind('/recharge', $event)">去充值</div>
          </dd>
        </dl>
      </div>
      <div class="binding-window-footer">
        <p>您提交的信息仅限使用普惠理财产品相关服务</p>
        <p>交易资金全程由新网银行存管</p>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import wxheader from '@/components/header'
import $ from 'jquery'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { Indicator } from 'mint-ui'
export default{
  name: 'projectDetail',
  data () {
    const _this = this
    return {
      isDown: false,
      ableFlag: true,
      fileData: {},
      data: {},
      msgSwiperOption: {
        slidesPerView: 2.7,
        freeMode: true,
        resistanceRatio: 0,
        spaceBetween: 40 * this.aspectRatio
      },
      detailSwiperOption: {
        slidesPerView: 1.5,
        freeMode: true,
        resistanceRatio: 0,
        spaceBetween: 50 * this.aspectRatio,
        on: {
          click (event) {
            var index = event.target.nodeName === 'SECTION' ? $(event.target).attr('data-swiper') : $(event.target).parents('section').attr('data-swiper')
            _this.$router.push({
              path: '/projectDetailMsg',
              query: {
                id: _this.$route.query.id,
                index: index
              }
            })
          }
        }
      },
      voucherNavSwiperOption: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          click (event) {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.voucherContentSwiper.swiper.slideTo(_this.$refs.voucherContentSwiper.swiper.activeIndex === 1 ? 0 : 1)
            $('.phlc-close-header span').eq(this.activeIndex).addClass('color-e6382c').siblings().removeClass('color-e6382c')
          }
        }
      },
      voucherContentSwiperOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionStart () {
            _this.$refs.voucherNavSwiper.swiper.slideTo(this.activeIndex === 1 ? 0 : 1)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      ratingWindowFlag: false,
      timeWindowFlag: false,
      voucherWindowFlag: false,
      bindWindowFlag: false,
      paymentAmount: 0,
      voucherData: [],
      activeVoucher: null,
      selectVoucher: null,
      rechargeMsg: ''
    }
  },
  components: {
    wxheader,
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.msgSwiper.swiper
    },
    detailSwiper () {
      return this.$refs.detailSwiper.swiper
    },
    voucherNavSwiper () {
      return this.$refs.voucherNavSwiper.swiper
    },
    voucherContentSwiper () {
      return this.$refs.voucherContentSwiper.swiper
    },
    selectVoucherAmount () {
      if (this.selectVoucher && this.selectVoucher !== -1) {
        if (this.selectVoucher.voucherType === 2) {
          return this.fmoney(this.delcommafy(this.paymentAmount) * this.selectVoucher.nominalValue / 1000 * this.data.deadLine / 360, 2)
        } else {
          return this.fmoney(this.selectVoucher.nominalValue, 2)
        }
      } else {
        return '0.00'
      }
    },
    activeVoucherName () {
      if (this.activeVoucher) {
        if (this.activeVoucher !== -1) {
          return (this.activeVoucher.voucherType === 3 || this.activeVoucher.voucherType === 1 ? '¥' : '') + (this.activeVoucher.voucherType === 2 ? this.activeVoucher.nominalValue + '‰' : this.activeVoucher.nominalValue) + this.voucher(this.activeVoucher.voucherType)
        } else {
          return '有钱任性，不选择'
        }
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('projectDetail-mescroll', {
        down: {
          callback: this.$_downCallback,
          auto: true
        },
        up: {
          use: true,
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
    $_downCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanDetail',
        method: 'GET',
        params: {
          proId: this.$route.query.id
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
        if (res.data.code === 1) {
          $('#project-content-swiper .swiper-wrapper').html('<section class="swiper-slide project-detail-bg" data-swiper="0">' +
            '<h3>项目信息</h3>' +
            '<div class="project-detail-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>' +
          '<section class="swiper-slide risk-control-information-bg" data-swiper="2">' +
            '<h3>风控信息</h3>' +
            '<div class="risk-control-information-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>' +
          '<section class="swiper-slide relevant-document-bg" data-swiper="1">' +
            '<h3>相关文件</h3>' +
            '<div class="relevant-document-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>' +
          '<section class="swiper-slide reimbursement-documents-bg" data-swiper="3">' +
            '<h3>还款计划</h3>' +
            '<div class="reimbursement-documents-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>' +
          '<section class="swiper-slide lend-the-record-bg" data-swiper="4">' +
            '<h3>出借记录</h3>' +
            '<div class="lend-the-record-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>' +
          '<section class="swiper-slide lend-the-reward-bg" data-swiper="5">' +
            '<h3>出借奖励</h3>' +
            '<div class="lend-the-reward-box phlc-cursor-pointer">' +
            '</div>' +
          '</section>')
          this.data = res.data.data
          this.statusShow(this.data)
          this.itemInformation(this.data)
          if (this.data.loginStatus !== 0 && this.data.status === 3) {
            this.getVoucher()
          }
          switch (this.data.status) {
            case 3:
              this.data.parlars = ''
              this.data.loanProgress = '进度' + this.data.process + '%'
              break
            case 4:
              this.data.parlars = 'color-orgin'
              this.data.loanProgress = '已满标'
              break
            case 6:
              this.data.parlars = 'color-green'
              this.data.loanProgress = '还款中'
              break
            case 7:
              this.data.parlars = 'color-gray'
              this.data.loanProgress = '已完成'
              break
          }
          if (this.data.status === 3 && new Date().getTime() > new Date(this.data.endDate.replaceAll('-', '/')).getTime()) {
            this.$layer.toast('此标的已结束，请勿出借！')
          }
        } else {
          this.$layer.toast('加载失败，请重试或联系客服！')
        }
        this.mescroll.endSuccess()
      }).catch((err) => {
        if (err) {
          this.$layer.toast('加载失败，请重试或联系客服！')
          this.mescroll.endErr()
        }
      })
      this.bidRight()
      this.getFileData()
    },
    bidRight () {
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanJudge',
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
        $('.binding-phone').hide()
        $('.binding-id-number').hide()
        $('.binding-bank').hide()
        $('.binding-upgrate').hide()
        $('.binding-top-up').hide()
        if (res.data.data[0].code === '1111') {
          this.rechargeMsg = '请登录！'
        } else if (res.data.data[0].code === '100001' || res.data.data[0].code === '100002' || res.data.data[0].code === '100003' || res.data.data[0].code === '100004') {
          if (res.data.data[0].code === '100001') {
            this.rechargeMsg = '您暂未实名认证！'
          } else if (res.data.data[0].code === '100002') {
            this.rechargeMsg = '您暂未绑定银行卡！'
          } else if (res.data.data[0].code === '100003') {
            this.rechargeMsg = '您暂未绑定手机号！'
          } else if (res.data.data[0].code === '100004') {
            this.rechargeMsg = '您暂未升级存管通！'
          } else if (res.data.data[0].code === '100005') {
            this.rechargeMsg = ''
          }
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].code === '100001') {
              $('.binding-id-number').show()
            } else if (res.data.data[i].code === '100002') {
              $('.binding-bank').show()
            } else if (res.data.data[i].code === '100003') {
              $('.binding-phone').show()
            } else if (res.data.data[i].code === '100004') {
              $('.binding-upgrate').show()
            } else if (res.data.data[i].code === '100005') {
              $('.binding-top-up').show()
            }
          }
        } else {
          this.rechargeMsg = ''
        }
      })
    },
    getFileData () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/getloadContractFb',
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
        if (res.data.data.code === '1' || res.data.data.code === '1111') {
          this.fileData = res.data.data
        }
      })
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
      if (!$('.mask-plugins').length) {
        this.windowClose('bindWindowFlag')
        this.windowOpen('bindWindowFlag')
      }
      $('#projectDetail-mescroll').css('overflow', 'hidden')
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
      $('#projectDetail-mescroll').css('overflow', 'auto')
    },
    statusShow (data) {
      $('.form-action').hide()
      if (data.loginStatus === 0) {
        $('.form-action:eq(2), .form-action:eq(7)').show()
        $('.money-show').text(this.fmoney(10000, 2))
        $('.porofit-show').text(this.fmoney(10000 * data.rate / 100 * data.deadLine / 360))
      } else if (data.status === 7 || data.status === 10 || data.status === 4 || data.status === 5 || data.status === 6) {
        $('#project-content-swiper .swiper-wrapper').prepend($('#project-content-swiper .swiper-slide').eq(4).prop('outerHTML'))
        $('#project-content-swiper .swiper-slide').eq(5).remove()
        $('#project-content-swiper .swiper-wrapper').prepend($('#project-content-swiper .swiper-slide').eq(5).prop('outerHTML'))
        $('#project-content-swiper .swiper-slide').eq(6).remove()
        if (data.loginStatus === 2) {
          $('.form-action:eq(2), .form-action:eq(3), .form-action:eq(4)').show()
          $('#button-select-voucher').hide()
          $('.money-show').html(this.fmoney(data.userCountBidAmount, 2))
          $('.voucher-count').html(data.voucherName ? data.voucherName : '未使用卡券')
          $('.profit').html(this.fmoney(data.profit, 2) + (data.voucherValue ? '+' + this.fmoney(data.voucherValue, 2) : ''))
        } else {
          $('.money-show').html(this.fmoney(10000, 2))
          $('.form-action:eq(5), .form-action:eq(6)').show()
          $('.totalProfit').text(this.fmoney(data.totalProfit, 2))
          $('#project-content-swiper .swiper-slide:eq(2), #project-content-swiper .swiper-slide:eq(3), #project-content-swiper .swiper-slide:eq(4)').remove()
        }
        $('.raiseDate').text(Math.round(data.raiseDate / 24 * 100) / 100 + '(' + data.raiseDate + '小时)')
      } else if (data.status === 3) {
        $('.form-action:eq(0),.form-action:eq(1),.form-action:eq(3),.form-action:eq(4)').show()
        if (!data.availableAmount) {
          this.paymentAmount = this.fmoney(10000, 2)
          $('#button-select').hide()
        } else if (data.availableAmount < data.bidAmount) {
          this.paymentAmount = this.fmoney(data.availableAmount, 2)
        } else {
          if (data.availableAmount > data.bidAmount || data.availableAmount > data.financeAmount) {
            this.paymentAmount = data.bidAmount <= data.financeAmount ? this.fmoney(data.bidAmount, 2) : this.fmoney(data.financeAmount, 2)
          } else {
            this.paymentAmount = this.fmoney(this.paymentAmount, 2)
          }
        }
        // $('.profit').html(this.fmoney(this.delcommafy(this.paymentAmount) * data.rate / 100 * data.deadLine / 360))
      }
    },
    itemInformation (data) {
      if (data.status <= 3 || (data.status > 3 && data.loginStatus === 2)) {
        $('.project-detail-box').html('<p>' + (data.pros[0] && data.pros[0].title ? data.pros[0].title : '') + '：</p>' + (data.pros[0] && data.pros[0].content ? data.pros[0].content.replaceHtml() : ''))
        $('.risk-control-information-box').html(data.risks && data.risks[0] ? '<p>' + data.risks[0].title + '：</p>' + data.risks[0].content.replaceHtml() : '')
        $('.relevant-document-box').html('<div>' + (data.loanFiles.length ? '<img src="' + this.imgHost + data.loanFiles[0].sourcefilepath + data.loanFiles[0].realfilename + '"/>' : '') + '</div><div>共' + data.loanFiles.length + '张图</div>')
      } else {
        $('.project-detail-box').html('<p>仅限出借该标的用户可见哦~</p>')
        $('.risk-control-information-box').html('<p>仅限出借该标的用户可见哦~</p>')
        $('.relevant-document-box').html('<p>仅限出借该标的用户可见哦~</p>')
      }
      var str = ''
      var repaysLength = data.repays ? data.repays.length : 0
      if (data.status === 7 || data.status === 10) {
        str = '<p>该项目共有' + repaysLength + '次还款，</p>'
      } else if (data.status === 5 || data.status === 6) {
        str = '<p>共' + repaysLength + '次还款</p><p>' + new Date(data.repays[0].repayPaydate).format('yyyy-MM-dd').replaceAll('-', '.') + '第一次还款。</p>'
      } else {
        str = '<p>快去出借哦，</p><p>满标放款后可查看还款计划。</p>'
      }
      $('.reimbursement-documents-box').html(str)
      $('.lend-the-record-box').html(data.userNum ? '<p>' + data.userNum + '位用户，' + data.bids.length + '笔出借，</p><p>单笔平均出借' + this.fmoney((data.financeAmount - data.bidAmount) / data.bids.length, 2) + '元。</p>' : '<p>据说第一个使用者最会理财，</p><p>毕竟爱理财惠生活！</p>')
      if (data.status === 4 && data.addCard === 0 && data.getCard === 0) {
        $('.lend-the-reward-box').html('<p>我们出借的共同口号</p><p>“有钱任性，从不使用卡券”</p>')
      } else {
        var addCard = data.addCard ? data.addCard : 0
        var getCard = data.getCard ? data.getCard : 0
        var allMoney = data.allMoney ? data.allMoney : 0
        $('.lend-the-reward-box').html(addCard + getCard ? '<p>' + (addCard + getCard) + '笔出借使用了卡券,</p><p>预期额外回报' + this.fmoney(allMoney, 2) + '元。</p>' : '<p>据说第一个使用者最会理财，</p><p>额外收益不易错过！</p>')
      }
    },
    allMade () {
      this.paymentAmount = this.data.availableAmount <= this.data.bidAmount ? this.fmoney(this.data.availableAmount, 2) : this.fmoney(this.data.bidAmount, 2)
    },
    inputOnInput () {
      this.paymentAmount = this.paymentAmount.replace(/[^\d.]/g, '')
      if (this.paymentAmount.indexOf('.') !== -1 && this.paymentAmount.split('.')[1].length > 2) {
        var arr = this.paymentAmount.split('')
        arr.pop()
        this.paymentAmount = arr.join('')
      }
      if (this.paymentAmount > this.data.bidAmount) {
        this.paymentAmount = this.data.bidAmount
      }
      this.getVoucher()
      this.activeVoucher = null
      this.selectVoucher = null
      $('.active-voucher-box section').removeClass('section-active')
    },
    inputBlur () {
      this.paymentAmount = this.fmoney(this.paymentAmount, 2)
    },
    inpurOnFocus () {
      this.paymentAmount = this.paymentAmount !== '0.00' ? this.delcommafy(this.paymentAmount) : ''
    },
    getVoucher () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getUserVouchersByLoanId',
        method: 'post',
        params: {},
        data: {
          loanId: this.$route.query.id,
          amount: this.delcommafy(this.paymentAmount)
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
        this.voucherData = res.data
      })
    },
    voucher (code) {
      if (code === 1) {
        return '体验金'
      } else if (code === 2) {
        return '加息券'
      } else if (code === 3) {
        return '返现券'
      } else {
        return ''
      }
    },
    cardMsg (item) {
      var invest
      var deadline
      var minInvest = item.quttMinInvest === -1 ? 0 : Number(item.quttMinInvest)
      var maxInvest = item.quttMaxInvest === -1 ? 0 : Number(item.quttMaxInvest)
      var minDeadline = item.quttProjectDeadline === -1 ? 0 : Number(item.quttProjectDeadline)
      var maxDeadline = item.quttProjectDeadlineMax === -1 ? 0 : Number(item.quttProjectDeadlineMax)
      if (minInvest && !maxInvest) {
        invest = '出借满' + minInvest + '元可用'
      } else if (!minInvest && maxInvest) {
        invest = '出借' + maxInvest + '元内可用'
      } else if (minInvest && maxInvest) {
        invest = '出借' + minInvest + '-' + maxInvest + '元内可用'
      } else {
        invest = '出借满0元可用'
      }
      if (minDeadline && !maxDeadline) {
        deadline = '期限' + minDeadline + '天起'
      } else if (!minDeadline && maxDeadline) {
        deadline = '期限' + maxDeadline + '天内'
      } else if (minDeadline && maxDeadline) {
        deadline = '期限' + minDeadline + '-' + maxDeadline + '天内可用'
      } else {
        deadline = '期限0天起'
      }
      return invest + '/' + deadline
    },
    voucherActive ($index) {
      if ($index !== -1) {
        $('.voucher').eq($index).addClass('section-active').siblings().removeClass('section-active')
        this.selectVoucher = this.voucherData.userVouchers[$index]
      } else {
        $('.no-voucher').addClass('section-active').siblings().removeClass('section-active')
        this.selectVoucher = -1
      }
    },
    confirmVoucher () {
      this.activeVoucher = this.selectVoucher
      this.windowClose('voucherWindowFlag')
    },
    goRecharge () {
      if (this.rechargeMsg) {
        this.$layer.toast(this.rechargeMsg)
      } else {
        this.$router.push({
          path: '/recharge'
        })
      }
    },
    toLend () {
      if (this.data.loginStatus === 0) {
        this.toLogin('/projectDetail')
      } else if (!this.ableFlag) {
        this.$layer.toast('请阅读并同意制度及协议！')
      } else if (this.data.status === 3 && new Date().getTime() > new Date(this.data.endDate.replaceAll('-', '/')).getTime()) {
        this.$layer.toast('此标的已结束，请勿出借！')
        return false
      } else if (this.delcommafy(this.amount) > this.delcommafy(this.data.availableAmount)) {
        this.$layer.toast('余额不足请充值！')
        return false
      } else if (this.data.status > 3) {
        this.$router.push({
          path: 'project'
        })
      } else if (this.rechargeMsg) {
        this.windowOpen('bindWindowFlag')
      } else {
        var params = {
          proId: this.$route.query.id,
          paymentAmount: this.delcommafy(this.paymentAmount),
          appModel: 'app'
        }
        if (this.activeVoucher) {
          params.voucherId = this.activeVoucher.id
        }
        var _this = this
        this.axios({
          url: this.HOST + '/web-server/transferRequest/v1/transfer',
          method: 'post',
          params: {},
          data: params,
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
          if (res.data.data[0].code === '1') {
            this.$router.push({
              path: '/mutual/yeepay',
              query: {
                data: res.data.data[0],
                title: '出借直投项目'
              }
            })
          } else if (res.data.data[0].code === '100001' || res.data.data[0].code === '100002' || res.data.data[0].code === '100003' || res.data.data[0].code === '100004' || res.data.data[0].code === '100005') {
            if (res.data.data[0].code === '100001') {
              this.rechargeMsg = '您暂未实名认证！'
            } else if (res.data.data[0].code === '100002') {
              this.rechargeMsg = '您暂未绑定银行卡！'
            } else if (res.data.data[0].code === '100003') {
              this.rechargeMsg = '您暂未绑定手机号！'
            } else if (res.data.data[0].code === '100004') {
              this.rechargeMsg = '您暂未升级存管通！'
            } else if (res.data.data[0].code === '100005') {
              this.rechargeMsg = ''
            }
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].code === '100001') {
                $('.binding-id-number').show()
              } else if (res.data.data[i].code === '100002') {
                $('.binding-bank').show()
              } else if (res.data.data[i].code === '100003') {
                $('.binding-phone').show()
              } else if (res.data.data[i].code === '100004') {
                $('.binding-upgrate').show()
              } else if (res.data.data[i].code === '100005') {
                $('.binding-top-up').show()
              }
            }
            this.windowOpen('bindWindowFlag')
          } else {
            this.$layer.toast('出借失败，请联系客服！')
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('出借失败，请联系客服！')
          }
        })
      }
    },
    bind (path, $event) {
      this.$mask.show()
      var thisIndex = $($event.target).parents('dl').index()
      if (thisIndex !== 0) {
        for (var i = 0; i < thisIndex; i++) {
          if (!$('.binding-window-content>dl:eq(' + i + ')').is(':hidden')) {
            var inText = $('.binding-window-content>dl:eq(' + i + ') h3').text()
            var layerMsg = ''
            if (inText === '绑定手机号') {
              layerMsg = '请先绑定手机号！'
            } else if (inText === '实名认证') {
              layerMsg = '请先完成实名认证！'
            } else if (inText === '新网银行存管') {
              layerMsg = '请先升级银行存管！'
            } else if (inText === '绑定银行卡') {
              layerMsg = '请先绑定银行卡！'
            }
            this.$layer.toast(layerMsg)
            return
          }
        }
      }
      if (path === '去升级') {
        var _this = this
        this.axios({
          url: this.HOST + '/web-server/registerRequest/v1/activePlatuser',
          method: 'post',
          params: {},
          data: {},
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
          if (res.data.data.code === '1') {
            if (!res.data.data.cgtData) {
              this.mescroll.triggerDownScroll()
            } else {
              this.$router.push({
                path: '/mutual/yeepay',
                query: {
                  data: res.data.data,
                  title: '银行存管激活'
                }
              })
            }
          } else {
            this.$layer.toast('升级失败，请联系客服！')
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('升级失败，请联系客服！')
          }
        })
      } else {
        this.routerLink(path)
      }
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/project/projectDetail.less");
</style>
