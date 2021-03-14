import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'
import Home from '@/page/index'
import store from '../store/store'
Vue.use(Router)

const router = new Router({
  linkActiveClass: 'router-active',
  // base: '/weixin/content/', // 测试去掉content+phlc
  base: '/phlcweixin/',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      meta: {
        keepAlive: true,
        title: '普惠理财'
      },
      component: Home,
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            keepAlive: true,
            title: '普惠理财'
          },
          component: resolve => { require(['@/page/home/home'], resolve) }
        }, {
          path: 'project',
          name: 'project',
          meta: {
            keepAlive: true,
            title: '项目'
          },
          component: resolve => { require(['@/page/project/project'], resolve) }
        }, {
          path: 'discover',
          name: 'discover',
          meta: {
            keepAlive: true,
            title: '发现'
          },
          component: resolve => { require(['@/page/discover/discover'], resolve) }
        }, {
          path: 'mine',
          name: 'mine',
          meta: {
            keepAlive: true,
            title: '我的'
          },
          component: resolve => { require(['@/page/mine/mine'], resolve) }
        }
      ]
    }, {
      path: '/mutual',
      name: 'mutual',
      redirect: '/mutual/yeepay',
      meta: {
        title: 'loading...'
      },
      component: resolve => { require(['@/page/common/mutualPage'], resolve) },
      children: [
        {
          path: 'yeepay',
          name: 'yeepay',
          meta: {
            title: 'loading...'
          },
          component: resolve => { require(['@/page/common/yeepay'], resolve) }
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: resolve => { require(['@/page/account/login'], resolve) }
    }, {
      path: '/register',
      name: 'register',
      meta: {
        keepAlive: true,
        title: '注册'
      },
      component: resolve => { require(['@/page/account/register'], resolve) }
    }, {
      path: '/validateCode',
      name: 'validateCode',
      meta: {
        title: '注册'
      },
      component: resolve => { require(['@/page/account/validateCode'], resolve) }
    }, {
      path: '/bindWeixinServiceNumber',
      name: 'bindWeixinServiceNumber',
      meta: {
        title: '普惠理财'
      },
      component: resolve => { require(['@/page/account/bindWeixinServiceNumber'], resolve) }
    }, {
      path: '/bindSuccess',
      name: 'bindSuccess',
      meta: {
        title: '普惠理财-绑定成功'
      },
      component: resolve => { require(['@/page/account/bindSuccess'], resolve) }
    }, {
      path: '/provision',
      name: 'provision',
      meta: {
        title: '普惠理财用户隐私条款'
      },
      component: resolve => { require(['@/page/account/provision'], resolve) }
    }, {
      path: '/noviceGiftBag',
      name: 'noviceGiftBag',
      meta: {
        title: '礼包介绍'
      },
      component: resolve => { require(['@/page/home/noviceGiftBag'], resolve) }
    }, {
      path: '/newPeople',
      name: 'newPeople',
      meta: {
        title: '礼包介绍'
      },
      component: resolve => { require(['@/page/home/newPeople'], resolve) }
    }, {
      path: '/knowNewbank',
      name: 'knowNewbank',
      meta: {
        title: '银行存管'
      },
      component: resolve => { require(['@/page/home/knowNewbank'], resolve) }
    }, {
      path: '/commonQuestion',
      name: 'commonQuestion',
      meta: {
        title: '银行资金管存常见问题'
      },
      component: resolve => { require(['@/page/home/commonQuestion'], resolve) }
    }, {
      path: '/novice',
      name: 'novice',
      meta: {
        title: '新手如何操作'
      },
      component: resolve => { require(['@/page/home/novice'], resolve) }
    }, {
      path: '/platformIntroduction',
      name: 'platformIntroduction',
      meta: {
        title: '普惠理财是谁'
      },
      component: resolve => { require(['@/page/home/platformIntroduction'], resolve) }
    }, {
      path: '/managementDetail/:key',
      name: 'managementDetail',
      meta: {
        title: '管理团队'
      },
      component: resolve => { require(['@/page/home/managementDetail'], resolve) }
    }, {
      path: '/agencyInformation',
      name: 'agencyInformation',
      meta: {
        title: '从业机构信息'
      },
      component: resolve => { require(['@/page/home/agencyInformation'], resolve) }
    }, {
      path: '/platformOperation',
      name: 'platformOperation',
      meta: {
        keepAlive: true,
        title: '平台运营如何'
      },
      component: resolve => { require(['@/page/home/platformOperation'], resolve) }
    }, {
      path: '/msgCenter',
      name: 'msgCenter',
      meta: {
        keepAlive: true,
        title: '消息中心'
      },
      redirect: '/msgCenter/accountMsg',
      component: resolve => { require(['@/page/home/msgCenter'], resolve) },
      children: [
        {
          path: 'accountMsg',
          name: 'accountMsg',
          meta: {
            title: '账号消息'
          },
          component: resolve => { require(['@/page/home/accountMsg'], resolve) }
        }, {
          path: 'noticeList',
          name: 'noticeList',
          meta: {
            keepAlive: true,
            title: '平台公告'
          },
          component: resolve => { require(['@/page/home/noticeList'], resolve) }
        }
      ]
    }, {
      path: '/noticeDetail',
      name: 'noticeDetail',
      meta: {
        title: '平台公告详情'
      },
      component: resolve => { require(['@/page/home/noticeDetail'], resolve) }
    }, {
      path: '/msgType',
      name: 'msgType',
      meta: {
        title: '账号消息'
      },
      component: resolve => { require(['@/page/home/msgType'], resolve) }
    }, {
      path: '/projectDetail',
      name: 'projectDetail',
      meta: {
        title: '项目详情'
      },
      component: resolve => { require(['@/page/project/projectDetail'], resolve) }
    }, {
      path: '/projectDetailMsg',
      name: 'projectDetailMsg',
      meta: {
        title: '项目详情'
      },
      component: resolve => { require(['@/page/project/projectDetailMsg'], resolve) }
    }, {
      path: '/setUp',
      name: 'setUp',
      meta: {
        title: '设置'
      },
      component: resolve => { require(['@/page/mine/setUp'], resolve) }
    }, {
      path: '/projectIntroduction',
      name: 'projectIntroduction',
      meta: {
        keepAlive: true,
        title: '项目介绍'
      },
      component: resolve => { require(['@/page/project/projectIntroduction'], resolve) }
    }, {
      path: '/recharge',
      name: 'recharge',
      meta: {
        title: '充值'
      },
      component: resolve => { require(['@/page/account/recharge'], resolve) }
    }, {
      path: '/editLoginPassword',
      name: 'editLoginPassword',
      meta: {
        title: '修改登录密码'
      },
      component: resolve => { require(['@/page/mine/editLoginPassword'], resolve) }
    }, {
      path: '/retrievePassword',
      name: 'retrievePassword',
      meta: {
        title: '找回密码'
      },
      component: resolve => { require(['@/page/mine/retrievePassword'], resolve) }
    }, {
      path: '/changSuccessModule',
      name: 'changSuccessModule',
      meta: {
        title: '找回密码'
      },
      component: resolve => { require(['@/page/mine/changSuccessModule'], resolve) }
    }, {
      path: '/bankDepository',
      name: 'bankDepository',
      meta: {
        title: '银行存管'
      },
      component: resolve => { require(['@/page/mine/bankDepository'], resolve) }
    }, {
      path: '/rechargeLimit',
      name: 'rechargeLimit',
      meta: {
        title: '银行限额'
      },
      component: resolve => { require(['@/page/mine/rechargeLimit'], resolve) }
    }, {
      path: '/resetPassword',
      name: 'resetPassword',
      meta: {
        title: '找回密码'
      },
      component: resolve => { require(['@/page/mine/resetPassword'], resolve) }
    }, {
      path: '/myPoints',
      name: 'myPoints',
      meta: {
        title: '我的积分'
      },
      component: resolve => { require(['@/page/mine/myPoints'], resolve) }
    }, {
      path: '/myMoney',
      name: 'myMoney',
      meta: {
        title: '我的资金'
      },
      component: resolve => { require(['@/page/mine/myMoney'], resolve) }
    }, {
      path: '/contactUs',
      name: 'contactUs',
      meta: {
        title: '联系我们'
      },
      component: resolve => { require(['@/page/mine/contactUs'], resolve) }
    }, {
      path: '/FAQ',
      name: 'FAQ',
      meta: {
        keepAlive: true,
        isBack: false,
        title: '常见问题'
      },
      component: resolve => { require(['@/page/mine/FAQ'], resolve) }
    }, {
      path: '/FAQTypeList',
      name: 'FAQTypeList',
      meta: {
        keepAlive: false,
        isBack: false,
        title: '常见问题'
      },
      component: resolve => { require(['@/page/mine/FAQTypeList'], resolve) }
    }, {
      path: '/FAQDetail',
      name: 'FAQDetail',
      meta: {
        title: '常见问题'
      },
      component: resolve => { require(['@/page/mine/FAQDetail'], resolve) }
    }, {
      path: '/calculator',
      name: 'calculator',
      meta: {
        title: '计算器'
      },
      component: resolve => { require(['@/page/project/calculator'], resolve) }
    }, {
      path: '/dredgeDepository',
      name: 'dredgeDepository',
      meta: {
        title: '实名认证'
      },
      component: resolve => { require(['@/page/account/dredgeDepository'], resolve) }
    }, {
      path: '/formResult',
      name: 'formResult',
      component: resolve => { require(['@/page/common/formResult'], resolve) }
    }, {
      path: '/withdraw',
      name: 'withdraw',
      meta: {
        title: '提现'
      },
      component: resolve => { require(['@/page/account/withdraw'], resolve) }
    }, {
      path: '/redPacket',
      name: 'redPacket',
      meta: {
        title: '我的红包'
      },
      component: resolve => { require(['@/page/account/redPacket'], resolve) }
    }, {
      path: '/riskAssessment',
      name: 'riskAssessment',
      meta: {
        title: '风险评测'
      },
      component: resolve => { require(['@/page/account/riskAssessment'], resolve) }
    }, {
      path: '/bankCard',
      name: 'bankCard',
      meta: {
        title: '绑定银行卡'
      },
      component: resolve => { require(['@/page/account/bankCard'], resolve) }
    }, {
      path: '/bindBankCard',
      name: 'bindBankCard',
      meta: {
        title: '绑定银行卡'
      },
      component: resolve => { require(['@/page/account/bindBankCard'], resolve) }
    }, {
      path: '/lendRecord',
      name: 'lendRecord',
      meta: {
        keepAlive: true,
        title: '出借记录'
      },
      component: resolve => { require(['@/page/mine/lendRecord'], resolve) }
    }, {
      path: '/voucherList',
      name: 'voucherList',
      meta: {
        title: '我的卡券'
      },
      component: resolve => { require(['@/page/mine/voucherList'], resolve) }
    }, {
      path: '/conversionRedBag',
      name: 'conversionRedBag',
      meta: {
        title: '兑换红包'
      },
      component: resolve => { require(['@/page/account/conversionRedBag'], resolve) }
    }, {
      path: '/editConfirm',
      name: 'editConfirm',
      meta: {
        title: '绑定手机号'
      },
      component: resolve => { require(['@/page/mine/editConfirm'], resolve) }
    }, {
      path: '/modifyPhoneNumber',
      name: 'modifyPhoneNumber',
      meta: {
        title: '绑定手机号'
      },
      component: resolve => { require(['@/page/mine/modifyPhoneNumber'], resolve) }
    }, {
      path: '/bindPhoneNumber',
      name: 'bindPhoneNumber',
      meta: {
        title: '绑定手机号'
      },
      component: resolve => { require(['@/page/mine/bindPhoneNumber'], resolve) }
    }, {
      path: '/transactionRecords',
      name: 'transactionRecords',
      meta: {
        title: '交易记录'
      },
      component: resolve => { require(['@/page/mine/transactionRecords'], resolve) }
    }, {
      path: '/lendDetail',
      name: 'lendDetail',
      meta: {
        title: '出借记录详情'
      },
      component: resolve => { require(['@/page/mine/lendDetail'], resolve) }
    }, {
      path: '/daodaoDetail',
      name: 'daodaoDetail',
      component: resolve => { require(['@/page/discover/daodaoDetail'], resolve) }
    }, {
      path: '/specialColumn',
      name: 'specialColumn',
      component: resolve => { require(['@/page/discover/specialColumn'], resolve) }
    }, {
      path: '/signIn',
      name: 'signIn',
      meta: {
        title: '签到'
      },
      component: resolve => { require(['@/page/discover/signIn'], resolve) }
    }, {
      path: '/invite',
      name: 'invite',
      meta: {
        title: '邀请好友'
      },
      component: resolve => { require(['@/page/discover/invite'], resolve) }
    }, {
      path: '/inviteList',
      name: 'inviteList',
      meta: {
        title: '邀请好友'
      },
      component: resolve => { require(['@/page/discover/inviteList.vue'], resolve) }
    }, {
      path: '/perShare',
      name: 'perShare',
      component: resolve => { require(['@/page/discover/perShare'], resolve) }
    }, {
      path: '/dailyCheckIn',
      name: 'dailyCheckIn',
      meta: {
        title: '每日签到'
      },
      component: resolve => { require(['@/page/discover/dailyCheckIn'], resolve) }
    }, {
      path: '/checkInRule',
      name: 'checkInRule',
      meta: {
        title: '签到规则'
      },
      component: resolve => { require(['@/page/discover/checkInRule'], resolve) }
    }, {
      path: '/addressList',
      name: 'addressList',
      meta: {
        title: '收货地址'
      },
      component: resolve => { require(['@/page/account/addressList'], resolve) }
    }, {
      path: '/editAddress',
      name: 'editAddress',
      meta: {
        title: '收货地址'
      },
      component: resolve => { require(['@/page/account/editAddress'], resolve) }
    }, {
      path: '/newYear',
      name: 'newYear',
      meta: {
        title: '提“钱”实现愿望'
      },
      component: resolve => { require(['@/activity/newYear/newYear'], resolve) }
    }, {
      path: '/activityShare',
      name: 'activityShare',
      meta: {
        title: '提“钱”实现愿望'
      },
      component: resolve => { require(['@/activity/newYear/activityShare'], resolve) }
    }, {
      path: '/tricky',
      name: 'tricky',
      meta: {
        title: '整蛊大战'
      },
      component: resolve => { require(['@/activity/tricky/tricky'], resolve) }
    }, {
      path: '/annualReport',
      name: 'annualReport',
      meta: {
        title: '我的2018'
      },
      component: resolve => { require(['@/activity/annualReport/annualReport'], resolve) }
    }, {
      path: '/arborDay',
      name: 'arborDay',
      meta: {
        keepAlive: true,
        title: '春喜，植树净充双重礼'
      },
      component: resolve => { require(['@/activity/arborDay/arborDay'], resolve) }
    }, {
      path: '/encore',
      name: 'encore',
      meta: {
        title: '2019春节返场'
      },
      component: resolve => { require(['@/activity/encore/encore'], resolve) }
    }, {
      path: '/inviteFriends',
      name: 'inviteFriends',
      meta: {
        title: '邀请好友'
      },
      component: resolve => { require(['@/activity/inviteFriends/inviteFriends'], resolve) }
    }, {
      path: '/mothersDay',
      name: 'mothersDay',
      meta: {
        title: '母亲节，一起为爱创造惊喜-普惠理财'
      },
      component: resolve => { require(['@/activity/mothersDay/mothersDay'], resolve) }
    }, {
      path: '/articles',
      name: 'articles',
      meta: {
        title: '庆祝30亿，有奖征文-普惠理财'
      },
      component: resolve => { require(['@/activity/articles/articles'], resolve) }
    }, {
      path: '/juneActivity',
      name: 'juneActivity',
      meta: {
        title: '情满六月，为爱加息-普惠理财'
      },
      component: resolve => { require(['@/activity/juneActivity/juneActivity'], resolve) }
    }, {
      path: '/julyActivity',
      name: 'julyActivity',
      meta: {
        keepAlive: true,
        title: '运转七月，源源不断-普惠理财'
      },
      component: resolve => { require(['@/activity/julyActivity/julyActivity'], resolve) }
    }
  ]
})
router.beforeEach((to, from, next) => {
  $('.mask-plugins').remove()
  if (to.fullPath.indexOf('/msgCenter') !== -1) {
    if (from.fullPath.indexOf('/msgCenter') === -1 && from.fullPath.indexOf('/msgType') === -1 && from.fullPath.indexOf('/noticeDetail') === -1) {
      store.state.noticeListscroll = 0
    }
  }
  if (to.fullPath.indexOf('/register') !== -1 && from.fullPath.indexOf('/validateCode') === -1 && from.fullPath.indexOf('/provision') === -1) {
    store.state.register_phone = 0
  }
  if (to.fullPath.indexOf('/lendRecord') !== -1 && from.fullPath.indexOf('/lendDetail') === -1) {
    store.state.lendListIndex = 2
    store.state.lendListScrollHeight = [0, 0, 0, 0, 0]
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
