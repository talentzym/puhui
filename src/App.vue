<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { Indicator } from 'mint-ui'
export default {
  name: 'App',
  created () {
    var hrt = document.documentElement.clientHeight
    window.localStorage.isNew = true
    window.onload = function () {
      var u = navigator.userAgent
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (!isiOS) {
        document.getElementById('body').style.height = hrt + 'px'
        document.getElementById('body').style.position = 'relative'
      }
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      var lastTouchEnd = 0
      document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)
    }
    /* 注册全局页面跳转 */
    Vue.prototype.routerLink = (path, obj) => {
      this.$router.push({
        path: path,
        query: obj
      })
    }
    /* 注册全局页面替换 */
    Vue.prototype.routerReplace = (path, obj) => {
      this.$router.replace({
        path: path,
        query: obj
      })
    }
    /* 注册全局跳转登录页面的公共方法 */
    Vue.prototype.toLogin = path => {
      this.routerLink('/login', {
        path: path
      })
    }
    /* 微信分享 */
    Vue.prototype.wxShare = function (shareObj) {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/found/v1/shareWeiXin',
        method: 'post',
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          url: encodeURIComponent(location.href.split('#')[0])
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }]
      }).then((res) => {
        // console.log(res)
        if (res.data.data.code === '1') {
          this.wxConfig = res.data.data.data
          wx.config({
            debug: false,
            appId: this.wxConfig.appId,
            timestamp: this.wxConfig.timestamp,
            nonceStr: this.wxConfig.nonceStr,
            signature: this.wxConfig.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
            type: 'web'
          })
          wx.ready(function () {
            var shareData = {
              title: shareObj.title ? shareObj.title : '来普惠理财，让你的钱包鼓起来',
              desc: shareObj.desc ? shareObj.desc : '新网银行资金存管，注册领688元卡券礼包！',
              link: shareObj.url,
              imgUrl: 'https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'
            }
            if (shareObj.callback) {
              shareData.success = shareObj.callback
            }
            wx.onMenuShareTimeline(shareData)
            wx.onMenuShareAppMessage(shareData)
          })
          wx.error(function (res) {
            console.log(JSON.stringify(res))
          })
        }
      })
    }
    /* 获取新注册卡券包信息 */
    Vue.prototype.getAmount = async function () {
      return this.axios({
        url: this.HOST + '/activity-server/activityNewUser/v2/getNewUserActivityInfo',
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
        if (res.data.data.code === 1) {
          return res.data.data.data.cashAmount + res.data.data.data.tryMoneyAmount
        }
      })
    }
  }
}
</script>

<style>
/*#app{
  width: 7.5rem;
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}*/
</style>
