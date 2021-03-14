<template>
  <div id="activity-share-view" class="plus-screen-view">
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="label">
          <p>Hello，我是{{ data.mobile }}</p>
          <p>发来＃提钱实现愿望红包返现券免费领哦〜</p>
        </div>
        <div class="modal modal1">
          <input type="tel" name="tel" placeholder="请输入手机号领取" class="order-money"
            v-model="tel"
            v-show="!codeFlag && !awardData.dataType"
            v-validate="{required: true, regex: regex.phone}"
            oninput="this.value = this.value.replace(/\D/gi, '');"/>
          <form v-show="codeFlag && !awardData.dataType">
            <div class="form-action">
              <input class="mui-input-clear" required="required" type="tel" name="code"
                v-model="code"
                v-validate="{required:true, length:6}"
                v-bind:class="{ 'input-err-border': errors.first('code') }"
                placeholder="请输入6位验证码"
                oninput="this.value = this.value.replace(/\D/gi, '');"/>
              <i style="right: 2rem;" class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('code', $event)"></i>
              <span class="form-action-code" v-on:click="sendCode()">发送验证码</span>
              <p>{{ errors.first('code') }}</p>
              <div class="reset-tel" v-on:click="resetTel()">重新填写手机号</div>
            </div>
          </form>
          <div class="go-order" v-show="!codeFlag && !awardData.dataType" v-on:click="sendCode()">提交</div>
          <div class="go-order" v-show="codeFlag && !awardData.dataType" v-on:click="submit()">立即领取</div>
          <div class="award-box" v-show="awardData.dataType">
            <div>
              <section class="share-red-packet" v-show="awardData.dataType === 1">
                <p>¥<span class="packet-money" id="useRedPackAmount">{{ awardData.nominalValue }}</span>元红包</p>
                <p>出借满<span class="packet-need-money"></span>2000后可兑换</p>
              </section>
              <!--登录已领取，卡券-->
              <section class="share-voucher" v-show="awardData.dataType === 2">
                <div class="voucher" style="width:100%;">
                  <div class="voucher-top">
                    <p><span class="amount-color" style="font-size: 0.24rem">¥</span><span class="color-e6382c font-size-36 font-weight order-radio amount-color" id="useCardAmount">{{ awardData.nominalValue }}</span><span class="color-e6382c font-size-18 font-weight"></span> 返现券</p>
                    <p class="font-size-20 color-999999">出借<span>2000</span>元可用/出借期限<span>0</span>天起</p>
                  </div>
                  <div class="voucher-bottom">
                    <p class="font-size-20 color-999999">有效期至：<span class="order-validity" id="useCardLineTime">{{ awardData && awardData.invalidTime ? awardData.invalidTime.split(' ')[0] : ''}}</span></p>
                  </div>
                </div>
              </section>
            </div>
            <p>已放入账号：<label>{{ awardData.mobile }}</label></p>
            <router-link tag="li" to="/login" class="award-button" v-show="awardData.dataType === 1">去看看</router-link>
            <router-link tag="li" to="/project" class="award-button" v-show="awardData.dataType === 2">去使用</router-link>
          </div>
          <p class="share-ing-user">看他们的手气</p>
          <vue-seamless-scroll v-show="data.listData.length" class="modal1-box" :class-option="scrollOption" :data="data.listData">
            <ul class="">
              <li v-for="(item, $index) in data.listData" v-bind:key="$index">
                <div class="award">
                  <p>{{ item.USERNAME }}</p>
                  <p>{{ item.CONTENT }}</p>
                  <span class="color-fd3d16">{{ fmoney(item.AMOUNT, 2) + item.TYPE }}</span>
                  <span>{{new Date(item.CREATTIME).format('MM-dd HH:mm:ss')}} 领取</span>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
          <p v-show="!data.listData.length" class="scroll-no-data">据说第一位领取的红包最大哦~</p>
        </div>
        <div class="modal modal2">
          <a href="https://www.puhuilicai.com/appdownload" target="_blank">
            <img src="./images/download-app.png"/>
          </a>
        </div>
        <div class="dclund-modal dclund-compliance-progress-modal">
          <div class="dclund-modal-title">
            <span>普惠理财是谁</span>
          </div>
          <div class="dclund-modal-content">
            <p>普惠理财（<span class="color-f93b52">www.puhuilicai.com</span>） 隶属于硅谷厚朴（北京）金融信息服务有限公司，硅谷厚朴成立于2014年8月，实缴资本5000万元，注册于北京市石景山区，硅谷厚朴（北京）金融信息服务有限公司是厚朴金融旗下的综合互联网金融服务商。 </p>
          </div>
        </div>
        <div class="dclund-modal dclund-compliance-progress-modal">
          <div class="dclund-modal-title">
            <span>平台出借者心声</span>
          </div>
          <div class="dclund-modal-content">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide class="swiperS">
                <p>李书文总是我的男神，赢在中国的风采还是久久不能忘却，也改变了我的择偶观，所以单身至今，优秀的人自然会创造出优秀的团队，果然，我没有看错！</p>
                <div class="span">来自平台用户：ghe***89</div>
              </swiper-slide>
              <swiper-slide class="swiperS">
                <p>吸引我的是客服的萌妹子们，每次回款特贴心的电话告知，主要是声音甜如蜜，不续投，着实有失我绅士风度了，这样的服务态度，又让我多一个放心！</p>
                <div class="span">来自平台用户：zha****ng</div>
              </swiper-slide>
              <swiper-slide class="swiperS">
                <p>看好年化收益，活动定期不断更新，充满了新鲜感，也满足运气爆棚的我，各种福利拿到手软，并非我薅羊毛，只是我想要的在这里都给足了，没有理由让我离开！</p>
                <div class="span">来自平台用户：tan***an</div>
              </swiper-slide>
              <swiper-slide class="swiperS">
                <p>我已经观望很久的说，这里有顶级团队架构、始终合规运营、项目的真实性、无一例逾期的回款，着实想过资金一并入住普惠理财，决定不再潜了，一起奔跑吧！</p>
                <div class="span">来自平台用户：wan***23</div>
              </swiper-slide>
              <div class="swiper-pagination clearfix" slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <div class="dclund-modal dclund-platform-modal">
          <div class="dclund-modal-title">
            <span>平台优势</span>
          </div>
          <div class="dclund-modal-content">
            <ul>
              <li>
                <img src="./images/advantage-of-platform-1.png"/>
                <h3>安全运行天数</h3>
                <p class="run-days">{{ data.bidStatis.dateCount }}天</p>
              </li>
              <li>
                <img src="./images/advantage-of-platform-2.png"/>
                <h3>历史投资回报</h3>
                <p class="history-return">{{ fmoney(data.bidStatis.incomeSum, 2) }}元</p>
              </li>
              <li>
                <img src="./images/advantage-of-platform-3.png"/>
                <h3>模式创新</h3>
                <p>互联网+供应链金融”创</p>
                <p>新模式—I2AR</p>
              </li>
              <li>
                <img src="./images/advantage-of-platform-4.png"/>
                <h3>新网存管</h3>
                <p>2017.7.12上线新网银行</p>
                <p>资金直接存管模式</p>
              </li>
              <li>
                <img src="./images/advantage-of-platform-5.png"/>
                <h3>风控健全</h3>
                <p>独创的风险管理体系</p>
                <p>多级风险评价模型</p>
              </li>
              <li>
                <img src="./images/advantage-of-platform-6.png"/>
                <h3>运营稳健</h3>
                <p>不竞速 不跟风 慢慢来</p>
                <p>做自己</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-label">
          <p>© 2018 普惠理财 (www.puhuilicai.com)</p>
          <p>京ICP备号14042685号</p>
          <p>出借有风险，入市需谨慎</p>
        </div>
      </div>
    </div>
    <!--红包弹窗-->
    <div class="red-packet-window" v-show="redPacketWindowFlag">
      <img src="./images/red-packet-window-bg.png"/>
      <p>嗨，“愿望红包”轻松入账，恭喜你哟！</p>
      <p>已放入账号: <span class="account" id="redPackMobile">{{ awardData.mobile }}</span></p>
      <p>¥<span class="pecket-money" id="redPackAmount">{{ awardData.nominalValue }}</span>红包</p>
      <p>出借满2000元可直接提现</p>
      <router-link tag="div" to="/login" class="use" onclick="goLook(1);">去看看</router-link>
      <img src="./images/red-packet-window-close.png" v-on:click="windowClose('redPacketWindowFlag')"/>
    </div>
    <!--卡券弹窗-->
    <div class="voucher-window" v-show="voucherWindowFlag"> <!--  返现券弹出--->
      <p>没看错，砸中您的是“愿望卡券”哦！</p>
      <p>已放入账号: <span class="account" id="cardMobile">{{ awardData.mobile }}</span></p>
      <div class="voucher">
        <div class="voucher-top">
          <p><span class="color-e6382c font-size-36 font-weight order-radio" id="cardAmount">{{ awardData.nominalValue }}</span><span class="color-e6382c font-size-18 font-weight"></span> 返现券</p>
          <p class="font-size-20 color-999999">出借2000元可用/出借期限0天起</p>
        </div>
        <div class="voucher-bottom">
          <p class="font-size-20 color-999999">有效期至：<span class="order-validity" id="cardLineTime">{{ awardData && awardData.invalidTime ? awardData.invalidTime.split(' ')[0] : '' }}</span></p>
        </div>
      </div>
      <router-link tag="div" to="/project" class="use" onclick="usePacket()">去使用</router-link>
      <img src="./images/red-packet-window-close.png" v-on:click="windowClose('voucherWindowFlag')"/>
    </div>
    <!--回到顶部按钮-->
    <img src="./images/back-to-top-icon.png" class="back-to-top" v-on:click="backToTop()"/>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Indicator } from 'mint-ui'
