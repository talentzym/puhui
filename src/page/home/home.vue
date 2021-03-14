<template>
  <div id="home-view" class="plus-screen-view">
    <header class="page-header">
      <p class="clearfix">
        <span class="header-title fl"><img :src=" this.imgArr[ this.imgArrIndex]"/></span>
        <span class="message-hints fr">
          <router-link to="/msgCenter" class="messages-box" tag="i">
            <img src="../../assets/images/messagetittle1.png"/>
            <img src="../../assets/images/messagetittle2.png" class="message-remind"/>
          </router-link>
        </span>
      </p>
    </header>
    <div id="downloadApp" v-show="downWindowFlag">
      <div class="close-btn" v-on:click="downWindowFlag = false"></div>
      <dl>
        <dt>
          <img src="../../assets/images/logo.png"/>
        </dt>
        <dd>
          <p>普惠理财</p>
          <p>新人领{{totalVal}}红包</p>
        </dd>
      </dl>
      <div class="download-btn">
        <a href="https://www.puhuilicai.com/appdownload" target="_blank">立即下载</a>
      </div>
    </div>
    <div id="home-content" class="plus-screen-content">
      <div class="mescroll" id="home-mescroll">
        <div class="plus-screen-scroll">
          <!--状态1-->
          <div class="content-nav" id="home-newcomer">
            <div class="new-people">
              <p class="status1-tip"><span class="status1-tip-span">{{totalVal}}新人礼包待领取</span></p>
              <div class="new-people-cont">
                <div class="clearfix tip-box">
                  <router-link to="/newPeople" tag="div" class="introduce-box fl">礼包介绍</router-link>
                  <router-link to="/register" tag="div" class="immediately-get fr phlc-cursor-pointer">立即领取</router-link>
                </div>
              </div>
            </div>
          </div>
          <!--状态2-->
          <div class="home-top-box" id="home-newcomer-join">
            <div class="home-card home-red-box phlc-red-normal">
              <p class="home-card-tip">{{totalVal}}卡券已放入你的账号</p>
              <div class="clearfix tip-box">
                <router-link to="/newPeople" tag="div" class="introduce-box fl">礼包介绍</router-link>
                <router-link to="/voucherList" tag="div" class="immediately-get fr phlc-cursor-pointer">立即查看</router-link>
              </div>
            </div>
          </div>
          <!--状态3-->
          <div class="home-top-box" id="home-old-comer">
            <div class="home-red-box phlc-red-normal assets">
              <p class="assets-tip">
                <span>
                  <router-link to="/myMoney" tag="span" class="money-tip">账户总额
                    <span class="arrowBox">
                      <i class="arrow"  id="totalAmount">
                        <img src="../../assets/images/phlc-home-arrow.png"/>
                      </i>
                    </span>
                  </router-link>
                </span>
                <span class="eye" v-on:click="editEyeStatus()"></span>
              </p>
              <p class="assets-total phlc-yxfont" id="home-assets-availableAmount">0.00</p>
              <p class="recover-total">
                <span>待收回报</span>&nbsp;
                <span id="home-assets-rechargeAmount" class="phlc-yxfont">0.00</span>
              </p>
            </div>
          </div>
          <!--状态4-->
          <div class="home-top-box" id="home-old-close">
            <div class="home-red-box phlc-red-normal assets">
              <p class="assets-tip">
                <span>
                  <i class="money-tip">账户总额</i>
                </span>
                <span class="eye" id="closeEye" v-on:click="editEyeStatus()"></span>
              </p>
              <p class="assets-total">******</p>
              <p class="recover-total"><span>待收回报</span>&nbsp;<span>******</span></p>
            </div>
          </div>
          <img src="../../assets/images/infor-bank.png" class="user-infor user-infor-bank" v-on:click="routerLink('/bindBankCard')"/>
          <img src="../../assets/images/infor-real-name.png" class="user-infor user-infor-name" v-on:click="routerLink('/dredgeDepository')"/>
          <div class="recommend-travel">
            <div class="recommend recommend-T" id="home-tuijian">
              <p class="recommend-top clearfix">
                <span class="recommend-top-l fl"></span>
                <span class="recommend-top-r fl" onclick="">推荐项目</span>
              </p>
              <div class="recommend-projects">
                <p class="recommend-projects-title" id="home-recommend-projects-name">000号：普惠理财欢迎您~</p>
                <p class="recommend-projects-describe clearfix">
                  <span class="fl recommend-projects-describe1 huanben phlc-fourth-black-color">一次性付息</span>
                  <span class="fl recommend-projects-describe1 fengxian phlc-fourth-black-color">风险等级<i class="dengji">A</i></span>
                  <span class="recommend-projects-describe2 fl" id="home-progress">
                  <span class="recommend-projects-describe2-span phlc-red-normal">
                    <i class="progress" id="home-progress1"></i>
                  </span>
                  <i class="progress" id="home-progress2"></i>
                  </span>
                </p>
                <div class="recommend-projects-cont clearfix">
                  <div class="recommend-projects-contL fl">
                    <p class="math-rate clearfix phlc-yxfont">
                      <span class="fl"><i id="home-rate">0.0</i></span>
                      <span class="plus-interest fl" id="add-rate">+<i class="interest-value">0.0</i></span>
                    </p>
                    <p style="margin-top:0!important">借款利率(%)</p>
                  </div>
                  <!--<p class="shu fl"></p>-->
                  <div class="recommend-projects-contC fl">
                    <p class="date-math phlc-yxfont" id="home-deadLine">0</p>
                    <p class="company">借款期限(天)</p>
                  </div>
                  <!--<p class="shu fl"></p>-->
                  <div class="recommend-projects-contR fl">
                    <p class="lend-amount phlc-yxfont" id="home-financeAmount">0.00</p>
                    <p class="company">可出借金额(元)</p>
                  </div>
                </div>
                <div class="submit-button immediate-lend" v-on:click="goLend()">我要出借</div>
                <input type="hidden" id="proId" />
              </div>
            </div>
            <div class="travel travel-B" id="home-chuxing">
              <p class="recommend-top clearfix">
                <span class="recommend-top-l fl"></span>
                <span class="recommend-top-r fl" onclick="aaa()">出借必看</span>
              </p>
              <ul class="lend-data clearfix">
                <li class="lend-data-li fl">
                  <span class="loan-img data-img"></span>
                  <p class="lend-total">
                    <span class="lend-total-math phlc-yxfont" id="home-plant-bidSum">0</span>
                    <span class="lend-total-company">亿元</span>
                  </p>
                  <p class="data-tip">借款总额</p>
                  <span class="vertical-line"></span>
                </li>
                <li class="lend-data-li fl">
                  <span class="user-img data-img"></span>
                  <p class="lend-total">
                    <span class="lend-total-math phlc-yxfont" id="home-plant-people">0</span>
                    <span class="lend-total-company">万人</span>
                  </p>
                  <p class="data-tip">出借用户</p>
                  <span class="vertical-line"></span>
                </li>
                <li class="lend-data-li fl">
                  <span class="anwser-img data-img"></span>
                  <p class="lend-total">
                    <span class="lend-total-math phlc-yxfont" id="home-plant-dateCount">0</span>
                    <span class="lend-total-company">天</span>
                  </p>
                  <p class="data-tip">安全运行</p>
                </li>
              </ul>
              <ul class="phlc-help">
                <router-link to="/knowNewbank" tag="li" class="phlc-help-li deposit" >
                  <p>银行存管？</p>
                  <img src="../../assets/images/phlc-home-deposit-img.png">
                </router-link>
                <router-link to="/novice" tag="li" class="phlc-help-li novice">
                  <p>新手如何操作？</p>
                  <img src="../../assets/images/phlc-home-novice-img.png">
                </router-link>
                <router-link to="/platformIntroduction" tag="li" class="phlc-help-li phlc-who">
                  <p>普惠理财是谁？</p>
                  <img src="../../assets/images/phlc-home-who-img.png">
                </router-link>
                <router-link to="/platformOperation" class="phlc-help-li platform phlc-cursor-pointer">
                  <p>平台运营的如何？</p>
                  <img src="../../assets/images/phlc-home-platform-img.png">
                </router-link>
              </ul>
            </div>
          </div>
          <div class="phlc-enter-city phlc-five-black-color">
            <span class=""><i class="phlc-five-black  spot"></i>网贷有风险，出借需谨慎<i class="phlc-five-black spot"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="versionmaskBBB" id="cardMask" style="" v-show="activeFlag" @touchmove.prevent>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!--活动页-->
          <div class="swiper-slide" id="activeFrame">
            <a href="javascript:void(0)" class="activeImg">
              <img src="" alt="" />
            </a>
          </div>

          <div class="swiper-slide  swiper-slide2" id="endVoucher" style="display: none;">
            <div class="cardDated">
              <div class="cardDatedTop">
                <div class="dateCardTopImg"></div>
              </div>
              <div class="cardDatedCont">
                <span class="cardDatedContLeft cardnBghong">加息券</span>
                <span class="cardDatedContRight cardnBghuang">即将到期</span>
                <p class="cardCenter1 clearfix">
                  <span class="Symbol fl phlc-red-normal-color">￥</span>
                  <span class="fl phlc-red-normal-color dateCardnum">20%</span>
                  <span class="fl phlc-second-black-color dateCardname">加息券</span>
                </p>
                <p class="cardCenter2 phlc-fourth-black-color">出借期限30天起/出借满20000元</p>
                <p class="hengCont ">
                  <span class="hengLeft"></span>
                  <span class="hengCenter"></span>
                  <span class="hengRight"></span>
                </p>
                <p class="cardCenter3 phlc-second-black-color">有效期：<span>2017.2.12</span>到期</p>

              </div>
              <p class="cardCenter4">
                <span class="cardCenter4hengLeft"><i></i></span>
                <span class="cardCenter4hengCenter phlc-red-normal-color">共3张</span>
                <span class="cardCenter4hengRight"><i></i></span>
              </p>
              <div class="newBankBtn phlc-red-normal ">立即查看</div>
            </div>
          </div>
          <!--333-->
          <div class="swiper-slide swiper-slide2" id="newVoucher" style="display: none;">
            <div class="cardNew">
              <div class="cardDatedTop">
                <div class="newCardTopImg"></div>
              </div>
              <div class="cardDatedCont">
                <span class="cardDatedContLeft cardnBghong">加息券</span>
                <span class="cardDatedContRight cardnBglv">新到</span>
                <p class="cardCenter1 clearfix">
                  <span class="Symbol fl phlc-red-normal-color">￥</span>
                  <span class="fl phlc-red-normal-color dateCardnum">20%</span>
                  <span class="fl phlc-second-black-color dateCardname">加息券</span>
                </p>
                <p class="cardCenter2 phlc-fourth-black-color">出借期限30天起/出借满20000元</p>
                <p class="hengCont ">
                  <span class="hengLeft"></span>
                  <span class="hengCenter"></span>
                  <span class="hengRight"></span>
                </p>
                <p class="cardCenter3 phlc-second-black-color">有效期：<span>2017.2.12</span>到期</p>

              </div>
              <p class="cardCenter4">
                <span class="cardCenter4hengLeft"><i></i></span>
                <span class="cardCenter4hengCenter phlc-red-normal-color">共3张</span>
                <span class="cardCenter4hengRight"><i></i></span>
              </p>
              <div class="newBankBtn phlc-red-normal">立即查看</div>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="welcome-cha" v-on:click="windowClose('activeFlag')"></div>
    </div>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  name: 'home',
  data () {
    return {
      imgArr: [require('../../assets/images/newbankmoneytitle.png'), require('../../assets/images/home-jinri.png'), require('../../assets/images/home-haoyou.png'), require('../../assets/images/home-licai.png'), require('../../assets/images/home-aishenghuo.png')],
      imgArrIndex: 0,
      eyeStatus: false,
      activeFlag: false,
      downWindowFlag: false,
      totalVal: '',
      yuannumber: 0
    }
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('home-mescroll', {
        down: {
          callback: this.$_downCallback,
          use: true,
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
    $_downCallback () {
      this.imgArrIndex = this.imgArrIndex + 1 > this.imgArr.length - 1 ? 0 : this.imgArrIndex + 1
      this.mescroll.endSuccess()
      this.getPlatformData()
      this.getRecommendLoan()
      this.getUnReadMsgCount()
      this.gettotalAccou()
      this.getUserInfo()
    },
    getUserInfo () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/custUserInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1 && res.data.data.custUserInfo && res.data.data.custUserInfo.mobile) {
          if (!res.data.data.realNameInfo || !res.data.data.realNameInfo.id) {
            $('.user-infor-name').show()
          } else if (!res.data.data.bankInfo || !res.data.data.bankInfo.id) {
            $('.user-infor-bank').show()
          } else {
            $('.user-infor').hide()
          }
        }
      })
    },
    getPlatformData () {
      this.axios({
        url: this.HOST + '/web-server/index/v1/getPlantFormData',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          var datepeople = Number(res.data.data.plantFormData.people) / 10000
          var formatdatepeople = this.fmoney(datepeople, 2)
          $('#home-plant-people').text(formatdatepeople)
          var datebidSum = Number(res.data.data.plantFormData.bidSum) / 100000000
          var formatdatebidSum = this.fmoney(datebidSum, 2)
          $('#home-plant-bidSum').text(formatdatebidSum)
          $('#home-plant-dateCount').text(res.data.data.plantFormData.dateCount)
        }
      })
    },
    getRecommendLoan () {
      this.axios({
        url: this.HOST + '/web-server/index/v1/getRecommendLoan',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          $('#proId').val(res.data.data.recommendLoan.id)
          $('#home-recommend-projects-name').text(res.data.data.recommendLoan.name.slice(0, 20) + '...')
          $('#home-rate').text(res.data.data.recommendLoan.rate)
          $('#home-deadLine').text(res.data.data.recommendLoan.loanDay)
          var formatdateCount = this.fmoney(res.data.data.recommendLoan.bidAmount, 2)
          $('#home-financeAmount').text(formatdateCount)
          var process = res.data.data.recommendLoan.progress + '%'
          var loanProgress = '进度' + process
          $('#home-progress1').text(loanProgress)
          $('#home-progress2').text(loanProgress)
          $('#add-rate').hide()
          if (res.data.data.recommendLoan.addRate && res.data.data.recommendLoan.addRate > 0) {
            $('#add-rate').html('+<i class="interest-value">' + res.data.data.recommendLoan.addRate + '</i>')
            $('#add-rate').show()
          } else {
            $('#add-rate').hide()
          }
          $('.recommend-projects-describe2-span').css('width', process)
          $('.dengji').text(res.data.data.recommendLoan.level)
          $('.huanben').text(new Date(res.data.data.recommendLoan.interestEnddate).format('yyyy-MM-dd') + '计息结束')
        }
      })
    },
    getUnReadMsgCount () {
      this.axios({
        url: this.HOST + '/web-server/message/v1/getUnReadMsgCount',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (res.data.data.unReadFlag) {
            $('.message-remind').show()
          } else {
            $('.message-remind').hide()
          }
        } else {
          $('.message-remind').hide()
        }
      })
    },
    gettotalAccou () {
      this.axios({
        url: this.HOST + '/web-server/index/v1/totalAccount',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        // console.log(res)
        switch (res.data.data.code) {
          case 1111:
            this.yuannumber = Number(res.data.data.newUserMap.tryMoneyAmount) + Number(res.data.data.newUserMap.cashAmount)
            if (res.data.data.newUserMap.rateAmount > 0) {
              this.totalVal = this.yuannumber + '元' + '+' + res.data.data.newUserMap.rateAmount
            } else {
              this.totalVal = this.yuannumber + '元'
            }
            $('#home-newcomer').show()
            $('#home-newcomer-join').hide()
            $('#home-old-comer').hide()
            $('#home-old-close').hide()
            $('#home-chuxing').addClass('travel-T')
            $('#home-chuxing').removeClass('travel-B')
            $('#home-tuijian').addClass('recommend-B')
            $('#home-tuijian').removeClass('recommend-T')
            break
          case 100001:
            this.yuannumber = Number(res.data.data.newUserMap.tryMoneyAmount) + Number(res.data.data.newUserMap.cashAmount)
            if (res.data.data.newUserMap.rateAmount > 0) {
              this.totalVal = this.yuannumber + '元' + '+' + res.data.data.newUserMap.rateAmount
            } else {
              this.totalVal = this.yuannumber + '元'
            }
            $('#home-newcomer').hide()
            $('#home-newcomer-join').show()
            $('#home-old-comer').hide()
            $('#home-old-close').hide()
            $('#home-chuxing').addClass('travel-T')
            $('#home-chuxing').removeClass('travel-B')
            $('#home-tuijian').addClass('recommend-B')
            $('#home-tuijian').removeClass('recommend-T')
            break
          case 1:
            this.eyeStatus = res.data.data.isShow
            if (this.eyeStatus) {
              $('#home-newcomer').hide()
              $('#home-newcomer-join').hide()
              $('#home-old-comer').show()
              $('#home-old-close').hide()
            } else {
              $('#home-newcomer').hide()
              $('#home-newcomer-join').hide()
              $('#home-old-comer').hide()
              $('#home-old-close').show()
            }
            var totalAmount = this.fmoney(res.data.data.totalAmount, 2)
            var rechargeAmount = this.fmoney(res.data.data.dueRuturnAmount, 2)
            $('#home-assets-availableAmount').text(totalAmount)
            $('#home-assets-rechargeAmount').text(rechargeAmount)
            $('#home-chuxing').addClass('travel-B')
            $('#home-chuxing').removeClass('travel-T')
            $('#home-tuijian').addClass('recommend-T')
            $('#home-tuijian').removeClass('recommend-B')
            break
        }
      })
    },
    getMyDate () {
      var oDate = new Date()
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth() + 1
      var oDay = oDate.getDate()
      var oHour = oDate.getHours()
      var oMin = oDate.getMinutes()
      var oSen = oDate.getSeconds()
      var oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen)
      return oTime
    },
    getzf (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
      $('#activeFrame').hide()
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
      $('#activeFrame').show()
    },
    goLend (id) {
      this.$router.push({
        path: '/projectDetail',
        query: {
          id: Number($('#proId').val())
        }
      })
    },
    editEyeStatus () {
      this.eyeStatus = this.eyeStatus === 1 ? 0 : 1
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/index/v1/saveAccountShowStatus',
        method: 'post',
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          isShow: this.eyeStatus
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (!this.eyeStatus) {
          $('#home-newcomer').hide()
          $('#home-newcomer-join').hide()
          $('#home-old-comer').hide()
          $('#home-old-close').show()
        } else {
          $('#home-newcomer').hide()
          $('#home-newcomer-join').hide()
          $('#home-old-comer').show()
          $('#home-old-close').hide()
        }
      })
    }
  },
  activated () {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll()
    }
  },
  created () {
    var _this = this
    if (window.localStorage.isNew) {
      this.downWindowFlag = true
      window.localStorage.removeItem('isNew')
      var beforeT = localStorage.getItem('beforeDate')
      if (!beforeT) {
        beforeT = '2018-09-14 15:38:28'
      }
      this.axios({
        url: this.HOST + '/web-server/index/v1/getActiveIndex',
        method: 'GET',
        params: {
          beforeDate: beforeT
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        var time = this.getMyDate()
        localStorage.setItem('beforeDate', time)
        if (res.data.data.activeInfo) {
          if (localStorage.getItem('activityTime') === res.data.data.activeInfo.activityTime) {
            this.windowClose('activeFlag')
          } else {
            this.windowOpen('activeFlag')
          }
          $('#activeFrame').find('img').attr('src', this.imgHost + res.data.data.activeInfo.imagePath)
          $('#activeFrame').click(function () {
            _this.windowClose('activeFlag')
            window.location.href = res.data.data.activeInfo.focusLink
          })
          localStorage.setItem('activityTime', res.data.data.activeInfo.activityTime)
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
@import url("../../assets/style/home/home.less");
</style>
