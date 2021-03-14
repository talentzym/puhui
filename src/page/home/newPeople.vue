<template>
 <div id="newPeople-view-wx" ref = 'newBox' class="plus-screen-view">
   <a href="javascript:void(0);" class="evcore-back" v-on:click="routerback()"></a>
   <div class="plus-screen-content">
    <div class="newBox">
      <div class="goback">
        <div></div>
      </div>
      <p class="newNumber"><span class="vipTotleImg"></span><span class="newNumberspan">{{moneyTotle}}</span></p>
      <p class="new-peopleP1">
        <span class="new-people-span1"></span>
        <span class="new-peopleP1Tip">专享礼包介绍</span>
        <span class="new-people-span2"></span>
      </p>
      <ul class="new-number-ul">
        <li class="new-number-li" v-for="(item, index) in voucherList" :key="index">
          <div class="new-number-li-text"><span class="li-text-span1">{{item.nominalValue}}</span><span class="yuan">元</span></div>
          <div class="new-number-li-text2">
            <p>新人{{show(item.voucherType)}}</p>
            <p>出借满{{item.quttMinInvest}}元/项目期限{{item.quttProjectDeadline}}天起可用</p>
          </div>
        </li>
      </ul>
      <p class="new-peopleP2">
        <span class="new-people-span1"></span>
        <span class="new-peopleP1Tip">新手操作，简单四步</span>
        <span class="new-people-span2"></span>
      </p>
      <div class="new-peoplefourth"></div>
      <ul class="describe-ul">
        <li class="describe-li">1.注册账号</li>
        <li class="describe-li">2.开通存管</li>
        <li class="describe-li">3.账号充值</li>
        <li class="describe-li">4.出借项目</li>
      </ul>
    </div>
    </div>
   <div id="bag-btn" @click="routeUrl(btnText)" ref = 'newBtn'>{{btnText}}</div>
 </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      noviceGiftBagMsg: '新人礼包',
      btnText: '',
      plus: undefined,
      objData: null,
      moneyTotle: '',
      rate: '',
      voucherList: []
    }
  },
  mounted () {
    this.$_muiPlus()
    this.goToNovice()
    /* eslint-disable */
    mui.plusReady(() => {
      this.plus = plus
      Vue.prototype.plus = plus
      this.$refs.newBox.style.paddingBottom = plus.navigator.getStatusbarHeight() + 'px'
      if (this.plus.os.name === 'Android') {
        $('#bag-btn').css('bottom', (0.22 + plus.navigator.getStatusbarHeight() / 100) +'rem')
      } else {
        $('#bag-btn').css('bottom', (0.17 + plus.navigator.getStatusbarHeight() / 100) +'rem')
      }
      mui.init({
        beforeback: () => {
          if (location.href.split('#')[1].indexOf('newPeople') !== -1) {
            var view = this.plus.webview.currentWebview().id
            this.plus.webview.close(view)
          } else {
            this.$router.back(-1)
            return false
          }
        }
      })
    })
    /* eslint-disable */
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        Vue.prototype.plus = plus
      })
      /* eslint-disable */
    },
    goToNovice () {
      this.axios({
        url: this.HOST + '/activity-server/activityNewUser/v2/getNewUserActivityInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          console.log(res)
          this.objData = res.data.data.data
          // console.log(this.objData)
          var yuannumber = Number(this.objData.tryMoneyAmount) + Number(this.objData.cashAmount)
          this.voucherList = this.objData.voucherList
          if (this.objData.rateAmount > 0) {
            this.moneyTotle = yuannumber + '+' + this.objData.rateAmount
          } else {
            this.moneyTotle = yuannumber
          }
          if (this.objData.isLogin === 'no') {
            this.btnText = '立即领取'
          } else {
            this.btnText = '立即查看'
          }
        }
      })
    },
    routeUrl (msg) {
      if (msg === '立即领取') {
        if (this.plus) {
          /* 跳往app方法 */
          var h = this.plus.webview.getLaunchWebview()
          h.evalJS("goRegister()")
        } else {
          this.$router.push('/register')
        }
      } else if (msg === '立即查看') {
        if (this.plus) {
          var h = this.plus.webview.getLaunchWebview()
          h.evalJS("goVoucherList()")
        } else {
          this.$router.push('/voucherList')
        }
      }
    },
    show (type) {
      if (type === 1) {
        return '体验金'
      } else if (type === 2) {
        return '加息券'
      } else {
        return '返现券'
      }
    },
    routerback () {
      /* eslint-disable */
      if (Vue.prototype.plus) {
      /* eslint-disable */
        this.evil('mui.back()')
      } else {
        this.$router.back(-1)
      }
    }
  }
}
</script>

