<template>
  <div id="signIn-view" class="plus-screen-view">
    <wxheader></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="sign1-img-cent">
          <img src="../../assets/images/sign1-img-cen.png" class="signImg">
        </div>
        <div class="signStatus1">
          <p class="phlc-second-black-color sign1-tltle-center1">咦，今日未签到</p>
          <p class="phlc-second-black-color sign1-tltle-center2">奖励，从每日签到开始</p>
          <p class="now-sign phlc-red-normal" id="signing" v-on:click="saveUsreSign()">立即签到</p>
        </div>
        <div class="signStatus2">
          <p class="phlc-second-black-color sign1-tltle-center1">吆，已连续签到<i class="days">24</i>天</p>
          <p class="phlc-second-black-color sign1-tltle-center3 phlc-red-normal-color">今日获得<i class="integral">50</i>积分</p>
          <p class="now-signed ">明天再来</p>
        </div>
        <p class="sign-rule phlc-second-black-color phlc-cursor-pointer">
          <span class="sign-rule-span phlc-cursor-pointer" v-on:click="windowOpen('ruleFlag')">签到规则</span>
        </p>
      </div>
    </div>
    <div class="signSuccess" v-show="successFlag">
      <div class="signSuccessC">
        <p><img src="../../assets/images/signed-img-cen.png" class="signSuccessImg"></p>
        <p class="signSuccess-tip phlc-red-normal-color">获得<span class="integralB">50</span>积分</p>
        <p class="signSuccess-tip2 phlc-first-black-color">已连续签到<span class="daysB">24</span>天</p>
        <div class="konw phlc-cursor-pointer" v-on:click="windowClose('successFlag')">知道了</div>
      </div>
    </div>
    <div class="sign-rlue-mask" v-show="ruleFlag">
      <div class="sign-rlue-maskC">
        <p class="sign-rlue-maskC-tip1 phlc-first-black-color">签到规则
          <span class="close-sign close-sign-btn  phlc-cursor-pointer" v-on:click="windowClose('ruleFlag')"><i></i></span>
        </p>
        <p class="phlc-second-black-color sign-rlue-maskC-tip2">1、每天签到获取不等的积分奖励；</p>
        <p class="phlc-second-black-color sign-rlue-maskC-tip2">2、每连续签到至第七天可获得1‰加息券；</p>
        <p class="phlc-second-black-color sign-rlue-maskC-tip2">3、签到获得积分可以在积分商城兑换福利；</p>
        <p class="phlc-second-black-color sign-rlue-maskC-tip2">4、1‰加息券不用可以转让。</p>
        <div class="konw phlc-cursor-pointer" v-on:click="windowClose('ruleFlag')">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default{
  data () {
    return {
      ruleFlag: false,
      successFlag: false,
      signImg2: require('../../assets/images/sign2-img-cen.png'),
      signImg1: require('../../assets/images/sign1-img-cen.png')
    }
  },
  components: {
    wxheader
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    refreshData () {
      this.axios({
        url: this.HOST + '/web-server/found/v1/getUsreSign',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          if (res.data.data.isUsreSign) {
            $('.signBot').show()
            $('.signStatus1').hide()
            $('.signImg').attr('src', this.signImg2)
            $('.signStatus2').show()
            $('.days')[0].innerHTML = res.data.data.days
            if (res.data.data.days % 7 === 0) {
              $('.sign1-tltle-center3')[0].innerHTML = '获得1‰加息券一张'
            } else {
              $('.integral')[0].innerHTML = res.data.data.integral
            }
          } else {
            $('.signBot').hide()
            $('.signImg').attr('src', this.signImg1)
            $('.signStatus1').show()
            $('.signStatus2').hide()
          }
        } else if (res.data.data.code === '1111') {
          $('.signStatus1').show()
          $('.signStatus2').hide()
        }
      })
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    saveUsreSign () {
      this.axios({
        url: this.HOST + '/web-server/found/v1/saveUsreSign',
        method: 'POST',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          if (res.data.data.days % 7 === 0) {
            $('.signSuccess-tip')[0].innerHTML = '获得1‰加息券一张'
          } else {
            $('.integralB')[0].innerHTML = res.data.data.integral
          }
          $('.daysB')[0].innerHTML = res.data.data.days
          this.windowOpen('successFlag')
          this.refreshData()
        } else {
          if (res.data.data.code === '1111') {
            this.$router.push({
              path: '/login'
            })
          } else if (res.data.data.code === '100001') {
            this.$layer.toast('不能重复签到哦~')
          } else if (res.data.data.code === '100002') {
            this.$layer.toast('签到失败，请重试一次哦~')
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
#signIn-view{
  .sign1-img-cent img{
    width: 4.85rem;
    height: 2.33rem;
    margin: 0  auto;
  }
  .sign1-tltle-center1{
    font-size: .4rem;
    text-align: center;
    margin: .5rem auto 0;
  }
  .sign1-tltle-center2{
    font-size: .24rem;
    margin: .3rem auto 0;
    text-align: center;
  }
  .now-sign{
    text-align: center;
    line-height: 1rem;
    width: 4rem;
    margin:.8rem auto 0;
    color: #ffffff;
    font-size: .32rem;
    border-radius: .5rem;
    -webkit-border-radius: .5rem;
    -moz-border-radius: .5rem;
  }
  .sign-rule{
    text-align: center;
    margin: .2rem auto 0;
    font-size: 0.28rem;
  }
  .signSuccess{
    width: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    background: #fff;
    border-radius: 0.2rem;
    padding-bottom: 0.5rem;
  }
  .signSuccessC{
    width: 6rem;
    position: relative;
    margin: 0 auto;
  }
  .signSuccessImg{
    width: 3.87rem;
    height: 4.05rem;
    position: absolute;
    top: -2.28rem;
    left: 50%;
    margin-left: -1.93rem;
  }
  .signSuccess-tip{
    font-size: .4rem;
    text-align: center;
    padding-top: 1.97rem;
  }
  .signSuccess-tip2{
    font-size: .26rem;
    text-align: center;
    margin-top: .4rem;
  }
  .now-signed{
    background-color: #d6d6d6;
    width: 4rem;
    height: 1rem;
    margin: .8rem auto 0;
    font-size: .32rem;
    color: #ffffff;
    text-align: center;
    line-height: 1rem;
    border-radius: .5rem;
    -webkit-border-radius: .5rem;
    -moz-border-radius: .5rem;
  }
  .signBot{
    display: none;
  }
  .signBot img{
    width: 6.9rem;
    height: 1.9rem;
    position: fixed;
    bottom: .4rem;
    left: 50%;
    margin-left:-3.45rem;
  }
  .signStatus1,.signStatus2{
    display: none;
  }
  .sign-rlue-mask{
    width: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    background: #fff;
    border-radius: 0.2rem;
    padding-bottom: 0.5rem;
  }
  .sign-rlue-maskC-tip1{
    text-align: center;
    font-size: .36rem;
    padding-top: .5rem;
    position: relative;
    margin-bottom: .45rem;
  }
  .close-sign{
    display: block;
    width: .8rem;
    height: .8rem;
    position: absolute;
    top: .25rem;
    right: .25rem;
  }
  .close-sign i{
    display: block;
    width: .3rem;
    height: .3rem;
    margin: .25rem auto;
    background: url(../../assets/images/phlc-login-cha.png) no-repeat;
    background-size: 100%;
  }
  .sign-rlue-maskC .sign-rlue-maskC-tip2{
    font-size: .28rem;
    white-space: nowrap;
    padding-left: .5rem;
    text-align: left;
    line-height: .46rem;
  }
  .konw{
    width:4.2rem ;
    height:.9rem;
    margin: .48rem auto 0;
    line-height: .9rem;
    color: #ffffff;
    border-radius: .45rem;
    -webkit-border-radius: .45rem;
    -moz-border-radius: .45rem;
    border-top: 0 !important;
    background-color: #e6382c;
    font-size: 0.3rem;
    text-align: center;
  }
  .sign1-tltle-center3{
    font-size: .24rem;
    text-align: center;
    margin-top: .3rem;
  }
}
</style>
