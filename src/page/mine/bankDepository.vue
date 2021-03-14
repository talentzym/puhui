<template>
 <div id="bankDepository-view" class="plus-screen-view">
   <scrollHeader :scrollHeadText = "bankDepositoryMsg"></scrollHeader>
   <div class="project-introduce-content">
     <div class="phlc-bankDepositoryMsg-header">
       <p class="bankDepositoryMsg-header-tip">携手新网银行</p>
       <p class="bankDepositoryMsg-header-tip">选择银行"直接存管"模式</p>
       <p class="bankDepositoryMsg-little-tip">于2017.07.14上线</p>
       <router-link to="/knowNewbank" tag="span" class="whatIs">什么是银行存管？<i class="phlc-arrow"></i></router-link>
     </div>
     <div class="phlc-top-list plus-screen-content">
       <ul class="plus-screen-scroll datalist" v-show="isShow">
        <li class="phlc-set-phone">
          <div class="topic_main">
            <div class="topic_img">
              <img src="../../assets/images/phlc-icon-1.png" alt="" class="icon-img-1">
            </div>
            <router-link v-if="data.activeMsg === 1" :to="{path: '/formResult', query: {type: 'dredgeDepository', name: data.realNameInfo.realName, idNumber: data.realNameInfo.idCard, title: '实名认证' }}" tag="div" class="topic_info clearfix s1">
              <div class="topic_cont">
                <p class="large">实名认证<i class="smallIcon realName"></i></p>
                <p class="small">完善实名认证，资金账户更安全</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait phlc-fourth-black-color" id="set-realNameInfo">{{real}}</span>
            </router-link>
            <div v-if="data.activeMsg === 'AUTH_BANK'" :to="{path: 'dredgeDepository'}" class="topic_info clearfix s2" v-on:click="goDredgeDepository()">
              <div class="topic_cont">
                <p class="large">实名认证<i class="smallIcon realName displayNone"></i></p>
                <p class="small">完善实名认证，资金账户更安全</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait phlc-red-normal-colors" id="set-realNameInfo">去实名</span>
            </div>
            <div v-if="data.activeMsg === 'AUTH_ACTIVE_USER'" class="topic_info clearfix s3" @click="goActivation()">
              <div class="topic_cont">
                <p class="large">实名认证<i class="smallIcon realName"></i></p>
                <p class="small">完善实名认证，资金账户更安全</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait phlc-red-normal-colors" id="set-realNameInfo">去激活</span>
            </div>
          </div>
        </li>
        <li class="phlc-set-phone">
          <div class="topic_main">
            <div class="topic_img">
              <img src="../../assets/images/phlc-icon-2.png" alt="" class="icon-img-2">
            </div>
            <div v-if="data.bankMsg === 1" class="topic_info clearfix b1"  @click="bankCardClick()">
              <div class="topic_cont">
                <p class="large">绑定银行卡<i class="smallIcon tieOnCard"></i></p>
                <p class="small">绑定银行卡，充值提现更便利</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait" id="set-bank"></span>
            </div>
            <div v-if="data.bankMsg !== 1" class="topic_info clearfix b2" @click="bankCardClick()">
              <div class="topic_cont">
                <p class="large">绑定银行卡<i class="smallIcon tieOnCard"></i></p>
                <p class="small">绑定银行卡，充值提现更便利</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait" id="set-bank"></span>
            </div>
          </div>
        </li>
        <li class="phlc-set-phone">
          <div class="topic_main">
            <div class="topic_img">
              <img src="../../assets/images/phlc-icon-3.png" alt="" class="icon-img-3">
            </div>
            <router-link v-if="data.custUserInfo && data.custUserInfo.riskLevel" :to="{path: '/formResult', query: {type: 'riskAssessment', resultMsg: data.custUserInfo.riskLevel, title: '出借者风险承受能力测评'}}" tag="div" class="topic_info clearfix">
              <div class="topic_cont">
                <p class="large">风险评测<i class="smallIcon evaluation"></i></p>
                <p class="small">测评后，普小二更了解您哦</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait" id="set-riskLevel-tip"></span>
            </router-link>
            <router-link v-if="!data.custUserInfo || !data.custUserInfo.riskLevel" to="/riskAssessment" tag="div" class="topic_info clearfix">
              <div class="topic_cont">
                <p class="large">风险评测<i class="smallIcon evaluation"></i></p>
                <p class="small">测评后，普小二更了解您哦</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait" id="set-riskLevel-tip"></span>
            </router-link>
          </div>
        </li>
        <li class="phlc-set-phone" v-show="data.activeMsg === 1 && data.bankMsg === 1">
          <div class="topic_main">
            <div class="topic_img">
              <img src="../../assets/images/phlc-newbankStatus7.png" alt="" class="icon-img-3">
            </div>
            <div tag="div" class="topic_info clearfix" v-on:click="resetPassword()">
              <div class="topic_cont">
                <p class="large">交易密码<i class="smallIcon"></i></p>
                <p class="small">存管交易密码可不定期修改哦</p>
              </div>
              <i class="phlc-set-arrow"></i>
              <span class="phlc-set-header-portrait" id="set-riskLevel-tip"></span>
            </div>
          </div>
        </li>
       </ul>
     </div>
   </div>
 </div>
