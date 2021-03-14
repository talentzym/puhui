<template>
  <div id="encore-view" class="plus-screen-view">
    <a href="javascript:void(0);" class="evcore-back" v-on:click="routerback()"></a>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="model">
          <p class="model-title">
            <span>网银充值大返利，金猪吊坠任你拿</span>
          </p>
          <p class="text-align-center">你累积净充额:</p>
          <p v-show="isLogin" class="phlc-yxfont userAmount">{{ fmoney(data.userRecharge, 2) }}</p>
          <p v-show="!isLogin" class="phlc-yxfont userAmount-noLogin">登录后可见</p>
          <div v-show="isLogin" class="model-button" v-on:click="doCopy()">复制网址</div>
          <div v-show="!isLogin" class="model-button" v-on:click="toLogin('/encore')">立即登录</div>
          <p class="platformAll">平台用户今日累计净充额：
            <span>{{ fmoney(data.platRecharge, 2) }}</span>
          </p>
        </div>
        <div class="model list-model">
          <p class="model-title">
            <span>净充值榜单</span>
          </p>
          <div class="list-box">
            <table class="list-has-data">
              <thead>
                <tr>
                  <td>排名</td>
                  <td>用户名</td>
                  <td>净充值额(元)</td>
                </tr>
              </thead>
              <tbody v-show="rechargeRankList.length">
                <tr v-for="(item, $index) in rechargeRankList" v-bind:key="$index">
                  <td>{{ $index + 1 }}</td>
                  <td>{{ item.userName }}</td>
                  <td class="phlc-yxfont">{{ fmoney(item.amount, 2) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="list-no-data" v-show="!rechargeRankList.length">咦，暂无上榜用户~</div>
          </div>
        </div>
        <div class="rule">
          <div class="rule-title">活动规则</div>
          <div class="rule-label">
            <p>1. 活动期间，在电脑端网银累计净充值满1万送万二现金红包，活动奖励于活动结束后七个工作日内统一发放。 </p>
            <p>2. 网银充值最多的三名用户且充值金额最低满20万元即额外赠送价值千元的周大福足金金猪吊坠。</p>
            <p>3. 每日全场累计净充值达到200万元时，当天后续发布的标的加息0.2%。</p>
            <p>4. 累计净充值=累计充值金额-累计提现金额</p>
            <p>5. 活动奖励于活动结束后七个工作日内统一发放哦，请大家不要着急，等等就来哈。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { Indicator } from 'mint-ui'
export default{
  components: {
    VueClipboard
  },
  data () {
    return {
      isLogin: false,
      data: {
        userRecharge: 0,
        platRecharge: 0
      },
      rechargeRankList: [],
      plus: undefined
    }
  },
  methods: {
    $_init () {
      var params = {
        activityId: 'return2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getTodayPlantRecharge',
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
        this.data = res.data.data.data
        if (res.data.data.data.code === 1) {
          this.isLogin = true
        } else if (res.data.data.data.code === 100001) {
          this.isLogin = false
        } else {
          this.$layer.toast('查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
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
        if (res.data.data.data.code === 1 || res.data.data.data.code === 100003) {
          this.rechargeRankList = res.data.data.data.rechargeRankList
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
    doCopy () {
      var _this = this
      this.$copyText('https://www.puhuilicai.com/').then(function (e) {
        _this.$layer.toast('复制成功！')
      }, function (e) {
        _this.$layer.toast('复制失败！')
      })
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
  },
  mounted () {
    this.$_init()
    /* eslint-disable */
    mui.plusReady(() => {
      this.plus = plus
      Vue.prototype.plus = plus
      mui.init({
        beforeback: () => {
          if (location.href.split('#')[1].indexOf('encore') !== -1) {
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
  }
}
</script>

<style lang="less">
#encore-view{
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      min-height: 100%;
      background: url(./images/banner.png) no-repeat, linear-gradient(90deg, #284ed7 0%, #2d69fb 100%);
      background-size: 100%;
      padding: 12.56rem 0.32rem 0.86rem 0.32rem;
    }
  }
  .evcore-back{
    width: 0.94rem;
    height: 0.37rem;
    background: url(./images/back.png) no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0.32rem;
    top: 0.66rem;
    z-index: 100;
  }
  .model{
    margin: 0 auto 0.32rem auto;
    padding: 0.6rem 0.35rem;
    /*background: ;*/
    background: #fff;
    box-shadow: 0px 0.05rem 0.25rem 0px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    border-radius: 0.12rem;
    position: relative;
    border: 0.05rem solid #e1e9ff;
    &.list-model{
      padding-bottom: 0.3rem;
    }
    .model-title{
      text-align: center;
      font-size: 0.32rem;
      color: #252525;
      margin-bottom: 0.66rem;
      span{
        position: relative;
        &:after, &:before{
          content: "";
          display: block;
          width: 0.16rem;
          height: 0.05rem;
          border-radius: 0.25rem;
          background: #ff810c;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &:after{
          left: -0.32rem;
        }
        &:before{
          right: -0.32rem;
        }
      }
    }
    p{
      font-size: 0.24rem;
      color: #464646;
      line-height: 0.24rem;
      height: 0.24rem;
    }
    .userAmount{
      font-size: 0.44rem;
      line-height: 0.44rem;
      height: 0.44rem;
      margin-top: 0.17rem;
      color: #3f5dc6;
      text-align: center;
    }
    .userAmount-noLogin{
      color: #3f5dc6;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.3rem;
      height: 0.3rem;
      margin-top: 0.31rem;
    }
  }
  .rule{
    color: #fff;
    margin-top: 0.4rem;
    .rule-title{
      font-size: 0.28rem;
      text-align: center;
      position: relative;
      &:after, &:before{
        content: "";
        display: block;
        width: 2.56rem;
        height: 0.02rem;
        background: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      &:after{
        left: 0;
      }
      &:before{
        right: 0;
      }
    }
    .rule-label{
      font-size: 0.26rem;
      line-height: 0.4rem;
      letter-spacing: 0.01rem;
      p{
        margin-top: 0.32rem;
      }
    }
  }
  .model-button{
    background: linear-gradient(right, rgb(255,136,25) 0%, rgb(255,159,46) 100%);
    background: -webkit-linear-gradient(right, rgb(255,136,25) 0%, rgb(255,159,46) 100%);
    box-shadow: 0.04rem 0.06rem 0.08rem 0px rgba(255, 126, 0, 0.4);
    width: 6.08rem;
    height: 0.82rem;
    border-radius: 0.41rem;
    text-align: center;
    line-height: 0.82rem;
    color: #fff;
    font-size: 0.3rem;
    margin: 0.64rem auto 0.24rem auto;
  }
  .platformAll{
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.28rem;
    font-size: #555555;
    height: 0.28rem;
    span{
      color: #3f5dc6;
    }
  }
  .list-box{
    font-size: 0.3rem;
    .list-has-data{
      width: 6.05rem;
      td:first-child{
        width: 1.08rem;
        text-align: center;
      }
      td:nth-child(2){
        padding-left: 0.3rem;
      }
      td:last-child{
        text-align: right;
        padding-right: 0.3rem;
      }
      thead tr{
        border-bottom: 1px solid #eeeeee;
        font-size: 0.24rem;
        line-height: 0.6rem;
        td{
          color: #888888;
        }
      }
      tbody{
        tr{
          line-height: 0.8rem;
        }
        td:first-child{
          width: 1.08rem;
          text-align: center;
          color: #363636;
          font-size: 0.32rem;
        }
        td:nth-child(2){
          padding-left: 0.3rem;
          color: #252525;
        }
        td:last-child{
          text-align: right;
          padding-right: 0.3rem;
          color: #3f5dc6;
        }
      }
    }
    .list-no-data{
      text-align: center;
      font-size: 0.3rem;
      color: #363636;
      line-height: 2.2rem;
    }
  }
}
</style>