import { Validator } from 'vee-validate'
import $ from 'jquery'
import vueSeamlessScroll from 'vue-seamless-scroll'
const dict = {
  custom: {
    tel: {
      required: '请输入手机号码！',
      regex: '请输入正确的手机号码！'
    },
    code: {
      required: '请输入验证码！',
      length: '您输入的验证码格式有误！'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      isLogin: false,
      redPacketWindowFlag: false,
      voucherWindowFlag: false,
      codeFlag: false,
      tel: '',
      code: '',
      data: {
        bidStatis: {
          dateCount: 0,
          incomeSum: 0,
          people: 0
        },
        mobile: '',
        listData: []
      },
      swiperOption: {
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      scrollOption: {
        hoverStop: false,
        openTouch: false,
        limitMoveNum: 4,
        step: 0.5
      },
      awardData: {
        dataType: 0,
        mobile: '',
        nominalValue: 0
      }
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getFourAnniversaryRedpack',
        method: 'GET',
        params: {
          inviteCold: this.$route.query.inviteCold,
          redWarsFlag: this.$route.query.redWarsFlag,
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
        console.log(res)
        if (res.data.data.data.code === 1) {
          this.isLogin = true
          this.data = res.data.data.data
        } else if (res.data.data.data.code === 100003) {
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
    sendCode () {
      if (this.regex.phone.test(this.tel)) {
        if (this.countdownBool) {
          this.axios({
            url: this.HOST + '/activity-server/activityInfo/v1/getRandCode',
            method: 'GET',
            params: {
              mobile: this.tel
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
              this.$layer.toast('发送成功！')
              this.codeFlag = true
              this.countdownBool = false
              this.iTime = setInterval(() => {
                this.validateCodeSetTime()
              }, 1000)
            } else {
              this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '发送失败，请重新尝试！')
            }
          }).catch((err) => {
            if (err) {
              console.log(err)
              this.$layer.toast('发送失败，请重新尝试！')
            }
          })
        }
      } else {
        this.$layer.toast(this.tel ? '请输入正确的手机号码！' : '请输入手机号码！')
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
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/activity-server/activityInfo/v1/getFourGrabRedpack',
            method: 'post',
            params: {},
            data: {
              activityId: '2019NewYear',
              inviteCold: this.$route.query.inviteCold,
              redWarsFlag: this.$route.query.redWarsFlag,
              mobile: this.tel,
              code: this.code
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
              this.awardData = res.data.data.data
              this.windowOpen(this.awardData.dataType === 1 ? 'redPacketWindowFlag' : 'voucherWindowFlag')
              this.$_init()
            } else if (res.data.data.data.code === 100009) {
              this.awardData = res.data.data.data
              this.$layer.toast('使用了才能再领取哦！')
            } else {
              this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '操作失败，请重新尝试！')
            }
          }).catch((err) => {
            if (err) {
              console.log(err)
              this.$layer.toast('操作失败，请重新尝试！')
            }
          })
        }
      })
    },
    backToTop () {
      $('#activity-share-view .plus-screen-content').scrollTop(0)
    },
    resetTel () {
      this.tel = ''
      clearInterval(this.iTime)
      $('.form-action-code').attr('disabled', false).css({
        'border': '1px solid #e6382c',
        'color': '#e6382c'
      }).text('获取验证码')
      this.countdown = 59
      this.countdownBool = true
      this.codeFlag = false
      this.code = ''
    }
  },
  components: {
    swiper,
    swiperSlide,
    vueSeamlessScroll
  }
}
</script>

