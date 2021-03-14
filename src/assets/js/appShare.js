/* eslint-disable */
import Vue from 'vue'
var shares = null
Vue.prototype.shareObj = {}
/**
 * 更新分享服务
 */
Vue.prototype.updateSerivces = function () {
  plus.share.getServices(function (s) {
    shares = {}
    for (var i in s) {
      var t = s[i]
      shares[t.id] = t
    }
  }, (e) => {
    plus.nativeUI.toast('获取分享服务列表失败：' + e.message, {
      duration: 'long'
    })
  })
}
/**
 * 分享操作
 * @param {String} id
 */
Vue.prototype.shareAction = function (id, ex) {
  var s = null
  // alert( '分享操作：' )
  if (id === 'copy') {
    this.copyInviteNo()
  } else if (!id || !(s = shares[id])) {
    plus.nativeUI.toast('无效的分享服务！', {
      duration: 'long'
    })
    return
  }
  if (s && s.authenticated) {
    // alert( '---已授权---' )
    this.shareMessage(s, ex)
  } else if (s) {
    // alert( '---未授权---' )
    s.authorize(() => {
      this.shareMessage(s, ex)
    }, (e) => {
      plus.nativeUI.toast('认证授权失败', {
        duration: 'long'
      })
      // plus.nativeUI.toast( '认证授权失败：'+e.code+' - '+e.message, {duration:'long'})
    })
  }
}
/**
 * 发送分享消息
 * @param {plus.share.ShareService} s
 */
Vue.prototype.shareMessage = function (s, ex) {
  var msg = {
    content: '',
    extra: {
      scene: ex
    }
  }
  console.log(JSON.stringify(this.shareObj.href))
  msg.href = this.shareObj.href
  msg.title = this.shareObj.title
  msg.content = this.shareObj.content
  msg.thumbs = this.shareObj.thumbs
  msg.type = 'web'
  s.send(msg, () => {
    plus.nativeUI.toast('分享到\'' + s.description + '\'成功！ ', {
      duration: 'long'
    })
    if (this.shareObj && this.shareObj.callback) {
      this.shareObj.callback()
    }
  }, (e) => {
    // plus.nativeUI.toast( '分享到\''+s.description+'\'失败: '+e.code+' - '+e.message, {duration:'long'})
    plus.nativeUI.toast('分享失败', {
      duration: 'long'
    })
  })
}
Vue.prototype.copyInviteNo = function () {
  var inviteUrl = this.shareObj.href
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  if (isAndroid) {
    var Context = plus.android.importClass('android.content.Context')
    var main = plus.android.runtimeMainActivity()
    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE)
    plus.android.invoke(clip, 'setText', inviteUrl)
  } else {
    // 获取剪切板
    var UIPasteboard = plus.ios.importClass('UIPasteboard')
    var generalPasteboard = UIPasteboard.generalPasteboard()
    generalPasteboard.setValueforPasteboardType(inviteUrl, 'public.utf8-plain-text')
  }
  plus.nativeUI.toast('复制成功，您可以粘贴发送给你的好友了', {
    duration: 'long'
  })
}
// 分享链接
Vue.prototype.appShare = function (isShare) {
  var ids = [{
    id: 'weixin',
    ex: 'WXSceneSession'
  }, {
    id: 'weixin',
    ex: 'WXSceneTimeline'
  }]
  var bts = [{
    title: '发送给微信好友'
  }, {
    title: '分享到微信朋友圈'
  }]
  if (isShare) {
    ids.push({
      id: 'copy'
    })
    bts.push({
      title: '复制邀请链接'
    })
  }
  if (plus.os.name === 'iOS') {
    ids.push({
      id: 'qq'
    })
    bts.push({
      title: '分享到QQ'
    })
  }
  plus.nativeUI.actionSheet({
    cancel: '取消',
    buttons: bts
  }, (e) => {
    var i = e.index
    if (i > 0) {
      this.shareAction(ids[i - 1].id, ids[i - 1].ex)
    }
  })
}
