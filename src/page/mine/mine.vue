<template>
	<div id="mine-view" class="plus-screen-view">
		<header class="page-header">
      <p class="mine-top clearfix" style="display:none;">
        <span class="nav fl">我的</span>
        <router-link to="/bankDepository" class="existingTube fl"></router-link>
        <router-link to="/bankDepository" class="unsavedTube fl displayNone"></router-link>
        <router-link to="/setUp" class="mine-set phlc-cursor-pointer"><i class="setting"></i></router-link>
      </p>
    </header>
		<div id="mine-contnet"  class="plus-screen-content">
			<div class="mescroll" id="mine-mescroll">
				<div class="plus-screen-scroll">
					<!-- 未登录状态 -->
					<div class="un-login">
						<p class="un-login-tip phlc-first-black-color"><span>爱生活</span><span>惠理财</span><span>唯安全</span><span>方长久</span></p>
						<router-link to="/login" class="mine-login phlc-cursor-pointer">登录/注册</router-link>
					</div>
					<!-- 登录状态 -->
					<div class="mine-personal" style="display:none;">
						<div class="mine-personal-information">
							<p class="mine-info-title clearfix">
								<span class="mine-info-name fl phlc-first-black-color"><i id="mine-info-name"></i></span>
								<span class="mine-info-head fr"><img src="../../assets/images/default-avatar.png"/></span>
							</p>
							<ul class="mine-info-new clearfix">
								<li class="mine-voucher fl clearfix phlc-cursor-pointer" @click="clickVoucher()">
									<span class="mine-voucher-num fl phlc-first-black-color phlc-yxfont"><i class="card-num"><span id="userVoucher">0</span><em class=" mine-red-point mine-cardpoint"></em></i>
									</span>
									<span class="mine-voucher-company fl phlc-fourth-black-color">卡券(张)</span>
								</li>
								<li></li>
								<li class="mine-integral fl clearfix phlc-cursor-pointer" @click="clickIntegral()">
									<span class="mine-integral-num fl phlc-first-black-color  phlc-yxfont"><i class="score-num"><span id="userIntegral">0</span><em class="mine-red-point integralAed"></em></i>
									</span>
									<span class="mine-integral-company fl phlc-fourth-black-color">积分</span>
								</li>
								<li></li>
								<li class="mine-reward fl clearfix phlc-cursor-pointer" @click="clickRedPack()">
									<span class="mine-reward-num fl phlc-first-black-color  phlc-yxfont"><i class="red-num"><span id="redPackAmount">0</span><em class="mine-red-point Amount-red"></em></i>
									</span>
									<span class="mine-reward-company fl phlc-fourth-black-color">红包(元)</span>
								</li>
							</ul>
						</div>
						<img src="../../assets/images/bill.png" alt="" class="bill" v-on:click="$router.push('/annualReport')"/>
						<!--我的资金显示-->
						<div class="mine-money mine-money-show">
							<p class="clearfix mine-money-title phlc-second-black-color">
								<span class="fl">我的资金</span>
								<span class="fl mine-eye phlc-cursor-pointer" @click="editEyeStatus()">
									<img src="../../assets/images/phlc-form-eye-open.png" class="phlc-mine-eye phlc-cursor-pointer"/>
								</span>
							</p>
							<router-link to="/myMoney" class="mine-money-details clearfix">
								<li class="fl">
									<span class="mine-available phlc-first-black-color" id="availableAmount">0</span>
									<span class="phlc-fourth-black-color">可用余额(元)</span>
								</li>
								<li class="fl">
									<span class="mine-wait phlc-first-black-color" id="dueRuturnAmount">0</span>
									<span class="phlc-fourth-black-color">待收回报(元)</span>
								</li>
							</router-link>
							<div class="mine-button clearfix">
								<div class="mine-button-left fl phlc-red-normal" @click="goRecharge($event)">充值</div>
								<div class="mine-button-right fl phlc-red-normal-border phlc-red-normal-color" @click="goRecharge($event)">提现</div>
							</div>
						</div>
						<!--我的资金不显示-->
						<div class="mine-money mine-money-hide">
							<p class="clearfix mine-money-title phlc-second-black-color">
								<span class="fl">我的资金</span>
								<span class="fl mine-eye phlc-cursor-pointer" @click="editEyeStatus()">
								<img src="../../assets/images/phlc-form-eye-close.png" class="phlc-mine-eye phlc-cursor-pointer"/>
							</span>
							</p>
							<router-link to="/myMoney" class="mine-money-details clearfix">
								<li class="fl">
									<span class="mine-available phlc-first-black-color">******</span>
									<span class="phlc-fourth-black-color">可用余额(元)</span>
								</li>
								<li class="fl">
									<span class="mine-wait phlc-first-black-color">******</span>
									<span class="phlc-fourth-black-color">待收回报(元)</span>
								</li>
							</router-link>
							<div class="mine-button clearfix">
								<div class="mine-button-left fl phlc-red-normal" @click="goRecharge($(event))">充值</div>
								<div class="phlc-red-normal-color mine-button-right fl phlc-red-normal-border" @click="goRecharge($(event))">提现</div>
							</div>
						</div>
					</div>
					<!-- 我的资产 -->
					<div class="mine-assets">
            <p class="recommend-black"></p>
						<ul class="mine-assets-ul clearfix">
							<li @click="routeUrl2('/lendRecord')" class="fl lendingRecord">
								<span><img src="../../assets/images/home-mine-loan-record.png"/></span>
								<span>出借记录</span>
							</li>
							<li @click="routeUrl2('/transactionRecords')" class="fl transaction-record phlc-cursor-pointer">
								<span><img src="../../assets/images/phlc-mine-recond.png"/></span>
								<span>交易记录</span>
							</li>
							<li class="fl problemImg2" @click="routeUrl('/FAQ')">
                <span><img src="../../assets/images/phlc-mine-common.png"/></span>
                <span>常见问题</span>
              </li>
              <li class="fl problemImg4" @click="routeUrl('/contactUs')">
                <span><img src="../../assets/images/phlc-mine-contact.png"/></span>
                <span>联系我们</span>
              </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
    <div class="mask-box" id="mask-box">
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
	</div>
