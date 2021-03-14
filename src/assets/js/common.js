/* eslint-disable */
import Vue from 'vue'
String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, 'gm'), s2)
}
String.prototype.replaceHtml = function () {
  return this.replace(/\/?.+?>/g, '').replace(/ /g, '')
}
Vue.prototype.fmoney = function (s, n) {
  s = s + ''
  s = Number(s * 100) / 100
  if (s) {
    n = n > 0 && n <= 20 ? n : 2
    s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
    var l = s.split('.')[0].split('').reverse()
    var r = s.split('.')[1]
    var t = ''
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('') + '.' + r
  } else {
    return '0.00'
  }
}
Vue.prototype.delcommafy = function (num) {
  if (num && typeof num === 'string') {
    num = num.replace(/,/g, '')
    return Number(num)
  } else {
    return num
  }
}
Vue.prototype.aspectRatio = window.screen.width / 750
Vue.prototype.getDay = function (num, day) {
  var today = day ? new Date(day) : new Date()
  var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * num
  today.setTime(targetdayMilliseconds)
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = this.doHandleMonth(tMonth + 1)
  tDate = this.doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}
Vue.prototype.doHandleMonth = function (month) {
  var m = month
  if (month.toString().length === 1) {
    m = '0' + month
  }
  return m
}
Vue.prototype.aspectRatio = window.screen.width / 750
Vue.prototype.numSub = function (num1, num2) {
  var baseNum
  var baseNum1
  var baseNum2
  var precision
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch(e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch(e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  return((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}
Vue.prototype.evil = function (fn) {
  let Fn = Function
  return new Fn('return ' + fn)()
}