</template>

<script>
import scrollHeader from '@/components/scrollHeader'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
export default {
  data () {
    return {
      bankDepositoryMsg: '银行存管',
      banknum: '',
      relName: '',
      data: {},
      url: '',
      realdElm: $('#set-realNameInfo'),
      real: '',
      isShow: false
    }
  },
  created () {
    this.getcustUserInfo()
  },
  methods: {
    getcustUserInfo () {
      this.axios({ /* 获取用户信息 */
        url: this.HOST + '/web-server/account/v1/custUserInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        this.isShow = true
        if (res.data.code) {
          this.data = res.data.data
          if (this.data.code === 1) {
            $('#set-riskLevel-tip')[0].innerHTML = this.data.custUserInfo.riskLevel
            $('#set-riskLevel-tip').removeClass('phlc-red-normal-colors')
            $('#set-riskLevel-tip').addClass('phlc-fourth-black-color')
            if (this.data.bankMsg === 1) { /* 已绑定银行卡 */
              this.banknum = this.data.bankInfo.bankNo.slice(-4)
              $('#set-bank')[0].innerHTML = '(尾号' + this.banknum + ')'
              $('#set-bank').removeClass('phlc-red-normal-colors')
              $('#set-bank').addClass('phlc-fourth-black-color')
            } else {
              $('#set-bank')[0].innerHTML = '去绑定'
              $('#set-bank').removeClass('phlc-fourth-black-color')
              $('#set-bank').addClass('phlc-red-normal-colors')
              $('.tieOnCard').addClass('displayNone')
            }
            if (this.data.activeMsg === 1) { /* 已开通存管通 */
              this.relName = this.data.realNameInfo.realName.substr(this.data.realNameInfo.realName.length - 1, 1)
              this.real = '(**' + this.relName + ')'
            }
          } else {
            $('#set-riskLevel-tip')[0].innerHTML = '去测评'
            $('#set-riskLevel-tip').removeClass('phlc-fourth-black-color')
            $('#set-riskLevel-tip').addClass('phlc-red-normal-colors')
            $('.evaluation').addClass('displayNone')
          }
        }
      })
    },
    bankCardClick () {
      if (this.data.activeMsg === 'AUTH_BANK') {
        this.$layer.toast('您尚未实名认证，请先实名哦~')
      } else {
        if (this.data.bankMsg === 1) {
          this.$router.push({path: '/bankCard'})
        } else {
          this.$router.push({path: '/bindBankCard'})
        }
      }
    },
    goActivation () {
      this.axios({
        url: this.HOST + '/web-server/registerRequest/v1/activePlatuser',
        method: 'POST',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          if (!res.data.data.cgtData) {
            this.getcustUserInfo()
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
    goDredgeDepository () {
      this.axios({
        url: this.HOST + '/web-server/account/v2/getRiskAssessment',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout,
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
        }],
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.$router.push({
            path: '/dredgeDepository'
          })
        } else if (res.data.data.code === '100001') {
          this.imgUrl = require('../../assets/images/risk-icon.png')
          this.$layer.dialog({
            content: '<div class="phlc-layer">' +
              '<img src="' + this.imgUrl + '" style="width:1.62rem;margin:0 auto;"/>' +
              '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未完成风险测评</div>' +
              '</div>',
            contentClass: 'layer-class',
            btn: ['再看看', '立即测评']
          }).then((res) => {
            if (res === 1) {
              this.$router.push({
                path: '/riskAssessment'
              })
            }
          })
        }
      })
    },
    resetPassword () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/toYeePayResetPassword',
        method: 'POST',
        params: {
          appModel: 'weixin'
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
        if (res.data.data.isEnterprise === 'yes') {
          res.data.data.cgtData = res.data.data
          res.data.data.requestNo = JSON.parse(res.data.data.reqData).requestNo
          this.$router.push({
            path: '/mutual/yeepay',
            query: {
              data: res.data.data,
              title: '修改交易密码'
            }
          })
        } else {
          this.$layer.toast('企业用户请上PC端修改！')
        }
      })
    }
  },
  components: {
    scrollHeader
  }
}
</script>

