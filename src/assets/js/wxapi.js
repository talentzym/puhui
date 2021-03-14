/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import { Indicator } from 'mint-ui'
import $qs from 'qs'
import Axios from 'axios'
var logo = require('../images/logo.png')
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (url, callback) {
    // 这边的接口请换成你们自己的
    Axios({
        url: '/apis/web-server/found/v1/shareWeiXin',
        method: 'post',
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return $qs.stringify(data)
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
        alert(JSON.stringify(res))
        if (res.data.data.code === '1') {
          var wxConfig = res.data.data.data
          wx.config({
            debug: false,
            appId: wxConfig.appId,
            timestamp: wxConfig.timestamp,
            nonceStr: wxConfig.nonceStr,
            signature: wxConfig.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
          })
        }
      }).catch((err) => {
        if (err) {
          alert(JSON.stringify(err))
        }
      })
//  Axios.post('/apis/web-server/found/v1/shareWeiXin', { reqUrl: window.location.href }, { timeout: 5000, withCredentials: true }).then((res) => {
//    let data = JSON.parse(res.data.data) // PS: 这里根据你接口的返回值来使用
//    wx.config({
//      debug: false, // 开启调试模式
//      appId: data.appId, // 必填，公众号的唯一标识
//      timestamp: data.timestamp, // 必填，生成签名的时间戳
//      nonceStr: data.noncestr, // 必填，生成签名的随机串
//      signature: data.signature, // 必填，签名，见附录1
//      jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//    })
//  }).catch((error) => {
//    console.log(error)
//  })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      } else {
        let option = {
          title: '来普惠理财，让你的钱包鼓起来', // 分享标题, 请自行替换
          desc: '新网银行资金存管，注册领688元卡券礼包！',
          link: url, // 分享链接，根据自身项目决定是否需要split
          imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        wxapi.ShareTimeline(option)
        wxapi.ShareAppMessage(option)
    }})
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
  * [ShareAppMessage 微信分享给朋友]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareAppMessage (option) {
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  }
}
export default wxApi