</template>

<script>
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      eyeStatus: 0, /* 眼睛的状态 */
      bindingState: '', /* 绑定状态 */
      imgUrl: '', /* 弹窗图片路径 */
      aflag: false,
      dataCode: 0
    }
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('mine-mescroll', {
        down: {
          callback: this.$_downCallback,
          auto: true
        },
        up: {
          use: false,
          auto: true
        }
      })
    },
    $_downCallback () {
      this.mescroll.endSuccess()
      this.getUserMsg()
      this.getCustUserVoucherInfo()
      this.getCustUserPrompt()
      // this.billStatus()
    },
    billStatus () {
      this.axios({
        url: this.HOST + '/activity-server/2018YearSummary/v1/custInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          $('.bill').show()
        } else {
          $('.bill').hide()
        }
      })
    },
    getUserMsg () { /* 获取用户账户信息 */
      this.axios({
        url: this.HOST + '/web-server/account/v1/getCustUserAccountInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.code === 100000) { /* 用户不存在 */
          $('#availableAmount')[0].innerHTML = this.fmoney(0, 2)
          $('#dueRuturnAmount')[0].innerHTML = this.fmoney(0, 2)
        }
        this.dataCode = res.data.data.code
        if (res.data.data.code === 1111) { /* 用户未登录 */
          $('.un-login').css('display', 'block')
          $('.mine-personal').css('display', 'none')
          $('.mine-top').css('display', 'none')
        } else if (res.data.data.code === 1) { /* 用户已登录 */
          this.eyeStatus = res.data.data.isShow
          $('.un-login').css('display', 'none')
          $('.mine-personal').css('display', 'block')
          $('.mine-top').css('display', 'block')
          $('#availableAmount')[0].innerHTML = this.fmoney(res.data.data.availableAmount, 2)
          $('#dueRuturnAmount')[0].innerHTML = this.fmoney(res.data.data.dueRuturnAmount, 2)
          if (this.eyeStatus === 1) {
            $('.mine-money-hide').css('display', 'none')
            $('.mine-money-show').css('display', 'block')
            $('#availableAmount')[0].innerHTML = this.fmoney(res.data.data.availableAmount, 2)
            $('#dueRuturnAmount')[0].innerHTML = this.fmoney(res.data.data.dueRuturnAmount, 2)
          } else if (this.eyeStatus === 0) {
            $('.mine-money-hide').css('display', 'block')
            $('.mine-money-show').css('display', 'none')
          }
        } else {
          $('.un-login').css('display', 'block')
          $('.mine-personal').css('display', 'none')
          $('.mine-top').css('display', 'none')
        }
      })
    },
    getCustUserVoucherInfo () { /* 获取用户头像和卡券信息 */
      var beforeT = localStorage.getItem('beforeDate')
      if (!beforeT) {
        beforeT = '2018-09-14 15:38:28'
      }
      this.axios({
        url: this.HOST + '/web-server/account/v1/getCustUserVoucherInfo',
        method: 'GET',
        params: {
          beforeDate: beforeT
        },
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.code) {
          if (res.data.data.code === 1111) {
            $('.un-login').css('display', 'block')
            $('.mine-personal').css('display', 'none')
          } else if (res.data.data.code === 1) {
            if (res.data.data.userHeadPhoto) {
              $('.mine-info-head').find('img').attr('src', res.data.data.userHeadPhoto.indexOf('focus_image/') === -1 ? res.data.data.userHeadPhoto : this.HOST + '/web-server/' + res.data.data.userHeadPhoto)
            } else {
              $('.mine-info-head').find('img').attr('src', '../../assets/images/default-avatar.png')
            }
            $('.un-login').css('display', 'none')
            $('.mine-personal').css('display', 'block')
            $('#mine-info-name')[0].innerHTML = 'Hi，' + res.data.data.custUserInfo.userName
            $('#userVoucher')[0].innerHTML = res.data.data.userVoucher
            $('#userIntegral')[0].innerHTML = res.data.data.userIntegral
            $('#redPackAmount')[0].innerHTML = this.fmoney(res.data.data.redPackAmount, 2)
            localStorage.setItem('beforeDate', this.getMyDate(res.data.data.nowDate))
            localStorage.setItem('newVoucherEqualsFlag', res.data.data.newVoucherEqualsFlag)
            localStorage.setItem('endVoucherEqualsFlag', res.data.data.endVoucherEqualsFlag)
            localStorage.setItem('integralEqualsFlag', res.data.data.integralEqualsFlag)
            localStorage.setItem('redPackEqualsFlag', res.data.data.redPackEqualsFlag)
            if (localStorage.getItem('newVoucherEqualsFlag') === 'false' || localStorage.getItem('endVoucherEqualsFlag') === 'false') { /* 卡券的小红点 */
              localStorage.setItem('voucherStatus', 'false')
            }
            if (localStorage.getItem('integralEqualsFlag') === 'false') { /* 积分的小红点 */
              localStorage.setItem('integralStatus', 'false')
            }
            if (localStorage.getItem('redPackEqualsFlag') === 'false') { /* 红包的小红点 */
              localStorage.setItem('redPackStatus', 'false')
            }
            if (localStorage.getItem('newVoucherEqualsFlag') === 'true' && localStorage.getItem('endVoucherEqualsFlag') === 'true' && localStorage.getItem('voucherStatus') === 'true') {
              $('.mine-cardpoint').removeClass('phlc-red-normal')
            } else {
              $('.mine-cardpoint').addClass('phlc-red-normal')
            }
            if (localStorage.getItem('integralEqualsFlag') === 'true' && localStorage.getItem('integralStatus') === 'true') {
              $('.integralAed').removeClass('phlc-red-normal')
            } else {
              $('.integralAed').addClass('phlc-red-normal')
            }
            if (localStorage.getItem('redPackEqualsFlag') === 'true' && localStorage.getItem('redPackStatus') === 'true') {
              $('.Amount-red').removeClass('phlc-red-normal')
            } else {
              $('.Amount-red').addClass('phlc-red-normal')
            }
          }
        }
      })
    },
    getCustUserPrompt () { /* 获取我的页面提示信息 */
      this.axios({
        url: this.HOST + '/web-server/account/v1/getCustUserPrompt',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (res.data.data.msg === 1) { /* 所有都绑定了 */
            $('.existingTube').removeClass('displayNone')
            $('.unsavedTube').addClass('displayNone')
            this.bindingState = 5
          } else {
            if (res.data.data.msg === 'AUTH_ACTIVE_USER') { /* 未激活存管 */
              this.bindingState = 0
            } else if (res.data.data.msg === 'AUTH_PHONE') { /* 未绑定手机 */
              this.bindingState = 1
            } else if (res.data.data.msg === 'AUTH_BANK') { /* 未开通存管 */
              this.bindingState = 2
              $('.existingTube').addClass('displayNone')
              $('.unsavedTube').removeClass('displayNone')
            } else if (res.data.data.msg === 'AUTH_BANK_CARD') { /* 未绑定银行卡 */
              this.bindingState = 3
            } else if (res.data.data.msg === 'AUTH_EMAIL') { /* 未绑定邮箱 */
              this.bindingState = 4
            }
          }
        }
      })
    },
    upgrade () {
      this.axios({
        url: this.HOST + '/web-server/registerRequest/v1/activePlatuser',
        method: 'POST',
        params: {},
        data: {},
        timeout: this.axiosTimeout
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
      })
    },
    editEyeStatus () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/index/v1/saveAccountShowStatus',
        method: 'post',
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          isShow: this.eyeStatus === 1 ? 0 : 1
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        this.eyeStatus = this.eyeStatus === 1 ? 0 : 1
        if (!this.eyeStatus) {
          $('.mine-money-hide').css('display', 'block')
          $('.mine-money-show').css('display', 'none')
        } else {
          $('.mine-money-hide').css('display', 'none')
          $('.mine-money-show').css('display', 'block')
        }
      })
    },
    goRecharge (ev) { /* 去充值 */
      var divtext = $(ev.target).text()
      if (this.bindingState === 0) { /* 未激活存管 */
        this.windowOpen(this.aflag)
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
        if (divtext === '充值') {
          this.$router.push('/recharge')
        } else if (divtext === '提现') {
          this.$router.push('/withdraw')
        }
      }
    },
    clickRedPack () { /* 点击红包 */
      localStorage.setItem('redPackStatus', 'true')
      this.$router.push('/redPacket')
    },
    clickIntegral () { /* 点击积分 */
      localStorage.setItem('integralStatus', 'true')
      this.$router.push('/myPoints')
    },
    clickVoucher () { /* 点击卡券 */
      localStorage.setItem('voucherStatus', 'true')
      this.$router.push('/voucherList')
    },
    routeUrl (url) {
      this.$router.push(url)
    },
    routeUrl2 (url) {
      if (this.dataCode === 1) {
        this.$router.push(url)
      } else {
        this.toLogin('/mine')
      }
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
      $('#mask-box').show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
      $('#mask-box').hide()
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  activated () {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll()
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/mine/mine.less");
.bill{
  width: 6.7rem;
  margin: 0.5rem auto 0 auto;
  display: none;
}
</style>