<style lang="less">
#bankDepository-view{
  background: #F8F8F9;
  .project-introduce-content{
    position: absolute;
    top: 0rem;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: #F8F8F9;
    .phlc-bankDepositoryMsg-header{
      height: 4.4rem;
      margin: 0 auto;
      background: url(../../assets/images/phlc-bankDepositorybg.png) no-repeat;
      background-size: 100% 100%;
      z-index: 1;
      padding: 0rem 0.4rem 0rem 0.4rem;
      position: relative;
      top: 0;
      p{
        text-align: center;
      }
      .bankDepositoryMsg-header-tip:first-child{
        padding-top: 1.2rem;
      }
      .bankDepositoryMsg-header-tip{
        font-size: 0.4rem;
        color: #fff;
        font-weight:bold;
        font-weight: 400;
        margin-bottom: 0.3rem;
      }
      .bankDepositoryMsg-little-tip{
        font-size: 0.24rem;
        color:rgba(240,243,254,1);
        opacity: 0.8;
      }
      .whatIs{
        display: block;
        width: 2.8rem;
        height: .48rem;
        line-height: .48rem;
        background:#334ab7;
        border-radius: 0.24rem;
        margin: 0 auto;
        font-size: 0.24rem;
        color: #fff;
        text-align: center;
        margin-top: 0.39rem;
        position: relative;
        .phlc-arrow{
          position: absolute;
          right: 0.38rem;
          top: 50%;
          margin-top: -0.05rem;
          width: 0.12rem;
          height: 0.12rem;
          border-right: 0.01rem solid #b2b2b2;
          border-bottom: 0.01rem solid #b2b2b2;
          -webkit-transform: rotate(-45deg);
        }
      }
    }
    .phlc-top-list{
      margin-top: 0.2rem;
      background: #fff;
      padding: 0 0.4rem;
      li{
        border-bottom: .02rem solid #EEEEEE;
        height: 1.56rem;
        font-size: .3rem;
        overflow: hidden;
        .topic_main {
          display: -webkit-box;
          background: #fff;
          vertical-align: middle;
          .topic_info {
            position: relative;
            -webkit-box-flex: 1;
            display: -webkit-box;
            -webkit-box-align: center;
            padding: 0.3rem 0;
            overflow: hidden;
            .topic_cont {
              -webkit-box-flex: 1;
              .large{
                .smallIcon{
                  display: inline-block;
                  width: 0.64rem;
                  height: 0.24rem;
                  margin-left: 0.2rem;
                }
                .realName{
                  background: url(../../assets/images/phlc-real-name.png);
                  background-size: 100% 100%;
                }
                .tieOnCard{
                  background: url(../../assets/images/phlc-tieon-card.png);
                  background-size: 100% 100%;
                }
                .evaluation{
                  background: url(../../assets/images/phlc-evaluation.png);
                  background-size: 100% 100%;
                }
              }
              .small{
                font-size: .24rem;
                margin-top: 0.2rem;
                color: #999999;
              }
            }
          }
          .topic_img{
            display: -webkit-box;
            -webkit-box-align: center;
            margin-right: 0.3rem;
            .icon-img-1{
              width: 0.64rem;
              height: 0.52rem;
            }
            .icon-img-2{
              width: 0.66rem;
              height: 0.52rem;
              vertical-align: middle;
            }
            .icon-img-3{
              width: 0.56rem;
              height: 0.72rem;
              vertical-align: middle;
            }
          }
          .phlc-set-arrow{
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -4px;
            width: .12rem;
            height: .24rem;
            background: url(../../assets/images/phlc-next.png) no-repeat;
            background-size: 100% 100%;
          }
          .phlc-set-header-portrait{
            position: absolute;
              right: 0.5rem;
              top: 50%;
              margin-top: -9px;
              font-size: 0.26rem;
          }
        }
      }
    }
  }
  .phlc-red-normal-colors{
    color: #E88A21;
  }
  .phlc-fourth-black-color{
    color: #666666;
  }
  .displayNone{
    display: none!important;
  }
}
</style>