<style lang="less">
#activity-share-view{
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      background: url(./images/share-banner.png) no-repeat;
      background-color: #d63239;
      background-size: 100%;
      min-height: 100%;
      padding: 2.65rem 0.4rem 0.01rem 0.4rem;
    }
  }
  .dclund-modal {
    width: 100%;
    box-sizing: border-box;
    background: #fff2f4;
    border-radius: 0.2rem;
    box-sizing: border-box;
    padding: 0.5rem 0.6rem;
    margin-top: 0.5rem;
    box-shadow: 0.03rem 0.03rem 0.29rem rgba(199, 41, 21, 0.44);
    .dclund-modal-title {
      font-size: 0.4rem;
      margin-bottom: 0.28rem;
      color: #fc4633;
      text-align: center;
      span {
        position: relative;
        padding: 0 0.1rem;
        &:after, &:before{
          content: "";
          display: block;
          width: 0.37rem;
          height: 0.11rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &:after{
          background: url(./images/dclound-modal-title-right.png) no-repeat;
          background-size: 100%;
          right: -0.37rem;
        }
        &:before{
          background: url(./images/dclound-modal-title-left.png) no-repeat;
          background-size: 100%;
          left: -0.37rem;
        }
      }
    }
  }
  .dclund-platform-modal{
    ul{
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      margin-top: 0.4rem;
      li {
        width: 50%;
        &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4){
          padding-bottom: 0.6rem;
        }
      }
    }
    img {
      width: 1.5rem;
      margin: 0 auto;
    }
    p {
      font-size: 0.24rem;
      color: #444;
      line-height: 0.45rem;
    }
    h3 {
      font-size: 0.3rem;
      font-weight: bold;
      color: #222;
      padding: 0.25rem 0 0.15rem 0;
    }
  }
  .dclund-compliance-progress-modal{
    p {
      font-size: 0.28rem;
      color: #444;
      line-height: 0.5rem;
      margin-bottom: 0.1rem;
      background: url(./images/border-bottom.png);
      background-size: 100% 0.5rem;
    }
    .span{
      font-size: 0.26rem;
      color: #444444;
    }
    .swiper-pagination{
      width: 69px;
      left: 100%;
      transform: translateX(-100%);
      bottom: -0.23rem;
    }
    .swiper-pagination-bullet-active{
      background: #ea3c3e;
    }
  }
  .modal{
    width: 100%;
    padding: 0.5rem 0.6rem;
    border-radius: 0.3rem;
    background: #fff2f4;
    margin-top: 0.45rem;
    position: relative;
    box-sizing: border-box;
  }
  .order-money {
    width: 100%;
    height: 0.9rem;
    border: 0.02rem solid #ea3c3e;
    text-align: center;
    background: transparent;
    border-radius: 0.1rem;
    color: #222;
    margin: 0.38rem auto 0 auto;
    display: block;
  }
  .go-order {
    width: 100%;
    height: 0.9rem;
    background-color: #ea3c3e;
    box-shadow: 0.02rem 0.035rem 0.06rem 0 rgba( 234, 60, 62, 0.3 );
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
    line-height: 0.9rem;
    border-radius: 0.5rem;
    margin: 0.48rem auto 0 auto;
  }
  .modal1{
    height: 10.75rem;
  }
  .share-ing-user {
    font-size: 0.24rem;
    position: relative;
    text-align: center;
    position: absolute;
    top: 5.26rem;
    left: 0;
    right: 0;
    margin: 0 0.6rem;
    &:before, &:after{
      content: "";
      display: block;
      width: 1.7rem;
      height: 1px;
      background: #d6cccd;
      position: absolute;
      top: 0.16rem;
    }
    &:before{
      left: 0;
    }
    &:after{
      right: 0;
    }
  }
  .modal1-box{
    position: absolute;
    top: 5.7rem;
    left: 0;
    right: 0;
    margin: 0 0.6rem;
    height: 4.52rem;
    overflow: auto;
  }
  .award{
    padding: 0.4rem 0;
    border-bottom:1px solid #eaeaea;
    position: relative;
    p:first-child{
      color: #5d5d5d;
      font-size: 0.24rem;
      margin-bottom: 0.05rem;
    }
    p:nth-child(2){
      color: #888;
      font-size: 0.22rem;
    }
    span:nth-child(3){
      font-size: 0.24rem;
      color: #fd3d16;
      position: absolute;
      top: 0.4rem;
      right: 0;
    }
    span:nth-child(4){
      font-size: 0.24rem;
      color: #888;
      position: absolute;
      bottom: 0.4rem;
      right: 0;
    }
  }
  .modal2{
    padding: 0;
    img{
      width: 100%;
    }
  }
  .history-return, .run-days{
    color: #e93b3d!important;
  }
  .label{
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.5rem;
    color: #444444;
    p:last-child{
      color: #d7353c;
    }
  }
  .bottom-label{
    font-size: 0.24rem;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 0.36rem;
    margin: 0.4rem;
    p:last-child{
      color: #fff;
    }
  }
  form .form-action input{
    background: transparent;
  }
  .reset-tel{
    font-size: 0.26rem;
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ea3c3e;
  }
  .award-box{
    >div{
      height: 2.7rem;
    }
    >p{
      font-size: 0.28rem;
      color: #444;
      text-align: center;
      margin-bottom: 0.25rem;
      label{
        color: #ea3c3e;
      }
    }
    .award-button{
      width: 3.6rem;
      height: 0.75rem;
      background: rgb(234, 60, 62 );
      box-shadow: 0.02rem 0.035rem 0.06rem 0px rgba(253, 61, 22, 0.33);
      border-radius: 0.375rem;
      margin: 0 auto;
      font-size: 0.28rem;
      color: #fff;
      text-align: center;
      line-height: 0.75rem;
    }
  }
  .share-red-packet {
    width: 100%;
    background: url(./images/share-red-packet-bg.png) no-repeat;
    background-size: 100%;
    padding-top: 2.3rem;
    position: relative;
    >p span {
      color: #fd3d16;
    }
    p:nth-child(1), p:nth-child(2) {
      font-size: 0.24rem;
      text-align: center;
      position: absolute;
    }
    p:nth-child(1) {
      width: 2.2rem;
      top: 0.43rem;
      left: 0;
      color: #fd3f18;
      span {
        font-size: 0.44rem;
      }
    }
    p:nth-child(2) {
      width: 3.4rem;
      right: 0;
      color: #fff;
      top: 0.62rem;
    }
  }
  .share-red-packet>p:nth-child(3),
  .share-voucher>p:nth-child(2) {
    font-size: 0.24rem;
    text-align: center;
  }
  .share-voucher {
    >p:nth-child(2) {
      margin-top: 0.5rem;
      span {
        color: #FD3F18;
      }
    }
  }
  .voucher {
    width: 5.7rem;
    height: 2.3rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    background: url(./images/voucher.png) no-repeat;
    background-size: 100%;
    position: relative;
    box-shadow: 0.015rem 0.026rem 0.18rem 0 rgba( 177, 178, 181,0.3);
    &.used .voucher-bottom:after {
      content: "";
      display: block;
      width: 1.11rem;
      height: 1.07rem;
      background: url(./images/voucher-used.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -0.1rem;
      right: 0.5rem;
      z-index: 1;
    }
    p:first-child {
      text-align: left;
      font-size: 0.28rem;
      color: #333;
      line-height: 0.47rem;
    }
  }
  .amount-color{
    font-size: 0.46rem;
    color:#FD3F18;
  }
  .voucher-top {
    width: 100%;
    height: 1.55rem;
    padding: 0.4rem 0.4rem 0 0.4rem;
    background: url(./images/voucher-type.png) no-repeat;
    background-size: 0.8rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    box-sizing:border-box;
  }
  .voucher-bottom {
    position: absolute;
    left: 0;
    top: 1.55rem;
    width: 100%;
    z-index: 5;
    p {
      padding: 0 0.4rem;
      line-height: 0.72rem!important;
    }
  }
  .red-packet-window,
  .voucher-window,
  .vCode-window{
    width: 5.6rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .vCode-window{
    width:5.9rem;
    height: 5.3rem;
    background: #fff;
    border-radius: 0.24rem;
    padding-top: 0.7rem;
  }
  .voucher-window {
    background: #fff;
    border-radius: 0.3rem;
    height: 6.5rem;
  }
  .red-packet-window>img:first-child {
    width: 100%;
  }
  .red-packet-window>img:last-child,
  .voucher-window>img:last-child,
  .vCode-window>img:last-child {
    width: 0.7rem;
    position: absolute;
    bottom: -1.35rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .red-packet-window p,
  .voucher-window>p {
    font-size: 0.24rem;
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
    color: #a97a2f;
  }
  .red-packet-window p:nth-child(2),
  .voucher-window>p:nth-child(1) {
    top: 0.5rem;
  }
  .red-packet-window p:nth-child(3),
  .voucher-window>p:nth-child(2) {
    top: 1rem;
  }
  .red-packet-window p:nth-child(4) {
    top: 1.6rem;
    color: #783e00;
  }
  .red-packet-window p:nth-child(4) span {
    font-size: 0.44rem;
  }
  .red-packet-window p:nth-child(5) {
    color: #ffded6;
    font-size: 0.2rem;
    top: 3.2rem;
  }
  .red-packet-window div.use,
  .voucher-window>div.use {
    background-color: rgb( 255, 255, 255);
    box-shadow: 0px 4px 6px 0px rgba(253,61,22,0.33);
    width: 3.6rem;
    height: 0.74rem;
    z-index: 1000;
    border-radius: 0.37rem;
    color: #fd3f18;
    text-align: center;
    line-height: 0.74rem;
    font-size: 0.3rem;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    bottom: 0.54rem;
  }
  .voucher-window>div.use {
    background: #EA3C3E;
    color: #fff;
  }
  .red-packet-window p span {
    color: #783e00;
  }
  .voucher-window .voucher {
    width: 5.1rem;
    margin-top: 2.1rem;
  }
  .scroll-option{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .scroll-no-data{
    font-size: 0.26rem;
    text-align: center;
    position: absolute;
    top: 5.7rem;
    left: 0;
    right: 0;
    margin: 0 0.6rem;
    height: 4.52rem;
    line-height: 4.52rem;
    color: #444;
  }
  .back-to-top{
    position: absolute;
    right: 0.35rem;
    z-index: 100;
    width: 0.82rem;
    box-shadow: 0.02rem 0.035rem 0.16rem 0px rgba( 128, 93, 0, 0.32);
    border-radius: 50%;
    bottom: 2rem;
  }
}

</style>
