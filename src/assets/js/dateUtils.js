/* eslint-disable */
import Vue from 'vue'
Date.prototype.format = function (mask) {
  var d = this
  var zeroize = function (value, length) {
    if (!length) length = 2
    value = String(value)
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0'
    }
    return zeros + value
  }
  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd':
        return d.getDate()
      case 'dd':
        return zeroize(d.getDate())
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()]
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()]
      case 'M':
        return d.getMonth() + 1
      case 'MM':
        return zeroize(d.getMonth() + 1)
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()]
      case 'yy':
        return String(d.getFullYear()).substr(2)
      case 'yyyy':
        return d.getFullYear()
      case 'h':
        return d.getHours() % 12 || 12
      case 'hh':
        return zeroize(d.getHours() % 12 || 12)
      case 'H':
        return d.getHours()
      case 'HH':
        return zeroize(d.getHours())
      case 'm':
        return d.getMinutes()
      case 'mm':
        return zeroize(d.getMinutes())
      case 's':
        return d.getSeconds()
      case 'ss':
        return zeroize(d.getSeconds())
      case 'l':
        return zeroize(d.getMilliseconds(), 3)
      case 'L':
        var m = d.getMilliseconds()
        if (m > 99) m = Math.round(m / 10)
        return zeroize(m)
      case 'tt':
        return d.getHours() < 12 ? 'am' : 'pm'
      case 'TT':
        return d.getHours() < 12 ? 'AM' : 'PM'
      case 'Z':
        return d.toUTCString().match(/[A-Z]+$/)
      default:
        return $0.substr(1, $0.length - 2)
    }
  })
}
Vue.prototype.daysBetween = function (DateOne, DateTwo) {
  if (typeof DateOne !== 'string') {
    DateOne = new Date(DateOne).format('yyyy-MM-dd')
  }
  if (typeof DateTwo !== 'string') {
    DateTwo = new Date(DateTwo).format('yyyy-MM-dd')
  }
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'))
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1)
  var OneYear = DateOne.substring(0, DateOne.indexOf('-'))
  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'))
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1)
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'))
  var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000)
  return cha
}
Vue.prototype.timeDifference = function (creatTime) {
  creatTime = new Date(creatTime).getTime()
  var nowTime = new Date().getTime()
  if (new Date(nowTime).format('yyyy-MM-dd') === new Date(creatTime).format('yyyy-MM-dd')) {
    var diff = nowTime - creatTime
    if (diff >= 0 && diff < 60000) {
      return '刚刚'
    } else if (diff >= 60000 && diff < 3600000) {
      return Math.round(diff / 60000) + '分钟前'
    } else if (diff >= 3600000 && diff < 86400000) {
      return Math.round(diff / 3600000) + '小时前'
    }
  } else if (this.daysBetween(new Date(nowTime).format('yyyy-MM-dd'), new Date(creatTime).format('yyyy-MM-dd')) <= 1) {
    return '昨天'
  } else if (this.daysBetween(new Date(nowTime).format('yyyy-MM-dd'), new Date(creatTime).format('yyyy-MM-dd')) > 1 && this.daysBetween(new Date(nowTime).format('yyyy-MM-dd'), new Date(creatTime).format('yyyy-MM-dd')) <= 2) {
    return '前天'
  } else {
    return new Date(creatTime).format('yyyy-MM-dd').replaceAll('-', '.')
  }
}
Vue.prototype.strToDate = function (str) {
  str = str.replace(/-/g, '/')
  return new Date(str)
}
Vue.prototype.getMyDate = function (str) {
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen)
  return oTime
}
Vue.prototype.getzf = function (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}
Vue.prototype.strToDate = function (str) {
  str = str.replace(/-/g, '/')
  return new Date(str)
}