<style  lang="less">
  #newPeople-view-wx{
    position: absolute;
    left: 50%;
    margin-left: -3.75rem;
    width: 7.5rem;
    top: 0;
    bottom: 0;
    .plus-screen-content{
      top: 0;
    }
    .vipTotleImg{
      display: inline-block;
      width: .3rem;
      height: 1rem;
      background: url(../../assets/images/vipapp6.png) no-repeat;
      background-size: 100% 100%;
    }
    .evcore-back{
      width: 0.94rem;
      height: 0.37rem;
      background: url(../../assets/images/back.png) no-repeat;
      background-size: 100%;
      position: fixed;
      left: 0.32rem;
      top: 0.66rem;
      z-index: 100;
    }
    .describe-li{
      color: #FFE0C2;
      font-size: .26rem
    }
    .describe-ul{
      display: flex;
      justify-content: space-around;
      margin-top: .16rem;
    }
    #bag-btn{
      width: 7.5rem;
      height: .98rem;
      background:rgba(255,170,92,1);
      line-height: .98rem;
      text-align: center;
      color: #904504;
      font-size: .36rem;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 500;
    }
    .new-peoplefourth{
      width: 6.62rem;
      height: 1rem;
      margin: .45rem auto 0;
      background: url(../../assets/images/vipapp5.png) no-repeat;
      background-size: 100% 100%;
    }
    .new-peopleP2{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: .8rem;
    }
    .new-number-li-text2 p:nth-of-type(2){
      font-size: .24rem;
      padding-top: .25rem;
      color: #9D6534;
    }
    .new-number-li-text2 p:nth-of-type(1){
      font-size: .36rem;
      padding-top: .4rem;
      color: #904504;
    }
    .new-number-li-text2{
      width: 70%;
    }
    .new-number-li-text{
      width: 30%;
      height: 100%;
      padding-left: 0.2rem;
      line-height: 1.7rem;
      display:table-cell;
      vertical-align:bottom;
    }
    .yuan{
      color: #D53F3F;
      font-size: .3rem;
    }
    .li-text-span1{
      font-size: .6rem;
      color: #D53F3F;
    }
    .new-number-ul{
     margin: .48rem auto 0;
    }
    .new-number-li{
      width: 6.96rem;
      height:1.95rem;
      margin: 0 auto .24rem;
      background: url(../../assets/images/vipapp4.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content:space-between;
    }
    .new-peopleP1Tip{
      color: #FFE0C2;
      font-size: .34rem;
      margin:  0 .06rem 0 .06rem ;
    }
    .newBox{
      background: url(../../assets/images/vipapp1.jpg) no-repeat;
      background-color: #D53F3F;
      background-size: 100%;
      min-height: 100%;
      padding-bottom: 1.8rem;
    }
    .newNumber{
      color: #D53F3F;
      font-size: 1.4rem;
      text-align: center;
      padding-top: 3.64rem;
    }
    .new-peopleP1{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2.5rem;
    }
    .new-people-span1{
      width: .63rem;
      height: .16rem;
      background: url(../../assets/images/vipapp2.png) no-repeat;
      background-size: 100% 100% ;
    }
    .new-people-span2{
      width: .63rem;
      height: .16rem;
      background: url(../../assets/images/vipapp3.png) no-repeat;
      background-size: 100% 100% ;
    }
  }
</style>
